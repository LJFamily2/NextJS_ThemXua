'use client';
import Image from 'next/image';
import { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function MenuPage() {
  const { t } = useLanguage();
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);

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
      {/* Scrollspy Area */}
      <div className="w-full md:w-64 p-4 md:p-8 sticky md:top-0 md:h-screen overflow-x-auto md:overflow-y-auto bg-white/80 md:bg-transparent z-10 md:z-auto flex-shrink-0">
        <h3 className="text-xl md:text-2xl font-dm-serif text-themxua-primary mb-4 text-center md:text-left">
          {t('menu.categories')}
        </h3>
        <nav>
          <ul className="flex md:block gap-2 md:space-y-2 overflow-x-auto">
            {menuSections.map(section => (
              <li key={`nav-${section.id}`} className="inline-block md:block">
                <a
                  href={`#${section.id}`}
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
    </div>
  );
}
