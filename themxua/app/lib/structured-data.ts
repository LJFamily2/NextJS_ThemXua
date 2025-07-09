import { seoConfig } from './seo';

// Generate comprehensive FAQ structured data for restaurant
export const generateFAQStructuredData = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${seoConfig.baseUrl}#faq`,
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Quán Thềm Xưa có những món hải sản nào?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Quán Thềm Xưa chuyên phục vụ các món hải sản tươi ngon như: tôm hùm nướng, cua rang me, cá thu nướng, lẩu hải sản, nướng BBQ và nhiều món hải sản khác. Tất cả đều được chế biến theo phong cách truyền thống Việt Nam.',
        },
      },
      {
        '@type': 'Question',
        name: 'Giá cả tại Quán Thềm Xưa như thế nào?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Quán Thềm Xưa cam kết mang đến hải sản tươi ngon với giá cả hợp lý, phù hợp với mọi gia đình. Chúng tôi có các combo gia đình, set menu tiệc với giá ưu đãi đặc biệt.',
        },
      },
      {
        '@type': 'Question',
        name: 'Quán có phù hợp với gia đình có trẻ em không?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Có, Quán Thềm Xưa rất phù hợp với gia đình có trẻ em. Chúng tôi có không gian ấm cúng, an toàn và menu đa dạng phù hợp với mọi lứa tuổi.',
        },
      },
      {
        '@type': 'Question',
        name: 'Có thể đặt tiệc tại Quán Thềm Xưa không?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Có, quán nhận đặt tiệc sinh nhật, tiệc cưới, tiệc công ty và các sự kiện đặc biệt. Chúng tôi có phòng VIP và sảnh tiệc rộng rãi, phục vụ tận tình.',
        },
      },
      {
        '@type': 'Question',
        name: 'Giờ mở cửa của quán là khi nào?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Quán Thềm Xưa mở cửa từ 9:00 sáng đến 22:00 tối hàng ngày, kể cả cuối tuần và ngày lễ.',
        },
      },
    ],
  };
};

// Generate Event structured data for special occasions
export const generateEventStructuredData = (event: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location?: string;
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate,
    location: {
      '@type': 'Place',
      name: seoConfig.business.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: seoConfig.business.address.street,
        addressLocality: seoConfig.business.address.city,
        addressRegion: seoConfig.business.address.state,
        addressCountry: seoConfig.business.address.country,
      },
    },
    organizer: {
      '@type': 'Organization',
      name: seoConfig.business.name,
      url: seoConfig.baseUrl,
    },
  };
};

// Generate Review/Rating structured data
export const generateAggregateRatingStructuredData = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    '@id': `${seoConfig.baseUrl}#rating`,
    itemReviewed: {
      '@type': 'Restaurant',
      '@id': `${seoConfig.baseUrl}#restaurant`,
    },
    ratingValue: '4.8',
    bestRating: '5',
    worstRating: '1',
    ratingCount: '150',
  };
};

// Generate Food Establishment structured data
export const generateFoodEstablishmentStructuredData = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FoodEstablishment',
    '@id': `${seoConfig.baseUrl}#foodestablishment`,
    name: seoConfig.business.name,
    description: seoConfig.business.description,
    url: seoConfig.baseUrl,
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
    menu: `${seoConfig.baseUrl}/menu`,
    acceptsReservations: true,
    hasMenu: `${seoConfig.baseUrl}/menu`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '150',
    },
  };
};

// Generate specific Menu Item structured data
export const generateMenuItemStructuredData = (menuItem: {
  name: string;
  description: string;
  price?: string;
  image?: string;
  category: string;
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'MenuItem',
    name: menuItem.name,
    description: menuItem.description,
    offers: menuItem.price
      ? {
          '@type': 'Offer',
          price: menuItem.price,
          priceCurrency: 'VND',
        }
      : undefined,
    image: menuItem.image,
    menuAddOn: {
      '@type': 'MenuSection',
      name: menuItem.category,
    },
  };
};
