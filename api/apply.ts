import Busboy from 'busboy';

export const config = {
  api: {
    bodyParser: false, // Disabling Vercel bodyParser so busboy can stream multipart body
  },
};

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
        limits: { fileSize: 5 * 1024 * 1024, files: 1 },
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

function sanitizeParam(str: string, maxLen = 100): string {
  if (!str) return 'N/A';
  const clean = str.replace(/[\r\n\t]+/g, ' ').trim();
  return clean.length > maxLen ? clean.slice(0, maxLen - 3) + '...' : clean;
}

export default async function handler(req: any, res: any) {
  // CORS & Security headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed. Use POST.' });
  }

  try {
    // 1. Parse multipart form data
    const { fields, file } = await parseMultipart(req);

    // 2. Anti-spam honeypot check
    const honeypot = fields.website_url_hp || fields.honeypot;
    if (honeypot && honeypot.trim().length > 0) {
      return res.status(200).json({
        success: true,
        message: 'Application submitted successfully! Our talent team will review your profile.',
      });
    }

    // 3. Validate required fields
    const fullName = (fields.fullName || '').trim();
    const email = (fields.email || '').trim().toLowerCase();
    const phone = (fields.phone || '').trim();
    const jobSlug = (fields.jobSlug || '').trim().toLowerCase();

    if (!fullName || fullName.length < 2) {
      return res.status(400).json({ success: false, error: 'Full name must be at least 2 characters.' });
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ success: false, error: 'Please enter a valid email address.' });
    }

    if (!phone || phone.replace(/[^0-9]/g, '').length < 8) {
      return res.status(400).json({ success: false, error: 'Please enter a valid phone number.' });
    }

    if (!file || !file.buffer || file.buffer.length === 0) {
      return res.status(400).json({ success: false, error: 'Please upload your resume file (PDF, DOC, or DOCX).' });
    }

    // Validate file extension
    const ext = (file.filename.split('.').pop() || '').toLowerCase();
    if (!['pdf', 'doc', 'docx'].includes(ext)) {
      return res.status(400).json({ success: false, error: 'Only PDF, DOC, and DOCX resume formats are supported.' });
    }

    const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
    if (!appsScriptUrl || !appsScriptUrl.startsWith('http')) {
      console.warn('[Apply] GOOGLE_APPS_SCRIPT_URL is not configured.');
      return res.status(500).json({
        success: false,
        error: 'Recruitment portal is temporarily unavailable. Please email your CV directly to info@pinnacleconsultant.co.in',
      });
    }

    const secret = process.env.GOOGLE_APPS_SCRIPT_SECRET;

    // 4. Upload Resume to Google Drive via Apps Script
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

    // 5. Append candidate row to Applications Sheet via Apps Script
    const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
    try {
      const appendPayload: Record<string, unknown> = {
        action: 'appendApplication',
        data: {
          Timestamp: timestamp,
          'Job Title': sanitizeParam(fields.jobTitle || jobSlug),
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

    // 6. Send Instant WhatsApp Alert to Owner (Non-blocking)
    const whatsappProvider = process.env.WHATSAPP_PROVIDER || 'callmebot';
    const ownerNumber = (process.env.OWNER_WHATSAPP_NUMBER || '').replace(/[^0-9]/g, '');
    const callmebotKey = process.env.CALLMEBOT_API_KEY;

    if (whatsappProvider === 'callmebot' && callmebotKey && ownerNumber) {
      try {
        const message =
          `🔔 *New Job Application Received*\n\n` +
          `*Role:* ${sanitizeParam(fields.jobTitle || jobSlug)}\n` +
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

    // 7. Success response to candidate
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
