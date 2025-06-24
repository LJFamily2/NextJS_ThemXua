'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  background?:
    | 'cream'
    | 'cream-light'
    | 'cream-darker'
    | 'cream-darkest'
    | 'white'
    | 'transparent';
  padding?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '7xl' | 'full';
}

const SectionContainer: React.FC<SectionContainerProps> = ({
  children,
  className = '',
  background = 'transparent',
  padding = 'lg',
  maxWidth = '7xl',
}) => {
  const backgroundClasses = {
    cream: 'bg-themxua-cream',
    'cream-light': 'bg-themxua-cream-light',
    'cream-darker': 'bg-themxua-cream-darker',
    'cream-darkest': 'bg-themxua-cream-darkest',
    white: 'bg-white',
    transparent: 'bg-transparent',
  };

  const paddingClasses = {
    none: '',
    sm: 'py-8 lg:py-12',
    md: 'py-12 lg:py-16',
    lg: 'py-16 lg:py-24',
    xl: 'py-24 lg:py-32',
  };

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full',
  };

  return (
    <section
      className={cn(
        backgroundClasses[background],
        paddingClasses[padding],
        className
      )}
    >
      <div
        className={cn(
          'w-full mx-auto px-4 md:px-8 lg:px-[70px]',
          maxWidthClasses[maxWidth]
        )}
      >
        {children}
      </div>
    </section>
  );
};

export default SectionContainer;
