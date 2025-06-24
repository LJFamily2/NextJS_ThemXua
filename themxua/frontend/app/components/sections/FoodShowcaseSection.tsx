'use client';

import React from 'react';
import Image from 'next/image';

const FoodShowcaseSection: React.FC = () => {
  return (
    <section className="bg-themxua-cream-light py-16 lg:py-24 relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-[75px] relative">
        {/* Background Brand Text */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 pointer-events-none overflow-hidden">
          <h3
            className="font-roboto-serif font-extrabold text-[200px] lg:text-[270px] leading-none text-themxua-primary opacity-10 whitespace-nowrap"
            style={{ transform: 'translateX(-60%)' }}
          >
            THEM XUA
          </h3>
        </div>

        {/* Content Container */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 relative z-10">
          {/* Left Content - Decorative Shape */}
          <div className="flex-1 max-w-[626px] relative">
            <div className="relative w-full h-[400px] lg:h-[690px]">
              <Image
                src="/images/section4-shape.png"
                alt="Decorative Shape"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Right Content - Food Image */}
          <div className="flex-1 max-w-[628px] relative">
            <div className="space-y-6 lg:space-y-8">
              {/* Top Section - Text Content */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-lg">
                <h3 className="font-roboto-serif font-semibold text-2xl lg:text-3xl text-themxua-primary mb-4">
                  Món Ăn Đặc Sắc
                </h3>
                <p className="font-roboto-serif text-base lg:text-lg text-themxua-gray leading-relaxed">
                  Trải nghiệm hương vị đậm đà của những món ăn truyền thống được
                  chế biến từ nguyên liệu tươi ngon nhất.
                </p>
              </div>

              {/* Food Image */}
              <div className="relative w-full h-[350px] lg:h-[509px] rounded-[13px] overflow-hidden shadow-xl">
                <Image
                  src="/images/section4-food.png"
                  alt="ThemXua Signature Dish"
                  fill
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
