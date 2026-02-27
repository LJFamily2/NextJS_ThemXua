import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import { Roboto_Serif } from 'next/font/google';
import './globals.css';
// import ThemXuaHeader from './components/ThemXuaHeader';
import { LanguageProvider } from './contexts/LanguageContext';
import ConditionalScrollToTop from './components/ConditionalScrollToTop';
// import LoadingScreen from './components/ui/LoadingScreen';
import Script from 'next/script';
import {
  generateLocalBusinessStructuredData,
  generateMetadata as generateSEOMetadata,
  vietnameseSeafoodKeywords,
  seoConfig,
} from './lib/seo';
import { analyticsConfig } from './lib/analytics';
import { Metadata } from 'next';

const robotoSerif = Roboto_Serif({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-roboto-serif',
  display: 'swap',
});

// Generate metadata for homepage
export const metadata: Metadata = generateSEOMetadata({
  title: `${seoConfig.business.name} | Hải sản, quán ăn gia đình, đặt tiệc Tây Ninh 2025`,
  description: `${seoConfig.business.description} Quán hải sản hot nhất Tây Ninh 2025, phù hợp GenZ, young adult, gia đình, nhóm bạn, tiệc công ty. Đặt bàn ngay!`,
  keywords: vietnameseSeafoodKeywords,
  canonical: seoConfig.baseUrl,
  openGraph: {
    title: `${seoConfig.business.name} | Hải sản, quán ăn gia đình, đặt tiệc Tây Ninh 2025`,
    description: `Quán hải sản giá rẻ, hot nhất Tây Ninh! Không gian ấm cúng, phù hợp gia đình, GenZ, young adult, nhóm bạn, tiệc công ty. Menu đa dạng, phục vụ tận tình. Đặt bàn ngay!`,
    images: [
      {
        url: `${seoConfig.baseUrl}/images/logoTransparentNauDo.png`,
        width: 1200,
        height: 630,
        alt: `${seoConfig.business.name} - Logo`,
      },
      {
        url: `${seoConfig.baseUrl}/images/heroDesktop.jpg`,
        width: 1200,
        height: 630,
        alt: 'Quán Thềm Xưa - Không gian ấm cúng, hải sản tươi ngon',
      },
      {
        url: `${seoConfig.baseUrl}/images/FoodShowcase.jpg`,
        width: 1200,
        height: 630,
        alt: 'Hải sản tươi ngon tại Quán Thềm Xưa Tây Ninh',
      },
    ],
    type: 'website',
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Generate structured data
  const localBusinessData = generateLocalBusinessStructuredData();

  return (
    <html lang="vi">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />

        {/* Enhanced Structured Data - Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessData),
          }}
        />

        {/* Website Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              '@id': `${seoConfig.baseUrl}#website`,
              url: seoConfig.baseUrl,
              name: seoConfig.business.name,
              description: seoConfig.business.description,
              inLanguage: ['vi', 'en', 'zh', 'km'],
              potentialAction: [
                {
                  '@type': 'SearchAction',
                  target: {
                    '@type': 'EntryPoint',
                    urlTemplate: `${seoConfig.baseUrl}/menu?q={search_term_string}`,
                  },
                  'query-input': 'required name=search_term_string',
                },
              ],
            }),
          }}
        />

        {/* Organization Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              '@id': `${seoConfig.baseUrl}#organization`,
              name: seoConfig.business.name,
              url: seoConfig.baseUrl,
              logo: `${seoConfig.baseUrl}/images/logoTransparentNauDo.png`,
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: seoConfig.business.phone,
                contactType: 'customer service',
                areaServed: 'VN',
                availableLanguage: [
                  'Vietnamese',
                  'English',
                  'Chinese',
                  'Khmer',
                ],
              },
              sameAs: Object.values(seoConfig.business.socialMedia).filter(
                Boolean
              ),
            }),
          }}
        />

        {/* Google Analytics (replace with your GA4 ID) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.googleAnalyticsId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${analyticsConfig.googleAnalyticsId}', {
              page_title: document.title,
              page_location: window.location.href,
              send_page_view: true,
              custom_map: {
                'restaurant_name': '${seoConfig.business.name}',
                'business_type': 'restaurant',
                'location': 'Tay Ninh, Vietnam'
              }
            });
          `}
        </Script>

        {/* Facebook Pixel (replace with your pixel ID) */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${analyticsConfig.facebookPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* Microsoft Clarity for user behavior analysis */}
        {analyticsConfig.microsoftClarityId && (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${analyticsConfig.microsoftClarityId}");
            `}
          </Script>
        )}

        {/* Google Search Console Verification */}
        <meta
          name="google-site-verification"
          content={`${analyticsConfig.googleSearchConsoleId}`}
        />
      </head>
      <body className={`${robotoSerif.variable} antialiased select-none`}>
        <LanguageProvider>
          {/* <LoadingScreen /> */}
          <main>{children}</main>
          <SpeedInsights />
          <Analytics />
          <ConditionalScrollToTop />
        </LanguageProvider>
      </body>
    </html>
  );
}
