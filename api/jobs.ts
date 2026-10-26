export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
  if (!appsScriptUrl || !appsScriptUrl.startsWith('http')) {
    console.info('[API] GOOGLE_APPS_SCRIPT_URL not configured in environment.');
    return res.status(200).json({
      success: true,
      data: [],
      notice: 'GOOGLE_APPS_SCRIPT_URL is not configured yet',
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
      console.error(`[API] Apps Script HTTP ${response.status}`);
      return res.status(502).json({
        success: false,
        error: `Apps Script error: HTTP ${response.status}`,
      });
    }

    const payload = (await response.json()) as any;
    if (!payload || !payload.success || !Array.isArray(payload.data)) {
      console.warn('[API] Unexpected Apps Script response payload:', payload);
      return res.status(200).json({ success: true, data: [] });
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const jobs: any[] = [];

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
      if (!slug) continue;

      const statusRaw = getVal('Status') ? getVal('Status').toLowerCase() : 'active';
      const lastDate = getVal('LastDateToApply', 'Deadline', 'Last Date');

      if (statusRaw !== 'active' && statusRaw !== 'open') continue;
      if (lastDate && lastDate < todayStr) continue;

      const parseList = (val: string) => {
        if (!val) return [];
        const lower = val.toLowerCase().trim();
        if (['no', 'none', 'n/a', 'na', 'false', 'off', 'disable', 'disabled', '-', '0'].includes(lower)) return [];
        return val
          .split(/[\n,;•]+/)
          .map((s) => s.trim())
          .filter((s) => Boolean(s) && !['no', 'none', 'n/a', 'na', '-'].includes(s.toLowerCase()));
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

    return res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (err: any) {
    console.error('[API] /api/jobs unhandled error:', err?.message || err);
    return res.status(500).json({
      success: false,
      error: err?.message || 'Server error retrieving jobs catalog',
    });
  }
}
