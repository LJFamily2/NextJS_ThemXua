'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon } from '../components/ui/Icons';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { useLanguage } from '../contexts/LanguageContext';

// Party images data with translation keys
const partyImages = [
  {
    id: 1,
    src: '/images/partyVip3.jpeg',
    titleKey: 'party.image1Title',
    position: 'center',
  },
  {
    id: 2,
    src: '/images/partyVip2.jpg',
    titleKey: 'party.image2Title',
    position: 'top',
  },
  {
    id: 4,
    src: '/images/partyVip32.jpg',
    titleKey: 'party.image4Title',
    position: 'center',
  },
  {
    id: 3,
    src: '/images/partyBeerClub.jpeg',
    titleKey: 'party.image3Title',
    position: 'left',
  },
  {
    id: 5,
    src: '/images/partyBeerClub2.jpeg',
    titleKey: 'party.image4Title',
    position: 'center',
  },
  {
    id: 6,
    src: '/images/partyBeerClub3.jpeg',
    titleKey: 'party.image4Title',
    position: 'center',
  },
  {
    id: 7,
    src: '/images/partyKhuA.jpg',
    titleKey: 'party.image4Title',
    position: 'center',
  },
  {
    id: 8,
    src: '/images/partyKhuE.jpg',
    titleKey: 'party.image4Title',
    position: 'center',
  },
];

// Carousel Component
interface CarouselProps {
  images: typeof partyImages;
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const { t } = useLanguage();
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
              alt={t(image.titleKey)}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="(min-width: 768px) 100vw, 100vw"
            />
            {/* Image overlay with title */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                <h3 className="text-white text-lg md:text-xl font-medium">
                  {t(image.titleKey)}
                </h3>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 z-10"
          aria-label={t('party.nav.previousImage')}
        >
          <ArrowRightIcon size={20} className="rotate-180" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 z-10"
          aria-label={t('party.nav.nextImage')}
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
            aria-label={`${t('party.nav.goToSlide')} ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      {isAutoPlaying && (
        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
          {t('party.autoPlay')}
        </div>
      )}
    </div>
  );
};

// MarqueeGallery Component
const MarqueeGallery: React.FC<CarouselProps> = ({ images }) => {
  const { t } = useLanguage();
  const animation = { duration: 55000, easing: (t: number) => t };

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    renderMode: 'performance',
    drag: true,
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
  const extendedImages = [...images, ...images, ...images];

  return (
    <div ref={sliderRef} className="keen-slider">
      {extendedImages.map((image, idx) => (
        <div
          key={`${image.id}-${idx}`}
          className="keen-slider__slide relative w-[350px] h-[250px] md:h-[300px] lg:h-[409px] rounded-lg overflow-hidden shadow-lg cursorWhite"
          style={{ minWidth: '350px', maxWidth: '350px' }}
        >
          <Image
            src={image.src}
            alt={t(image.titleKey)}
            fill
            className={`object-cover ${image.position ? `object-${image.position}` : ''}`}
            sizes="350px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
            <div className="absolute bottom-4 left-4 bg-black/40 px-3 py-1 rounded text-white text-lg font-medium">
              {t(image.titleKey)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const dynamic = 'force-static';
// Static generation enabled for party page
export default function PartyPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-themxua-cream-light pt-[70px]">
      {/* Hero Section */}
      <section className="bg-themxua-cream-light py-16 lg:py-20">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-[70px]">
          {/* Header Content */}
          <div className="text-center mb-16 lg:mb-20">
            <h1 className="font-semibold text-4xl md:text-5xl lg:text-[57px] leading-tight text-[#463B34] mb-6">
              {t('party.hero.title')}
            </h1>
            <p className="font-medium text-lg md:text-xl lg:text-[20px] leading-relaxed text-[#877C76] mb-8 max-w-4xl mx-auto">
              {t('party.hero.subtitle')}
            </p>

            {/* CTA Button */}
            <Link
              href="/party#gallery"
              className="inline-flex items-center gap-3 text-[#C4AA89] hover:text-themxua-secondary transition-colors duration-300 group"
            >
              <span className="font-work-sans text-base">
                {t('party.hero.explore')}
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
            <h2 className="text-2xl md:text-3xl font-medium text-themxua-primary mb-8 text-center">
              {t('party.gallery.title')}
            </h2>
            <Carousel images={partyImages} />
          </div>

          {/* Desktop: Marquee View */}
          <div className="hidden md:block">
            <h2 className="text-3xl lg:text-4xl font-medium text-themxua-primary mb-12 text-center">
              {t('party.gallery.title')}
            </h2>
            <MarqueeGallery images={partyImages} />
          </div>
        </div>
      </section>

      {/* Additional Information Section */}
      <section className="bg-themxua-cream-darker py-16 lg:py-20">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-[70px]">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-medium text-themxua-primary mb-8">
              {t('party.services.title')}
            </h2>
            <p className="text-lg text-themxua-gray leading-relaxed mb-8">
              {t('party.services.description')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-themxua-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">🎉</span>
                </div>
                <h3 className="text-xl font-medium text-themxua-primary mb-2">
                  {t('party.services.events.title')}
                </h3>
                <p className="text-themxua-gray">
                  {t('party.services.events.description')}
                </p>
              </div>

              <div className="text-center">
                <Link href="/menu" target="_blank" className="inline-block">
                  <div className="w-16 h-16 bg-themxua-secondary rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-themxua-dark transition-colors duration-200">
                    <span className="text-2xl text-white">🍽️</span>
                  </div>
                </Link>
                <h3 className="text-xl font-medium text-themxua-primary mb-2">
                  {t('party.services.menu.title')}
                </h3>
                <p className="text-themxua-gray">
                  {t('party.services.menu.description')}
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-themxua-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">👥</span>
                </div>
                <h3 className="text-xl font-medium text-themxua-primary mb-2">
                  {t('party.services.staff.title')}
                </h3>
                <p className="text-themxua-gray">
                  {t('party.services.staff.description')}
                </p>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="mt-12">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center bg-themxua-secondary text-themxua-white hover:bg-themxua-dark px-8 py-4 rounded-lg font-medium transition-all duration-300 hover:scale-105"
              >
                {t('party.cta.contact')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
