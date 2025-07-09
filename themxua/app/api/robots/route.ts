import { NextResponse } from 'next/server';
import { seoConfig } from '../../lib/seo';

export function GET() {
  const { baseUrl } = seoConfig;

  const robotsTxt = `# Robots.txt for ${seoConfig.business.name}
# ${baseUrl}

User-agent: *
Allow: /

# Important pages for crawling
Allow: /menu
Allow: /booking
Allow: /vip
Allow: /party
Allow: /news
Allow: /events

# Language versions
Allow: /vi/
Allow: /en/
Allow: /zh/
Allow: /km/

# Menu categories
Allow: /menu/hai-san
Allow: /menu/mon-gia-dinh
Allow: /menu/dat-tiec
Allow: /menu/do-uong
Allow: /menu/mon-chay

# Disallow admin and private pages
Disallow: /admin/
Disallow: /api/
Disallow: /private/
Disallow: /_next/
Disallow: /dashboard/

# Disallow file types that shouldn't be crawled
Disallow: *.json$
Disallow: *.txt$
Disallow: *.log$

# Allow important static files
Allow: /favicon.ico
Allow: /images/
Allow: /logo.png
Allow: /sitemap.xml
Allow: /robots.txt

# Specific bot configurations
User-agent: Googlebot
Allow: /
Disallow: /api/
Disallow: /admin/
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Disallow: /api/
Disallow: /admin/
Crawl-delay: 1

User-agent: Yandex
Allow: /
Disallow: /api/
Disallow: /admin/
Crawl-delay: 2

User-agent: FacebookBot
Allow: /
Disallow: /api/
Disallow: /admin/

User-agent: Applebot
Allow: /
Disallow: /api/
Disallow: /admin/

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml

# Host (preferred domain)
Host: ${baseUrl}

# Additional crawling hints for Vietnamese content
# Ensure proper indexing of Vietnamese diacritics and special characters`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
    },
  });
}
