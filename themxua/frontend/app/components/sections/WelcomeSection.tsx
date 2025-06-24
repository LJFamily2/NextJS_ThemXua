'use client';

import React from 'react';
import Image from 'next/image';

const WelcomeSection: React.FC = () => {
  return (
    <section className="bg-themxua-cream py-16 lg:py-24">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-[70px]">
        {/* Text Content */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="font-roboto-serif font-semibold text-3xl md:text-4xl lg:text-[47px] leading-tight text-themxua-primary mb-6 lg:mb-8">
            Chào mừng đến với Thềm Xưa
          </h2>

          <p className="font-roboto-serif text-base lg:text-lg leading-relaxed text-themxua-gray max-w-5xl mx-auto">
            Đắm chìm trong không gian ấm cúng và mộc mạc của Thềm Xưa, nơi những
            món hải sản tươi ngon và bữa cơm gia đình thân thương đang chờ đón
            bạn
          </p>
        </div>

        {/* Image Gallery */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-[30px]">
          {/* Image 1 */}
          <div className="relative w-full max-w-[415px] h-[400px] lg:h-[580px] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Image
              src="/images/center.webp"
              alt="ThemXua Restaurant Interior 1"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Image 2 */}
          <div className="relative w-full max-w-[415px] h-[400px] lg:h-[580px] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Image
              src="/images/vip1.webp"
              alt="ThemXua Restaurant Interior 2"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Image 3 */}
          <div className="relative w-full max-w-[415px] h-[400px] lg:h-[580px] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Image
              src="/images/wood.webp"
              alt="ThemXua Restaurant Interior 3"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
