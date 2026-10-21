import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { getActiveJobs, getActiveJobBySlug, appendApplicationRow, uploadResumeToDrive } from './google';
import {
  applicationSchema,
  validateUploadedFile,
  scanFileForMalware,
  checkRateLimit,
  checkDuplicateApplication,
  recordApplicationKey,
  verifyTurnstileToken,
  maskEmail,
  maskPhone,
} from './security';
import { sendWhatsAppNotification } from './whatsapp';
import { enqueueFailedApplication } from './queue';
import { StoredApplication } from './types';
import { config } from './config';

const router = express.Router();

// Memory-only storage for resume file buffer (max 5 MB stream limit)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: config.limits.maxResumeSizeBytes,
    files: 1,
    fields: 15,
  },
});

/**
 * Middleware: Apply security headers
 */
export function applySecurityHeaders(req: Request, res: Response, next: NextFunction) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // Basic CORS safety: allow same-origin and verified APP_URL only
  const origin = req.headers.origin;
  if (origin) {
    const allowed = [
      process.env.APP_URL,
      'http://localhost:3000',
      'http://localhost:5173',
      'https://pinnacleconsultant.co.in',
      'https://www.pinnacleconsultant.co.in',
    ].filter(Boolean);

    if (allowed.some((a) => a && origin.startsWith(a))) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    }
  }

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  next();
}

/**
 * GET /api/jobs
 * Returns list of active jobs with private columns omitted
 */
router.get('/jobs', async (_req: Request, res: Response) => {
  try {
    const jobs = await getActiveJobs();
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.json({
      success: true,
      data: jobs,
    });
  } catch (err: any) {
    console.error('[API] /api/jobs error:', err?.message || err);
    res.status(500).json({
      success: false,
      error: 'Unable to retrieve jobs catalog at this time',
    });
  }
});

/**
 * GET /api/jobs/:slug
 * Returns single active job by slug
 */
router.get('/jobs/:slug', async (req: Request, res: Response) => {
  try {
    const slug = String(req.params.slug || '').trim().toLowerCase();
    if (!/^[a-z0-9-]+$/.test(slug)) {
      res.status(400).json({ success: false, error: 'Invalid job identifier format' });
      return;
    }

    const job = await getActiveJobBySlug(slug);
    if (!job) {
      res.status(404).json({
        success: false,
        error: 'This position is no longer accepting applications or does not exist.',
      });
      return;
    }

    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.json({
      success: true,
      data: job,
    });
  } catch (err: any) {
    console.error(`[API] /api/jobs/${req.params.slug} error:`, err?.message || err);
    res.status(500).json({
      success: false,
      error: 'Unable to retrieve job details at this time',
    });
  }
});

/**
 * POST /api/apply
 * Multi-step secure candidate application pipeline
 */
