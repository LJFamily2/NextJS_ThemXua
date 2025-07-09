import { Metadata } from 'next';

export interface SEOConfig {
  siteName: string;
  baseUrl: string;
  defaultLanguage: string;
  supportedLanguages: string[];
  business: {
    name: string;
    type: string;
    description: string;
    phone: string;
    email: string;
    address: {
      street: string;
      city: string;
      state: string;
      country: string;
      postalCode?: string;
    };
    coordinates?: {
      latitude: number;
      longitude: number;
    };
    openingHours: string[];
    priceRange: string;
    cuisine: string[];
    socialMedia: {
      facebook?: string;
      instagram?: string;
      youtube?: string;
    };
  };
}

export const seoConfig: SEOConfig = {
  siteName: 'Quán Thềm Xưa Tây Ninh',
  baseUrl: 'https://themxuatayninh.com',
  defaultLanguage: 'vi',
  supportedLanguages: ['vi', 'en', 'zh', 'km'],
  business: {
    name: 'Quán Thềm Xưa Tây Ninh',
    type: 'Restaurant',
    description:
      'Quán hải sản, quán ăn gia đình, đặt tiệc, giá rẻ, hot nhất Tây Ninh. Không gian ấm cúng, phù hợp gia đình, nhóm bạn, công ty, tiệc, GenZ.',
    phone: '+84971807272',
    email: 'themxuaintn@gmail.com',
    address: {
      street: '23 Hoàng Lê Kha, Phường 3',
      city: 'Tây Ninh',
      state: 'Tây Ninh',
      country: 'VN',
    },
    coordinates: {
      latitude: 11.3103,
      longitude: 106.1035,
    },
    openingHours: ['Mo-Su 09:00-22:00'],
    priceRange: '₫₫',
    cuisine: ['Vietnamese', 'Seafood', 'Asian'],
    socialMedia: {
      facebook: 'https://facebook.com/themxuatayninh',
    },
  },
};

export interface PageSEO {
  title: string;
  description: string;
  keywords: string[];
  canonical?: string;
  alternates?: Record<string, string>;
  openGraph?: {
    title: string;
    description: string;
    images: Array<{
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }>;
    type?: string;
  };
  structuredData?: Record<string, unknown>;
}

export const generateMetadata = (
  pageSEO: PageSEO,
  language: string = 'vi'
): Metadata => {
  const { business, baseUrl, supportedLanguages } = seoConfig;

  return {
    title: pageSEO.title,
    description: pageSEO.description,
    keywords: pageSEO.keywords,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: pageSEO.openGraph?.title || pageSEO.title,
      description: pageSEO.openGraph?.description || pageSEO.description,
      url: pageSEO.canonical || baseUrl,
      siteName: business.name,
      images: pageSEO.openGraph?.images || [
        {
          url: `${baseUrl}/images/logo.png`,
          width: 1200,
          height: 630,
          alt: business.name,
        },
      ],
      locale: language,
      type: (pageSEO.openGraph?.type as 'website' | 'article') || 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageSEO.openGraph?.title || pageSEO.title,
      description: pageSEO.openGraph?.description || pageSEO.description,
      images:
        pageSEO.openGraph?.images?.[0]?.url || `${baseUrl}/images/logo.png`,
    },
    alternates: {
      canonical: pageSEO.canonical || baseUrl,
      languages: supportedLanguages.reduce(
        (acc, lang) => {
          acc[lang] = pageSEO.alternates?.[lang] || `${baseUrl}/${lang}`;
          return acc;
        },
        {} as Record<string, string>
      ),
    },
    verification: {
      google: 'REPLACE_WITH_YOUR_GOOGLE_VERIFICATION_CODE',
    },
  };
};

export const generateLocalBusinessStructuredData = () => {
  const { business, baseUrl } = seoConfig;

  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${baseUrl}#restaurant`,
    name: business.name,
    description: business.description,
    url: baseUrl,
    telephone: business.phone,
    email: business.email,
    priceRange: business.priceRange,
    servesCuisine: business.cuisine,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      addressCountry: business.address.country,
    },
    geo: business.coordinates
      ? {
          '@type': 'GeoCoordinates',
          latitude: business.coordinates.latitude,
          longitude: business.coordinates.longitude,
        }
      : undefined,
    openingHours: business.openingHours,
    image: [
      `${baseUrl}/images/logo.png`,
      `${baseUrl}/images/heroDesktop.jpg`,
      `${baseUrl}/images/FoodShowcase.jpg`,
    ],
    sameAs: Object.values(business.socialMedia).filter(Boolean),
    hasMenu: `${baseUrl}/menu`,
    acceptsReservations: true,
    potentialAction: [
      {
        '@type': 'ReserveAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${baseUrl}/booking`,
          inLanguage: 'vi',
        },
        result: {
          '@type': 'Reservation',
          name: 'Đặt bàn tại Quán Thềm Xưa',
        },
      },
    ],
  };
};

