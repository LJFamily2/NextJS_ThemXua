'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUtensils,
  faCalendar,
  faNewspaper,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';

interface MobileMenuProps {
  className?: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const menuItems = [
    { href: '/', label: 'Trang Chủ', icon: faHome },
    { href: '/menu', label: 'Thực Đơn', icon: faUtensils },
    { href: '/booking', label: 'Đặt Bàn', icon: faCalendar },
    { href: '/news', label: 'Tin Tức', icon: faNewspaper },
    { href: '/events', label: 'Sự Kiện', icon: faCalendar },
    { href: '/contact', label: 'Liên Hệ', icon: faPhone },
  ];

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className={`
          lg:hidden flex items-center justify-center
          w-10 h-10 rounded-lg
          bg-amber-600 hover:bg-amber-700
          text-white transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2
          ${className}
        `}
        aria-label="Toggle mobile menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" aria-hidden="true">
          {/* Background overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={closeMenu}
          />

          {/* Menu panel */}
          <div className="fixed top-0 right-0 w-80 max-w-full h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
            {/* Menu header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Menu</h2>
              <button
                onClick={closeMenu}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>

            {/* Menu items */}
            <nav className="flex-1 px-6 py-4">
              <ul className="space-y-2">
                {menuItems.map(item => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className="
                        flex items-center gap-4 px-4 py-3 
                        text-gray-700 hover:text-amber-600
                        hover:bg-amber-50 rounded-lg
                        transition-colors duration-200
                        group
                      "
                    >
                      <FontAwesomeIcon
                        icon={item.icon}
                        className="h-5 w-5 text-amber-600 group-hover:text-amber-700"
                      />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Menu footer */}
            <div className="p-6 border-t border-gray-200">
              <div className="text-center">
                <h3 className="font-bold text-gray-800 mb-2">
                  ThemXua Restaurant
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Ẩm thực truyền thống Việt Nam
                </p>
                <Link
                  href="/booking"
                  onClick={closeMenu}
                  className="
                    inline-block w-full
                    bg-amber-600 hover:bg-amber-700
                    text-white font-medium
                    px-6 py-3 rounded-lg
                    transition-colors duration-200
                    text-center
                  "
                >
                  Đặt Bàn Ngay
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom styles for smooth animations */}
      <style jsx>{`
        .mobile-menu-enter {
          transform: translateX(100%);
        }
        .mobile-menu-enter-active {
          transform: translateX(0);
          transition: transform 300ms ease-in-out;
        }
        .mobile-menu-exit {
          transform: translateX(0);
        }
        .mobile-menu-exit-active {
          transform: translateX(100%);
          transition: transform 300ms ease-in-out;
        }
      `}</style>
    </>
  );
};

export default MobileMenu;
