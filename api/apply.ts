import Busboy from 'busboy';
import {
  applicationSchema,
  validateUploadedFile,
  checkRateLimit,
  checkDuplicateApplication,
  recordApplicationKey,
  verifyTurnstileToken,
  maskEmail,
  maskPhone,
} from '../server/security';
import { getActiveJobBySlug, appendApplicationRow, uploadResumeToDrive } from '../server/google';
import { sendWhatsAppNotification } from '../server/whatsapp';
import { enqueueFailedApplication } from '../server/queue';
import { StoredApplication } from '../server/types';
import { config as appConfig } from '../server/config';

export const config = {
  api: {
    bodyParser: false, // busboy streams the multipart body directly
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
        limits: { fileSize: appConfig.limits.maxResumeSizeBytes, files: 1 },
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
    const { fields, file } = await parseMultipart(req);

    // 1. IP rate limit (separate bucket from inquiries)
    const rateCheck = await checkRateLimit(clientIp);
    if (!rateCheck.allowed) {
      return res.status(429).json({
        success: false,
        error: 'Too many submissions from your network. Please wait an hour before submitting again.',
      });
    }

    // 2. Honeypot — silently accept to sink spambots
    const honeypot = fields.website_url_hp || fields.honeypot;
    if (honeypot && honeypot.trim().length > 0) {
      return res.status(200).json({ success: true, message: 'Application submitted successfully' });
    }

    // 3. Minimum-time check (submits faster than a human can type are bots)
    const formLoadTs = Number(fields.formLoadTimestamp);
    if (formLoadTs && Date.now() - formLoadTs < appConfig.limits.minSubmitTimeSeconds * 1000) {
      return res.status(400).json({
        success: false,
        error: 'Form was submitted unusually fast. Please review your details and submit again.',
      });
    }

    // 4. Cloudflare Turnstile verification
    const turnstileToken = fields.turnstileToken;
    const turnstileRes = await verifyTurnstileToken(turnstileToken, clientIp);
    if (!turnstileRes.success) {
      return res.status(400).json({
        success: false,
        error: turnstileRes.error || 'Anti-bot verification failed. Please try again.',
      });
    }

    // 5. Schema validation
    const parseResult = applicationSchema.safeParse({
      jobSlug: fields.jobSlug,
      fullName: fields.fullName,
      email: fields.email,
      phone: fields.phone,
      city: fields.city || '',
      experienceYears: fields.experienceYears || '',
      portfolioUrl: fields.portfolioUrl || '',
      coverNote: fields.coverNote || '',
      agreedToPrivacy: fields.agreedToPrivacy === 'true',
      honeypot,
      formLoadTimestamp: formLoadTs || undefined,
      turnstileToken,
    });

    if (!parseResult.success) {
      const firstError = parseResult.error.issues[0]?.message || 'Invalid input data';
      return res.status(400).json({ success: false, error: firstError });
    }

    const validData = parseResult.data;

    // 6. Resume validation (extension, MIME, magic bytes, size)
    if (!file || !file.buffer || file.buffer.length === 0) {
      return res.status(400).json({ success: false, error: 'Resume file is required (PDF, DOC, or DOCX)' });
    }

    const fileValidation = validateUploadedFile(file.buffer, file.filename, file.mimetype);
    if (!fileValidation.valid || !fileValidation.sanitizedName) {
      return res.status(400).json({
        success: false,
        error: fileValidation.error || 'Invalid resume file format or content',
      });
    }

    // 7. Job must exist and be accepting applications
    const job = await getActiveJobBySlug(validData.jobSlug);
    if (!job) {
      return res.status(400).json({
        success: false,
        error: 'This position is no longer accepting applications',
      });
    }

    // 8. Duplicate check (same email + same job)
    const duplicateCheck = await checkDuplicateApplication(validData.jobSlug, validData.email);
    if (duplicateCheck.isDuplicate) {
      return res.status(409).json({
        success: false,
        error: 'You have already applied for this role. We have received your application and our team will get in touch if shortlisted.',
      });
    }

    // 9. Upload resume to private Drive folder
    let resumeLink = '';
    try {
      const driveResult = await uploadResumeToDrive(
        file.buffer,
        fileValidation.sanitizedName,
        validData.fullName,
        validData.jobSlug,
        file.mimetype
      );
      resumeLink = driveResult.webViewLink;
    } catch (driveErr: any) {
      console.error('[GoogleDrive] Resume upload error:', driveErr?.message || driveErr);
      return res.status(500).json({
        success: false,
        error: 'Unable to securely process resume upload at this moment. Please try again shortly.',
      });
    }

    // 10. Append to Applications sheet (enqueue for retry on failure)
    const applicationRecord: StoredApplication = {
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      jobTitle: job.title,
      jobSlug: validData.jobSlug,
      name: validData.fullName,
      email: validData.email,
      phone: validData.phone,
      city: validData.city || '',
      experience: validData.experienceYears || '',
      portfolioUrl: validData.portfolioUrl || '',
      message: validData.coverNote || '',
      resumeLink,
      status: 'New',
      whatsAppNotified: 'No',
    };

    const sheetAppendRes = await appendApplicationRow(applicationRecord);
    if (!sheetAppendRes.success) {
      console.warn(`[Pipeline] Sheet append failed for ${maskEmail(validData.email)}. Enqueueing retry.`);
      await enqueueFailedApplication(applicationRecord);
    }

    await recordApplicationKey(validData.jobSlug, validData.email);

    // 11. Non-blocking owner notification
    sendWhatsAppNotification({
      jobTitle: job.title,
      name: validData.fullName,
      phone: validData.phone,
      email: validData.email,
      experience: validData.experienceYears || 'Not specified',
      resumeLink,
    })
      .then((notified) => {
        if (notified) {
          console.info(`[WhatsApp] Owner successfully notified of application for ${job.title}`);
        }
      })
      .catch((err) => {
        console.error('[WhatsApp] Notification failed in background:', err);
      });

    console.info(
      `[Pipeline] Accepted application for [${job.slug}] from ${maskEmail(validData.email)} (Phone: ${maskPhone(validData.phone)})`
    );

    return res.status(200).json({
      success: true,
      message: 'Application submitted successfully! Our talent team will review your profile.',
    });
  } catch (err: any) {
    console.error('[Pipeline] Unhandled error during application submission:', err?.message || err);
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred while processing your application. Please try again.',
    });
  }
}
