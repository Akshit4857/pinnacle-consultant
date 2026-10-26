import Busboy from 'busboy';

export const config = {
  api: {
    bodyParser: false, // busboy streams the multipart body directly
  },
};

const MAX_RESUME_BYTES = 5 * 1024 * 1024; // 5 MB
const MIN_SUBMIT_SECONDS = 2.5;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+0-9\s\-()]{8,20}$/;
const SLUG_RE = /^[a-z0-9-]+$/;

interface ParsedMultipart {
  fields: Record<string, string>;
  file?: {
    buffer: Buffer;
    filename: string;
    mimetype: string;
  };
}

function parseMultipart(req: any): Promise<ParsedMultipart> {
  return new Promise((resolve, reject) => {
    try {
      const busboy = Busboy({
        headers: req.headers,
        limits: { fileSize: MAX_RESUME_BYTES, files: 1 },
      });

      const fields: Record<string, string> = {};
      let fileData: { buffer: Buffer; filename: string; mimetype: string } | undefined;
      const fileChunks: Buffer[] = [];

      busboy.on('field', (name, val) => {
        fields[name] = val;
      });

      busboy.on('file', (_fieldname, fileStream, info) => {
        const { filename, mimeType } = info;
        fileStream.on('data', (chunk) => {
          fileChunks.push(chunk);
        });
        fileStream.on('end', () => {
          fileData = {
            buffer: Buffer.concat(fileChunks),
            filename: filename || 'resume.pdf',
            mimetype: mimeType || 'application/pdf',
          };
        });
      });

      busboy.on('finish', () => {
        resolve({ fields, file: fileData });
      });

      busboy.on('error', (err) => {
        reject(err);
      });

      req.pipe(busboy);
    } catch (err) {
      reject(err);
    }
  });
}

// Inline magic-byte check to avoid the heavy sanitize-html dependency chain.
function sniffFileType(buf: Buffer): 'pdf' | 'doc' | 'docx' | 'unknown' {
  if (buf.length < 4) return 'unknown';
  if (buf[0] === 0x25 && buf[1] === 0x50 && buf[2] === 0x44 && buf[3] === 0x46) return 'pdf'; // %PDF
  if (buf[0] === 0xd0 && buf[1] === 0xcf && buf[2] === 0x11 && buf[3] === 0xe0) return 'doc'; // OLE2
  if (
    buf[0] === 0x50 &&
    buf[1] === 0x4b &&
    (buf[2] === 0x03 || buf[2] === 0x05 || buf[2] === 0x07) &&
    (buf[3] === 0x04 || buf[3] === 0x06 || buf[3] === 0x08)
  ) {
    return 'docx'; // ZIP (docx)
  }
  return 'unknown';
}

async function verifyTurnstileToken(token: string | undefined, remoteIp: string): Promise<{ success: boolean; error?: string }> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY || '';
  // If secret is not set (e.g. local dev), pass gracefully.
  if (!secretKey) return { success: true };
  if (!token) return { success: false, error: 'Spam verification token is missing' };

  try {
    const formData = new URLSearchParams();
    formData.append('secret', secretKey);
    formData.append('response', token);
    formData.append('remoteip', remoteIp);

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
    });
    const data = (await res.json()) as { success: boolean };
    if (data.success) return { success: true };
    return { success: false, error: 'Anti-bot verification failed. Please try again.' };
  } catch (err) {
    console.error('[Turnstile] Verification error:', err);
    return { success: false, error: 'Verification service temporarily unavailable' };
  }
}

function sanitizeParam(str: string, maxLen = 100): string {
  if (!str) return 'N/A';
  const clean = str.replace(/[\r\n\t]+/g, ' ').trim();
  return clean.length > maxLen ? clean.slice(0, maxLen - 3) + '...' : clean;
}

function maskEmail(email: string): string {
  const [user, domain] = email.split('@');
  if (!domain) return email;
  return `${user.slice(0, 2)}${'*'.repeat(Math.max(1, user.length - 2))}@${domain}`;
}

function maskPhone(phone: string): string {
  const digits = phone.replace(/[^0-9]/g, '');
  if (digits.length < 4) return '****';
  return `${'*'.repeat(digits.length - 4)}${digits.slice(-4)}`;
}

