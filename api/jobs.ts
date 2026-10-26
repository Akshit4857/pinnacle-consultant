import { getActiveJobs } from '../server/google';

export default async function handler(req: any, res: any) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  // Public, non-personalized job catalog: safe for shared edge caching.
  // server/google.ts additionally caches upstream Apps Script responses for 5 minutes.
  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=240');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed. Use GET.' });
  }

  try {
    const jobs = await getActiveJobs();
    return res.status(200).json({ success: true, data: jobs });
  } catch (err: any) {
    console.error('[API] /api/jobs unhandled error:', err?.message || err);
    return res.status(500).json({
      success: false,
      error: 'Unable to retrieve jobs catalog at this time',
    });
  }
}
