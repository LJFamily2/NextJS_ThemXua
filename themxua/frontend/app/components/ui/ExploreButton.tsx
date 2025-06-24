'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRightIcon } from './Icons';

interface ExploreButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const ExploreButton: React.FC<ExploreButtonProps> = ({
  href,
  children,
  className = '',
}) => {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 text-themxua-primary hover:text-themxua-secondary transition-colors duration-300 ${className}`}
    >
      <span className="font-roboto-serif font-semibold text-sm leading-tight">
        {children}
      </span>

      {/* Arrow Line */}
      <div className="flex items-center">
        <div className="w-12 lg:w-[70px] h-0.5 bg-themxua-primary group-hover:bg-themxua-secondary transition-colors duration-300" />
        <ArrowRightIcon
          size={16}
          className="ml-1 transform group-hover:translate-x-1 transition-transform duration-300"
        />
      </div>
    </Link>
  );
};

export default ExploreButton;
