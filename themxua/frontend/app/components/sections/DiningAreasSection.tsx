'use client';

import React, { useRef } from 'react';

const AREAS = [
  {
    id: 'area-a',
    label: 'Khu A',
    image: '/images/section5-bg.png',
  },
  {
    id: 'area-b',
    label: 'Khu B',
    image: '/images/section4-bg.png',
  },
  {
    id: 'area-c',
    label: 'Khu C',
    image: '/images/khuC.jpg',
  },
  {
    id: 'area-d',
    label: 'Khu D',
    image: '/images/vip1.webp',
  },
];

const DiningAreasSection: React.FC = () => {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <section className="bg-themxua-cream-darkest relative">
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
            <div
              className="sticky top-5 md:top-20 inline-flex items-center justify-center bg-themxua-secondary text-themxua-white px-6 mt-8 lg:px-8 py-3 lg:py-4 rounded-r-[20px] shadow-lg font-medium text-2xl lg:text-[40px] leading-none"
            >
              {area.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DiningAreasSection;
