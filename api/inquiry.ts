import { inquirySchema, checkRateLimit, maskEmail } from '../server/security';
import { appendInquiryRow } from '../server/google';

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
    '127.0.0.1';

  try {
    const body = req.body || {};

    const honeypot = body.honeypot || body.website_url_hp;
    if (honeypot && String(honeypot).trim().length > 0) {
      return res.status(200).json({ success: true, message: 'Thank you! We will be in touch shortly.' });
    }

    const rateCheck = await checkRateLimit(clientIp, 'inquiry');
    if (!rateCheck.allowed) {
      return res.status(429).json({
        success: false,
        error: 'Too many messages from your network. Please try again in an hour.',
      });
    }

    const parseResult = inquirySchema.safeParse({
      source: body.source || 'contact',
      name: body.name,
      company: body.company || '',
      email: body.email,
      phone: body.phone || '',
      serviceInterest: body.serviceInterest || '',
      budgetRange: body.budgetRange || '',
      message: body.message || '',
      honeypot,
    });

    if (!parseResult.success) {
      const firstError = parseResult.error.issues[0]?.message || 'Invalid input data';
      return res.status(400).json({ success: false, error: firstError });
    }

    const data = parseResult.data;
    const result = await appendInquiryRow({
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      source: data.source,
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone,
      serviceInterest: data.serviceInterest,
      budgetRange: data.budgetRange,
      message: data.message,
    });

    if (!result.success) {
      return res.status(502).json({
        success: false,
        error: 'Unable to record your message right now. Please email info@pinnacleconsultant.co.in directly.',
      });
    }

    console.info(`[Inquiry] Accepted ${data.source} inquiry from ${maskEmail(data.email)}`);
    return res.status(200).json({ success: true, message: 'Thank you! We will be in touch shortly.' });
  } catch (err: any) {
    console.error('[Inquiry] Unhandled error:', err?.message || err);
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred. Please try again or email info@pinnacleconsultant.co.in.',
    });
  }
}
