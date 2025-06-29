'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ThemXuaHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      // Only apply scrolled effect on desktop (lg and up)
      if (window.innerWidth >= 1024) {
        setScrolled(window.scrollY > 20);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll(); // set initial state
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const navigationItems = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'Liên hệ', href: '/#contact' },
  ];

  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const isRelativeHeader = ['/menu'];

  return (
    <header
      className={`top-0 left-0 right-0 z-50 transition-all duration-300
        ${
          isRelativeHeader.includes(pathname)
            ? 'bg-themxua-background relative'
            : scrolled
              ? 'bg-themxua-background/95 backdrop-blur-md shadow-lg lg:fixed'
              : 'bg-transparent backdrop-blur-none shadow-none relative lg:fixed'
        }
      `}
    >
      <nav className="flex items-center justify-between px-4 md:px-8 lg:px-[100px] h-[70px]">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-1 group z-40">
          <div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-110 animate-[slideInRight_0.5s_ease-in] z-30">
            <Image
              src="/images/logoTransparentNauDo.png"
              alt="Them Xua Logo"
              fill
              className="object-contain pb-1"
              priority
              sizes="(max-width: 639px) 100vw, (min-width: 640px) 100vw"
            />
          </div>
          <span className="text-themxua-primary font-dm-serif text-2xl font-medium leading-none transition-colors duration-300 group-hover:text-themxua-secondary z-40">
            Them Xua
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-[30px]">
          {navigationItems.map(item => (
            <Link
              key={item.name}
              href={item.href}
              className={`relative text-base leading-none transition-all duration-300 hover:text-themxua-secondary group
              ${
                isActiveLink(item.href)
                  ? 'text-themxua-secondary font-bold text-lg '
                  : pathname === '/' && !scrolled
                    ? 'text-white font-normal'
                    : 'text-themxua-primary font-normal'
              }`}
            >
              {item.name}{' '}
              <span
                className={`absolute -bottom-2 left-0.5 bg-themxua-secondary h-0.5 transition-all duration-300 ${
                  isActiveLink(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </Link>
          ))}

          {/* Booking Button */}
          <Link
            href="/booking"
            className={`text-white font-instrument font-semibold text-base leading-none px-5 py-2.5 rounded-md h-10 flex items-center justify-center transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 bg-[#662811] hover:outline hover:outline-2 hover:outline-[#662811] focus:outline focus:outline-2 focus:outline-[#662811] animate-[wavy-outline_2s_ease-in-out_4] outline outline-[#662811] ${
              isActiveLink('/booking')
                ? 'outline outline-2 outline-[#662811] outline-offset-2'
                : 'hover:outline-offset-2 focus:outline-offset-2'
            }`}
          >
            Đặt bàn
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1 group"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-themxua-primary transition-all duration-300 ${
              isOpen ? 'rotate-45 translate-y-1.5' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-themxua-primary transition-all duration-300 ${
              isOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-themxua-primary transition-all duration-300 ${
              isOpen ? '-rotate-45 -translate-y-1.5' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-themxua-background border-t border-themxua-accent transition-all duration-300 ${
          isOpen
            ? 'opacity-100 visible transform translate-y-0'
            : 'opacity-0 invisible transform -translate-y-4'
        }`}
      >
        <div className="flex flex-col py-4 px-4 md:px-8 space-y-4">
          {navigationItems.map(item => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`font-instrument text-base font-normal leading-none py-2 transition-colors duration-300 hover:text-themxua-secondary ${
                isActiveLink(item.href)
                  ? 'text-themxua-secondary font-medium'
                  : 'text-themxua-primary'
              }`}
            >
              {item.name}
            </Link>
          ))}

          {/* Booking Button */}
          <Link
            href="/booking"
            onClick={() => setIsOpen(false)}
            className={`text-white font-instrument font-semibold text-base leading-none px-5 py-2.5 rounded-md h-10 flex items-center justify-center transition-all duration-300 hover:brightness-75 w-fit  ${
              isActiveLink('/booking')
                ? 'outline outline-2 outline-[#662811] outline-offset-2'
                : ''
            }`}
            style={{ backgroundColor: '#662811' }}
          >
            Đặt bàn
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 z-[-1]"
          onClick={() => setIsOpen(false)}
        />
      )}
    </header>
  );
};

export default ThemXuaHeader;
