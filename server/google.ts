import { google } from 'googleapis';
import { Readable } from 'stream';
import { config } from './config';
import { Job, JobType, WorkMode, JobStatus, StoredApplication } from './types';
import { sanitizeRichText, sanitizeForGoogleSheets, maskEmail } from './security';

// In-memory cache for Jobs
let cachedJobs: { data: Job[]; timestamp: number } | null = null;

/**
 * Get Google Auth Client for Sheets (Service Account)
 */
function getSheetsAuthClient() {
  if (!config.google.serviceAccountEmail || !config.google.privateKey) {
    return null;
  }
  return new google.auth.JWT({
    email: config.google.serviceAccountEmail,
    key: config.google.privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
}

/**
 * Get Google Auth Client for Drive.
 * Supports:
 * 1. OAuth2 with stored Refresh Token (bypasses personal drive 0-byte quota error)
 * 2. Service Account (for Google Workspace Shared Drives)
 */
function getDriveAuthClient() {
  if (config.google.driveAuthType === 'oauth' && config.google.refreshToken && config.google.clientId) {
    const oAuth2Client = new google.auth.OAuth2(
      config.google.clientId,
      config.google.clientSecret
    );
    oAuth2Client.setCredentials({
      refresh_token: config.google.refreshToken,
    });
    return oAuth2Client;
  }

  // Fallback to Service Account
  if (config.google.serviceAccountEmail && config.google.privateKey) {
    return new google.auth.JWT({
      email: config.google.serviceAccountEmail,
      key: config.google.privateKey,
      scopes: ['https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/drive'],
    });
  }

  return null;
}

/**
 * Fetch active jobs from Google Sheets ("Jobs" tab) with 5-minute cache.
 * Returns empty array if sheet is not configured or no active jobs exist.
 */
export async function getActiveJobs(): Promise<Job[]> {
  const now = Date.now();
  if (cachedJobs && now - cachedJobs.timestamp < config.limits.jobsCacheTtlSeconds * 1000) {
    return cachedJobs.data;
  }

  const auth = getSheetsAuthClient();
  if (!auth || !config.google.sheetId) {
    console.info('[GoogleSheets] Google Sheet credentials not set. Returning empty jobs array.');
    cachedJobs = { data: [], timestamp: now };
    return [];
  }

  try {
    const sheets = google.sheets({ version: 'v4', auth });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: config.google.sheetId,
      range: `${config.google.jobsTabName}!A1:Q100`, // Up to 100 job rows
    });

    const rows = response.data.values;
    if (!rows || rows.length <= 1) {
      console.info('[GoogleSheets] Jobs tab is empty or only has headers.');
      cachedJobs = { data: [], timestamp: now };
      return [];
    }

    // First row is headers
    const headers = rows[0].map((h: any) => String(h || '').trim().toLowerCase());
    const colIndex = {
      slug: headers.indexOf('slug'),
      title: headers.indexOf('title'),
      department: headers.indexOf('department'),
      location: headers.indexOf('location'),
      jobType: headers.indexOf('jobtype'),
      workMode: headers.indexOf('workmode'),
      experience: headers.indexOf('experience'),
      salaryRange: headers.indexOf('salaryrange'),
      openings: headers.indexOf('openings'),
      description: headers.indexOf('description'),
      responsibilities: headers.indexOf('responsibilities'),
      requirements: headers.indexOf('requirements'),
      skills: headers.indexOf('skills'),
      benefits: headers.indexOf('benefits'),
      postedDate: headers.indexOf('posteddate'),
      lastDateToApply: headers.indexOf('lastdatetoapply'),
      status: headers.indexOf('status'),
    };

    const validJobs: Job[] = [];
    const todayStr = new Date().toISOString().split('T')[0];

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (!row || row.length === 0) continue;

      const slug = String(row[colIndex.slug] || '').trim().toLowerCase();
      const title = String(row[colIndex.title] || '').trim();
      const statusRaw = String(row[colIndex.status] || 'Active').trim().toLowerCase();
      const lastDate = String(row[colIndex.lastDateToApply] || '').trim();

      // Slugs must match ^[a-z0-9-]+$
      if (!slug || !/^[a-z0-9-]+$/.test(slug) || !title) {
        continue; // Skip invalid row safely
      }

      // Check status
      const isActive = statusRaw === 'active' || statusRaw === 'open';
      if (!isActive) {
        continue;
      }

      // Check expiry date if provided
      if (lastDate && lastDate < todayStr) {
        continue;
      }

      const parseList = (val: any): string[] => {
        if (!val) return [];
        return String(val)
          .split(/[\n,;•]+/)
          .map((s) => s.trim())
          .filter(Boolean);
      };

      const job: Job = {
        slug,
        title: sanitizeRichText(title),
        department: sanitizeRichText(String(row[colIndex.department] || 'General').trim()),
        location: sanitizeRichText(String(row[colIndex.location] || 'Gurugram, India').trim()),
        jobType: (String(row[colIndex.jobType] || 'Full-time').trim() as JobType) || 'Full-time',
        workMode: (String(row[colIndex.workMode] || 'On-site').trim() as WorkMode) || 'On-site',
        experience: sanitizeRichText(String(row[colIndex.experience] || '2+ Years').trim()),
        salaryRange: row[colIndex.salaryRange] ? sanitizeRichText(String(row[colIndex.salaryRange]).trim()) : undefined,
        openings: Math.max(1, parseInt(String(row[colIndex.openings] || '1'), 10) || 1),
        description: sanitizeRichText(String(row[colIndex.description] || '').trim()),
        responsibilities: parseList(row[colIndex.responsibilities]),
        requirements: parseList(row[colIndex.requirements]),
        skills: parseList(row[colIndex.skills]),
        benefits: parseList(row[colIndex.benefits]),
        postedDate: String(row[colIndex.postedDate] || todayStr).trim(),
        lastDateToApply: lastDate || undefined,
        status: 'Active',
      };

      validJobs.push(job);
    }

    cachedJobs = { data: validJobs, timestamp: now };
    return cachedJobs.data;
  } catch (err) {
    console.error('[GoogleSheets] Failed to fetch jobs sheet. Returning cached or empty list.', err);
    if (cachedJobs) {
      return cachedJobs.data;
    }
    return [];
  }
}

