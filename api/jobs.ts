import type { Request, Response } from 'express';
import { fetchJobsFromAppsScript } from './jobs-service';

export default async function handler(req: Request, res: Response) {
  // CORS & Security headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
    const jobs = await fetchJobsFromAppsScript();
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
