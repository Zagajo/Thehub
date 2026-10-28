import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import app from './server/app.js';
import { getSupabaseHealth } from './serverSupabase.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  // Mount Vite middleware in development or static in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', async () => {
    console.log(`[The Hub] Monolithic Full-Stack server running on http://0.0.0.0:${PORT}`);
    try {
      const sbHealth = await getSupabaseHealth();
      console.log(`[The Hub Supabase] Status: ${sbHealth.status} | URL: ${sbHealth.url} | Message: ${sbHealth.message}`);
    } catch (e) {
      console.warn('[The Hub Supabase] Startup probe notice:', e.message);
    }
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});

export default app;