async function fetchActiveJobBySlug(slug: string): Promise<{ title: string } | null> {
  const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
  if (!appsScriptUrl || !appsScriptUrl.startsWith('http')) return null;

  const secret = process.env.GOOGLE_APPS_SCRIPT_SECRET;
  const payload: Record<string, unknown> = { action: 'getJobs' };
  if (secret) payload.secret = secret;

  const response = await fetch(appsScriptUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    redirect: 'follow',
  });
  if (!response.ok) return null;

  const json = (await response.json()) as any;
  if (!json || !json.success || !Array.isArray(json.data)) return null;

  const todayStr = new Date().toISOString().split('T')[0];
  for (const row of json.data) {
    const getVal = (...keys: string[]) => {
      for (const k of keys) {
        if (row[k] !== undefined && row[k] !== '') return String(row[k]).trim();
        const lowerK = k.toLowerCase();
        for (const actualKey of Object.keys(row)) {
          if (actualKey.toLowerCase() === lowerK && row[actualKey] !== undefined && row[actualKey] !== '') {
            return String(row[actualKey]).trim();
          }
        }
      }
      return '';
    };

    const title = getVal('Title', 'Job Title', 'Role', 'Position');
    if (!title) continue;

    let rowSlug = getVal('Slug', 'Job Slug', 'ID').toLowerCase();
    if (!rowSlug || !SLUG_RE.test(rowSlug)) {
      rowSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    if (rowSlug !== slug) continue;

    const statusRaw = getVal('Status') ? getVal('Status').toLowerCase() : 'active';
    const lastDateRaw = getVal('LastDateToApply', 'Deadline', 'Last Date');
    let lastDate: string | undefined;
    if (lastDateRaw) {
      const d = new Date(lastDateRaw);
      lastDate = isNaN(d.getTime()) ? lastDateRaw : d.toISOString().split('T')[0];
    }

    if (statusRaw !== 'active' && statusRaw !== 'open') continue;
    if (lastDate && lastDate < todayStr) continue;

    return { title };
  }
  return null;
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

  try {
    const { fields, file } = await parseMultipart(req);

    // 1. Honeypot — silently accept to sink spambots.
    const honeypot = fields.website_url_hp || fields.honeypot;
    if (honeypot && honeypot.trim().length > 0) {
      return res.status(200).json({ success: true, message: 'Application submitted successfully' });
    }

    // 2. Minimum-time check (submits faster than a human can type are bots).
    const formLoadTs = Number(fields.formLoadTimestamp);
    if (formLoadTs && Date.now() - formLoadTs < MIN_SUBMIT_SECONDS * 1000) {
      return res.status(400).json({
        success: false,
        error: 'Form was submitted unusually fast. Please review your details and submit again.',
      });
    }

    // 2b. Cloudflare Turnstile verification.
    const clientIp =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      req.ip ||
      req.socket?.remoteAddress ||
      '127.0.0.1';
    const turnstileRes = await verifyTurnstileToken(fields.turnstileToken, clientIp);
    if (!turnstileRes.success) {
      return res.status(400).json({
        success: false,
        error: turnstileRes.error || 'Anti-bot verification failed. Please try again.',
      });
    }

    // 3. Field validation
    const fullName = (fields.fullName || '').trim();
    const email = (fields.email || '').trim().toLowerCase();
    const phone = (fields.phone || '').trim();
    const jobSlug = (fields.jobSlug || '').trim().toLowerCase();

    if (!jobSlug || !SLUG_RE.test(jobSlug)) {
      return res.status(400).json({ success: false, error: 'Invalid job identifier format' });
    }
    if (!fullName || fullName.length < 2 || fullName.length > 100) {
      return res.status(400).json({ success: false, error: 'Full name must be at least 2 characters.' });
    }
    if (!email || email.length > 120 || !EMAIL_RE.test(email)) {
      return res.status(400).json({ success: false, error: 'Please enter a valid email address.' });
    }
    if (!phone || phone.length > 20 || !PHONE_RE.test(phone)) {
      return res.status(400).json({ success: false, error: 'Please enter a valid phone number.' });
    }
    if (fields.agreedToPrivacy !== 'true') {
      return res.status(400).json({
        success: false,
        error: 'You must agree to the Privacy Policy to proceed',
      });
    }

    // 4. Resume validation (presence, extension, size, magic bytes)
    if (!file || !file.buffer || file.buffer.length === 0) {
      return res.status(400).json({ success: false, error: 'Please upload your resume file (PDF, DOC, or DOCX).' });
    }
    if (file.buffer.length > MAX_RESUME_BYTES) {
      return res.status(400).json({ success: false, error: 'Resume file must be 5 MB or smaller.' });
    }

    const ext = (file.filename.split('.').pop() || '').toLowerCase();
    if (!['pdf', 'doc', 'docx'].includes(ext)) {
      return res.status(400).json({ success: false, error: 'Only PDF, DOC, and DOCX resume formats are supported.' });
    }

    const sniffed = sniffFileType(file.buffer);
    if (sniffed === 'unknown' || (sniffed === 'docx' && ext !== 'docx') || (sniffed === 'doc' && ext !== 'doc') || (sniffed === 'pdf' && ext !== 'pdf')) {
      return res.status(400).json({
        success: false,
        error: 'Resume file content does not match its extension. Please re-export and upload again.',
      });
    }

    const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
    if (!appsScriptUrl || !appsScriptUrl.startsWith('http')) {
      console.warn('[Apply] GOOGLE_APPS_SCRIPT_URL is not configured.');
      return res.status(500).json({
        success: false,
        error: 'Recruitment portal is temporarily unavailable. Please email your CV directly to info@pinnacleconsultant.co.in',
      });
    }

    // 5. Job must exist and be accepting applications
    const job = await fetchActiveJobBySlug(jobSlug);
    if (!job) {
      return res.status(400).json({
        success: false,
        error: 'This position is no longer accepting applications',
      });
    }

    const secret = process.env.GOOGLE_APPS_SCRIPT_SECRET;

    // 6. Upload Resume to Google Drive via Apps Script
    let resumeLink = '';
    try {
      const uploadPayload: Record<string, unknown> = {
        action: 'uploadResume',
        filename: file.filename,
        mimeType: file.mimetype,
        base64Content: file.buffer.toString('base64'),
        candidateName: fullName,
        jobSlug,
      };
      if (secret) uploadPayload.secret = secret;

      const uploadRes = await fetch(appsScriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(uploadPayload),
        redirect: 'follow',
      });

      if (uploadRes.ok) {
        const uploadJson = (await uploadRes.json()) as any;
        if (uploadJson && uploadJson.success && uploadJson.webViewLink) {
          resumeLink = uploadJson.webViewLink;
        }
      }
    } catch (uploadErr) {
      console.error('[Apply] Resume upload error:', uploadErr);
    }

    // 7. Append candidate row to Applications Sheet via Apps Script
    const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
    try {
      const appendPayload: Record<string, unknown> = {
        action: 'appendApplication',
        data: {
          Timestamp: timestamp,
          'Job Title': sanitizeParam(job.title || jobSlug),
          'Job Slug': jobSlug,
          Name: fullName,
          Email: email,
          Phone: phone,
          City: fields.city || '',
          Experience: fields.experienceYears || '',
          'LinkedIn/Portfolio': fields.portfolioUrl || '',
          Message: fields.coverNote || '',
          'Resume Link': resumeLink,
          Status: 'New',
          WhatsAppNotified: 'Yes',
        },
      };
      if (secret) appendPayload.secret = secret;

      const appendRes = await fetch(appsScriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appendPayload),
        redirect: 'follow',
      });

      if (!appendRes.ok) {
        console.warn(`[Apply] Append row returned HTTP ${appendRes.status}`);
      }
    } catch (appendErr) {
      console.error('[Apply] Append application row error:', appendErr);
    }

    // 8. Send Instant WhatsApp Alert to Owner (Non-blocking)
    const whatsappProvider = process.env.WHATSAPP_PROVIDER || 'callmebot';
    const ownerNumber = (process.env.OWNER_WHATSAPP_NUMBER || '').replace(/[^0-9]/g, '');
    const callmebotKey = process.env.CALLMEBOT_API_KEY;

    if (whatsappProvider === 'callmebot' && callmebotKey && ownerNumber) {
      try {
        const message =
          `🔔 *New Job Application Received*\n\n` +
          `*Role:* ${sanitizeParam(job.title || jobSlug)}\n` +
          `*Name:* ${sanitizeParam(fullName)}\n` +
          `*Phone:* ${sanitizeParam(phone)}\n` +
          `*Email:* ${sanitizeParam(email)}\n` +
          `*Experience:* ${sanitizeParam(fields.experienceYears || 'Not specified')}\n` +
          `*Resume Link:* ${resumeLink || 'Uploaded to Drive'}`;

        const botUrl = `https://api.callmebot.com/whatsapp.php?phone=+${ownerNumber}&text=${encodeURIComponent(message)}&apikey=${callmebotKey}`;
        fetch(botUrl, { method: 'GET' }).catch((botErr) => {
          console.error('[Apply] WhatsApp dispatch background error:', botErr);
        });
      } catch (whatsErr) {
        console.error('[Apply] WhatsApp send error:', whatsErr);
      }
    }

    console.info(`[Apply] Accepted application for [${jobSlug}] from ${maskEmail(email)} (Phone: ${maskPhone(phone)})`);

    // 9. Success response to candidate
    return res.status(200).json({
      success: true,
      message: 'Application submitted successfully! Our talent team will review your profile.',
    });
  } catch (err: any) {
    console.error('[Apply] Unhandled submission error:', err);
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred while processing your application. Please try again.',
    });
  }
}
