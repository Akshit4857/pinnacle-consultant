export const config = { api: { responseContentType: 'application/json' } };

// ---------------------------------------------------------------------------
// Lightweight in-memory rate limiter (per serverless instance).
// Degrades gracefully without Upstash; good enough to blunt basic abuse.
// ---------------------------------------------------------------------------
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_MAX = 5;
const buckets = new Map<string, { count: number; start: number }>();

function allowRequest(key: string): boolean {
  const now = Date.now();
  const b = buckets.get(key);
  if (!b || now - b.start > RATE_WINDOW_MS) {
    buckets.set(key, { count: 1, start: now });
    return true;
  }
  if (b.count >= RATE_MAX) return false;
  b.count += 1;
  return true;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function stripControl(value: string): string {
  return value.replace(/[\r\n\t]+/g, ' ').trim();
}

function maskEmail(email: string): string {
  const [user, domain] = email.split('@');
  if (!domain) return email;
  const head = user.slice(0, 2);
  return `${head}${'*'.repeat(Math.max(1, user.length - 2))}@${domain}`;
}

function readBody(req: any): Promise<Record<string, any>> {
  // Vercel may already parse JSON into req.body; if not, read the stream.
  if (req.body && typeof req.body === 'object') return Promise.resolve(req.body);
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk: any) => {
      raw += chunk;
      if (raw.length > 64 * 1024) {
        reject(new Error('Payload too large'));
        req.destroy();
      }
    });
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

export default async function handler(req: any, res: any) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed. Use POST.' });
  }

  const clientIp =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    req.ip ||
    req.socket?.remoteAddress ||
    '127.0.0.1';

  try {
    const body = await readBody(req);

    // Honeypot — silently accept to sink spambots.
    const honeypot = body.honeypot || body.website_url_hp;
    if (honeypot && String(honeypot).trim().length > 0) {
      return res.status(200).json({ success: true, message: 'Thank you! We will be in touch shortly.' });
    }

    if (!allowRequest(clientIp)) {
      return res.status(429).json({
        success: false,
        error: 'Too many messages from your network. Please try again in an hour.',
      });
    }

    // Validation
    const name = stripControl(String(body.name || ''));
    const email = stripControl(String(body.email || '')).toLowerCase();
    const company = stripControl(String(body.company || ''));
    const phone = stripControl(String(body.phone || ''));
    const serviceInterest = stripControl(String(body.serviceInterest || ''));
    const budgetRange = stripControl(String(body.budgetRange || ''));
    const message = stripControl(String(body.message || ''));
    const source = stripControl(String(body.source || 'contact'));

    if (name.length < 2 || name.length > 100) {
      return res.status(400).json({ success: false, error: 'Full name must be at least 2 characters' });
    }
    if (!email || email.length > 120 || !EMAIL_RE.test(email)) {
      return res.status(400).json({ success: false, error: 'Invalid email address' });
    }
    if (company.length > 120 || phone.length > 20 || serviceInterest.length > 120 || budgetRange.length > 60) {
      return res.status(400).json({ success: false, error: 'One or more fields exceed allowed length' });
    }
    if (message.length > 2000) {
      return res.status(400).json({ success: false, error: 'Message cannot exceed 2000 characters' });
    }

    const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
    if (!appsScriptUrl || !appsScriptUrl.startsWith('http')) {
      console.info(`[Inquiry:${source}] ${name} <${email}> — GOOGLE_APPS_SCRIPT_URL not set; logged only.`);
      return res.status(200).json({ success: true, message: 'Thank you! We will be in touch shortly.' });
    }

    const secret = process.env.GOOGLE_APPS_SCRIPT_SECRET;
    const payload: Record<string, unknown> = {
      action: 'appendInquiry',
      data: {
        Timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        Source: source,
        Name: name,
        Company: company,
        Email: email,
        Phone: phone,
        'Service Interest': serviceInterest,
        'Budget Range': budgetRange,
        Message: message,
        Status: 'New',
      },
    };
    if (secret) payload.secret = secret;

    const response = await fetch(appsScriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      redirect: 'follow',
    });

    if (!response.ok) {
      console.error(`[Inquiry] Apps Script HTTP ${response.status}`);
      return res.status(502).json({
        success: false,
        error: 'Unable to record your message right now. Please email info@pinnacleconsultant.co.in directly.',
      });
    }

    const result = (await response.json()) as any;
    if (!result || result.success === false) {
      console.error('[Inquiry] Apps Script appendInquiry failed:', result);
      return res.status(502).json({
        success: false,
        error: 'Unable to record your message right now. Please email info@pinnacleconsultant.co.in directly.',
      });
    }

    console.info(`[Inquiry] Accepted ${source} inquiry from ${maskEmail(email)}`);
    return res.status(200).json({ success: true, message: 'Thank you! We will be in touch shortly.' });
  } catch (err: any) {
    console.error('[Inquiry] Unhandled error:', err?.message || err);
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred. Please try again or email info@pinnacleconsultant.co.in.',
    });
  }
}
