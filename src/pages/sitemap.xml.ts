import type { APIRoute } from 'astro';
import { products, productPath } from '../data/products';

const escapeXml = (value: string): string => value.replace(/[<>&"']/g, (character) => ({
  '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;',
}[character] || character));

export const GET: APIRoute = () => {
  const origin = import.meta.env.PUBLIC_SITE_ORIGIN?.trim();
  const paths = origin ? ['/', ...products.map(productPath)] : [];
  const entries = paths.map((path) => `<url><loc>${escapeXml(new URL(path, origin).href)}</loc></url>`).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
