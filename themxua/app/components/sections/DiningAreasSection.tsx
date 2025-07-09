'use client';

import React, { useRef } from 'react';

const AREAS = [
  {
    id: 'area-a',
    image: '/images/section5-bg.png',
  },
  {
    id: 'area-b',
    image: '/images/DSC_3302.jpg',
  },
  {
    id: 'area-c',
    image: '/images/section-c.jpg',
  },
  {
    id: 'area-d',
    image: '/images/sectiond.jpg',
  },
];

const DiningAreasSection: React.FC = () => {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

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
          ></div>
        ))}
      </div>
    </section>
  );
};

export default DiningAreasSection;
