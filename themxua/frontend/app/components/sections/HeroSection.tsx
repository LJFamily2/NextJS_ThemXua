'use client';

import React from 'react';
import Image from 'next/image';
import ThemXuaButton from '../ui/ThemXuaButton';
import { MouseScrollIcon } from '../ui/Icons';

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
      </div>{' '}
      {/* Overlay Gradient */}
      <div
        className="absolute inset-0 animate-slide-in-left md:animate-slide-in-left bg-gradient-mobile bg-gradient-desktop"
        style={{
          animationDelay: '0.2s',
          animationFillMode: 'both',
        }}
      />
      {/* Content Container */}
      <div
        className="relative z-10 h-full flex items-center animate-slide-in-left-content"
        style={{
          animationDelay: '0.5s',
          animationFillMode: 'both',
        }}
      >
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-[90px]">
          <div className="max-w-[691px]">
            {/* Main Heading */}
            <h1 className=" font-semibold text-5xl leading-tight md:text-6xl lg:text-[72px] md:leading-tight lg:leading-none text-themxua-secondary mb-3 ">
              Khám Phá Ẩm Thực Thềm Xưa
            </h1>

            {/* Subtitle */}
            <p className=" font-semibold text-lg md:text-xl lg:text-xl leading-relaxed text-themxua-orange mb-8 lg:mb-12">
              Hãy tận hưởng sự ấm cúng của những bữa cơm gia đình
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
              <ThemXuaButton
                variant="primary"
                size="lg"
                href="/booking#booking"
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
      {/* Scroll Icon / Scroll Down for mobile */}
      <div>
        {/* Mobile: Animated Down Arrow with Text */}
        <div className="flex flex-col items-center absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 sm:hidden">
          <span className="animate-bounce text-themxua-orange text-3xl">↓</span>
          <span className="mt-1 text-xs text-themxua-orange font-semibold animate-pulse">
            Kéo xuống
          </span>
        </div>
        {/* Desktop: Mouse Scroll Icon */}
        <div className="hidden sm:block absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <MouseScrollIcon
            size={40}
            color="#8B4513"
            className="opacity-80 hover:opacity-100 transition-opacity duration-300"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
