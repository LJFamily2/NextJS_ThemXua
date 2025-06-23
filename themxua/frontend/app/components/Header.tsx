'use client';

interface HeaderProps {
  restaurantInfo?: {
    logo?: string;
    address?: string;
    phone?: string;
    rating?: number;
    reviewCount?: number;
  };
  hasEvents?: boolean;
  hasMenus?: boolean;
}

export default function Header({
  restaurantInfo,
  hasEvents = true,
  hasMenus = true,
}: HeaderProps) {
  return <header>{/* Header content will go here */}</header>;
}
