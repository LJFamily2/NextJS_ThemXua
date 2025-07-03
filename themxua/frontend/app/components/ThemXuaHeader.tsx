'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  useLanguage,
  languages,
  LanguageCode,
} from '../contexts/LanguageContext';

const ThemXuaHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const pathname = usePathname();
  const { currentLanguage, setLanguage, t } = useLanguage();

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
    { name: t('header.home'), href: '/' },
    { name: t('header.menu'), href: '/menu' },
    { name: t('header.contact'), href: '/#contact' },
  ];

  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const isRelativeHeader = ['/menu', '/vip'];

  const handleLanguageChange = (lang: LanguageCode) => {
    setLanguage(lang);
    setIsLangMenuOpen(false);
  };

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
        <Link
          href="/"
          className="flex items-center gap-1 group z-40 cursor-pointer"
        >
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

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all duration-300 hover:scale-105 hover:shadow-md ${
                pathname === '/' && !scrolled
                  ? 'text-white border-white/30 bg-white/10 hover:bg-white/20 hover:border-white/50'
                  : 'text-themxua-primary border-themxua-primary/30 bg-themxua-cream/20 hover:bg-themxua-cream/40 hover:border-themxua-primary/50'
              }`}
              aria-expanded={isLangMenuOpen}
              aria-label="Select language"
            >
              <div className="relative w-5 h-5">
                <Image
                  src={languages[currentLanguage].flag}
                  alt={`${languages[currentLanguage].name} flag`}
                  fill
                  className="object-cover rounded-sm"
                  sizes="20px"
                />
              </div>
              <span className="text-sm font-medium tracking-wide">
                {currentLanguage.toUpperCase()}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-3 w-3 transition-transform duration-300 ${isLangMenuOpen ? 'rotate-180' : ''}`}
                fill="currentColor"
                viewBox="0 0 12 12"
              >
                <path d="M6 8L2 4h8z" />
              </svg>
            </button>

            {isLangMenuOpen && (
              <div className="absolute right-0 mt-3 w-44 rounded-xl shadow-2xl bg-white border border-themxua-primary/10 overflow-hidden z-50 backdrop-blur-sm">
                <div className="py-2" role="menu" aria-orientation="vertical">
                  {Object.values(languages).map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() =>
                        handleLanguageChange(lang.code as LanguageCode)
                      }
                      className={`flex items-center gap-3 px-4 py-3 text-sm w-full text-left transition-all duration-200 hover:scale-[1.02] ${
                        currentLanguage === lang.code
                          ? 'bg-gradient-to-r from-themxua-cream/40 to-themxua-cream/20 text-themxua-primary font-semibold'
                          : 'text-gray-700 hover:bg-themxua-cream/30 hover:text-themxua-primary'
                      } `}
                      role="menuitem"
                    >
                      <div className="relative w-6 h-6">
                        <Image
                          src={lang.flag}
                          alt={`${lang.name} flag`}
                          fill
                          className="object-cover rounded-sm"
                          sizes="24px"
                        />
                      </div>
                      <span className="font-medium">{lang.name}</span>
                      {currentLanguage === lang.code && (
                        <span className="ml-auto text-themxua-secondary">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Booking Button */}
          <Link
            href="/booking"
            className={`text-white font-instrument font-semibold text-base leading-none px-5 py-2.5 rounded-md h-10 flex items-center justify-center transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 bg-[#662811] hover:outline hover:outline-2 hover:outline-[#662811] focus:outline focus:outline-2 focus:outline-[#662811] animate-[wavy-outline_2s_ease-in-out_4] outline outline-[#662811] ${
              isActiveLink('/booking')
                ? 'outline outline-2 outline-[#662811] outline-offset-2'
                : 'hover:outline-offset-2 focus:outline-offset-2'
            }`}
          >
            {t('header.booking')}
          </Link>
        </div>
        {/* Mobile Controls */}
        <div className="lg:hidden flex items-center gap-2">
          {/* Mobile Language Selector */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border-2 border-themxua-primary/30 bg-themxua-cream/20 text-themxua-primary hover:bg-themxua-cream/40 hover:border-themxua-primary/50 transition-all duration-300"
              aria-expanded={isLangMenuOpen}
              aria-label="Select language"
            >
              <div className="relative w-4 h-4">
                <Image
                  src={languages[currentLanguage].flag}
                  alt={`${languages[currentLanguage].name} flag`}
                  fill
                  className="object-cover rounded-sm"
                  sizes="16px"
                />
              </div>
              <span className="text-xs font-medium">
                {currentLanguage.toUpperCase()}
              </span>
            </button>
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
        </div>
      </nav>

      {/* Mobile Language Menu */}
      {isLangMenuOpen && (
        <div className="lg:hidden absolute top-[70px] right-4 mt-2 w-40 rounded-xl shadow-2xl bg-white border border-themxua-primary/10 overflow-hidden z-50">
          <div className="py-2" role="menu" aria-orientation="vertical">
            {Object.values(languages).map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code as LanguageCode)}
                className={`flex items-center gap-3 px-4 py-3 text-sm w-full text-left transition-all duration-200 ${
                  currentLanguage === lang.code
                    ? 'bg-gradient-to-r from-themxua-cream/40 to-themxua-cream/20 text-themxua-primary font-semibold'
                    : 'text-gray-700 hover:bg-themxua-cream/30 hover:text-themxua-primary'
                } `}
                role="menuitem"
              >
                <div className="relative w-5 h-5">
                  <Image
                    src={lang.flag}
                    alt={`${lang.name} flag`}
                    fill
                    className="object-cover rounded-sm"
                    sizes="20px"
                  />
                </div>
                <span className="font-medium">{lang.name}</span>
                {currentLanguage === lang.code && (
                  <span className="ml-auto text-themxua-secondary">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

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
            {t('header.booking')}
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
