'use client';

import Head from 'next/head';
import { useLanguage } from '../contexts/LanguageContext';
import { seoConfig } from '../lib/seo';

export default function BookingPage() {
  const { t } = useLanguage();

  // SEO data for booking page
  const bookingSEOData = {
    title: `Đặt bàn ${seoConfig.business.name} | Đặt tiệc hải sản Tây Ninh`,
    description:
      'Đặt bàn online tại Quán Thềm Xưa Tây Ninh. Phục vụ đặt tiệc sinh nhật, tiệc công ty, đoàn tour, gia đình. Gọi ngay để được tư vấn và đặt bàn nhanh chóng.',
    url: `${seoConfig.baseUrl}/booking`,
    keywords: [
      'đặt bàn tây ninh',
      'đặt tiệc hải sản',
      'booking restaurant tay ninh',
      'đặt bàn online',
      'tiệc sinh nhật tây ninh',
      'tiệc công ty',
      'đặt bàn gia đình',
      'reservation tay ninh',
      'book table',
      'đặt sảnh tiệc',
      'đặt phòng vip',
    ],
  };

  return (
    <>
      <Head>
        <title>{bookingSEOData.title}</title>
        <meta name="description" content={bookingSEOData.description} />
        <meta name="keywords" content={bookingSEOData.keywords.join(', ')} />
        <link rel="canonical" href={bookingSEOData.url} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={bookingSEOData.url} />
        <meta property="og:title" content={bookingSEOData.title} />
        <meta property="og:description" content={bookingSEOData.description} />
        <meta
          property="og:image"
          content={`${seoConfig.baseUrl}/images/booking-background.png`}
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={bookingSEOData.title} />
        <meta name="twitter:description" content={bookingSEOData.description} />
        <meta
          name="twitter:image"
          content={`${seoConfig.baseUrl}/images/booking-background.png`}
        />

        {/* Structured Data for Booking */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              '@id': `${bookingSEOData.url}#webpage`,
              url: bookingSEOData.url,
              name: bookingSEOData.title,
              description: bookingSEOData.description,
              isPartOf: {
                '@type': 'WebSite',
                '@id': `${seoConfig.baseUrl}#website`,
              },
              about: {
                '@type': 'Restaurant',
                '@id': `${seoConfig.baseUrl}#restaurant`,
              },
              primaryImageOfPage: {
                '@type': 'ImageObject',
                url: `${seoConfig.baseUrl}/images/booking-background.png`,
              },
            }),
          }}
        />
      </Head>
      <section
        id="booking"
        className="relative min-h-screen flex items-center justify-center px-2 sm:px-4 md:px-8 py-8"
      >
        {/* background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/booking-background.png')" }}
        ></div>

        {/* overlay text */}
        <div className="relative z-10 bg-themxua-cream/90 p-4 sm:p-8 md:p-10 lg:p-14 rounded-2xl md:rounded-3xl shadow-2xl text-themxua-secondary w-full max-w-md sm:max-w-lg md:max-w-xl flex flex-col items-center border-2 border-themxua-primary/20 backdrop-blur-md">
          <h1 className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-themxua-primary mb-4 sm:mb-6 tracking-tight drop-shadow-lg">
            {t('booking.title')}
          </h1>
          <div className="w-12 sm:w-16 h-1 bg-themxua-primary rounded-full mb-4 sm:mb-6"></div>
          <ul className="w-full list-disc list-inside text-base sm:text-lg md:text-xl font-medium space-y-2 mb-4 sm:mb-6 text-themxua-secondary/90">
            <li>{t('booking.tour')}</li>
            <li>{t('booking.tourGroup')}</li>
            <li>{t('booking.birthday')}</li>
            <li>{t('booking.personal')}</li>
          </ul>
          <p className="text-left text-base sm:text-lg md:text-xl font-instrument mb-4 sm:mb-6 text-themxua-secondary/80 italic md:text-center">
            {(() => {
              const instruction = t('booking.instruction');
              const parts = instruction.split('{zalo}');
              return (
                <>
                  {parts[0]}
                  <strong>ZALO</strong>
                  {parts[1]}
                </>
              );
            })()}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 bg-themxua-primary/10 px-4 sm:px-6 py-2 sm:py-3 rounded-xl shadow-md w-full justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7 sm:w-8 sm:h-8 text-themxua-primary"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 7l9 6 9-6" />
            </svg>
            <a
              href="tel:+84971807272"
              className="text-2xl sm:text-3xl md:text-4xl font-dm-serif text-themxua-primary font-bold tracking-wide select-all focus:outline-none focus:ring-2 focus:ring-themxua-primary/50 transition"
            >
              {t('common.phone')}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
