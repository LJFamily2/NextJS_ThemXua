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
          <p className="text-charcoal-600 max-w-md mx-auto">
            {subtitle}
          </p>
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
export function LoadingCardSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
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

// Loading List Skeleton
export function LoadingListSkeleton({ 
  items = 3, 
  className = '' 
}: { 
  items?: number;
  className?: string;
}) {
  return (
    <div className={`space-y-6 ${className}`}>
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="flex items-start space-x-4">
          <LoadingSkeleton variant="image" className="h-16 w-16 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <LoadingSkeleton variant="text" className="h-5 w-1/3" />
            <LoadingSkeleton variant="text" className="h-4 w-full" />
            <LoadingSkeleton variant="text" className="h-4 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Loading Button Component
export function LoadingButton({
  children,
  loading = false,
  disabled = false,
  className = '',
  ...props
}: {
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const isDisabled = disabled || loading;
  
  return (
    <button
      {...props}
      disabled={isDisabled}
      className={`
        relative inline-flex items-center justify-center
        ${isDisabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
        ${className}
      `}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner size="sm" color="white" />
        </div>
      )}
      <span className={loading ? 'invisible' : ''}>
        {children}
      </span>
    </button>
  );
}

// Default export

interface LoadingDotsProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export function LoadingDots({
  size = 'md',
  color = 'currentColor',
}: LoadingDotsProps) {
  const sizeClasses = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3',
  };

  return (
    <div className="loading-dots">
      <span
        className={`${sizeClasses[size]} rounded-full`}
        style={{ backgroundColor: color }}
      />
      <span
        className={`${sizeClasses[size]} rounded-full`}
        style={{ backgroundColor: color }}
      />
      <span
        className={`${sizeClasses[size]} rounded-full`}
        style={{ backgroundColor: color }}
      />
    </div>
  );
}

interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
}

export function Skeleton({
  width = '100%',
  height = '20px',
  className = '',
}: SkeletonProps) {
  return <div className={`skeleton ${className}`} style={{ width, height }} />;
}

interface ProgressBarProps {
  progress: number;
  className?: string;
  showText?: boolean;
}

export function ProgressBar({
  progress,
  className = '',
  showText = false,
}: ProgressBarProps) {
  return (
    <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
      <div
        className="h-2 rounded-full progress-bar transition-all duration-300 ease-out"
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
      {showText && (
        <div className="text-center text-xs text-gray-600 mt-1">
          {Math.round(progress)}%
        </div>
      )}
    </div>
  );
}

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTransition({
  children,
  className = '',
}: PageTransitionProps) {
  return <div className={`page-transition ${className}`}>{children}</div>;
}

interface StaggerListProps {
  children: React.ReactNode[];
  className?: string;
}

export function StaggerList({ children, className = '' }: StaggerListProps) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <div key={index} className="stagger-item">
          {child}
        </div>
      ))}
    </div>
  );
}

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function FadeIn({ children, delay = 0, className = '' }: FadeInProps) {
  return (
    <div
      className={`fade-in ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

interface SlideInProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
  className?: string;
}

export function SlideIn({
  children,
  direction = 'left',
  delay = 0,
  className = '',
}: SlideInProps) {
  const directionClass =
    direction === 'left' ? 'slide-in-left' : 'slide-in-right';

  return (
    <div
      className={`${directionClass} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default LoadingSpinner;
