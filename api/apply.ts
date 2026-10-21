import type { Request, Response } from 'express';
import apiRouter, { applySecurityHeaders } from '../server/routes';

export const config = {
  api: {
    bodyParser: false, // Disabling Vercel bodyParser so multer streams multipart body
  },
};

export default async function handler(req: Request, res: Response) {
  applySecurityHeaders(req, res, () => {});
  req.url = '/apply';
  return apiRouter(req, res, () => {
    res.status(404).json({ error: 'Endpoint not found' });
  });
}