router.post(
  '/apply',
  applySecurityHeaders,
  upload.single('resume'),
  async (req: Request, res: Response): Promise<void> => {
    const clientIp =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      req.socket.remoteAddress ||
      '127.0.0.1';

    try {
      // 1. IP Rate limit check
      const rateCheck = await checkRateLimit(clientIp);
      if (!rateCheck.allowed) {
        res.status(429).json({
          success: false,
          error: 'Too many submissions from your network. Please wait an hour before submitting again.',
        });
        return;
      }

      // 2. Anti-spam: Honeypot check
      const honeypot = req.body.website_url_hp || req.body.honeypot;
      if (honeypot && String(honeypot).trim().length > 0) {
        // Silently accept without processing to sink spambots
        console.warn(`[AntiSpam] Bot detected via honeypot from IP: ${clientIp}`);
        res.json({ success: true, message: 'Application submitted successfully' });
        return;
      }

      // 3. Anti-spam: Minimum time to submit check (fast submits < 2.5s are bots)
      const formLoadTs = Number(req.body.formLoadTimestamp);
      if (formLoadTs && Date.now() - formLoadTs < config.limits.minSubmitTimeSeconds * 1000) {
        res.status(400).json({
          success: false,
          error: 'Form was submitted unusually fast. Please review your details and submit again.',
        });
        return;
      }

      // 4. Anti-spam: Cloudflare Turnstile verification
      const turnstileToken = req.body.turnstileToken;
      const turnstileRes = await verifyTurnstileToken(turnstileToken, clientIp);
      if (!turnstileRes.success) {
        res.status(400).json({
          success: false,
          error: turnstileRes.error || 'Anti-bot verification failed. Please try again.',
        });
        return;
      }

      // 5. Schema validation of text fields
      const parseResult = applicationSchema.safeParse({
        jobSlug: req.body.jobSlug,
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        city: req.body.city || '',
        experienceYears: req.body.experienceYears || '',
        portfolioUrl: req.body.portfolioUrl || '',
        coverNote: req.body.coverNote || '',
        agreedToPrivacy: req.body.agreedToPrivacy === 'true' || req.body.agreedToPrivacy === true,
        honeypot,
        formLoadTimestamp: formLoadTs || undefined,
        turnstileToken,
      });

      if (!parseResult.success) {
        const firstError = parseResult.error.issues[0]?.message || 'Invalid input data';
        res.status(400).json({ success: false, error: firstError });
        return;
      }

      const validData = parseResult.data;

      // 6. Resume file validation (MIME, Extension, Magic Bytes, Size)
      if (!req.file || !req.file.buffer) {
        res.status(400).json({ success: false, error: 'Resume file is required (PDF, DOC, or DOCX)' });
        return;
      }

      const fileValidation = validateUploadedFile(
        req.file.buffer,
        req.file.originalname,
        req.file.mimetype
      );

      if (!fileValidation.valid || !fileValidation.sanitizedName) {
        res.status(400).json({
          success: false,
          error: fileValidation.error || 'Invalid resume file format or content',
        });
        return;
      }

      // 7. Malware scanning hook
      const malwareCheck = await scanFileForMalware(req.file.buffer, req.file.originalname);
      if (!malwareCheck.safe) {
        res.status(400).json({ success: false, error: 'File failed security screening' });
        return;
      }

      // 8. Check if Job exists and is currently accepting applications
      const job = await getActiveJobBySlug(validData.jobSlug);
      if (!job) {
        res.status(400).json({
          success: false,
          error: 'This position is no longer accepting applications',
        });
        return;
      }

      // 9. Duplicate check (same email + same job)
      const duplicateCheck = await checkDuplicateApplication(validData.jobSlug, validData.email);
      if (duplicateCheck.isDuplicate) {
        res.status(409).json({
          success: false,
          error: 'You have already applied for this role. We have received your application and our team will get in touch if shortlisted.',
        });
        return;
      }

      // 10. Upload resume to private Google Drive folder
      let resumeLink = '';
      try {
        const driveResult = await uploadResumeToDrive(
          req.file.buffer,
          fileValidation.sanitizedName,
          validData.fullName,
          validData.jobSlug,
          req.file.mimetype
        );
        resumeLink = driveResult.webViewLink;
      } catch (driveErr: any) {
        console.error('[GoogleDrive] Resume upload error:', driveErr?.message || driveErr);
        res.status(500).json({
          success: false,
          error: 'Unable to securely process resume upload at this moment. Please try again shortly.',
        });
        return;
      }

      // 11. Prepare application record
      const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
      const applicationRecord: StoredApplication = {
        timestamp,
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

      // 12. Append row to Applications sheet
      const sheetAppendRes = await appendApplicationRow(applicationRecord);

      if (!sheetAppendRes.success) {
        // Enqueue to retry queue if sheet append failed
        console.warn(`[Pipeline] Sheet append failed for ${maskEmail(validData.email)}. Enqueueing retry.`);
        await enqueueFailedApplication(applicationRecord);
      }

      // 13. Record duplicate prevention key
      await recordApplicationKey(validData.jobSlug, validData.email);

      // 14. Non-blocking WhatsApp Notification
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

      // 15. Respond to candidate with success
      console.info(
        `[Pipeline] Successfully accepted application for [${job.slug}] from ${maskEmail(validData.email)} (Phone: ${maskPhone(validData.phone)})`
      );

      res.json({
        success: true,
        message: 'Application submitted successfully! Our talent team will review your profile.',
      });
    } catch (err: any) {
      console.error('[Pipeline] Unhandled error during application submission:', err?.message || err);
      res.status(500).json({
        success: false,
        error: 'An unexpected error occurred while processing your application. Please try again.',
      });
    }
  }
);

export default router;
