export interface JobItem {
  slug: string;
  title: string;
  department: string;
  location: string;
  jobType: 'Full-time' | 'Part-time' | 'Internship' | 'Contract';
  workMode: 'On-site' | 'Remote' | 'Hybrid';
  experience: string;
  salaryRange?: string;
  openings: number;
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  benefits: string[];
  postedDate: string;
  lastDateToApply?: string;
  status: 'Active' | 'Inactive';
}

let cachedJobs: { data: JobItem[]; timestamp: number } | null = null;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export async function fetchJobsFromAppsScript(): Promise<JobItem[]> {
  const now = Date.now();
  if (cachedJobs && now - cachedJobs.timestamp < CACHE_TTL_MS) {
    return cachedJobs.data;
  }

  const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
  if (!appsScriptUrl || !appsScriptUrl.startsWith('http')) {
    console.info('[JobsService] GOOGLE_APPS_SCRIPT_URL is not set or invalid.');
    cachedJobs = { data: [], timestamp: now };
    return [];
  }

  const secret = process.env.GOOGLE_APPS_SCRIPT_SECRET;
  const bodyPayload: Record<string, unknown> = { action: 'getJobs' };
  if (secret) bodyPayload.secret = secret;

  try {
    const res = await fetch(appsScriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyPayload),
      redirect: 'follow',
    });

    if (!res.ok) {
      console.error(`[JobsService] Apps Script returned HTTP ${res.status}`);
      return cachedJobs?.data ?? [];
    }

    const result = (await res.json()) as any;
    if (!result || !result.success || !Array.isArray(result.data)) {
      console.warn('[JobsService] Unexpected payload from Apps Script:', result);
      return cachedJobs?.data ?? [];
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const jobs: JobItem[] = [];

    for (const row of result.data) {
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
      if (!slug) continue;

      const statusRaw = getVal('Status') ? getVal('Status').toLowerCase() : 'active';
      const lastDate = getVal('LastDateToApply', 'Deadline', 'Last Date');

      if (statusRaw !== 'active' && statusRaw !== 'open') continue;
      if (lastDate && lastDate < todayStr) continue;

      const parseList = (val: string) => {
        if (!val) return [];
        const lower = val.toLowerCase().trim();
        if (['no', 'none', 'n/a', 'na', 'false', 'off', 'disable', 'disabled', '-', '0'].includes(lower)) return [];
        return val.split(/[\n,;•]+/).map((s) => s.trim()).filter((s) => Boolean(s) && !['no', 'none', 'n/a', 'na', '-'].includes(s.toLowerCase()));
      };

      const showPerks = getVal('ShowBenefits', 'ShowPerks', 'PerksEnabled').toLowerCase();
      const perksDisabled = ['no', 'false', 'off', '0', 'disable', 'disabled'].includes(showPerks);

      jobs.push({
        slug,
        title,
        department: getVal('Department', 'Dept', 'Category') || 'General',
        location: getVal('Location', 'City', 'Place') || 'Gurugram, India',
        jobType: (getVal('JobType', 'Job Type', 'Type') as any) || 'Full-time',
        workMode: (getVal('WorkMode', 'Work Mode', 'Mode') as any) || 'On-site',
        experience: getVal('Experience', 'Exp') || '2+ Years',
        salaryRange: getVal('SalaryRange', 'Salary', 'CTC') || undefined,
        openings: Math.max(1, parseInt(getVal('Openings', 'Vacancies') || '1', 10) || 1),
        description: getVal('Description', 'Job Description', 'About') || '',
        responsibilities: parseList(getVal('Responsibilities', 'Roles & Responsibilities')),
        requirements: parseList(getVal('Requirements', 'Eligibility')),
        skills: parseList(getVal('Skills', 'Key Skills')),
        benefits: perksDisabled ? [] : parseList(getVal('Benefits', 'Perks')),
        postedDate: getVal('PostedDate', 'Date') || todayStr,
        lastDateToApply: lastDate || undefined,
        status: 'Active',
      });
    }

    cachedJobs = { data: jobs, timestamp: now };
    return jobs;
  } catch (err) {
    console.error('[JobsService] Fetch error:', err);
    return cachedJobs?.data ?? [];
  }
}

export async function fetchJobBySlug(slug: string): Promise<JobItem | null> {
  const jobs = await fetchJobsFromAppsScript();
  const cleanSlug = String(slug || '').trim().toLowerCase();
  return jobs.find((j) => j.slug === cleanSlug) || null;
}
