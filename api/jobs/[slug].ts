import type { Request, Response } from 'express';
import { fetchJobBySlug } from '../jobs-service';

export default async function handler(req: Request, res: Response) {
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
    const slug = String(req.query.slug || '').trim().toLowerCase();
    if (!slug) {
      return res.status(400).json({ success: false, error: 'Invalid job slug identifier' });
    }

    const job = await fetchJobBySlug(slug);
    if (!job) {
      return res.status(404).json({
        success: false,
        error: 'This position is no longer accepting applications or does not exist.',
      });
    }

    return res.status(200).json({
      success: true,
      data: job,
    });
  } catch (err: any) {
    console.error('[API] /api/jobs/[slug] error:', err?.message || err);
    return res.status(500).json({
      success: false,
      error: 'Unable to retrieve job details at this time',
    });
  }
}
