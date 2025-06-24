'use client';

import React from 'react';
import Image from 'next/image';
import ThemXuaButton from '../ui/ThemXuaButton';

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-[764px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.png"
          alt="ThemXua Restaurant Background"
          fill
          className="object-cover"
          priority
        />
      </div>      {/* Curved Overlay Gradient */}
      <div
        className="absolute inset-0 animate-slide-in-left"
        style={{
          background: `linear-gradient(90deg, 
          #F0E1CD 0%, 
          #F0E1CD 45%, 
          rgba(240, 225, 205, 0.8) 55%, 
          rgba(240, 225, 205, 0.4) 70%, 
          rgba(240, 225, 205, 0.1) 80%, 
          transparent 95%)`,
          animationDelay: '0.2s',
          animationFillMode: 'both',
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 h-full flex items-center animate-slide-in-left-content"
        style={{
          animationDelay: '0.5s',
          animationFillMode: 'both',
        }}
      >
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-[90px]">
          <div className="max-w-[691px]">
            {/* Main Heading */}
            <h1 className="font-roboto-serif font-semibold italic text-4xl md:text-6xl lg:text-[72px] md:leading-tight lg:leading-none text-themxua-secondary mb-3 ">
              Khám Phá Ẩm Thực Thềm Xưa
            </h1>

            {/* Subtitle */}
            <p className="font-roboto-serif font-semibold text-lg md:text-xl lg:text-xl leading-relaxed text-themxua-orange mb-8 lg:mb-12">
              Hãy tận hưởng sự ấm cúng của những bữa cơm gia đình
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
              <ThemXuaButton
                variant="primary"
                size="lg"
                href="/booking"
                className="w-full sm:w-auto min-w-[172px] h-[55px] rounded-lg text-themxua-white"
              >
                Đặt Bàn
              </ThemXuaButton>

              <ThemXuaButton
                variant="secondary"
                size="lg"
                href="/menu"
                className="w-full sm:w-auto min-w-[172px] h-[55px] rounded-lg"
              >
                Xem Menu
              </ThemXuaButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
