'use client';

import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  MessageCircle,
  Clock,
} from 'lucide-react';

interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  facebookUrl?: string;
  instagramUrl?: string;
  messengerUrl?: string;
  openingHours?: string;
}

interface ContactNavigationProps {
  contactInfo: ContactInfo;
  position?: 'fixed' | 'static';
  theme?: 'light' | 'dark';
  className?: string;
}

export default function ContactNavigation({
  contactInfo,
  position = 'fixed',
  theme = 'light',
  className = '',
}: ContactNavigationProps) {
  const themeClasses = {
    light: 'bg-white text-gray-800 shadow-lg border border-gray-200',
    dark: 'bg-gray-800 text-white shadow-lg border border-gray-700',
  };

  const iconThemeClasses = {
    light: 'text-orange-600 hover:text-orange-700',
    dark: 'text-orange-400 hover:text-orange-300',
  };

  const baseClasses =
    position === 'fixed' ? 'fixed bottom-6 right-6 z-50' : 'relative';

  return (
    <div className={`${baseClasses} ${className}`}>
      {/* Main contact button */}
      <div className="group">
        <button
          className={`${themeClasses[theme]} rounded-full p-4 transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl group-hover:rounded-2xl`}
        >
          <Phone
            className={`h-6 w-6 ${iconThemeClasses[theme]} transition-transform group-hover:rotate-12`}
          />
        </button>

        {/* Contact options dropdown */}
        <div className="absolute bottom-16 right-0 mb-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 ease-out pointer-events-none group-hover:pointer-events-auto">
          <div
            className={`${themeClasses[theme]} rounded-lg p-4 w-72 space-y-4`}
          >
            <h3 className="font-semibold text-lg mb-3">
              Liên hệ với chúng tôi
            </h3>

            {/* Phone */}
            <a
              href={`tel:${contactInfo.phone}`}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-orange-50 transition-colors duration-200 group/item"
            >
              <Phone
                className={`h-5 w-5 ${iconThemeClasses[theme]} group-hover/item:scale-110 transition-transform`}
              />
              <div>
                <p className="font-medium">Điện thoại</p>
                <p className="text-sm opacity-75">{contactInfo.phone}</p>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${contactInfo.email}`}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-orange-50 transition-colors duration-200 group/item"
            >
              <Mail
                className={`h-5 w-5 ${iconThemeClasses[theme]} group-hover/item:scale-110 transition-transform`}
              />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm opacity-75">{contactInfo.email}</p>
              </div>
            </a>

            {/* Address */}
            <div className="flex items-start space-x-3 p-2 rounded-lg">
              <MapPin
                className={`h-5 w-5 ${iconThemeClasses[theme]} mt-0.5 flex-shrink-0`}
              />
              <div>
                <p className="font-medium">Địa chỉ</p>
                <p className="text-sm opacity-75">{contactInfo.address}</p>
              </div>
            </div>

            {/* Opening Hours */}
            {contactInfo.openingHours && (
              <div className="flex items-start space-x-3 p-2 rounded-lg">
                <Clock
                  className={`h-5 w-5 ${iconThemeClasses[theme]} mt-0.5 flex-shrink-0`}
                />
                <div>
                  <p className="font-medium">Giờ mở cửa</p>
                  <p className="text-sm opacity-75">
                    {contactInfo.openingHours}
                  </p>
                </div>
              </div>
            )}

            {/* Social Media */}
            <div className="border-t pt-3 mt-3">
              <p className="font-medium mb-2">Theo dõi chúng tôi</p>
              <div className="flex space-x-3">
                {contactInfo.facebookUrl && (
                  <a
                    href={contactInfo.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-full hover:bg-blue-50 transition-colors group/social`}
                  >
                    <Facebook className="h-5 w-5 text-blue-600 group-hover/social:scale-110 transition-transform" />
                  </a>
                )}

                {contactInfo.instagramUrl && (
                  <a
                    href={contactInfo.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-full hover:bg-pink-50 transition-colors group/social`}
                  >
                    <Instagram className="h-5 w-5 text-pink-600 group-hover/social:scale-110 transition-transform" />
                  </a>
                )}

                {contactInfo.messengerUrl && (
                  <a
                    href={contactInfo.messengerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-full hover:bg-blue-50 transition-colors group/social`}
                  >
                    <MessageCircle className="h-5 w-5 text-blue-500 group-hover/social:scale-110 transition-transform" />
                  </a>
                )}
              </div>
            </div>

            {/* Quick booking button */}
            <div className="border-t pt-3 mt-3">
              <a
                href="/booking"
                className="block w-full bg-orange-600 text-white text-center py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors duration-200 font-medium"
              >
                Đặt bàn ngay
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Simplified version for header/footer
export function ContactBar({
  contactInfo,
  className = '',
}: {
  contactInfo: ContactInfo;
  className?: string;
}) {
  return (
    <div className={`flex items-center space-x-6 ${className}`}>
      <a
        href={`tel:${contactInfo.phone}`}
        className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors"
      >
        <Phone className="h-4 w-4" />
        <span className="text-sm">{contactInfo.phone}</span>
      </a>

      <a
        href={`mailto:${contactInfo.email}`}
        className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors"
      >
        <Mail className="h-4 w-4" />
        <span className="text-sm">{contactInfo.email}</span>
      </a>

      <div className="flex space-x-2">
        {contactInfo.facebookUrl && (
          <a
            href={contactInfo.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Facebook className="h-4 w-4" />
          </a>
        )}

        {contactInfo.instagramUrl && (
          <a
            href={contactInfo.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-pink-600 transition-colors"
          >
            <Instagram className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );
}
