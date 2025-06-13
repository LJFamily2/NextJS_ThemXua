'use client';

import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  twitterCard?: string;
}

const SEOComponent: React.FC<SEOProps> = ({
  title = 'ThemXua Restaurant - Authentic Vietnamese Cuisine',
  description = 'Experience authentic Vietnamese cuisine at ThemXua Restaurant. Traditional recipes, warm atmosphere, and excellent service in Tay Ninh, Vietnam.',
  keywords = 'Vietnamese restaurant, authentic cuisine, ThemXua, Tay Ninh, Vietnamese food, traditional recipes',
  image = '/images/restaurant-hero.jpg',
  url,
  type = 'website',
  twitterCard = 'summary_large_image',
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="ThemXua Restaurant" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="vi_VN" />
      <meta property="og:site_name" content="ThemXua Restaurant" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />

      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="language" content="Vietnamese" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Restaurant',
            name: 'ThemXua Restaurant',
            description: description,
            image: fullImageUrl,
            url: fullUrl,
            telephone: '+84-XXX-XXX-XXX',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Your Street Address',
              addressLocality: 'Tay Ninh',
              addressCountry: 'Vietnam',
            },
            servesCuisine: 'Vietnamese',
            priceRange: '$$',
            openingHours: 'Mo-Su 10:00-22:00',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              reviewCount: '150',
            },
          }),
        }}
      />

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    </Head>
  );
};

export default SEOComponent;
