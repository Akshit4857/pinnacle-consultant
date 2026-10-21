import type { Request, Response } from 'express';
import apiRouter, { applySecurityHeaders } from '../../server/routes';

export default async function handler(req: Request, res: Response) {
  applySecurityHeaders(req, res, () => {});
  const slug = req.query.slug as string;
  req.url = `/jobs/${encodeURIComponent(slug || '')}`;
  return apiRouter(req, res, () => {
    res.status(404).json({ error: 'Endpoint not found' });
  });
}
