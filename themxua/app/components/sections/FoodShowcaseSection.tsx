'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '../../contexts/LanguageContext';

const FoodShowcaseSection: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section className="bg-themxua-cream-light py-16 lg:py-24 relative overflow-hidden">
      {/* Background Brand Text */}
      <div className="absolute w-full h-full left-0 top-0 pointer-events-none overflow-hidden">
        <h3
          className="font-extrabold text-[200px] lg:text-[270px] leading-none text-themxua-primary opacity-10 whitespace-nowrap select-none"
          style={{
            transform: 'translateX(-20%)  rotate(-20deg)',
            transformOrigin: 'center center',
            animation: 'fadeIn 0.5s ease-in-out',
          }}
        >
          THEM XUA
        </h3>
      </div>
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-[75px] relative">
        {/* Content Container */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 relative z-10">
          {/* Left Content - Decorative Shape */}
          <div className="flex-1 max-w-[626px] relative">
            <div className="relative w-full h-[400px] lg:h-[590px] rounded-[13px] overflow-hidden mb-7 shadow-xl">
              <Image
                src="/images/heroBg.jpg"
                alt="Decorative Shape"
                fill
                sizes="(max-width: 1024px) 100vw, 626px"
                className="object-cover object-left hover:scale-105 transition-transform duration-700 "
              />
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-lg">
              <p className="text-base lg:text-lg text-themxua-gray leading-relaxed">
                {t('foodShowcase.description1')}
              </p>
            </div>
          </div>
          {/* Right Content - Food Image */}
          <div className="flex-1 max-w-[628px] relative">
            <div className="space-y-6 lg:space-y-8">
              {/* Top Section - Text Content */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-lg">
                <h3 className="font-semibold text-2xl lg:text-3xl text-themxua-primary mb-4">
                  {t('foodShowcase.title')}
                </h3>
                <p className="text-base lg:text-lg text-themxua-gray leading-relaxed">
                  {t('foodShowcase.description2')}
                </p>
              </div>

              {/* Food Image */}
              <div className="relative w-full h-[350px] lg:h-[509px] rounded-[13px] overflow-hidden shadow-xl">
                <Image
                  src="/images/FoodShowcase.jpg"
                  alt="ThemXua Signature Dish"
                  fill
                  sizes="(max-width: 1024px) 100vw, 628px"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoodShowcaseSection;
