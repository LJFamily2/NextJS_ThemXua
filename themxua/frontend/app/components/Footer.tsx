'use client';

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-themxua-footer-bg">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-[70px] py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
          {/* Left Side - Restaurant Info */}
          <div className="space-y-8">
            {/* Brand Logo/Name */}
            <div className="mb-8">
              <h2 className=" font-bold text-5xl lg:text-6xl text-themxua-primary mb-1">
                THEM XUA
              </h2>
                <p className=" text-md text-themxua-black opacity-80">
                Ẩm thực Việt Nam - Nơi hương vị truyền thống gặp gỡ hiện đại
                </p>
            </div>

            {/* Contact Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact & Hours */}
              <div className="space-y-6">
                {/* Hours */}
                <div className="space-y-3">
                  <h3 className=" font-semibold text-xl text-themxua-primary">
                    Giờ hoạt động
                  </h3>
                  <p className=" text-base text-themxua-black">
                    Thứ 2 - CN: 10h - 23h
                  </p>
                </div>

                {/* Contact */}
                <div className="space-y-3">
                  <h3 className=" font-semibold text-xl text-themxua-primary" id='contact'>
                    Liên hệ
                  </h3>
                  <div className="space-y-2">
                    <a
                      href="tel:+84971807272"
                      className=" text-base text-themxua-black hover:text-themxua-primary transition-colors cursor-pointer"
                    >
                      +84 971807272
                    </a>
                    <p className=" text-base text-themxua-black">
                      themxuaintn@gmail.com
                    </p>
                    <a
                      href="https://www.facebook.com/themxuatayninh"
                      className="inline-flex items-center gap-2 text-themxua-primary hover:text-themxua-primary/80 transition-colors"
                      target="_blank"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      <span className=" text-base">
                        Facebook
                      </span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="space-y-3">
                <h3 className=" font-semibold text-xl text-themxua-primary">
                  Địa chỉ
                </h3>
                <div className="space-y-2">
                  <p className=" text-base text-themxua-black leading-relaxed">
                    Cổng chính: 23 Hoàng Lê Kha,
                    <br />
                    Phường 3, Tây Ninh
                  </p>
                  <p className=" text-base text-themxua-black leading-relaxed">
                    Cổng sau: 23 Hoàng Lê Kha,
                    <br />
                    Phường 3, Tây Ninh
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Google Map */}
          <div className="flex justify-center lg:justify-end items-start">
            <div className="relative w-full max-w-[400px] lg:max-w-[500px] h-[250px] lg:h-[320px] rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.123456789!2d106.1234567!3d11.3123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s23%20Ho%C3%A0ng%20L%C3%AA%20Kha%2C%20Ph%C6%B0%E1%BB%9Dng%203%2C%20T%C3%A2y%20Ninh!5e1!3m2!1sen!2s!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ThemXua Restaurant Location"
              />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-themxua-black/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className=" text-sm text-themxua-black opacity-70">
              © THEM XUA. All rights reserved.
            </p>

            {/* Social Links or Additional Info */}
            <div className="flex items-center gap-6">
              <p className=" text-sm text-themxua-black opacity-70">
                Follow us for updates
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
