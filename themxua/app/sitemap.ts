import { MetadataRoute } from 'next';
import { seoConfig } from './lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const { baseUrl, supportedLanguages } = seoConfig;

  // Core pages with enhanced structure
  const corePages = [
    {
      path: '',
      priority: 1.0,
      changeFreq: 'daily' as const,
    },
    {
      path: 'menu',
      priority: 0.9,
      changeFreq: 'weekly' as const,
    },
    {
      path: 'booking',
      priority: 0.8,
      changeFreq: 'monthly' as const,
    },
    {
      path: 'vip',
      priority: 0.7,
      changeFreq: 'monthly' as const,
    },
    {
      path: 'party',
      priority: 0.7,
      changeFreq: 'monthly' as const,
    },
    {
      path: 'news',
      priority: 0.6,
      changeFreq: 'weekly' as const,
    },
    {
      path: 'events',
      priority: 0.6,
      changeFreq: 'weekly' as const,
    },
  ];

  // Menu subcategories for better SEO
  const menuCategories = [
    'hai-san',
    'mon-gia-dinh',
    'dat-tiec',
    'do-uong',
    'mon-chay',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add default language pages (vi)
  corePages.forEach(pageConfig => {
    const url = pageConfig.path ? `${baseUrl}/${pageConfig.path}` : baseUrl;
    sitemapEntries.push({
      url,
      lastModified: new Date(),
      changeFrequency: pageConfig.changeFreq,
      priority: pageConfig.priority,
      alternates: {
        languages: supportedLanguages.reduce(
          (acc, lang) => {
            acc[lang] = pageConfig.path
              ? `${baseUrl}/${lang}/${pageConfig.path}`
              : `${baseUrl}/${lang}`;
            return acc;
          },
          {} as Record<string, string>
        ),
      },
    });
  });

  // Add language-specific pages
  supportedLanguages.forEach(lang => {
    if (lang !== 'vi') {
      // vi is default, already added above
      corePages.forEach(pageConfig => {
        const url = pageConfig.path
          ? `${baseUrl}/${lang}/${pageConfig.path}`
          : `${baseUrl}/${lang}`;
        sitemapEntries.push({
          url,
          lastModified: new Date(),
          changeFrequency: pageConfig.changeFreq,
          priority: pageConfig.priority * 0.9, // Slightly lower priority for non-default language
        });
      });
    }
  });

  // Add menu categories for Vietnamese (main language)
  menuCategories.forEach(category => {
    sitemapEntries.push({
      url: `${baseUrl}/menu/${category}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: supportedLanguages.reduce(
          (acc, lang) => {
            acc[lang] =
              lang === 'vi'
                ? `${baseUrl}/menu/${category}`
                : `${baseUrl}/${lang}/menu/${category}`;
            return acc;
          },
          {} as Record<string, string>
        ),
      },
    });
  });

  return sitemapEntries;
}
