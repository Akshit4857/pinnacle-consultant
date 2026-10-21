import { z } from 'zod';
import sanitizeHtml from 'sanitize-html';
import crypto from 'crypto';
import { config } from './config';
import { Redis } from '@upstash/redis';

// Upstash Redis client (if configured)
let redisClient: Redis | null = null;
if (config.upstash.url && config.upstash.token) {
  try {
    redisClient = new Redis({
      url: config.upstash.url,
      token: config.upstash.token,
    });
  } catch (err) {
    console.warn('[Security] Could not initialize Upstash Redis. Falling back to in-memory store.');
  }
}

// In-memory fallback caches for rate limiting and duplicate prevention
const inMemoryRateLimits = new Map<string, { count: number; resetAt: number }>();
const inMemoryDuplicates = new Set<string>();

/**
 * Zod Schema for candidate application
 */
export const applicationSchema = z.object({
  jobSlug: z
    .string()
    .min(1, 'Job slug is required')
    .max(100)
    .regex(/^[a-z0-9-]+$/, 'Invalid job identifier format'),
  fullName: z
    .string()
    .trim()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name cannot exceed 100 characters'),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('Invalid email address')
    .max(120, 'Email cannot exceed 120 characters'),
  phone: z
    .string()
    .trim()
    .min(8, 'Phone number must be at least 8 digits')
    .max(20, 'Phone number cannot exceed 20 digits')
    .regex(/^[+0-9\s\-()]{8,20}$/, 'Invalid phone number format'),
  city: z
    .string()
    .trim()
    .max(100, 'City cannot exceed 100 characters')
    .optional()
    .or(z.literal('')),
  experienceYears: z
    .string()
    .trim()
    .max(30, 'Experience field is too long')
    .optional()
    .or(z.literal('')),
  portfolioUrl: z
    .string()
    .trim()
    .max(250, 'URL cannot exceed 250 characters')
    .optional()
    .or(z.literal(''))
    .refine((val) => {
      if (!val) return true;
      try {
        const parsed = new URL(val);
        return parsed.protocol === 'http:' || parsed.protocol === 'https:';
      } catch {
        return false;
      }
    }, 'URL must be a valid http or https web link'),
  coverNote: z
    .string()
    .trim()
    .max(2000, 'Cover note cannot exceed 2000 characters')
    .optional()
    .or(z.literal('')),
  agreedToPrivacy: z
    .boolean()
    .refine((val) => val === true, 'You must agree to the Privacy Policy to proceed'),
  honeypot: z.string().optional(),
  formLoadTimestamp: z.number().optional(),
  turnstileToken: z.string().optional(),
});

/**
 * Validate file upload:
 * 1. Extension check (.pdf, .doc, .docx)
 * 2. MIME type check
 * 3. Magic bytes inspection
 */
export function validateUploadedFile(
  fileBuffer: Buffer,
  originalFilename: string,
  mimeType: string
): { valid: boolean; error?: string; extension?: string; sanitizedName?: string } {
  // 1. Size check
  if (fileBuffer.length > config.limits.maxResumeSizeBytes) {
    return { valid: false, error: 'File size exceeds maximum allowed limit (5 MB)' };
  }
  if (fileBuffer.length === 0) {
    return { valid: false, error: 'Uploaded file is empty' };
  }

  // 2. Extension check
  const extMatch = originalFilename.match(/\.([a-zA-Z0-9]+)$/);
  if (!extMatch) {
    return { valid: false, error: 'File must have a valid extension (.pdf, .doc, .docx)' };
  }
  const ext = extMatch[1].toLowerCase();
  const allowedExtensions = ['pdf', 'doc', 'docx'];
  if (!allowedExtensions.includes(ext)) {
    return { valid: false, error: 'Only PDF, DOC, and DOCX files are permitted' };
  }

  // 3. MIME type check
  const allowedMimes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/octet-stream', // Some browsers send octet-stream, magic bytes will strictly verify
  ];
  if (!allowedMimes.includes(mimeType.toLowerCase())) {
    return { valid: false, error: 'Unsupported file content type' };
  }

  // 4. Strict Magic Bytes Inspection
  const isPdf =
    fileBuffer.length >= 4 &&
    fileBuffer[0] === 0x25 && // %
    fileBuffer[1] === 0x50 && // P
    fileBuffer[2] === 0x44 && // D
    fileBuffer[3] === 0x46; // F

  const isDocx =
    fileBuffer.length >= 4 &&
    fileBuffer[0] === 0x50 && // P
    fileBuffer[1] === 0x4b && // K
    fileBuffer[2] === 0x03 &&
    fileBuffer[3] === 0x04;

  const isDoc =
    fileBuffer.length >= 8 &&
    fileBuffer[0] === 0xd0 &&
    fileBuffer[1] === 0xcf &&
    fileBuffer[2] === 0x11 &&
    fileBuffer[3] === 0xe0 &&
    fileBuffer[4] === 0xa1 &&
    fileBuffer[5] === 0xb1 &&
    fileBuffer[6] === 0x1a &&
    fileBuffer[7] === 0xe1;

  if (ext === 'pdf' && !isPdf) {
    return { valid: false, error: 'Invalid PDF content: file header does not match PDF format' };
  }
  if (ext === 'docx' && !isDocx) {
    return { valid: false, error: 'Invalid DOCX content: file header does not match Office Open XML' };
  }
  if (ext === 'doc' && !isDoc) {
    return { valid: false, error: 'Invalid DOC content: file header does not match Microsoft Word format' };
  }

  // Generate safe non-colliding random storage filename
  const randomUuid = crypto.randomUUID();
  const sanitizedSafeName = `resume-${randomUuid}.${ext}`;

  return {
    valid: true,
    extension: ext,
    sanitizedName: sanitizedSafeName,
  };
}

