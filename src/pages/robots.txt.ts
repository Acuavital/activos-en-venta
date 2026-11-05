import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const origin = import.meta.env.PUBLIC_SITE_ORIGIN?.trim();
  const content = origin
    ? `User-agent: *\nAllow: /\nSitemap: ${new URL('/sitemap.xml', origin).href}\n`
    : 'User-agent: *\nDisallow: /\n';
  return new Response(content, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
