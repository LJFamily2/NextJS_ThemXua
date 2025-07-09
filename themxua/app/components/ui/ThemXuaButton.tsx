'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const ThemXuaButton: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  href,
  onClick,
  disabled = false,
  icon,
  iconPosition = 'right',
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-roboto-serif font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary:
      'bg-themxua-secondary text-themxua-accent hover:bg-themxua-dark hover:scale-105 active:scale-95 focus:ring-themxua-secondary',
    secondary:
      'bg-themxua-cream text-themxua-primary hover:bg-themxua-background hover:scale-105 active:scale-95 focus:ring-themxua-primary',
    outline:
      'border-2 border-themxua-secondary text-themxua-secondary bg-transparent hover:bg-themxua-secondary hover:text-themxua-accent focus:ring-themxua-secondary',
    ghost:
      'text-themxua-primary hover:text-themxua-secondary hover:bg-themxua-background/50 focus:ring-themxua-primary',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-md gap-2',
    md: 'px-6 py-3 text-base rounded-lg gap-2',
    lg: 'px-8 py-4 text-lg rounded-xl gap-3',
  };

  const buttonClasses = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <span className="flex-shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="flex-shrink-0">{icon}</span>
      )}
    </>
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={buttonClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button className={buttonClasses} onClick={onClick} disabled={disabled}>
      {content}
    </button>
  );
};

export default ThemXuaButton;
