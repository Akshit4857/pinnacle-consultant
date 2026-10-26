export const config = { api: { responseContentType: 'application/json' } };

// Inline per-IP rate limiter (per instance) — avoids a shared _lib import that
// crashes Vercel's function bundler.
const RATE_WINDOW_MS = 60 * 60 * 1000;
const rateBuckets = new Map<string, { count: number; start: number }>();
function allowRequest(key: string): boolean {
  const now = Date.now();
  const b = rateBuckets.get(key);
  if (!b || now - b.start > RATE_WINDOW_MS) {
    rateBuckets.set(key, { count: 1, start: now });
    return true;
  }
  if (b.count >= 60) return false;
  b.count += 1;
  return true;
}
function clientIpOf(req: any): string {
  return (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.ip || req.socket?.remoteAddress || '127.0.0.1';
}

function stripTags(value: string): string {
  return value.replace(/<[^>]*>/g, '').trim();
}

function parseList(val: string): string[] {
  if (!val) return [];
  const lower = val.toLowerCase().trim();
  if (['no', 'none', 'n/a', 'na', 'false', 'off', 'disable', 'disabled', '-', '0'].includes(lower)) return [];
  return val
    .split(/[\n,;•]+/)
    .map((s) => stripTags(s))
    .filter((s) => Boolean(s) && !['no', 'none', 'n/a', 'na', '-'].includes(s.toLowerCase()));
}

const normalizeDate = (val: string) => {
  if (!val) return undefined;
  const d = new Date(val);
  if (isNaN(d.getTime())) return val;
  return d.toISOString().split('T')[0];
};

export default async function handler(req: any, res: any) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=240');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (!allowRequest(clientIpOf(req))) {
    return res.status(429).json({ success: false, error: 'Too many requests. Please slow down.' });
  }

  let targetSlug = String(req.query.slug || '').trim().toLowerCase();
  if (!targetSlug && req.url) {
    const parts = req.url.split('?')[0].split('/').filter(Boolean);
    targetSlug = parts[parts.length - 1]?.toLowerCase() || '';
  }

  if (!targetSlug || targetSlug === 'job-detail' || !/^[a-z0-9-]+$/.test(targetSlug)) {
    return res.status(400).json({ success: false, error: 'Invalid job identifier' });
  }

  const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
  if (!appsScriptUrl || !appsScriptUrl.startsWith('http')) {
    return res.status(404).json({
      success: false,
      error: 'Position not found (Apps Script not configured)',
    });
  }

  const secret = process.env.GOOGLE_APPS_SCRIPT_SECRET;
  const bodyPayload: Record<string, unknown> = { action: 'getJobs' };
  if (secret) bodyPayload.secret = secret;

  try {
    const response = await fetch(appsScriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyPayload),
      redirect: 'follow',
    });

    if (!response.ok) {
      return res.status(502).json({ success: false, error: 'Apps Script connection error' });
    }

    const payload = (await response.json()) as any;
    if (!payload || !payload.success || !Array.isArray(payload.data)) {
      return res.status(404).json({ success: false, error: 'Position not found' });
    }

    const todayStr = new Date().toISOString().split('T')[0];

    for (const row of payload.data) {
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
        slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      }

      if (slug !== targetSlug) continue;

      const statusRaw = getVal('Status') ? getVal('Status').toLowerCase() : 'active';
      const lastDate = normalizeDate(getVal('LastDateToApply', 'Deadline', 'Last Date'));

      if (statusRaw !== 'active' && statusRaw !== 'open') continue;
      if (lastDate && lastDate < todayStr) continue;

      const showPerks = getVal('ShowBenefits', 'ShowPerks', 'PerksEnabled').toLowerCase();
      const perksDisabled = ['no', 'false', 'off', '0', 'disable', 'disabled'].includes(showPerks);

      return res.status(200).json({
        success: true,
        data: {
          slug,
          title: stripTags(title),
          department: stripTags(getVal('Department', 'Dept', 'Category') || 'General'),
          location: stripTags(getVal('Location', 'City', 'Place') || 'Gurugram, India'),
          jobType: getVal('JobType', 'Job Type', 'Type') || 'Full-time',
          workMode: getVal('WorkMode', 'Work Mode', 'Mode') || 'On-site',
          experience: stripTags(getVal('Experience', 'Exp') || '2+ Years'),
          salaryRange: getVal('SalaryRange', 'Salary', 'CTC') ? stripTags(getVal('SalaryRange', 'Salary', 'CTC')) : undefined,
          openings: Math.max(1, parseInt(getVal('Openings', 'Vacancies') || '1', 10) || 1),
          description: stripTags(getVal('Description', 'Job Description', 'About') || ''),
          responsibilities: parseList(getVal('Responsibilities', 'Roles & Responsibilities')),
          requirements: parseList(getVal('Requirements', 'Eligibility')),
          skills: parseList(getVal('Skills', 'Key Skills')),
          benefits: perksDisabled ? [] : parseList(getVal('Benefits', 'Perks')),
          postedDate: normalizeDate(getVal('PostedDate', 'Date')) || todayStr,
          lastDateToApply: lastDate || undefined,
          status: 'Active',
        },
      });
    }

    return res.status(404).json({
      success: false,
      error: 'This position is no longer accepting applications or does not exist.',
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err?.message || 'Server error' });
  }
}