/**
 * Get single active job by slug
 */
export async function getActiveJobBySlug(slug: string): Promise<Job | null> {
  const jobs = await getActiveJobs();
  const match = jobs.find((j) => j.slug === slug);
  return match || null;
}

/**
 * Auto-create Applications header row if sheet is empty
 */
async function ensureApplicationsHeader(sheets: any, spreadsheetId: string, tabName: string) {
  try {
    const check = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${tabName}!A1:M1`,
    });
    if (!check.data.values || check.data.values.length === 0) {
      const headers = [
        'Timestamp',
        'Job Title',
        'Job Slug',
        'Name',
        'Email',
        'Phone',
        'City',
        'Experience',
        'LinkedIn/Portfolio',
        'Message',
        'Resume Link',
        'Status',
        'WhatsAppNotified',
      ];
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${tabName}!A1:M1`,
        valueInputOption: 'RAW',
        requestBody: { values: [headers] },
      });
    }
  } catch (err) {
    // If sheet tab does not exist yet, sheet will return error or create on append
    console.warn('[GoogleSheets] Header check notice', err);
  }
}

/**
 * Append an application row to the "Applications" tab as RAW values
 */
export async function appendApplicationRow(app: StoredApplication): Promise<{ success: boolean; error?: string }> {
  const auth = getSheetsAuthClient();
  if (!auth || !config.google.sheetId) {
    console.warn('[GoogleSheets] Applications sheet not configured. Application logged server-side safely.');
    console.info(`[GoogleSheets] Candidate: ${sanitizeForGoogleSheets(app.name)} | Job: ${app.jobSlug} | Email: ${maskEmail(app.email)}`);
    return { success: true };
  }

  try {
    const sheets = google.sheets({ version: 'v4', auth });
    const tabName = config.google.applicationsTabName;

    await ensureApplicationsHeader(sheets, config.google.sheetId, tabName);

    const rowValues = [
      app.timestamp,
      sanitizeForGoogleSheets(app.jobTitle),
      sanitizeForGoogleSheets(app.jobSlug),
      sanitizeForGoogleSheets(app.name),
      sanitizeForGoogleSheets(app.email),
      sanitizeForGoogleSheets(app.phone),
      sanitizeForGoogleSheets(app.city),
      sanitizeForGoogleSheets(app.experience),
      sanitizeForGoogleSheets(app.portfolioUrl),
      sanitizeForGoogleSheets(app.message),
      sanitizeForGoogleSheets(app.resumeLink),
      app.status,
      app.whatsAppNotified,
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: config.google.sheetId,
      range: `${tabName}!A:M`,
      valueInputOption: 'RAW', // Mandatory: never interpret formulas
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [rowValues],
      },
    });

    return { success: true };
  } catch (err: any) {
    console.error('[GoogleSheets] Error appending application row:', err?.message || err);
    return { success: false, error: err?.message || 'Google Sheets API error' };
  }
}

/**
 * Upload candidate resume to private Google Drive folder
 */
export async function uploadResumeToDrive(
  fileBuffer: Buffer,
  sanitizedFilename: string,
  candidateName: string,
  jobSlug: string,
  mimeType: string
): Promise<{ fileId: string; webViewLink: string }> {
  const auth = getDriveAuthClient();

  if (!auth || !config.google.driveFolderId) {
    // In local development or before Google Drive is connected, return a private placeholder link
    const dummyId = `local-dev-${Date.now()}`;
    const dummyLink = `https://drive.google.com/file/d/${dummyId}/view?usp=drivesdk`;
    console.info(`[GoogleDrive] Running in local/mock mode: Resume saved under ID ${dummyId} (${fileBuffer.length} bytes)`);
    return {
      fileId: dummyId,
      webViewLink: dummyLink,
    };
  }

  const drive = google.drive({ version: 'v3', auth });

  const stream = new Readable();
  stream.push(fileBuffer);
  stream.push(null);

  const fileMetadata: any = {
    name: sanitizedFilename,
    parents: [config.google.driveFolderId],
    description: `Candidate: ${candidateName} | Role: ${jobSlug} | Uploaded: ${new Date().toISOString()}`,
  };

  const media = {
    mimeType: mimeType || 'application/octet-stream',
    body: stream,
  };

  // If using shared drive, supportsAllDrives must be true
  const uploadRes = await drive.files.create({
    requestBody: fileMetadata,
    media: media,
    fields: 'id, name, webViewLink',
    supportsAllDrives: true,
  });

  const fileId = uploadRes.data.id || '';
  // Construct private Google Drive URL - accessible ONLY by the folder owner/permitted Google account
  const webViewLink = uploadRes.data.webViewLink || `https://drive.google.com/file/d/${fileId}/view`;

  return {
    fileId,
    webViewLink,
  };
}
