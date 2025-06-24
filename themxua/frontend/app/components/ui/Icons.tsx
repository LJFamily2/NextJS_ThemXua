'use client';

import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
  color?: string;
}

export const ArrowRightIcon: React.FC<IconProps> = ({
  className = '',
  size = 24,
  color = 'currentColor',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M5 12H19M19 12L12 5M19 12L12 19"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const PhoneIcon: React.FC<IconProps> = ({
  className = '',
  size = 24,
  color = 'currentColor',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M22 16.92V19.92C22 20.42 21.58 20.83 21.08 20.83C9.62 20.83 3.17 14.38 3.17 2.92C3.17 2.42 3.58 2 4.08 2H7.08C7.58 2 8 2.42 8 2.92V5.92C8 6.42 7.58 6.83 7.08 6.83H5.58C6.58 10.83 10.58 14.83 14.58 15.83V14.33C14.58 13.83 15 13.42 15.5 13.42H18.5C19 13.42 19.42 13.83 19.42 14.33V17.33C19.42 17.83 19 18.25 18.5 18.25H15.5"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const EmailIcon: React.FC<IconProps> = ({
  className = '',
  size = 24,
  color = 'currentColor',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polyline
      points="22,6 12,13 2,6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const LocationIcon: React.FC<IconProps> = ({
  className = '',
  size = 24,
  color = 'currentColor',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M21 10C21 17 12 23 12 23S3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="12"
      cy="10"
      r="3"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ClockIcon: React.FC<IconProps> = ({
  className = '',
  size = 24,
  color = 'currentColor',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
    <polyline
      points="12,6 12,12 16,14"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const MouseScrollIcon: React.FC<IconProps> = ({
  className = '',
  size = 24,
  color = 'currentColor',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 28 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Mouse body with gradient effect */}
    <rect
      x="8"
      y="6"
      width="12"
      height="20"
      rx="6"
      ry="6"
      stroke={color}
      strokeWidth="2.5"
      fill="none"
      className="drop-shadow-sm"
    />

    {/* Inner mouse body for depth */}
    <rect
      x="9.5"
      y="7.5"
      width="9"
      height="17"
      rx="4.5"
      ry="4.5"
      stroke={color}
      strokeWidth="0.5"
      fill="none"
      opacity="0.3"
    />

    {/* Mouse scroll wheel - animated */}
    <rect
      x="12.5"
      y="11"
      width="3"
      height="6"
      rx="1.5"
      ry="1.5"
      fill={color}
      className="animate-pulse"
      opacity="0.8"
    />

    {/* Scroll indicator line */}
    <line
      x1="14"
      y1="13"
      x2="14"
      y2="15"
      stroke="white"
      strokeWidth="0.8"
      strokeLinecap="round"
      className="animate-bounce"
      style={{ animationDelay: '0.2s', animationDuration: '2s' }}
    />

    {/* Decorative scroll waves */}
    <path
      d="M10 30 C12 28, 16 28, 18 30"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
      opacity="0.6"
      className="animate-pulse"
      style={{ animationDelay: '0.5s', animationDuration: '3s' }}
    />

    <path
      d="M9 33 C11.5 31, 16.5 31, 19 33"
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
      fill="none"
      opacity="0.4"
      className="animate-pulse"
      style={{ animationDelay: '1s', animationDuration: '3s' }}
    />

  </svg>
);
