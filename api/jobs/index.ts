import type { Request, Response } from 'express';
import apiRouter, { applySecurityHeaders } from '../../server/routes';

export default async function handler(req: Request, res: Response) {
  applySecurityHeaders(req, res, () => {});
  // Forward to /jobs handler in router
  req.url = '/jobs';
  return apiRouter(req, res, () => {
    res.status(404).json({ error: 'Endpoint not found' });
  });
}
