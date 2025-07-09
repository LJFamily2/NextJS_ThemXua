import { NextResponse } from 'next/server';
import { seoConfig } from '../../lib/seo';

export async function GET() {
  const { baseUrl, supportedLanguages } = seoConfig;

  // Generate sitemap XML with enhanced structure
  const staticPages = [
    { path: '', priority: 1.0, changefreq: 'daily' },
    { path: '/menu', priority: 0.9, changefreq: 'weekly' },
    { path: '/booking', priority: 0.8, changefreq: 'monthly' },
    { path: '/vip', priority: 0.7, changefreq: 'monthly' },
    { path: '/party', priority: 0.7, changefreq: 'monthly' },
    { path: '/news', priority: 0.6, changefreq: 'weekly' },
    { path: '/events', priority: 0.6, changefreq: 'weekly' },
  ];

  const menuCategories = [
    'hai-san',
    'mon-gia-dinh',
    'dat-tiec',
    'do-uong',
    'mon-chay',
  ];

  let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

  // Add static pages with language alternates
  for (const page of staticPages) {
    for (const lang of supportedLanguages) {
      const url =
        page.path === ''
          ? lang === 'vi'
            ? baseUrl
            : `${baseUrl}/${lang}`
          : lang === 'vi'
            ? `${baseUrl}${page.path}`
            : `${baseUrl}/${lang}${page.path}`;

      sitemapXml += `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>`;

      // Add hreflang alternates
      for (const altLang of supportedLanguages) {
        const altUrl =
          page.path === ''
            ? altLang === 'vi'
              ? baseUrl
              : `${baseUrl}/${altLang}`
            : altLang === 'vi'
              ? `${baseUrl}${page.path}`
              : `${baseUrl}/${altLang}${page.path}`;

        sitemapXml += `
    <xhtml:link rel="alternate" hreflang="${altLang}" href="${altUrl}" />`;
      }

      // Add images for certain pages
      if (page.path === '' || page.path === '/menu') {
        sitemapXml += `
    <image:image>
      <image:loc>${baseUrl}/images/logo.png</image:loc>
      <image:title>${seoConfig.business.name}</image:title>
      <image:caption>Logo của ${seoConfig.business.name}</image:caption>
    </image:image>
    <image:image>
      <image:loc>${baseUrl}/images/FoodShowcase.jpg</image:loc>
      <image:title>Hải sản tươi ngon tại ${seoConfig.business.name}</image:title>
      <image:caption>Món hải sản đặc trưng của quán</image:caption>
    </image:image>`;
      }

      sitemapXml += `
  </url>
`;
    }
  }

  // Add menu categories
  for (const category of menuCategories) {
    for (const lang of supportedLanguages) {
      const url =
        lang === 'vi'
          ? `${baseUrl}/menu/${category}`
          : `${baseUrl}/${lang}/menu/${category}`;

      sitemapXml += `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
    }
  }

  sitemapXml += `</urlset>`;

  return new NextResponse(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
