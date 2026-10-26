import { getActiveJobBySlug } from '../server/google';

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

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed. Use GET.' });
  }

  // Accept ?slug=... or fall back to the last path segment
  let targetSlug = String(req.query?.slug || '').trim().toLowerCase();
  if (!targetSlug && req.url) {
    const parts = req.url.split('?')[0].split('/').filter(Boolean);
    targetSlug = parts[parts.length - 1]?.toLowerCase() || '';
  }

  if (!targetSlug || targetSlug === 'job-detail' || !/^[a-z0-9-]+$/.test(targetSlug)) {
    return res.status(400).json({ success: false, error: 'Invalid job identifier' });
  }

  try {
    const job = await getActiveJobBySlug(targetSlug);
    if (!job) {
      return res.status(404).json({
        success: false,
        error: 'This position is no longer accepting applications or does not exist.',
      });
    }
    return res.status(200).json({ success: true, data: job });
  } catch (err: any) {
    console.error(`[API] /api/jobs/${targetSlug} unhandled error:`, err?.message || err);
    return res.status(500).json({ success: false, error: 'Unable to retrieve job details at this time' });
  }
}
