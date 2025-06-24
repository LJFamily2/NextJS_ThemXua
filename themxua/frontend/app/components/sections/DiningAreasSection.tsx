'use client';

import React from 'react';
import Image from 'next/image';
import ThemXuaButton from '../ui/ThemXuaButton';

const DiningAreasSection: React.FC = () => {
  return (
    <section className="bg-themxua-cream-darkest relative overflow-hidden">
      {/* Background Image */}
      <div className="relative w-full h-[600px] lg:h-[941px]">
        <Image
          src="/images/section5-bg.png"
          alt="ThemXua Dining Area"
          fill
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Content */}
        <div className="absolute inset-0 flex items-start justify-start">
          <div className="mt-16 lg:mt-20 ml-4 lg:ml-0">
            {/* Area Label */}
            <div className="inline-flex items-center justify-center bg-themxua-secondary text-themxua-white px-6 lg:px-8 py-3 lg:py-4 rounded-r-[20px] shadow-lg">
              <span className="font-roboto-serif font-medium text-2xl lg:text-[40px] leading-none">
                Khu C
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Navigation/Info */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center space-y-4">
            {/* Area Description */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl px-6 py-3 shadow-lg">
              <p className="font-roboto-serif text-sm lg:text-base text-themxua-primary text-center">
                Không gian VIP sang trọng, riêng tư
              </p>
            </div>

            {/* View More Button */}
            <ThemXuaButton
              variant="primary"
              size="md"
              href="/areas"
              className="shadow-lg"
            >
              Xem Tất Cả Khu Vực
            </ThemXuaButton>
          </div>
        </div>

        {/* Side indicators (dots for other areas) */}
        <div className="absolute right-6 lg:right-12 top-1/2 transform -translate-y-1/2">
          <div className="flex flex-col space-y-3">
            <div className="w-3 h-3 bg-white/50 rounded-full" />
            <div className="w-3 h-3 bg-white/50 rounded-full" />
            <div className="w-3 h-3 bg-white rounded-full" />
            <div className="w-3 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiningAreasSection;
