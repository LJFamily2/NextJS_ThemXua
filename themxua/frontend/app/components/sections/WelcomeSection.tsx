'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const WelcomeSection: React.FC = () => {
  return (
    <section className="bg-themxua-cream py-16 lg:py-24">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-[70px]">
        {/* Text Content */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className=" font-semibold text-3xl md:text-4xl lg:text-[47px] leading-tight text-themxua-primary mb-6 lg:mb-8">
            Chào mừng đến với Thềm Xưa
          </h2>

          <p className=" text-base lg:text-lg leading-relaxed text-themxua-gray max-w-5xl mx-auto">
            Đắm chìm trong không gian ấm cúng và mộc mạc của <span className="font-semibold">Thềm Xưa</span>, nơi những
            món hải sản tươi ngon và bữa cơm gia đình thân thương đang chờ đón
            bạn
          </p>
        </div>{' '}
        {/* Image Gallery */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-[30px]">
          {/* Image 1 - Outdoor Area */}
          <div className="relative w-full max-w-[415px] h-[400px] lg:h-[580px] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
            <Image
              src="/images/center.webp"
              alt="ThemXua Restaurant Outdoor Area"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
            {/* Area Type Badge */}
            <div className="absolute top-[25px] left-0 bg-themxua-cream px-[5px] py-[10px] rounded-r-[5px] shadow-md transition-all duration-300 group-hover:scale-110 group-hover:px-[12px] group-hover:py-[18px]">
              <span className=" font-bold text-[15px] text-themxua-primary transition-all duration-300 group-hover:text-[20px]">
                Ngoài trời
              </span>
            </div>
            {/* View More Button */}
            <div className="absolute bottom-[30px] left-1/2 transform -translate-x-1/2">
              <Link
                href="/#dining-areas"
                className="inline-block bg-themxua-primary text-white  text-[15px] px-[20px] py-[10px] rounded-[5px] hover:bg-opacity-90 transition-all duration-300"
              >
                Xem thêm
              </Link>
            </div>
          </div>

          {/* Image 2 - Private Room */}
          <div className="relative w-full max-w-[415px] h-[400px] lg:h-[580px] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
            <Image
              src="/images/vip1.webp"
              alt="ThemXua Restaurant Private Room"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
            {/* Area Type Badge */}
            <div className="absolute top-[25px] left-0 bg-themxua-cream px-[5px] py-[10px] rounded-r-[5px] shadow-md transition-all duration-300 group-hover:scale-110 group-hover:px-[12px] group-hover:py-[18px]">
              <span className=" font-bold text-[15px] text-themxua-primary transition-all duration-300 group-hover:text-[20px]">
                Phòng kín
              </span>
            </div>
            {/* View More Button */}
            <div className="absolute bottom-[30px] left-1/2 transform -translate-x-1/2">
              <Link
                href="/vip"
                className="inline-block bg-themxua-primary text-white  text-[15px] px-[20px] py-[10px] rounded-[5px] hover:bg-opacity-90 transition-all duration-300"
              >
                Xem thêm
              </Link>
            </div>
          </div>

          {/* Image 3 - Banquet Hall */}
          <div className="relative w-full max-w-[415px] h-[400px] lg:h-[580px] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
            <Image
              src="/images/wood.webp"
              alt="ThemXua Restaurant Banquet Hall"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
            {/* Area Type Badge */}
            <div className="absolute top-[25px] left-0 bg-themxua-cream px-[5px] py-[10px] rounded-r-[5px] shadow-md transition-all duration-300 group-hover:scale-110 group-hover:px-[12px] group-hover:py-[18px]">
              <span className=" font-bold text-[15px] text-themxua-primary transition-all duration-300 group-hover:text-[20px]">
                Sảnh tiệc
              </span>
            </div>
            {/* View More Button */}
            <div className="absolute bottom-[30px] left-1/2 transform -translate-x-1/2">
              <Link
                href="/party"
                className="inline-block bg-themxua-primary text-white  text-[15px] px-[20px] py-[10px] rounded-[5px] hover:bg-opacity-90 transition-all duration-300"
              >
                Xem thêm
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
