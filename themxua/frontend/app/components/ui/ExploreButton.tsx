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
      <div className="flex items-center bg-themxua-primary/5 rounded-full px-6 py-2 group-hover:bg-themxua-secondary/10 transition-colors duration-300">
        <span className="font-roboto-serif font-semibold text-xl leading-tight text-themxua-primary group-hover:text-themxua-secondary transition-colors duration-300">
          {children}
        </span>
        <span className="ml-4 flex items-center">
          <ArrowRightIcon
            size={18}
            className="transform transition-transform duration-300 group-hover:translate-x-2 text-themxua-primary group-hover:text-themxua-secondary"
          />
        </span>
      </div>
    </Link>
  );
};

export default ExploreButton;
