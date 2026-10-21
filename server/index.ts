import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRouter, { applySecurityHeaders } from './routes';
import { validateEnvironment } from './config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Security headers
app.use(applySecurityHeaders);

// Parse JSON body for non-multipart requests
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Mount API router
app.use('/api', apiRouter);

// Serve static frontend assets from dist in production
const distPath = path.resolve(__dirname, '../dist');
app.use(express.static(distPath));

// Fallback to index.html for client-side routing
app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Startup validation
validateEnvironment();

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[Pinnacle Server] Running on http://localhost:${PORT}`);
  });
}

export default app;