/**
 * Hook for malware scanning.
 * Pre-wired with an asynchronous interface so ClamAV or a cloud scanner (VirusTotal/AWS)
 * can be plugged in seamlessly.
 */
export async function scanFileForMalware(
  _buffer: Buffer,
  _filename: string
): Promise<{ safe: boolean; reason?: string }> {
  // If a cloud malware scanner is configured via env var, call it here.
  // By default, magic bytes and strict parsing guard against executable payloads.
  return { safe: true };
}

/**
 * Formula Injection Prevention:
 * If text begins with =, +, -, @, \t, or \r, prefix with a single quote (')
 * so spreadsheet software never executes it as a formula.
 */
export function sanitizeForGoogleSheets(value: any): string {
  if (value === null || value === undefined) return '';
  let str = String(value).trim();
  // Strip control characters
  str = str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '');

  if (/^[=+\-@\t\r]/.test(str)) {
    return `'${str}`;
  }
  return str;
}

/**
 * Whitelist sanitizer for rich text fields from Google Sheets
 */
export function sanitizeRichText(html: string): string {
  if (!html) return '';
  return sanitizeHtml(html, {
    allowedTags: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li', 'span'],
    allowedAttributes: {},
    allowedSchemes: [],
  });
}

/**
 * Mask email for safe logging (e.g., a***t@gmail.com)
 */
export function maskEmail(email: string): string {
  if (!email || !email.includes('@')) return '***';
  const [local, domain] = email.split('@');
  if (local.length <= 2) {
    return `${local[0]}***@${domain}`;
  }
  return `${local[0]}***${local[local.length - 1]}@${domain}`;
}

/**
 * Mask phone number for safe logging (e.g., +91-******1129)
 */
export function maskPhone(phone: string): string {
  if (!phone) return '***';
  const clean = phone.trim();
  if (clean.length <= 4) return '****';
  const lastFour = clean.slice(-4);
  return `***-***${lastFour}`;
}

/**
 * Rate limit verification (IP based)
 */
export async function checkRateLimit(
  clientIp: string
): Promise<{ allowed: boolean; remaining: number }> {
  const limit = config.limits.rateLimitPerHour;
  const windowSec = 3600; // 1 hour

  if (redisClient) {
    const key = `ratelimit:${clientIp}`;
    try {
      const current = await redisClient.incr(key);
      if (current === 1) {
        await redisClient.expire(key, windowSec);
      }
      if (current > limit) {
        return { allowed: false, remaining: 0 };
      }
      return { allowed: true, remaining: limit - current };
    } catch (err) {
      console.warn('[RateLimit] Upstash error, fallback to memory', err);
    }
  }

  // In-memory fallback
  const now = Date.now();
  const entry = inMemoryRateLimits.get(clientIp);

  if (!entry || now > entry.resetAt) {
    inMemoryRateLimits.set(clientIp, { count: 1, resetAt: now + windowSec * 1000 });
    return { allowed: true, remaining: limit - 1 };
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  entry.count += 1;
  return { allowed: true, remaining: limit - entry.count };
}

/**
 * Duplicate application check:
 * Prevents same email from applying to the same job within 30 days
 */
export async function checkDuplicateApplication(
  jobSlug: string,
  email: string
): Promise<{ isDuplicate: boolean }> {
  const normEmail = email.toLowerCase().trim();
  const dedupeKey = `applied:${jobSlug}:${normEmail}`;

  if (redisClient) {
    try {
      const exists = await redisClient.get(dedupeKey);
      if (exists) {
        return { isDuplicate: true };
      }
      return { isDuplicate: false };
    } catch (err) {
      console.warn('[Dedupe] Upstash error, fallback to memory', err);
    }
  }

  return { isDuplicate: inMemoryDuplicates.has(dedupeKey) };
}

/**
 * Record successful application in duplicate store (30 day TTL)
 */
export async function recordApplicationKey(jobSlug: string, email: string): Promise<void> {
  const normEmail = email.toLowerCase().trim();
  const dedupeKey = `applied:${jobSlug}:${normEmail}`;
  const ttlSec = 30 * 24 * 3600; // 30 days

  if (redisClient) {
    try {
      await redisClient.set(dedupeKey, '1', { ex: ttlSec });
    } catch (err) {
      console.warn('[Dedupe] Upstash set error', err);
    }
  }
  inMemoryDuplicates.add(dedupeKey);
}

/**
 * Verify Cloudflare Turnstile token
 */
export async function verifyTurnstileToken(
  token: string | undefined,
  remoteIp: string
): Promise<{ success: boolean; error?: string }> {
  // If turnstile secret is not set (e.g. in local dev), pass gracefully with notice
  if (!config.turnstile.secretKey) {
    return { success: true };
  }

  if (!token) {
    return { success: false, error: 'Spam verification token is missing' };
  }

  try {
    const formData = new URLSearchParams();
    formData.append('secret', config.turnstile.secretKey);
    formData.append('response', token);
    formData.append('remoteip', remoteIp);

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
    });

    const data = (await res.json()) as { success: boolean; 'error-codes'?: string[] };
    if (data.success) {
      return { success: true };
    }
    return { success: false, error: 'Anti-bot verification failed' };
  } catch (err) {
    console.error('[Turnstile] Verification error', err);
    return { success: false, error: 'Verification service temporarily unavailable' };
  }
}
