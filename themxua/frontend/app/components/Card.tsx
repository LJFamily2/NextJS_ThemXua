'use client';

import { ReactNode } from 'react';
import Image from 'next/image';
import Button from './Button';

interface CardProps {
  children?: ReactNode;
  variant?: 'default' | 'menu' | 'event' | 'testimonial' | 'feature';
  className?: string;
  // Common props
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  // Menu card specific
  price?: string;
  category?: string;
  // Event card specific
  date?: string;
  time?: string;
  location?: string;
  // Testimonial specific
  author?: string;
  rating?: number;
  // Feature card specific
  icon?: string;
  // Action props
  buttonText?: string;
  buttonHref?: string;
  onButtonClick?: () => void;
}

export default function Card({
  children,
  variant = 'default',
  className = '',
  title,
  description,
  image,
  imageAlt,
  price,
  category,
  date,
  time,
  location,
  author,
  rating,
  icon,
  buttonText,
  buttonHref,
  onButtonClick,
}: CardProps) {
  const baseStyles =
    'bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden';

  const variantStyles = {
    default: 'hover:scale-105',
    menu: 'hover:scale-105 border border-neutral/10',
    event: 'hover:scale-105 border-l-4 border-accent',
    testimonial: 'hover:scale-105 bg-light border border-primary/10',
    feature: 'hover:scale-105 text-center border border-accent/20',
  };

  const cardClasses = `${baseStyles} ${variantStyles[variant]} ${className}`;

  // Menu Card
  if (variant === 'menu') {
    return (
      <div className={cardClasses}>
        {image && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={image}
              alt={imageAlt || title || 'Menu item'}
              fill
              className="object-cover transition-transform duration-300 hover:scale-110"
            />
            {category && (
              <div className="absolute top-3 left-3 bg-accent text-white px-3 py-1 rounded-full text-sm font-body font-medium">
                {category}
              </div>
            )}
          </div>
        )}
        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-heading text-xl font-semibold text-primary line-clamp-2">
              {title}
            </h3>
            {price && (
              <span className="font-body text-lg font-bold text-accent ml-2">
                {price}
              </span>
            )}
          </div>
          {description && (
            <p className="font-body text-gray-600 mb-4 line-clamp-3">
              {description}
            </p>
          )}
          {buttonText && (
            <Button
              variant="outline"
              size="sm"
              href={buttonHref}
              onClick={onButtonClick}
            >
              {buttonText}
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Event Card
  if (variant === 'event') {
    return (
      <div className={cardClasses}>
        {image && (
          <div className="relative h-40 overflow-hidden">
            <Image
              src={image}
              alt={imageAlt || title || 'Event image'}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            {date && (
              <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-body font-medium">
                {date}
              </span>
            )}
            {time && (
              <span className="text-gray-500 text-sm font-body">{time}</span>
            )}
          </div>
          <h3 className="font-heading text-xl font-semibold text-primary mb-2">
            {title}
          </h3>
          {description && (
            <p className="font-body text-gray-600 mb-4 line-clamp-3">
              {description}
            </p>
          )}
          {location && (
            <p className="font-body text-sm text-gray-500 mb-4">
              📍 {location}
            </p>
          )}
          {buttonText && (
            <Button
              variant="primary"
              size="sm"
              href={buttonHref}
              onClick={onButtonClick}
            >
              {buttonText}
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Testimonial Card
  if (variant === 'testimonial') {
    return (
      <div className={cardClasses}>
        <div className="p-6">
          {rating && (
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-lg ${
                    i < rating ? 'text-accent' : 'text-gray-300'
                  }`}
                >
                  ⭐
                </span>
              ))}
            </div>
          )}{' '}
          {description && (
            <blockquote className="font-body text-gray-700 italic mb-4 text-lg leading-relaxed">
              &ldquo;{description}&rdquo;
            </blockquote>
          )}
          {author && (
            <cite className="font-body font-semibold text-primary not-italic">
              — {author}
            </cite>
          )}
        </div>
      </div>
    );
  }

  // Feature Card
  if (variant === 'feature') {
    return (
      <div className={cardClasses}>
        <div className="p-8 text-center">
          {icon && <div className="text-4xl mb-4">{icon}</div>}
          <h3 className="font-heading text-xl font-semibold text-primary mb-3">
            {title}
          </h3>
          {description && (
            <p className="font-body text-gray-600 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Default Card
  return (
    <div className={cardClasses}>
      {image && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image}
            alt={imageAlt || title || 'Card image'}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6">
        {title && (
          <h3 className="font-heading text-xl font-semibold text-primary mb-3">
            {title}
          </h3>
        )}
        {description && (
          <p className="font-body text-gray-600 mb-4">{description}</p>
        )}
        {children}
        {buttonText && (
          <Button
            variant="primary"
            size="md"
            href={buttonHref}
            onClick={onButtonClick}
          >
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
}
