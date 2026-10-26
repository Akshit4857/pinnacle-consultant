export default function handler(req: any, res: any) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', 'public, max-age=60');
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
}
