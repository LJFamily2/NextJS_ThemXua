'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/app/utils/cn';
import { useLanguage } from '@/app/contexts/LanguageContext';

const LoadingScreen = () => {
  const { isLoading } = useLanguage();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      // Reduced delay for faster disappearance
      const timeout = setTimeout(() => {
        setShow(false);
      }, 0);
      return () => clearTimeout(timeout);
    } else {
      setShow(true);
    }
  }, [isLoading]);

  if (!show) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-[9999] flex items-center justify-center bg-themxua-dark',
        'transition-all duration-500',
        'opacity-100'
      )}
    >
      <div className="relative flex items-center justify-center">
        {/* Outer spinning ring */}
        <div className="absolute w-40 h-40 border-4 border-transparent border-t-themxua-accent border-r-themxua-accent rounded-full animate-spin opacity-80"></div>

        {/* Inner spinning ring - spinning in reverse direction */}
        <div
          className="absolute w-32 h-32 border-2 border-transparent border-t-themxua-orange border-l-themxua-orange rounded-full opacity-60 animate-spin"
          style={{ animationDirection: 'reverse' }}
        ></div>

        {/* Center logo container with glow effect */}
        <div className="relative w-28 h-28 flex items-center justify-center">
          {/* Glow background */}
          <div className="absolute inset-0 bg-themxua-accent/20 rounded-full blur-lg animate-pulse"></div>

          {/* Logo */}
          <Image
            src="/images/logoLoading.webp"
            alt="ThemXua Logo"
            width={70}
            height={70}
            className="animate-breathe z-10 relative drop-shadow-lg"
            priority
          />
        </div>

        {/* Decorative dots */}
        <div className="absolute w-48 h-48">
          <div className="absolute top-0 left-1/2 w-2 h-2 bg-themxua-accent rounded-full transform -translate-x-1/2 animate-pulse"></div>
          <div
            className="absolute bottom-0 left-1/2 w-2 h-2 bg-themxua-accent rounded-full transform -translate-x-1/2 animate-pulse"
            style={{ animationDelay: '0.5s' }}
          ></div>
          <div
            className="absolute left-0 top-1/2 w-2 h-2 bg-themxua-accent rounded-full transform -translate-y-1/2 animate-pulse"
            style={{ animationDelay: '1s' }}
          ></div>
          <div
            className="absolute right-0 top-1/2 w-2 h-2 bg-themxua-accent rounded-full transform -translate-y-1/2 animate-pulse"
            style={{ animationDelay: '1.5s' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
