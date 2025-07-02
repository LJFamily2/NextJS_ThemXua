'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ScrollToTopProps {
  className?: string;
  showAfter?: number; // pixels scrolled before showing button
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({
  className,
  showAfter = 300,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > showAfter) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [showAfter]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    // Remove focus from the button after clicking
    setTimeout(() => {
      buttonRef.current?.blur();
    }, 300); 
  };

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-6 right-6 z-50 p-3 bg-themxua-primary text-white rounded-full shadow-lg hover:bg-themxua-secondary transition-all duration-300 transform',
        isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-2 scale-95 pointer-events-none',
        'hover:scale-110 active:scale-95',
        'focus:outline-none focus:ring-2 focus:ring-themxua-primary focus:ring-offset-2',
        className
      )}
      aria-label="Scroll to top"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 15.75l7.5-7.5 7.5 7.5"
        />
      </svg>
    </button>
  );
};

export default ScrollToTop;
