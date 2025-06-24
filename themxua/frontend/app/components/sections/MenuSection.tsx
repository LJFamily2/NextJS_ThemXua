'use client';

import React from 'react';
import ExploreButton from '../ui/ExploreButton';

const MenuSection: React.FC = () => {
  return (
    <section className="bg-themxua-cream-darker py-16 lg:py-24 relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-[70px] relative z-10">
        {/* Section Header */}
        <div className="mb-16 lg:mb-20">
          <h2 className="font-roboto-serif font-semibold text-6xl md:text-8xl lg:text-[96px] leading-tight text-themxua-primary">
            MENU
          </h2>
        </div>

        {/* Explore Button */}
        <div className="flex justify-end">
          <ExploreButton href="/menu">Khám phá</ExploreButton>
        </div>
      </div>

      {/* Background decorative elements could be added here */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Add any background patterns or decorations */}
      </div>
    </section>
  );
};

export default MenuSection;
