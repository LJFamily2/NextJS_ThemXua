'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface HeaderProps {
  restaurantInfo?: {
    logo?: string;
  };
  hasEvents?: boolean;
  hasMenus?: boolean;
}

export default function Header({
  restaurantInfo,
  hasEvents = true,
  hasMenus = true,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Sticky Header */}
      <header
        className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out
        ${
          isScrolled
            ? 'bg-primary/95 backdrop-blur-md shadow-lg py-3'
            : 'bg-primary py-4'
        }
      `}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            {restaurantInfo?.logo && (
              <div className="w-12 h-12 bg-neutral/20 rounded-full flex items-center justify-center overflow-hidden">
                <Image
                  src={`/images/${restaurantInfo.logo}`}
                  alt="Thềm Xưa Logo"
                  width={40}
                  height={40}
                  className="object-cover rounded-full"
                />
              </div>
            )}
            <Link
              href="/"
              className="text-neutral font-heading font-bold text-2xl md:text-3xl hover:text-accent transition-colors duration-300"
            >
              Thềm Xưa
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-neutral font-body font-medium text-lg hover:text-accent transition-all duration-300 relative group"
            >
              Trang Chủ
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {hasEvents && (
              <Link
                href="/events"
                className="text-neutral font-body font-medium text-lg hover:text-accent transition-all duration-300 relative group"
              >
                Sự Kiện
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )}

            {hasMenus && (
              <Link
                href="/menu"
                className="text-neutral font-body font-medium text-lg hover:text-accent transition-all duration-300 relative group"
              >
                Menu
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )}

            <Link
              href="/booking"
              className="bg-accent text-white px-6 py-2.5 rounded-full font-body font-semibold text-lg hover:bg-accent/80 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Đặt Bàn
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-neutral p-2 hover:bg-neutral/10 rounded-lg transition-colors duration-300"
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 h-6 flex flex-col justify-between">
              <span
                className={`block h-0.5 w-full bg-neutral transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''
                }`}
              ></span>
              <span
                className={`block h-0.5 w-full bg-neutral transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              ></span>
              <span
                className={`block h-0.5 w-full bg-neutral transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''
                }`}
              ></span>
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={toggleMobileMenu}
          ></div>

          {/* Mobile Menu Panel */}
          <div className="fixed top-0 right-0 w-80 h-full bg-primary shadow-2xl transform transition-transform duration-300">
            <div className="pt-20 px-6">
              <nav className="flex flex-col space-y-6">
                <Link
                  href="/"
                  onClick={toggleMobileMenu}
                  className="text-neutral font-body font-medium text-xl py-3 border-b border-neutral/20 hover:text-accent transition-colors duration-300"
                >
                  Trang Chủ
                </Link>

                {hasEvents && (
                  <Link
                    href="/events"
                    onClick={toggleMobileMenu}
                    className="text-neutral font-body font-medium text-xl py-3 border-b border-neutral/20 hover:text-accent transition-colors duration-300"
                  >
                    Sự Kiện
                  </Link>
                )}

                {hasMenus && (
                  <Link
                    href="/menu"
                    onClick={toggleMobileMenu}
                    className="text-neutral font-body font-medium text-xl py-3 border-b border-neutral/20 hover:text-accent transition-colors duration-300"
                  >
                    Menu
                  </Link>
                )}

                <Link
                  href="/booking"
                  onClick={toggleMobileMenu}
                  className="bg-accent text-white px-6 py-3 rounded-full font-body font-semibold text-xl text-center hover:bg-accent/80 transition-colors duration-300 shadow-lg mt-4"
                >
                  Đặt Bàn
                </Link>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Spacer to prevent content from being hidden under fixed header */}
      <div
        className={`${isScrolled ? 'h-16' : 'h-20'} transition-all duration-300`}
      ></div>
    </>
  );
}
