'use client';

import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white' | 'charcoal';
  text?: string;
  className?: string;
}

interface LoadingPageProps {
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
}

interface LoadingSkeletonProps {
  variant?: 'text' | 'card' | 'image' | 'button';
  className?: string;
}

// Loading Spinner Component
export function LoadingSpinner({
  size = 'md',
  color = 'primary',
  text,
  className = '',
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  const colorClasses = {
    primary: 'border-terracotta-500',
    secondary: 'border-sage-500',
    white: 'border-white',
    charcoal: 'border-charcoal-600',
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div
        className={`
          ${sizeClasses[size]}
          ${colorClasses[color]}
          animate-spin rounded-full border-2 border-t-transparent
        `}
      />
      {text && (
        <p className="mt-3 text-sm font-medium text-charcoal-600">{text}</p>
      )}
    </div>
  );
}

// Loading Page Component
export function LoadingPage({
  title = 'Loading...',
  subtitle,
  showLogo = true,
}: LoadingPageProps) {
  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center">
      <div className="text-center">
        {showLogo && (
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold text-charcoal-800 mb-2">
              ThemXua
            </h1>
            <div className="w-16 h-1 bg-terracotta-500 mx-auto rounded-full" />
          </div>
        )}

        <LoadingSpinner size="lg" color="primary" className="mb-6" />

        <h2 className="text-xl font-display font-semibold text-charcoal-800 mb-2">
          {title}
        </h2>

        {subtitle && (
          <p className="text-charcoal-600 max-w-md mx-auto">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

// Loading Skeleton Component
export function LoadingSkeleton({
  variant = 'text',
  className = '',
}: LoadingSkeletonProps) {
  const baseClasses = 'bg-sage-100 rounded animate-pulse';

  const variantClasses = {
    text: 'h-4 w-3/4',
    card: 'h-64 w-full',
    image: 'h-48 w-full',
    button: 'h-10 w-32',
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`} />
  );
}

// Loading Card Skeleton
export function LoadingCardSkeleton({
  className = '',
}: {
  className?: string;
}) {
  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}
    >
      <LoadingSkeleton variant="image" />
      <div className="p-6 space-y-3">
        <LoadingSkeleton variant="text" className="h-6 w-4/5" />
        <LoadingSkeleton variant="text" className="h-4 w-full" />
        <LoadingSkeleton variant="text" className="h-4 w-3/4" />
        <div className="pt-2">
          <LoadingSkeleton variant="button" />
        </div>
      </div>
    </div>
  );
}

// Default export
export default LoadingSpinner;
