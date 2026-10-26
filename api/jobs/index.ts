import type { Request, Response } from 'express';
import { getActiveJobs } from '../../server/google';

export default async function handler(_req: Request, res: Response) {
  try {
    const jobs = await getActiveJobs();
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (err: any) {
    console.error('[API] /api/jobs error:', err?.message || err);
    return res.status(500).json({
      success: false,
      error: 'Unable to retrieve jobs catalog at this time',
    });
  }
}
