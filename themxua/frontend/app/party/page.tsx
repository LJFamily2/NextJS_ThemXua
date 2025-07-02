'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon } from '../components/ui/Icons';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';

// Party images data
const partyImages = [
  {
    id: 1,
    src: '/images/party/party-image-1.jpg',
    alt: 'Sảnh tiệc 1 - Không gian tiệc sang trọng',
    title: 'Không gian tiệc sang trọng',
    position: 'center', // example value, adjust as needed
  },
  {
    id: 2,
    src: '/images/party/party-image-2.jpg',
    alt: 'Sảnh tiệc 2 - Sự kiện đặc biệt',
    title: 'Sự kiện đặc biệt',
    position: 'top', // example value, adjust as needed
  },
  {
    id: 3,
    src: '/images/party/party-image-3.jpg',
    alt: 'Sảnh tiệc 3 - Tiệc tùng sôi động',
    title: 'Tiệc tùng sôi động',
    position: 'bottom', // example value, adjust as needed
  },
  {
    id: 4,
    src: '/images/party/party-image-3.jpg',
    alt: 'Sảnh tiệc 4 - Tiệc cưới lãng mạn',
    title: 'Tiệc cưới lãng mạn',
    position: 'center', // example value, adjust as needed
  },
];

// Carousel Component
interface CarouselProps {
  images: typeof partyImages;
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, images.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % images.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative w-full">
      {/* Main Carousel Container */}
      <div className="relative w-full h-[300px] md:h-[409px] overflow-hidden rounded-lg shadow-xl">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              index === currentIndex
                ? 'translate-x-0'
                : index < currentIndex
                  ? '-translate-x-full'
                  : 'translate-x-full'
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="(min-width: 768px) 100vw, 100vw"
            />
            {/* Image overlay with title */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                <h3 className="text-white text-lg md:text-xl font-medium">
                  {image.title}
                </h3>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 z-10"
          aria-label="Previous image"
        >
          <ArrowRightIcon size={20} className="rotate-180" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 z-10"
          aria-label="Next image"
        >
          <ArrowRightIcon size={20} />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-themxua-secondary'
                : 'bg-themxua-gray/30 hover:bg-themxua-gray/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      {isAutoPlaying && (
        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
          Auto
        </div>
      )}
    </div>
  );
};

// Marquee Gallery Component with infinite scrolling animation
const animation = { duration: 15000, easing: (t: number) => t };

const MarqueeGallery: React.FC<CarouselProps> = ({ images }) => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    renderMode: 'performance',
    drag: false,
    slides: {
      perView: 'auto',
      spacing: 32,
    },
    created(slider) {
      slider.moveToIdx(images.length, true, animation);
    },
    updated(slider) {
      slider.moveToIdx(
        slider.track.details.abs + images.length,
        true,
        animation
      );
    },
    animationEnded(slider) {
      slider.moveToIdx(
        slider.track.details.abs + images.length,
        true,
        animation
      );
    },
  });

  // Triple the images for seamless infinite scrolling
  const extendedImages = [...images];

  return (
    <div ref={sliderRef} className="keen-slider ">
      {extendedImages.map((image, idx) => (
        <div
          key={`${image.id}-${idx}`}
          className="keen-slider__slide relative w-[350px] h-[250px] md:h-[300px] lg:h-[409px] rounded-lg overflow-hidden shadow-lg cursorWhite"
          style={{ minWidth: '350px', maxWidth: '350px' }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className={`object-cover ${image.position ? `object-${image.position}` : ''}`}
            sizes="350px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
            <div className="absolute bottom-4 left-4 bg-black/40 px-3 py-1 rounded text-white text-lg font-medium">
              {image.title}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function PartyPage() {
  return (
    <div className="min-h-screen bg-themxua-cream-light pt-[70px]">
      {/* Hero Section */}
      <section className="bg-themxua-cream-light py-16 lg:py-20">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-[70px]">
          {/* Header Content */}
          <div className="text-center mb-16 lg:mb-20">
            <h1 className=" font-semibold text-4xl md:text-5xl lg:text-[57px] leading-tight text-[#463B34] mb-6">
              Sảnh Tiệc Sôi Động
            </h1>
            <p className=" font-medium text-lg md:text-xl lg:text-[20px] leading-relaxed text-[#877C76] mb-8 max-w-4xl mx-auto">
              Trọn vẹn niềm vui trong từng khoảnh khắc
            </p>

            {/* CTA Button */}
            <Link
              href="/party#gallery"
              className="inline-flex items-center gap-3 text-[#C4AA89] hover:text-themxua-secondary transition-colors duration-300 group"
            >
              <span className="font-work-sans text-base">
                Khám phá sảnh tiệc
              </span>
              <div className="flex items-center">
                <div className="w-12 lg:w-[50px] h-0.5 bg-[#C4AA89] group-hover:bg-themxua-secondary transition-colors duration-300" />
                <ArrowRightIcon
                  size={16}
                  className="ml-1 transform group-hover:translate-x-1 transition-transform duration-300"
                />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-themxua-cream py-16 lg:py-20" id="gallery">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-[70px]">
          {/* Mobile: Carousel View */}
          <div className="block md:hidden mb-16">
            <h2 className="text-2xl md:text-3xl  font-medium text-themxua-primary mb-8 text-center">
              Hình Ảnh Sảnh Tiệc
            </h2>
            <Carousel images={partyImages} />
          </div>

          {/* Desktop: Marquee View */}
          <div className="hidden md:block ">
            <h2 className="text-3xl lg:text-4xl  font-medium text-themxua-primary mb-12 text-center">
              Hình Ảnh Sảnh Tiệc
            </h2>
            <MarqueeGallery images={partyImages} />
          </div>
        </div>
      </section>

      {/* Additional Information Section */}
      <section className="bg-themxua-cream-darker py-16 lg:py-20">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-[70px]">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl  font-medium text-themxua-primary mb-8">
              Dịch Vụ Tiệc Chuyên Nghiệp
            </h2>
            <p className="text-lg text-themxua-gray leading-relaxed mb-8">
              Chúng tôi cung cấp dịch vụ tổ chức tiệc chuyên nghiệp với không
              gian sang trọng, menu đa dạng và đội ngũ phục vụ tận tâm. Hãy để
              chúng tôi biến sự kiện của bạn thành những kỷ niệm đáng nhớ.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-themxua-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">🎉</span>
                </div>
                <h3 className="text-xl font-medium text-themxua-primary mb-2">
                  Sự Kiện Đặc Biệt
                </h3>
                <p className="text-themxua-gray">
                  Sinh nhật, kỷ niệm, tiệc công ty
                </p>
              </div>

              <div className="text-center">
                <Link href="/menu" target="_blank" className="inline-block">
                  <div className="w-16 h-16 bg-themxua-secondary rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-themxua-dark transition-colors duration-200">
                    <span className="text-2xl text-white">🍽️</span>
                  </div>
                </Link>
                <h3 className="text-xl font-medium text-themxua-primary mb-2">
                  Thực Đơn Phong Phú
                </h3>
                <p className="text-themxua-gray">
                  Món Việt truyền thống và hiện đại
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-themxua-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">👥</span>
                </div>
                <h3 className="text-xl font-medium text-themxua-primary mb-2">
                  Phục Vụ Chuyên Nghiệp
                </h3>
                <p className="text-themxua-gray">Đội ngũ nhiều kinh nghiệm</p>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="mt-12">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center bg-themxua-secondary text-themxua-white hover:bg-themxua-dark px-8 py-4 rounded-lg font-medium transition-all duration-300 hover:scale-105"
              >
                Liên Hệ Đặt Tiệc
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