export const generateBreadcrumbStructuredData = (
  items: Array<{ name: string; url: string }>
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};

export const generateMenuStructuredData = () => {
  const { business, baseUrl } = seoConfig;

  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    '@id': `${baseUrl}/menu#menu`,
    name: `Menu - ${business.name}`,
    description:
      'Menu hải sản, món ăn gia đình, đặt tiệc, giá rẻ, hot nhất Tây Ninh. Đa dạng món Việt, phù hợp gia đình, nhóm bạn, công ty.',
    url: `${baseUrl}/menu`,
    inLanguage: 'vi',
    provider: {
      '@type': 'Restaurant',
      '@id': `${baseUrl}#restaurant`,
    },
    hasMenuSection: [
      {
        '@type': 'MenuSection',
        name: 'Hải sản tươi ngon',
        description:
          'Các món hải sản tươi ngon được chế biến theo phong cách truyền thống Việt Nam',
      },
      {
        '@type': 'MenuSection',
        name: 'Món ăn gia đình',
        description: 'Những món ăn phù hợp cho bữa cơm gia đình ấm cúng',
      },
      {
        '@type': 'MenuSection',
        name: 'Đặt tiệc',
        description: 'Menu đặc biệt dành cho các buổi tiệc, sự kiện',
      },
    ],
  };
};

// Enhanced keywords for Vietnamese seafood restaurant
export const vietnameseSeafoodKeywords = [
  // Primary keywords - highly targeted
  'quán thềm xưa tây ninh',
  'hải sản tây ninh',
  'quán ăn gia đình tây ninh',
  'nhà hàng hải sản tây ninh',
  'đặt tiệc tây ninh',
  'quán ăn hot nhất tây ninh',
  'hải sản giá rẻ tây ninh',

  // Long-tail keywords for better conversion
  'quán ăn ngon tây ninh',
  'hải sản tươi sống tây ninh',
  'quán ăn gia đình giá rẻ',
  'đặt bàn nhà hàng tây ninh',
  'tiệc cưới tây ninh',
  'tiệc sinh nhật tây ninh',
  'quán ăn phù hợp gia đình',
  'nhà hàng có phòng vip',
  'sảnh tiệc tây ninh',
  'buffet hải sản tây ninh',

  // Target audience keywords - specific demographics
  'quán ăn gen z tây ninh',
  'quán ăn nhóm bạn',
  'quán ăn công ty',
  'quán ăn du lịch tây ninh',
  'nhà hàng đoàn khách',
  'quán ăn young adult',
  'dining cho gia đình',
  'nhà hàng party tây ninh',
  'quán ăn văn phòng',
  'ăn tối gia đình tây ninh',

  // Food-specific keywords
  'cơm gia đình tây ninh',
  'món việt truyền thống',
  'hải sản giá rẻ',
  'buffet hải sản',
  'lẩu hải sản',
  'nướng hải sản',
  'cua rang me',
  'tôm hùm nướng',
  'cá thu nướng',
  'món nướng bbq',
  'bia hơi tây ninh',
  'đồ uống ngon',

  // Location-based & nearby areas
  'ăn uống tây ninh',
  'dining tay ninh',
  'restaurant tay ninh',
  'food tay ninh',
  'quán ăn gần tây ninh',
  'nhà hàng trung tâm tây ninh',
  'ăn uống phường 3 tây ninh',
  'quán ăn hoàng lê kha',

  // Vietnamese cuisine & culture
  'ẩm thực việt nam',
  'món ăn miền nam',
  'đặc sản tây ninh',
  'văn hóa ẩm thực việt',
  'authentic vietnamese food',
  'traditional vietnamese restaurant',

  // Occasion-based keywords
  'nhà hàng tiệc tùng',
  'đặt tiệc sinh nhật',
  'tổ chức sự kiện',
  'họp mặt gia đình',
  'tiệc công ty',
  'celebration restaurant',
  'event venue tay ninh',

  // Experience & ambiance
  'không gian ấm cúng',
  'quán ăn view đẹp',
  'phục vụ tận tình',
  'cozy restaurant',
  'family friendly dining',
];
