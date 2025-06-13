'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Zap,
  Coffee,
  Utensils,
  CalendarDays,
  Users,
  TrendingUp,
  Award,
} from 'lucide-react'; // Removed ImageIcon
import { useInView } from 'react-intersection-observer';

interface SpotlightItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

interface StatItemProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay?: number;
}

const spotlightItemsData: SpotlightItem[] = [
  {
    id: '1',
    type: 'image',
    src: '/images/spotlight/restaurant-interior.jpg',
    alt: 'Elegant restaurant interior with warm lighting',
  },
  {
    id: '2',
    type: 'image',
    src: '/images/spotlight/chef-plating-dish.jpg',
    alt: 'Chef meticulously plating a gourmet dish',
  },
  {
    id: '3',
    type: 'image',
    src: '/images/spotlight/outdoor-seating-garden.jpg',
    alt: 'Charming outdoor seating area in a garden setting',
  },
  {
    id: '4',
    type: 'image',
    src: '/images/spotlight/close-up-cocktail.jpg',
    alt: 'Artistically crafted cocktail with a garnish',
  },
  {
    id: '5',
    type: 'image',
    src: '/images/spotlight/group-dining-laughter.jpg',
    alt: 'Friends laughing and dining together at a table',
  },
];

const featureCardsData: Omit<FeatureCardProps, 'delay'>[] = [
  {
    icon: <Utensils className="w-10 h-10 text-amber-600" />,
    title: 'Exquisite Cuisine',
    description:
      'Discover dishes crafted with the freshest local ingredients by our award-winning chefs.',
  },
  {
    icon: <Coffee className="w-10 h-10 text-amber-600" />,
    title: 'Ambiance Perfected',
    description:
      'Experience a unique atmosphere that blends traditional charm with modern elegance.',
  },
  {
    icon: <CalendarDays className="w-10 h-10 text-amber-600" />,
    title: 'Memorable Events',
    description:
      'Host your special occasions with us, from intimate dinners to grand celebrations.',
  },
];

const statsItemsData: Omit<StatItemProps, 'delay'>[] = [
  {
    icon: <TrendingUp className="w-8 h-8 text-white" />,
    value: '10+',
    label: 'Years Serving',
  },
  {
    icon: <Users className="w-8 h-8 text-white" />,
    value: '50k+',
    label: 'Happy Guests',
  },
  {
    icon: <Award className="w-8 h-8 text-white" />,
    value: '3',
    label: 'Cuisine Awards',
  },
];

const galleryImagesData = [
  {
    src: '/images/gallery/gallery-thumb-1.jpg',
    alt: 'Gallery image 1 - Dish detail',
  },
  {
    src: '/images/gallery/gallery-thumb-2.jpg',
    alt: 'Gallery image 2 - Restaurant decor',
  },
  {
    src: '/images/gallery/gallery-thumb-3.jpg',
    alt: 'Gallery image 3 - Event setup',
  },
  {
    src: '/images/gallery/gallery-thumb-4.jpg',
    alt: 'Gallery image 4 - Happy customers',
  },
];

const AnimatedSection: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className, delay = 0 }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  delay,
}) => (
  <AnimatedSection
    delay={delay}
    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
  >
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-xl font-playfair font-semibold text-gray-800 mb-2 text-center">
      {title}
    </h3>
    <p className="text-gray-600 text-center text-sm leading-relaxed">
      {description}
    </p>
  </AnimatedSection>
);

const StatItem: React.FC<StatItemProps> = ({ icon, value, label, delay }) => (
  <AnimatedSection
    delay={delay}
    className="text-center bg-amber-700/20 backdrop-blur-sm p-4 rounded-lg"
  >
    <div className="flex justify-center mb-2">{icon}</div>
    <div className="text-3xl font-bold text-white">{value}</div>
    <div className="text-sm text-amber-100 uppercase tracking-wider">
      {label}
    </div>
  </AnimatedSection>
);

