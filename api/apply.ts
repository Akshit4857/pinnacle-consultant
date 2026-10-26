import type { Request, Response } from 'express';
import apiRouter, { applySecurityHeaders } from '../server/routes';

export const config = {
  api: {
    bodyParser: false, // Disabling Vercel bodyParser so multer streams multipart body
  },
};

export default async function handler(req: Request, res: Response): Promise<void> {
  applySecurityHeaders(req, res, () => {});
  req.url = '/apply';

  return new Promise<void>((resolve) => {
    res.on('finish', resolve);
    res.on('close', resolve);
    apiRouter(req, res, () => {
      if (!res.headersSent) {
        res.status(404).json({ error: 'Endpoint not found' });
      }
      resolve();
    });
  });
}
