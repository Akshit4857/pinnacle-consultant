import { config } from './config';
import { Job, JobType, StoredApplication } from './types';
import { sanitizeRichText } from './security';

// In-memory cache for jobs list
let cachedJobs: { data: Job[]; timestamp: number } | null = null;

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

async function callAppsScript(payload: Record<string, unknown>): Promise<any> {
  const bodyPayload = {
    ...payload,
    ...(config.google.appsScriptSecret ? { secret: config.google.appsScriptSecret } : {}),
  };

  const res = await fetch(config.google.appsScriptUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bodyPayload),
    redirect: 'follow',
  });

  if (!res.ok) {
    throw new Error(`Apps Script HTTP error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

function parseList(val: unknown): string[] {
  if (!val) return [];
  const str = String(val).trim();
  if (!str) return [];

  // If user disables perks/skills by typing 'no', 'none', 'n/a', 'na', 'false', 'off', 'disable', 'disabled', '-', or '0'
  const lower = str.toLowerCase();
  if (['no', 'none', 'n/a', 'na', 'false', 'off', 'disable', 'disabled', '-', '0'].includes(lower)) {
    return [];
  }

  return str
    .split(/[\n,;•]+/)
    .map((s) => s.trim())
    .filter((s) => Boolean(s) && !['no', 'none', 'n/a', 'na', '-'].includes(s.toLowerCase()));
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Fetch active jobs from the Google Sheet via Apps Script (5-minute cache).
 */
export async function getActiveJobs(): Promise<Job[]> {
  const now = Date.now();
  if (cachedJobs && now - cachedJobs.timestamp < config.limits.jobsCacheTtlSeconds * 1000) {
    return cachedJobs.data;
  }

  if (!config.google.appsScriptUrl) {
    console.info('[AppsScript] GOOGLE_APPS_SCRIPT_URL not set. Returning empty jobs list.');
    cachedJobs = { data: [], timestamp: now };
    return [];
  }

  try {
    const result = await callAppsScript({ action: 'getJobs' });

    if (!result.success || !Array.isArray(result.data)) {
      console.warn('[AppsScript] getJobs returned unexpected payload:', result);
      cachedJobs = { data: [], timestamp: now };
      return [];
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const jobs: Job[] = [];

    for (const row of result.data) {
      // Flexible field lookup (case-insensitive)
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

      let slug = getVal('Slug', 'Job Slug', 'ID').toLowerCase();
      if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
        // Auto-generate clean slug from title if not explicitly provided
        slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      }
      if (!slug) continue;

      const statusRaw = getVal('Status') ? getVal('Status').toLowerCase() : 'active';
      const lastDate = getVal('LastDateToApply', 'Deadline', 'Last Date');

      if (statusRaw !== 'active' && statusRaw !== 'open') continue;
      if (lastDate && lastDate < todayStr) continue;

      jobs.push({
        slug,
        title: sanitizeRichText(title),
        department: sanitizeRichText(getVal('Department', 'Dept', 'Category') || 'General'),
        location: sanitizeRichText(getVal('Location', 'City', 'Place') || 'Gurugram, India'),
        jobType: (getVal('JobType', 'Job Type', 'Type') as JobType) || 'Full-time',
        workMode: (getVal('WorkMode', 'Work Mode', 'Mode') as any) || 'On-site',
        experience: sanitizeRichText(getVal('Experience', 'Exp') || '2+ Years'),
        salaryRange: getVal('SalaryRange', 'Salary', 'CTC') ? sanitizeRichText(getVal('SalaryRange', 'Salary', 'CTC')) : undefined,
        openings: Math.max(1, parseInt(getVal('Openings', 'Vacancies') || '1', 10) || 1),
        description: sanitizeRichText(getVal('Description', 'Job Description', 'About') || ''),
        responsibilities: parseList(getVal('Responsibilities', 'Roles & Responsibilities')),
        requirements: parseList(getVal('Requirements', 'Eligibility')),
        skills: parseList(getVal('Skills', 'Key Skills')),
        benefits: ['no', 'false', 'off', '0', 'disable', 'disabled'].includes(getVal('ShowBenefits', 'ShowPerks', 'PerksEnabled').toLowerCase())
          ? []
          : parseList(getVal('Benefits', 'Perks')),
        postedDate: getVal('PostedDate', 'Date') || todayStr,
        lastDateToApply: lastDate || undefined,
        status: 'Active',
      });
    }

    cachedJobs = { data: jobs, timestamp: now };
    return jobs;
  } catch (err) {
    console.error('[AppsScript] Failed to fetch jobs. Returning cached or empty list.', err);
    return cachedJobs?.data ?? [];
  }
}

/**
 * Get a single active job by slug.
 */
export async function getActiveJobBySlug(slug: string): Promise<Job | null> {
  const jobs = await getActiveJobs();
  return jobs.find((j) => j.slug === slug) || null;
}

/**
 * Append a candidate application row to the Applications sheet.
 */
export async function appendApplicationRow(
  app: StoredApplication
): Promise<{ success: boolean; error?: string }> {
  if (!config.google.appsScriptUrl) {
    console.warn('[AppsScript] URL not set. Logging candidate server-side only.');
    return { success: true };
  }

  try {
    const result = await callAppsScript({
      action: 'appendApplication',
      data: {
        Timestamp: app.timestamp,
        'Job Title': app.jobTitle,
        'Job Slug': app.jobSlug,
        Name: app.name,
        Email: app.email,
        Phone: app.phone,
        City: app.city,
        Experience: app.experience,
        'LinkedIn/Portfolio': app.portfolioUrl,
        Message: app.message,
        'Resume Link': app.resumeLink,
        Status: app.status,
        WhatsAppNotified: app.whatsAppNotified,
      },
    });

    if (!result.success) {
      return { success: false, error: result.error || 'Apps Script append failed' };
    }
    return { success: true };
  } catch (err: any) {
    console.error('[AppsScript] appendApplication error:', err?.message || err);
    return { success: false, error: err?.message || 'Apps Script network error' };
  }
}

/**
 * Upload candidate resume (base64) via Apps Script to the private Drive folder.
 */
export async function uploadResumeToDrive(
  fileBuffer: Buffer,
  sanitizedFilename: string,
  candidateName: string,
  jobSlug: string,
  mimeType: string
): Promise<{ fileId: string; webViewLink: string }> {
  if (!config.google.appsScriptUrl) {
    const dummyId = `local-dev-${Date.now()}`;
    console.info(`[AppsScript] Mock mode: ${sanitizedFilename} (${fileBuffer.length} bytes)`);
    return { fileId: dummyId, webViewLink: `https://drive.google.com/file/d/${dummyId}/view` };
  }

  const result = await callAppsScript({
    action: 'uploadResume',
    filename: sanitizedFilename,
    mimeType: mimeType || 'application/octet-stream',
    base64Content: fileBuffer.toString('base64'),
    candidateName,
    jobSlug,
  });

  if (!result.success || !result.fileId) {
    throw new Error(result.error || 'Apps Script resume upload failed');
  }

  return {
    fileId: result.fileId,
    webViewLink: result.webViewLink || `https://drive.google.com/file/d/${result.fileId}/view`,
  };
}
