'use client';

import React, { useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const AREAS = [
  {
    id: 'area-a',
    labelKey: 'diningAreas.areaA',
    image: '/images/section5-bg.png',
  },
  {
    id: 'area-b',
    labelKey: 'diningAreas.areaB',
    image: '/images/section4-bg.png',
  },
  {
    id: 'area-c',
    labelKey: 'diningAreas.areaC',
    image: '/images/khuC.jpg',
  },
  {
    id: 'area-d',
    labelKey: 'diningAreas.areaD',
    image: '/images/vip1.webp',
  },
];

const DiningAreasSection: React.FC = () => {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { t } = useLanguage();

  return (
    <section
      className="bg-themxua-cream-darkest relative cursorWhite"
      id="dining-areas"
    >
      {/* Parallax Sections */}
      <div>
        {AREAS.map((area, idx) => (
          <div
            key={area.id}
            id={area.id}
            ref={el => {
              sectionRefs.current[idx] = el;
            }}
            className="relative w-full h-[600px] lg:h-[941px] flex items-start justify-start scroll-mt-24"
            style={{
              backgroundImage: `url(${area.image})`,
              backgroundAttachment: 'fixed',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
          >
            {/* Overlay */}
            {/* <div className="absolute inset-0 bg-black/20" /> */}

            {/* Sticky Label inside Section */}
            <div className="sticky top-5 md:top-20 inline-flex items-center justify-center bg-themxua-secondary text-themxua-white px-6 mt-8 lg:px-8 py-3 lg:py-4 rounded-r-[20px] shadow-lg font-medium text-2xl lg:text-[40px] leading-none">
              {t(area.labelKey)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DiningAreasSection;
