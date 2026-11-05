import { defineConfig } from 'astro/config';

const origin = process.env.PUBLIC_SITE_ORIGIN?.trim() || 'https://activosenventa.com';
const parsedOrigin = new URL(origin);
if (!['http:', 'https:'].includes(parsedOrigin.protocol) || parsedOrigin.username || parsedOrigin.password || parsedOrigin.pathname !== '/' || parsedOrigin.search || parsedOrigin.hash) {
  throw new Error('PUBLIC_SITE_ORIGIN debe ser el origen público, sin credenciales, rutas, consulta o fragmento.');
}

export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
  site: parsedOrigin.origin,
  build: { format: 'directory' },
  server: { host: '0.0.0.0', port: 4173 },
  vite: {
    server: { allowedHosts: true },
    define: { 'import.meta.env.PUBLIC_SITE_ORIGIN': JSON.stringify(parsedOrigin.origin) },
  },
});
