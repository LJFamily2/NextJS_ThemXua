'use client';

import { useState } from 'react';
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="flex items-center justify-center min-h-[50px] w-full bg-white z-[1000] shadow-sm">
        {/* Mobile Logo */}
        {restaurantInfo?.logo && (
          <Link href="/" className="md:hidden">
            <Image
              src={`/images/${restaurantInfo.logo}`}
              alt="ThemXua Logo"
              width={40}
              height={40}
              className="object-cover relative"
            />
          </Link>
        )}

        {/* Navigation Bar */}
        <ul
          className={`navigationBar w-[95%] min-h-[1px] list-none text-[clamp(1em,2em,2.3em)] font-semibold flex items-center justify-evenly m-0 p-0 text-center z-[999] ${isMobileMenuOpen ? 'mobile-open' : ''}`}
        >
          <li className="w-fit inline-block relative transition-all duration-400 hover:transition-all hover:duration-400">
            <Link
              href="/"
              className="text-decoration-none text-[var(--headerText)] hover:bg-gradient-to-r hover:from-white hover:via-[#bd5506] hover:to-[#FA9F1C] hover:bg-clip-text hover:text-transparent transition-all duration-400"
            >
              TRANG CHỦ
            </Link>
          </li>

          {/* Desktop Logo in Center */}
          <li className="hidden md:block screenHomePage">
            <Link
              href="/"
              className="logoContainer text-decoration-none relative border-0 flex items-center justify-center"
            >
              <span className="absolute z-10 text-[var(--headerText)] font-bold text-xl">
                THỀM XƯA
              </span>
              {restaurantInfo?.logo && (
                <Image
                  src={`/images/${restaurantInfo.logo}`}
                  alt="logo image"
                  width={60}
                  height={60}
                  className="logoImage object-cover relative"
                />
              )}
            </Link>
          </li>

          {hasEvents && (
            <li className="w-fit inline-block relative transition-all duration-400 hover:transition-all hover:duration-400">
              <Link
                href="/#eventsContainer"
                className="text-decoration-none text-[var(--headerText)] hover:bg-gradient-to-r hover:from-white hover:via-[#bd5506] hover:to-[#FA9F1C] hover:bg-clip-text hover:text-transparent transition-all duration-400"
              >
                SỰ KIỆN
              </Link>
            </li>
          )}

          {hasMenus && (
            <li className="w-fit inline-block relative transition-all duration-400 hover:transition-all hover:duration-400">
              <Link
                href="/menu/#menuSection"
                className="text-decoration-none text-[var(--headerText)] hover:bg-gradient-to-r hover:from-white hover:via-[#bd5506] hover:to-[#FA9F1C] hover:bg-clip-text hover:text-transparent transition-all duration-400"
              >
                MENU
              </Link>
            </li>
          )}

          <li className="w-fit inline-block relative transition-all duration-400 hover:transition-all hover:duration-400">
            <Link
              href="/booking/#bookingContainer"
              className="text-decoration-none text-[var(--headerText)] hover:bg-gradient-to-r hover:from-white hover:via-[#bd5506] hover:to-[#FA9F1C] hover:bg-clip-text hover:text-transparent transition-all duration-400"
            >
              ĐẶT BÀN
            </Link>
          </li>
        </ul>

        {/* Mobile Hamburger Menu */}
        <div
          className="menu md:hidden cursor-pointer"
          onClick={toggleMobileMenu}
        >
          <div className="hamburger flex flex-col w-6 h-5 justify-between">
            <span
              className={`block h-0.5 w-full bg-[var(--headerText)] transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
            ></span>
            <span
              className={`block h-0.5 w-full bg-[var(--headerText)] transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}
            ></span>
            <span
              className={`block h-0.5 w-full bg-[var(--headerText)] transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
            ></span>
          </div>
        </div>
      </header>

      {/* Contact Navigation - Can be implemented later if needed */}
      <div className="contactNavigation">
        {/* Contact navigation content */}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .navigationBar {
            position: fixed;
            top: 50px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 50px);
            background: white;
            flex-direction: column;
            justify-content: flex-start;
            padding-top: 2rem;
            transition: left 0.3s ease;
            z-index: 998;
          }

          .navigationBar.mobile-open {
            left: 0;
          }

          .navigationBar li {
            margin: 1rem 0;
            width: 100%;
            text-align: center;
          }

          .screenHomePage {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
