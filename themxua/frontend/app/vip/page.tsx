'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { SectionContainer } from '../components/ui';
import ThemXuaButton from '../components/ui/ThemXuaButton';
const VipRoomPage: React.FC = () => {
  // Intersection Observer hook for animations
  const useIntersectionObserver = (options = {}) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = React.useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Once visible, stop observing to prevent re-triggering
            observer.unobserve(entry.target);
          }
        },
        {
          threshold: 0.1,
          rootMargin: '50px',
          ...options,
        }
      );

      if (elementRef.current) {
        observer.observe(elementRef.current);
      }

      return () => observer.disconnect();
    }, []);

    return [elementRef, isVisible] as const;
  };

  // Create refs for each section
  const [section1Ref, section1Visible] = useIntersectionObserver();
  const [section2Ref, section2Visible] = useIntersectionObserver();
  const [section3Ref, section3Visible] = useIntersectionObserver();
  const [section4Ref, section4Visible] = useIntersectionObserver();
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <section
        className="relative min-h-screen flex items-center justify-center cursorWhite"
        style={{
          backgroundImage: "url('/images/vip-hero-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl lg:text-[86px] font-roboto-serif font-normal text-[#F8F8F6] mb-6 leading-tight">
            Phòng VIP
          </h1>
          <p className="text-base md:text-md font-roboto-serif font-normal text-[#DED6C8] leading-[2.5em] mb-8 max-w-2xl mx-auto">
            Chào mừng bạn đến với phòng VIP của quán ăn chúng tôi, nơi sang
            trọng và riêng tư hòa quyện với nhau để tạo ra một trải nghiệm ẩm
            thực khó quên.
          </p>
          <p className="text-sm md:text-base  font-normal text-[#C3B29D] leading-tight">
            Khám phá ngay
          </p>
        </div>
      </section>

      {/* Middle Section - Elevate Your Dining */}
      <SectionContainer
        background="cream-light"
        padding="none"
        className="text-center pt-20"
      >
        <p className="text-base  font-normal text-[#C4AA89] mb-4 leading-tight">
          Khám phá Phòng VIP
        </p>
        <h2 className="text-4xl md:text-5xl lg:text-[40px]  font-semibold text-[#463B34] leading-tight mb-8">
          Nâng Tầm Trải Nghiệm Ẩm Thực
        </h2>
        <p className="text-lg md:text-xl  font-medium text-[#877C76] leading-tight max-w-4xl mx-auto">
          Trải nghiệm ẩm thực sang trọng
        </p>
      </SectionContainer>

      {/* Detailed Section with Image and Content 1 */}
      <SectionContainer background="cream-light" padding="md">
        <div
          ref={section1Ref}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start transition-all duration-1000 ${
            section1Visible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Left Side - Image */}
          <div className="order-1 lg:order-1">
            <div className="relative w-full h-[400px] md:h-[500px] lg:h-[528px] rounded-lg overflow-hidden shadow-lg group">
              <Image
                src="/images/vip1.jpg"
                alt="VIP Room Interior"
                fill
                className="object-cover cursorWhite hidden md:block object-[30%_center] transition-transform duration-500 group-hover:scale-110"
                sizes="(min-width: 1300px) 50vw, 40vw"
                priority
              />

              {/* Mobile Image */}
              <Image
                src="/images/vip1Mobile.jpg"
                alt="VIP Room Interior"
                fill
                className="object-cover block md:hidden object-[10%_center] transition-transform duration-500 group-hover:scale-110"
                sizes="100vw"
                priority
              />
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="order-2 lg:order-2 space-y-6">
            <h3 className="text-2xl md:text-3xl font-serif font-normal text-[#3D3634] leading-tight">
              Phòng VIP 1 - Không gian Sang Trọng dành cho 6 người
            </h3>

            <div>
              <h4 className="text-lg md:text-xl  font-medium text-[#6a5844] leading-tight">
                Các tiện ích:
              </h4>

              <ul className="text-base md:text-md  font-medium text-[#897F77] space-y-2 mt-2">
                <li>- Máy lạnh, toilet riêng</li>
                <li>- Thiết kế theo phong cách hầm rượu</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg md:text-xl  font-medium text-[#6a5844] leading-tight mt-3">
                Ưu đãi phòng:
              </h4>
              <ul className=" text-base md:text-md  font-medium text-[#897F77] space-y-2 mt-2">
                <li>- Tặng trang trí đơn giản: bóng bay và chữ HPBD</li>
                <li>- Hỗ trợ miễn phí đặt trước: loa phát nhạc, máy chiếu</li>
              </ul>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0 mt-2">
              <ThemXuaButton
                variant="primary"
                size="md"
                href="/booking#booking"
                className="w-full md:w-auto text-themxua-white"
              >
                Đặt bàn
              </ThemXuaButton>
              <small className="italic text-[#C4AA89] block md:inline mt-1 md:mt-0">
                Phụ thu 45k /1h. Miễn phí từ tiếng thứ 4.
              </small>
            </div>
          </div>
        </div>
      </SectionContainer>
      {/* Detailed Section with Image and Content 2 */}
      <SectionContainer background="cream-light" padding="md">
        <div
          ref={section2Ref}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start transition-all duration-1000 ${
            section2Visible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Left Side - Image */}
          <div className="order-2 lg:order-1 space-y-6">
            <h3 className="text-2xl md:text-3xl font-serif font-normal text-[#3D3634] leading-tight">
              Phòng VIP 2 - Không gian Sang Trọng dành cho 8 người
            </h3>

            <div>
              <h4 className="text-lg md:text-xl  font-medium text-[#6a5844] leading-tight">
                Các tiện ích:
              </h4>

              <ul className="text-base md:text-md  font-medium text-[#897F77] space-y-2 mt-2">
                <li>- Máy lạnh, toilet riêng</li>
                <li>- Thiết kế theo phong cách hầm rượu</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg md:text-xl  font-medium text-[#6a5844] leading-tight mt-3">
                Ưu đãi phòng:
              </h4>
              <ul className=" text-base md:text-md  font-medium text-[#897F77] space-y-2 mt-2">
                <li>- Tặng trang trí đơn giản: bóng bay và chữ HPBD</li>
                <li>- Hỗ trợ miễn phí đặt trước: loa phát nhạc, máy chiếu</li>
              </ul>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0 mt-2">
              <ThemXuaButton
                variant="primary"
                size="md"
                href="/booking#booking"
                className="w-full md:w-auto text-themxua-white"
              >
                Đặt bàn
              </ThemXuaButton>
              <small className="italic text-[#C4AA89] block md:inline mt-1 md:mt-0">
                Phụ thu 45k /1h. Miễn phí từ tiếng thứ 4.
              </small>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="order-1 lg:order-2">
            <div className="relative w-full h-[400px] md:h-[500px] lg:h-[528px] rounded-lg overflow-hidden shadow-lg group">
              <Image
                src="/images/vip2.jpg"
                alt="VIP Room Interior"
                fill
                className="object-cover cursorWhite hidden md:block object-[60%_center] transition-transform duration-500 group-hover:scale-110"
                sizes="(min-width: 1300px) 50vw, 40vw"
                priority
              />

              {/* Mobile Image */}
              <Image
                src="/images/vip2Mobile.jpg"
                alt="VIP Room Interior"
                fill
                className="object-cover block md:hidden object-[55%_center] transition-transform duration-500 group-hover:scale-110"
                sizes="100vw"
                priority
              />
            </div>
          </div>
        </div>
      </SectionContainer>
      {/* Detailed Section with Image and Content 3 */}
      <SectionContainer background="cream-light" padding="md">
        <div
          ref={section3Ref}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start transition-all duration-1000 ${
            section3Visible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Left Side - Image */}
          <div className="order-1 lg:order-1">
            <div className="relative w-full h-[400px] md:h-[500px] lg:h-[528px] rounded-lg overflow-hidden shadow-lg group">
              <Image
                src="/images/vip1.jpg"
                alt="VIP Room Interior"
                fill
                className="object-cover cursorWhite hidden md:block object-[30%_center] transition-transform duration-500 group-hover:scale-110"
                sizes="(min-width: 1300px) 50vw, 40vw"
                priority
              />

              {/* Mobile Image */}
              <Image
                src="/images/vip1Mobile.jpg"
                alt="VIP Room Interior"
                fill
                className="object-cover block md:hidden object-[80%_center] transition-transform duration-500 group-hover:scale-110"
                sizes="100vw"
                priority
              />
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="order-2 lg:order-2 space-y-6">
            <h3 className="text-2xl md:text-3xl font-serif font-normal text-[#3D3634] leading-tight">
              Phòng VIP 3 - Không gian Sang Trọng dành cho 12 người
            </h3>

            <div>
              <h4 className="text-lg md:text-xl  font-medium text-[#6a5844] leading-tight">
                Các tiện ích:
              </h4>

              <ul className="text-base md:text-md  font-medium text-[#897F77] space-y-2 mt-2">
                <li>- Máy lạnh, toilet riêng</li>
                <li>- Thiết kế theo phong cách hầm rượu</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg md:text-xl  font-medium text-[#6a5844] leading-tight mt-3">
                Ưu đãi phòng:
              </h4>
              <ul className=" text-base md:text-md  font-medium text-[#897F77] space-y-2 mt-2">
                <li>- Tặng trang trí đơn giản: bóng bay và chữ HPBD</li>
                <li>- Hỗ trợ miễn phí đặt trước: loa phát nhạc, máy chiếu</li>
              </ul>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0 mt-2">
              <ThemXuaButton
                variant="primary"
                size="md"
                href="/booking#booking"
                className="w-full md:w-auto text-themxua-white"
              >
                Đặt bàn
              </ThemXuaButton>
              <small className="italic text-[#C4AA89] block md:inline mt-1 md:mt-0">
                Phụ thu 45k /1h. Miễn phí từ tiếng thứ 4.
              </small>
            </div>
          </div>
        </div>
      </SectionContainer>
      {/* Detailed Section with Image and Content 4 */}
      <SectionContainer background="cream-light" padding="md">
        <div
          ref={section4Ref}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start transition-all duration-1000 ${
            section4Visible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Left Side - Image */}
          <div className="order-2 lg:order-1 space-y-6">
            <h3 className="text-2xl md:text-3xl font-serif font-normal text-[#3D3634] leading-tight">
              Phòng VIP 2 - Không gian Sang Trọng dành cho 8 người
            </h3>

            <div>
              <h4 className="text-lg md:text-xl  font-medium text-[#6a5844] leading-tight">
                Các tiện ích:
              </h4>

              <ul className="text-base md:text-md  font-medium text-[#897F77] space-y-2 mt-2">
                <li>- Máy lạnh, toilet riêng</li>
                <li>- Thiết kế theo phong cách hầm rượu</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg md:text-xl  font-medium text-[#6a5844] leading-tight mt-3">
                Ưu đãi phòng:
              </h4>
              <ul className=" text-base md:text-md  font-medium text-[#897F77] space-y-2 mt-2">
                <li>- Tặng trang trí đơn giản: bóng bay và chữ HPBD</li>
                <li>- Hỗ trợ miễn phí đặt trước: loa phát nhạc, máy chiếu</li>
              </ul>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0 mt-2">
              <ThemXuaButton
                variant="primary"
                size="md"
                href="/booking#booking"
                className="w-full md:w-auto text-themxua-white"
              >
                Đặt bàn
              </ThemXuaButton>
              <small className="italic text-[#C4AA89] block md:inline mt-1 md:mt-0">
                Phụ thu 45k /1h. Miễn phí từ tiếng thứ 4.
              </small>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="order-1 lg:order-2">
            <div className="relative w-full h-[400px] md:h-[500px] lg:h-[528px] rounded-lg overflow-hidden shadow-lg group">
              <Image
                src="/images/vip1.jpg"
                alt="VIP Room Interior"
                fill
                className="object-cover cursorWhite hidden md:block object-[30%_center] transition-transform duration-500 group-hover:scale-110"
                sizes="(min-width: 1300px) 50vw, 40vw"
                priority
              />

              {/* Mobile Image */}
              <Image
                src="/images/vip1Mobile.jpg"
                alt="VIP Room Interior"
                fill
                className="object-cover block md:hidden transition-transform duration-500 group-hover:scale-110"
                sizes="100vw"
                priority
              />
            </div>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
};

export default VipRoomPage;
