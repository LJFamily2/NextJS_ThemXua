'use client';

import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  className?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  href,
  disabled = false,
  className = '',
}: ButtonProps) {
  // Base styles
  const baseStyles =
    'font-body font-semibold rounded-full transition-all duration-300 inline-flex items-center justify-center';

  // Size variations
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  // Variant styles
  const variantStyles = {
    primary:
      'bg-accent text-white hover:bg-accent/80 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
    secondary:
      'bg-secondary text-white hover:bg-secondary/80 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
    outline:
      'border-2 border-primary text-primary hover:bg-primary hover:text-neutral transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
    ghost:
      'text-primary hover:bg-primary/10 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
  };

  const buttonClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  // If href is provided, render as link
  if (href && !disabled) {
    return (
      <a href={href} className={buttonClasses}>
        {children}
      </a>
    );
  }

  // Otherwise render as button
  return (
    <button onClick={onClick} disabled={disabled} className={buttonClasses}>
      {children}
    </button>
  );
}