const ModernSpotlight: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % spotlightItemsData.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      prevIndex =>
        (prevIndex - 1 + spotlightItemsData.length) % spotlightItemsData.length
    );
  };

  useEffect(() => {
    const timer = setTimeout(handleNext, 7000); // Auto-scroll every 7 seconds
    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <section
      id="modern-spotlight"
      className="py-16 md:py-24 bg-gradient-to-br from-stone-100 to-amber-50 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-50">
        {/* Optional: Add a subtle background pattern or image here */}
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-800 mb-4">
            Experience <span className="text-amber-600">Thềm Xưa</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Step into a world where culinary artistry meets timeless elegance.
            Discover the moments that make us unique.
          </p>
        </AnimatedSection>

        {/* Interactive Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 md:mb-24 px-4 md:px-0">
          {featureCardsData.map((card, index) => (
            <FeatureCard key={card.title} {...card} delay={index * 0.2} />
          ))}
        </div>

        {/* Combined Stats & Image Gallery Section */}
        <AnimatedSection className="bg-amber-600 rounded-xl shadow-2xl p-8 md:p-12 relative overflow-hidden mb-16 md:mb-24">
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-amber-500/50 rounded-full filter blur-xl opacity-70"></div>
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-amber-500/50 rounded-full filter blur-2xl opacity-70"></div>

          <div className="relative z-10 md:flex md:items-center md:gap-8">
            <div className="md:w-1/3 mb-8 md:mb-0">
              <h3 className="text-3xl font-playfair font-semibold text-white mb-6">
                Our Journey, Your Joy
              </h3>
              <p className="text-amber-50 mb-8 leading-relaxed">
                We&apos;re proud of our heritage and the experiences we&apos;ve
                created. Here&apos;s a glimpse into our story.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-4">
                {statsItemsData.map((stat, index) => (
                  <StatItem key={stat.label} {...stat} delay={index * 0.25} />
                ))}
              </div>
            </div>
            <div className="md:w-2/3">
              <div className="grid grid-cols-2 gap-4">
                {galleryImagesData.map((img, index) => (
                  <AnimatedSection
                    key={index}
                    delay={index * 0.15}
                    className="aspect-square rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={400}
                      height={400}
                      className="object-cover w-full h-full"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Main Spotlight Carousel (Optional - can be a simpler version or focused on specific promotions) */}
        <AnimatedSection className="relative w-full max-w-4xl mx-auto aspect-[16/9] overflow-hidden rounded-lg shadow-2xl group bg-black">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <Image
                src={spotlightItemsData[currentIndex].src}
                alt={spotlightItemsData[currentIndex].alt}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-1000 ease-in-out group-hover:scale-105"
                priority={currentIndex === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              {spotlightItemsData[currentIndex].title && (
                <div className="absolute bottom-0 left-0 p-6 md:p-10 text-white">
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-2xl md:text-4xl font-playfair font-semibold mb-2"
                  >
                    {spotlightItemsData[currentIndex].title}
                  </motion.h3>
                  {spotlightItemsData[currentIndex].description && (
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="text-sm md:text-base max-w-lg"
                    >
                      {spotlightItemsData[currentIndex].description}
                    </motion.p>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-amber-600 transition-colors duration-300 z-20 opacity-0 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
            aria-label="Previous image"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-amber-600 transition-colors duration-300 z-20 opacity-0 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
            aria-label="Next image"
          >
            <ChevronRight size={28} />
          </button>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
            {spotlightItemsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-amber-500 scale-125' : 'bg-white/50 hover:bg-white/80'}`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="text-center mt-12 md:mt-16">
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: '0px 0px 12px rgb(245,158,11)',
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-amber-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-amber-700 transition-all duration-300 text-lg inline-flex items-center gap-2"
            onClick={() => {
              const bookingSection = document.getElementById('modern-booking');
              if (bookingSection) {
                bookingSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <Zap size={20} />
            Book Your Table Now
          </motion.button>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ModernSpotlight;
