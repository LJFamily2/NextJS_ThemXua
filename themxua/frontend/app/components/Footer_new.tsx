'use client';

interface FooterProps {
  restaurantInfo?: {
    name?: string;
    phone?: string;
    email?: string;
    address?: string;
  };
}

export default function Footer({}: FooterProps) {
  return <footer>{/* New footer content will go here */}</footer>;
}
