import { seoConfig } from './seo';

// Multi-language SEO configurations
export const multiLanguageSEO = {
  vi: {
    title: `${seoConfig.business.name} | Hải sản, quán ăn gia đình, đặt tiệc Tây Ninh 2025`,
    description:
      'Quán hải sản hot nhất Tây Ninh 2025, phù hợp GenZ, young adult, gia đình, nhóm bạn, tiệc công ty. Menu đa dạng, giá rẻ, không gian ấm cúng. Đặt bàn ngay!',
    keywords: [
      'quán thềm xưa tây ninh',
      'hải sản tây ninh',
      'quán ăn gia đình',
      'đặt tiệc tây ninh',
      'nhà hàng hải sản',
      'quán ăn hot nhất',
      'gia đình genZ young adult',
    ],
  },
  en: {
    title: `${seoConfig.business.name} | Seafood Restaurant, Family Dining, Party Booking Tay Ninh`,
    description:
      'Best seafood restaurant in Tay Ninh 2025. Perfect for families, GenZ, young adults, friends, corporate parties. Diverse menu, affordable prices, cozy atmosphere. Book now!',
    keywords: [
      'tay ninh restaurant',
      'seafood restaurant tay ninh',
      'family restaurant',
      'vietnamese restaurant',
      'best restaurant tay ninh',
      'party booking restaurant',
      'affordable dining',
    ],
  },
  zh: {
    title: `${seoConfig.business.name} | 海鲜餐厅，家庭聚餐，宴会预订 西宁`,
    description:
      '西宁最好的海鲜餐厅2025。适合家庭、年轻人、朋友聚会、公司宴会。菜品丰富，价格实惠，环境温馨。立即预订！',
    keywords: [
      '西宁餐厅',
      '海鲜餐厅',
      '家庭餐厅',
      '越南餐厅',
      '宴会预订',
      '实惠餐厅',
    ],
  },
  km: {
    title: `${seoConfig.business.name} | ភោជនីយដ្ឋានអាហារសមុទ្រ បោះទំនាយ តាយនីញ`,
    description:
      'ភោជនីយដ្ឋានអាហារសមុទ្រល្អបំផុតនៅតាយនីញ ២០២៥។ សំរាប់គ្រួសារ យុវជន មិត្តភក្តិ និងពិធីជប់លៀងក្រុមហ៊ុន។ ម្ហូបចម្រុះ តម្លៃសមរម្យ។',
    keywords: [
      'ភោជនីយដ្ឋាន តាយនីញ',
      'អាហារសមុទ្រ',
      'ភោជនីយដ្ឋានគ្រួសារ',
      'ម្ហូបវៀតណាម',
    ],
  },
};

// Generate hreflang tags for multi-language SEO
export const generateHreflangTags = (currentPath: string) => {
  const languages = seoConfig.supportedLanguages;
  const hreflangTags: Array<{ rel: string; hreflang: string; href: string }> =
    [];

  // Add self-referencing hreflang
  languages.forEach(lang => {
    const href =
      lang === 'vi'
        ? `${seoConfig.baseUrl}${currentPath}`
        : `${seoConfig.baseUrl}/${lang}${currentPath}`;

    hreflangTags.push({
      rel: 'alternate',
      hreflang: lang,
      href,
    });
  });

  // Add x-default for Vietnamese (main language)
  hreflangTags.push({
    rel: 'alternate',
    hreflang: 'x-default',
    href: `${seoConfig.baseUrl}${currentPath}`,
  });

  return hreflangTags;
};

// Generate Open Graph tags by language
export const generateLocalizedOpenGraph = (
  language: string,
  pagePath: string = ''
) => {
  const seoData =
    multiLanguageSEO[language as keyof typeof multiLanguageSEO] ||
    multiLanguageSEO.vi;

  return {
    title: seoData.title,
    description: seoData.description,
    url:
      language === 'vi'
        ? `${seoConfig.baseUrl}${pagePath}`
        : `${seoConfig.baseUrl}/${language}${pagePath}`,
    siteName: seoConfig.business.name,
    locale: language,
    type: 'website',
    images: [
      {
        url: `${seoConfig.baseUrl}/images/logo.png`,
        width: 1200,
        height: 630,
        alt: seoConfig.business.name,
      },
      {
        url: `${seoConfig.baseUrl}/images/heroDesktop.jpg`,
        width: 1200,
        height: 630,
        alt: 'Quán Thềm Xưa - Restaurant Interior',
      },
    ],
  };
};

// Generate localized structured data
export const generateLocalizedStructuredData = (language: string) => {
  const seoData =
    multiLanguageSEO[language as keyof typeof multiLanguageSEO] ||
    multiLanguageSEO.vi;

  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${seoConfig.baseUrl}#restaurant-${language}`,
    name: seoConfig.business.name,
    description: seoData.description,
    url:
      language === 'vi'
        ? seoConfig.baseUrl
        : `${seoConfig.baseUrl}/${language}`,
    inLanguage: language,
    telephone: seoConfig.business.phone,
    email: seoConfig.business.email,
    priceRange: seoConfig.business.priceRange,
    servesCuisine: seoConfig.business.cuisine,
    address: {
      '@type': 'PostalAddress',
      streetAddress: seoConfig.business.address.street,
      addressLocality: seoConfig.business.address.city,
      addressRegion: seoConfig.business.address.state,
      addressCountry: seoConfig.business.address.country,
    },
    geo: seoConfig.business.coordinates
      ? {
          '@type': 'GeoCoordinates',
          latitude: seoConfig.business.coordinates.latitude,
          longitude: seoConfig.business.coordinates.longitude,
        }
      : undefined,
    openingHours: seoConfig.business.openingHours,
    image: [
      `${seoConfig.baseUrl}/images/logo.png`,
      `${seoConfig.baseUrl}/images/heroDesktop.jpg`,
      `${seoConfig.baseUrl}/images/FoodShowcase.jpg`,
    ],
    hasMenu:
      language === 'vi'
        ? `${seoConfig.baseUrl}/menu`
        : `${seoConfig.baseUrl}/${language}/menu`,
    acceptsReservations: true,
  };
};
