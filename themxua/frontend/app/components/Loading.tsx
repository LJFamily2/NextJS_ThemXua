'use client';

import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white' | 'gray';
  text?: string;
}

export function LoadingSpinner({
  size = 'md',
  color = 'primary',
  text,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  const colorClasses = {
    primary: 'border-orange-600',
    white: 'border-white',
    gray: 'border-gray-600',
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`animate-spin rounded-full border-2 border-t-transparent ${sizeClasses[size]} ${colorClasses[color]}`}
      />
      {text && (
        <p className="mt-2 text-sm text-gray-600 animate-pulse">{text}</p>
      )}
    </div>
  );
}

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
