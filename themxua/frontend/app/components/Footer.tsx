'use client';

import React from 'react';
import Image from 'next/image';

interface FooterProps {
  restaurantInfo?: {
    name?: string;
    phone?: string;
    email?: string;
    address?: string;
  };
}

export default function Footer({
  restaurantInfo = {
    name: 'Thềm Xưa',
    phone: '+84 123 456 789',
    email: 'info@themxua.com',
    address: '123 Đường ABC, Quận XYZ, TP.HCM',
  },
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Restaurant Info */}
          <div className="footer-section">
            <h3 className="footer-heading">{restaurantInfo.name}</h3>
            <p className="footer-text">
              Trải nghiệm ẩm thực Việt Nam đích thực trong không gian ấm cúng và
              thân thiện.
            </p>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4 className="footer-heading">Liên Hệ</h4>
            <div className="footer-contact">
              <p className="footer-text">
                <strong>Điện thoại:</strong>
                <a href={`tel:${restaurantInfo.phone}`} className="footer-link">
                  {restaurantInfo.phone}
                </a>
              </p>
              <p className="footer-text">
                <strong>Email:</strong>
                <a
                  href={`mailto:${restaurantInfo.email}`}
                  className="footer-link"
                >
                  {restaurantInfo.email}
                </a>
              </p>
              <p className="footer-text">
                <strong>Địa chỉ:</strong> {restaurantInfo.address}
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-heading">Liên Kết Nhanh</h4>
            <nav className="footer-nav">
              <a href="/" className="footer-link">
                Trang Chủ
              </a>
              <a href="/menu" className="footer-link">
                Menu
              </a>
              <a href="/events" className="footer-link">
                Sự Kiện
              </a>
              <a href="/booking" className="footer-link">
                Đặt Bàn
              </a>
            </nav>
          </div>

          {/* Social Media */}
          <div className="footer-section">
            <h4 className="footer-heading">Theo Dõi Chúng Tôi</h4>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="Facebook">
                <Image
                  src="/images/facebook.webp"
                  alt="Facebook"
                  width={32}
                  height={32}
                  className="social-icon"
                />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <Image
                  src="/images/instagram.webp"
                  alt="Instagram"
                  width={32}
                  height={32}
                  className="social-icon"
                />
              </a>
              <a href="#" className="social-link" aria-label="Messenger">
                <Image
                  src="/images/messenger.webp"
                  alt="Messenger"
                  width={32}
                  height={32}
                  className="social-icon"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} {restaurantInfo.name}. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
}
