'use client';

import React from 'react';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="bg-themxua-footer-bg">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-[70px] py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Address Section */}
          <div className="space-y-4">
            <h3 className="font-roboto-serif font-medium text-2xl lg:text-[30px] text-themxua-primary">
              Địa chỉ
            </h3>
            <div className="space-y-2">
              <p className="font-roboto-serif text-base lg:text-lg text-themxua-black leading-relaxed">
                Cổng chính: 23 Hoàng Lê Kha, Phường 3, Tây Ninh
              </p>
              <p className="font-roboto-serif text-base lg:text-lg text-themxua-black leading-relaxed">
                Cổng sau: 23 Hoàng Lê Kha, Phường 3, Tây Ninh
              </p>
            </div>
          </div>

          {/* Hours Section */}
          <div className="space-y-4">
            <h3 className="font-roboto-serif font-medium text-2xl lg:text-[30px] text-themxua-primary">
              Giờ hoạt động
            </h3>
            <p className="font-roboto-serif text-base lg:text-lg text-themxua-black">
              Thứ 2 - CN: 10h - 23h
            </p>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="font-roboto-serif font-medium text-2xl lg:text-[30px] text-themxua-primary">
              Liên Hệ
            </h3>
            <div className="space-y-2">
              <p className="font-roboto-serif text-base lg:text-lg text-themxua-black">
                +84 971807272
              </p>
              <p className="font-roboto-serif text-base lg:text-lg text-themxua-black">
                themxuaintn@gmail.com
              </p>
            </div>
          </div>

          {/* Restaurant Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[300px] lg:max-w-[414px] h-[120px] lg:h-[166px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/footer-image.png"
                alt="ThemXua Restaurant"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="w-full h-px bg-themxua-black mb-8" />

        {/* Brand Name */}
        <div className="text-center mb-6">
          <h2 className="font-roboto-serif font-extrabold text-6xl md:text-8xl lg:text-[160px] leading-none text-themxua-primary">
            THEM XUA
          </h2>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="font-roboto-serif font-light text-xs leading-loose text-themxua-black">
            Copyright © THEM XUA
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
