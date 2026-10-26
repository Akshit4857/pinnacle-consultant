import type { Request, Response } from 'express';
import { getActiveJobBySlug } from '../../server/google';

export default async function handler(req: Request, res: Response) {
  try {
    const slug = String(req.query.slug || '').trim().toLowerCase();
    if (!slug) {
      return res.status(400).json({ success: false, error: 'Invalid slug' });
    }

    const job = await getActiveJobBySlug(slug);
    if (!job) {
      return res.status(404).json({
        success: false,
        error: 'This position is no longer accepting applications or does not exist.',
      });
    }

    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Access-Control-Allow-Origin', '*');
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
