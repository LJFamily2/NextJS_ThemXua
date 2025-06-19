'use client';

import Link from 'next/link';
import Button from './Button';

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
    <footer className="bg-primary text-neutral">
      <div className="container mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Restaurant Info */}
          <div className="lg:col-span-1">
            <h3 className="font-heading text-2xl font-bold text-accent mb-4">
              {restaurantInfo.name}
            </h3>
            <p className="font-body text-neutral/90 mb-6 leading-relaxed">
              Trải nghiệm ẩm thực Việt Nam đích thực trong không gian ấm cúng,
              nơi hương vị truyền thống được gìn giữ qua từng món ăn.
            </p>
            <Button variant="outline" size="md" href="/booking">
              Đặt Bàn Ngay
            </Button>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-accent mb-4">
              Liên Kết Nhanh
            </h4>
            <nav className="space-y-3">
              <Link
                href="/"
                className="block font-body text-neutral/90 hover:text-accent transition-colors duration-300"
              >
                Trang Chủ
              </Link>
              <Link
                href="/menu"
                className="block font-body text-neutral/90 hover:text-accent transition-colors duration-300"
              >
                Menu
              </Link>
              <Link
                href="/events"
                className="block font-body text-neutral/90 hover:text-accent transition-colors duration-300"
              >
                Sự Kiện
              </Link>
              <Link
                href="/booking"
                className="block font-body text-neutral/90 hover:text-accent transition-colors duration-300"
              >
                Đặt Bàn
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-accent mb-4">
              Liên Hệ
            </h4>
            <div className="space-y-3">
              <div className="font-body text-neutral/90">
                <strong>Điện thoại:</strong>
                <br />
                <a
                  href={`tel:${restaurantInfo.phone}`}
                  className="hover:text-accent transition-colors duration-300"
                >
                  {restaurantInfo.phone}
                </a>
              </div>
              <div className="font-body text-neutral/90">
                <strong>Email:</strong>
                <br />
                <a
                  href={`mailto:${restaurantInfo.email}`}
                  className="hover:text-accent transition-colors duration-300"
                >
                  {restaurantInfo.email}
                </a>
              </div>
              <div className="font-body text-neutral/90">
                <strong>Địa chỉ:</strong>
                <br />
                {restaurantInfo.address}
              </div>
            </div>
          </div>

          {/* Social Media & Hours */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-accent mb-4">
              Theo Dõi Chúng Tôi
            </h4>
            <div className="flex space-x-4 mb-6">
              <a
                href="#"
                className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center hover:bg-accent hover:scale-110 transition-all duration-300"
                aria-label="Facebook"
              >
                <span className="text-accent hover:text-white">📘</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center hover:bg-accent hover:scale-110 transition-all duration-300"
                aria-label="Instagram"
              >
                <span className="text-accent hover:text-white">📷</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center hover:bg-accent hover:scale-110 transition-all duration-300"
                aria-label="TikTok"
              >
                <span className="text-accent hover:text-white">🎵</span>
              </a>
            </div>

            <div className="font-body text-neutral/90">
              <strong>Giờ mở cửa:</strong>
              <br />
              Thứ 2 - Chủ nhật: 10:00 - 22:00
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-neutral/20 pt-6 text-center">
          <p className="font-body text-neutral/80">
            © {currentYear} {restaurantInfo.name}. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
}
