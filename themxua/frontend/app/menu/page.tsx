'use client';
import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  generateMenuStructuredData,
  generateBreadcrumbStructuredData,
  seoConfig,
  vietnameseSeafoodKeywords,
} from '../lib/seo';

export const dynamic = 'force-static';

// Enhanced menu keywords with more specific terms
const menuKeywords = [
  'menu thềm xưa',
  'thực đơn hải sản tây ninh',
  'món ăn gia đình',
  'menu nhà hàng tây ninh',
  'giá menu hải sản',
  'đặt món online',
  'món việt truyền thống',
  'seafood menu tay ninh',
  'family restaurant menu',
  'vietnamese cuisine menu',
  'lẩu hải sản menu',
  'nướng hải sản menu',
  'cơm gia đình menu',
  'món chay menu',
  'thực đơn đa dạng',
  'menu giá rẻ',
  'thực đơn đặt tiệc',
  'menu buffet hải sản',
  'menu party',
  'thực đơn sinh nhật',
  'menu công ty',
  'đồ uống tây ninh',
  'bia tươi menu',
  'combo gia đình',
  'set menu tiệc',
  ...vietnameseSeafoodKeywords,
];

// Static generation enabled for menu page
export default function MenuPage() {
  const { t } = useLanguage();
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

  // Enhanced SEO data for Menu page
  const menuSEOData = {
    title: `Menu ${seoConfig.business.name} | Thực đơn hải sản, món ăn gia đình Tây Ninh 2025`,
    description:
      'Menu hải sản tươi ngon, món ăn gia đình, đặt tiệc giá rẻ tại Tây Ninh. Đa dạng món Việt truyền thống, combo gia đình, set menu tiệc, phù hợp gia đình, nhóm bạn, công ty. Xem thực đơn đầy đủ với giá cả hấp dẫn nhất 2025.',
    url: `${seoConfig.baseUrl}/menu`,
    keywords: menuKeywords,
    canonical: `${seoConfig.baseUrl}/menu`,
    openGraph: {
      title: `Menu ${seoConfig.business.name} | Thực đơn hải sản hot nhất Tây Ninh`,
      description:
        'Khám phá menu đa dạng với hải sản tươi ngon, món ăn gia đình, combo tiệc giá rẻ. Phù hợp GenZ, gia đình, công ty. Đặt bàn ngay!',
      type: 'website',
      images: [
        {
          url: `${seoConfig.baseUrl}/images/FoodShowcase.jpg`,
          width: 1200,
          height: 630,
          alt: 'Menu hải sản Quán Thềm Xưa Tây Ninh',
        },
        {
          url: `${seoConfig.baseUrl}/images/logo.png`,
          width: 800,
          height: 600,
          alt: seoConfig.business.name,
        },
      ],
    },
  };

  // Generate structured data
  const menuStructuredData = generateMenuStructuredData();
  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: 'Trang chủ', url: seoConfig.baseUrl },
    { name: 'Menu', url: `${seoConfig.baseUrl}/menu` },
  ]);

  // Placeholder data for menu sections and images
  const menuSections = useMemo(
    () => [
      {
        id: 'Main display',
        titleKey: 'menu.sections.hello',
        images: ['/images/00.png'],
      },
      {
        id: 'Appetizers',
        titleKey: 'menu.sections.bites',
        images: ['/images/01.png', '/images/02.png', '/images/03.png'],
      },
      {
        id: 'Main Courses',
        titleKey: 'menu.sections.sashimi',
        images: ['/images/04.png'],
      },
      {
        id: 'Desserts',
        titleKey: 'menu.sections.roastedDuck',
        images: ['/images/05.png'],
      },
      {
        id: 'Mì & Miến',
        titleKey: 'menu.sections.noodles',
        images: ['/images/06.png'],
      },
      {
        id: 'Cơm Chiên',
        titleKey: 'menu.sections.friedRice',
        images: ['/images/07.png'],
      },
      {
        id: 'Cháo & Súp',
        titleKey: 'menu.sections.porridgeSoup',
        images: ['/images/08.png'],
      },
      {
        id: 'Lẩu',
        titleKey: 'menu.sections.hotpot',
        images: ['/images/09.png'],
      },
      {
        id: 'Gỏi Salad',
        titleKey: 'menu.sections.salad',
        images: ['/images/10.png'],
      },
      {
        id: 'Đậu Hủ & Rau',
        titleKey: 'menu.sections.tofuVegetables',
        images: ['/images/11.png'],
      },
      {
        id: 'Món Chay',
        titleKey: 'menu.sections.vegetarian',
        images: ['/images/12.png'],
      },
      {
        id: 'Nước Uống',
        titleKey: 'menu.sections.drinks',
        images: ['/images/13.jpg'],
      },
    ],
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      let currentSectionId: string | null = null;
      const sections = menuSections.map(section =>
        document.getElementById(section.id)
      );

      sections.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          // Check if the top of the section is within the viewport (with a small offset)
          if (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
          ) {
            currentSectionId = menuSections[index].id;
          }
        }
      });

      setActiveSectionId(currentSectionId);
    };

    window.addEventListener('scroll', handleScroll);
    // Call handleScroll initially to set the active section on load
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [menuSections]); // Re-run effect if menuSections change

  return (
    <>
      <Head>
        <title>{menuSEOData.title}</title>
        <meta name="description" content={menuSEOData.description} />
        <meta name="keywords" content={menuSEOData.keywords.join(', ')} />
        <link rel="canonical" href={menuSEOData.url} />

        {/* Enhanced Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={menuSEOData.url} />
        <meta property="og:title" content={menuSEOData.title} />
        <meta property="og:description" content={menuSEOData.description} />
        <meta
          property="og:image"
          content={`${seoConfig.baseUrl}/images/logo.png`}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content={seoConfig.business.name} />
        <meta property="og:locale" content="vi_VN" />

        {/* Enhanced Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={menuSEOData.title} />
        <meta name="twitter:description" content={menuSEOData.description} />
        <meta
          name="twitter:image"
          content={`${seoConfig.baseUrl}/images/logo.png`}
        />

        {/* Enhanced Structured Data: Menu */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(menuStructuredData),
          }}
        />

        {/* Breadcrumb Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbData),
          }}
        />

        {/* FAQ Structured Data for Menu */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'Quán Thềm Xưa có những món ăn gì?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Quán Thềm Xưa phục vụ đa dạng món hải sản tươi ngon, món ăn gia đình, lẩu, nướng, cơm chiên, và các món chay. Phù hợp cho gia đình, nhóm bạn và đặt tiệc.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Giá cả tại Quán Thềm Xưa như thế nào?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Quán Thềm Xưa có mức giá phù hợp với nhiều đối tượng khách hàng, từ sinh viên đến gia đình. Giá cả hợp lý và chất lượng món ăn tốt.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Quán Thềm Xưa có phục vụ đặt tiệc không?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Có, quán có sảnh tiệc và phòng VIP phục vụ đặt tiệc sinh nhật, tiệc công ty, và các sự kiện đặc biệt với menu đa dạng.',
                  },
                },
              ],
            }),
          }}
        />
      </Head>
      <div className="min-h-screen bg-themxua-background flex flex-col md:flex-row pt-[70px]">
        {/* Main Menu Content Area */}
        <div className="flex-grow p-4 md:p-8">
          <h1 className="text-4xl md:text-5xl text-themxua-primary mb-2 text-center font-medium">
            {t('menu.pageTitle')}
          </h1>
          <p className="text-lg md:text-xl font-instrument text-themxua-secondary mb-8 md:mb-12 text-center">
            {t('menu.pageSubtitle')}
          </p>
          {/* Menu Sections */}
          {menuSections.map(section => (
            <section id={section.id} key={section.id} className="mb-8 md:mb-16">
              {/* Add IDs for scrollspy */}
              <div className="flex flex-col items-center">
                {/* Stack images vertically */}
                {section.images.map((imageUrl, index) => (
                  <div key={index} className="w-full max-w-3xl cursor-pointer">
                    <Image
                      src={imageUrl}
                      alt={`${t(section.titleKey)} ${t('menu.imageAlt')} ${index + 1}`}
                      className="w-full h-auto object-contain shadow-lg rounded-lg"
                      width={1200}
                      height={1200}
                    />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
        {/* Mobile Toggle Button */}
        {!isOffcanvasOpen && (
          <button
            onClick={() => setIsOffcanvasOpen(!isOffcanvasOpen)}
            className="fixed right-0 top-[40rem] transform -translate-y-1/2 z-50 bg-themxua-primary text-white p-3 rounded-l-lg shadow-lg md:hidden"
            aria-label="Toggle menu categories"
          >
            <span className="text-lg font-bold">‹‹</span>
          </button>
        )}

        {/* Scrollspy Area */}
        <div
          className={`
        fixed md:sticky top-0 right-0 h-full md:h-screen w-80 md:w-64 
        bg-white md:bg-transparent shadow-xl md:shadow-none
        transform transition-transform duration-300 ease-in-out
        ${isOffcanvasOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
        z-50 md:z-auto
        p-4 md:p-8 overflow-y-auto
        flex-shrink-0
      `}
        >
          {/* Close button for mobile */}
          <button
            onClick={() => setIsOffcanvasOpen(false)}
            className="absolute top-4 right-4 text-themxua-secondary hover:text-themxua-primary md:hidden"
            aria-label="Close menu categories"
          >
            <span className="text-4xl">×</span>
          </button>

          <h3 className="text-xl md:text-2xl font-dm-serif text-themxua-primary mb-4 text-center md:text-left pt-8 md:pt-0">
            {t('menu.categories')}
          </h3>
          <nav>
            <ul className="space-y-2">
              {menuSections.map(section => (
                <li key={`nav-${section.id}`}>
                  <a
                    href={`#${section.id}`}
                    onClick={() => setIsOffcanvasOpen(false)} // Close offcanvas when clicking a link on mobile
                    className={`block px-3 py-2 rounded transition-colors duration-200 text-themxua-secondary hover:text-themxua-primary hover:bg-themxua-primary/10 md:hover:bg-transparent md:hover:text-themxua-primary ${
                      activeSectionId === section.id
                        ? 'font-bold text-themxua-primary bg-themxua-primary/10 md:bg-transparent'
                        : ''
                    }`}
                  >
                    {t(section.titleKey)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Overlay for mobile */}
        {isOffcanvasOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={() => setIsOffcanvasOpen(false)}
          />
        )}
      </div>
    </>
  );
}
