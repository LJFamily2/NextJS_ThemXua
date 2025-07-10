'use client';

import React from 'react';
import Image from 'next/image';
import ThemXuaButton from '../ui/ThemXuaButton';
import { MouseScrollIcon } from '../ui/Icons';
import { useLanguage } from '../../contexts/LanguageContext';

const HeroSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative w-full h-[764px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        {/* Desktop */}
        <Image
          src="/images/heroDesktop.jpg"
          alt="ThemXua Restaurant Background"
          fill
          className="object-cover object-[center_30%] hidden sm:block"
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL="/images/heroDesktop.jpg"
        />
        {/* Mobile */}
        <Image
          src="/images/heroMobile.jpg"
          alt="ThemXua Restaurant Background"
          fill
          className="object-cover sm:hidden"
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL="/images/heroMobile.jpg"
        />
      </div>{' '}
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-mobile bg-gradient-desktop" />
      {/* Content Container */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-16">
          <div className="max-w-[691px]">
            {/* Main Heading */}
            <h1 className="font-semibold text-5xl leading-tight md:text-6xl lg:text-[72px] md:leading-tight lg:leading-none text-themxua-secondary mb-3">
              {t('hero.title')}
            </h1>

            {/* Subtitle */}
            <p className="font-semibold text-lg md:text-xl lg:text-xl leading-relaxed text-themxua-orange mb-8 lg:mb-12">
              {t('hero.subtitle')}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
              <ThemXuaButton
                variant="primary"
                size="lg"
                href="/booking#booking"
                className="w-full sm:w-auto min-w-[172px] h-[55px] rounded-lg text-themxua-white"
              >
                {t('booking.title')}
              </ThemXuaButton>

              <ThemXuaButton
                variant="secondary"
                size="lg"
                href="/menu"
                className="w-full sm:w-auto min-w-[172px] h-[55px] rounded-lg"
              >
                {t('menu.explore')}
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
            {t('hero.scrollDown')}
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
