'use client';

import React, { useEffect, useState } from 'react';
import Layout from './components/layout/Layout';
import Image from 'next/image';
import ModernSpotlight from './components/ModernSpotlight'; // Corrected import
import RestaurantDesign from './components/RestaurantDesign';
import BookingForm from './components/BookingForm';
import InfiniteScrolling from './components/InfiniteScrolling';

interface HeroData {
  title: string;
  description: string;
  image?: string;
  buttonText: string;
}

interface EventData {
  id: string;
  title: string;
  hook: string;
  time: string;
  image: string;
  slug: string;
}

// Removed SpotlightItem interface as ModernSpotlight handles its own data structure

interface SpotlightData {
  // This is for the "Area Space" spotlight, not the carousel
  title: string;
  description: string;
  items: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
}

export default function Home() {
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [events, setEvents] = useState<EventData[]>([]);
  const [spotlightData, setSpotlightData] = useState<SpotlightData | null>(
    null
  );
  // Removed spotlightItems state as ModernSpotlight handles its own data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setHeroData({
          title: 'Thềm Xưa',
          description:
            'Trải nghiệm ẩm thực Việt Nam đích thực tại không gian ấm cúng và thân thiện.',
          buttonText: 'Đặt bàn ngay',
          image: 'center.webp',
        });

        setSpotlightData({
          title: 'Không Gian Độc Đáo',
          description:
            'Ánh đèn dịu nhẹ, chỗ ngồi êm ái và tiếng trò chuyện nhẹ nhàng tạo nên một không gian giống như sự mở rộng của ngôi nhà bạn.',
          items: [
            {
              title: 'Ẩm Thực Đích Thực',
              description:
                'Công thức truyền thống được truyền từ thế hệ này sang thế hệ khác',
              icon: '🍜',
            },
            {
              title: 'Không Gian Ấm Cúng',
              description:
                'Môi trường ấm cúng và chào đón hoàn hảo cho mọi dịp',
              icon: '🏮',
            },
            {
              title: 'Dịch Vụ Tuyệt Vời',
              description:
                'Đội ngũ nhân viên thân thiện tận tâm mang đến trải nghiệm đáng nhớ',
              icon: '⭐',
            },
          ],
        });
        setEvents([
          {
            id: '1',
            title: 'Lễ Hội Ẩm Thực Truyền Thống',
            hook: 'Khám phá hương vị Việt Nam qua các món ăn đặc sắc',
            time: '15:00 - 22:00',
            image: 'event1.jpg',
            slug: 'le-hoi-am-thuc-truyen-thong',
          },
          {
            id: '2',
            title: 'Đêm Nhạc Dân Ca',
            hook: 'Thưởng thức âm nhạc truyền thống trong không gian ấm cúng',
            time: '19:00 - 21:00',
            image: 'event2.jpg',
            slug: 'dem-nhac-dan-ca',
          },
        ]);

        // Removed mock spotlightItems data fetching as ModernSpotlight handles its own data
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải...</p>
          </div>
        </div>
      </Layout>
    );
  }
  return (
    <Layout currentPage="home">
      {/* ModernSpotlight component - no longer takes 'items' prop */}
      <ModernSpotlight />
      {/* Hero Section */}
      {heroData && (
        <section id="heroContainer" className="hero-section">
          <div className="hero-content">
            <div className="hero-title">
              <h1 className="hero-main-title">{heroData.title}</h1>
              <h5 className="hero-description">{heroData.description}</h5>
              <div className="hero-buttons">
                <button className="hero-btn primary">
                  <a href="#bookingContainer" className="btn-link">
                    {heroData.buttonText}
                  </a>
                </button>
                <span className="hero-text">
                  hoặc gọi ngay{' '}
                  <a href="tel:+84123456789" className="phone-link">
                    <strong>+84 123 456 789</strong>
                  </a>
                </span>
              </div>
            </div>
            {heroData.image && (
              <div className="hero-media">
                <Image
                  src={`/images/${heroData.image}`}
                  alt="Hình ảnh trang chủ của nhà hàng"
                  width={800}
                  height={600}
                  className="hero-image"
                  priority
                />
              </div>
            )}
          </div>
        </section>
      )}
      {/* Restaurant Design Section */}
      <RestaurantDesign />
      {/* Spotlight Section - Area Space */}
      {spotlightData && (
        <div className="spotlight-section">
          <div className="spotlight-container">
            <div className="spotlight-title-container">
              <h1 className="spotlight-title">{spotlightData.title}</h1>
              <p className="spotlight-description">
                {spotlightData.description}
              </p>
            </div>
            <div className="spotlight-features">
              <div className="features-grid">
                {spotlightData.items.map((item, index) => (
                  <div key={index} className="feature-item">
                    <div className="feature-icon">{item.icon}</div>
                    <h3 className="feature-title">{item.title}</h3>
                    <p className="feature-description">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Events Section */}
      {events.length > 0 && (
        <section className="events-section" id="eventsContainer">
          <div className="events-container">
            <h2 className="events-title">Sự Kiện Đặc Biệt</h2>
            <div className="events-grid">
              {events.map(event => (
                <div key={event.id} className="event-card">
                  <a href={`/events/${event.slug}`} className="event-link">
                    <div className="event-image-container">
                      <Image
                        src={`/images/${event.image}`}
                        alt={`Hình ảnh sự kiện ${event.title}`}
                        width={400}
                        height={300}
                        className="event-image"
                      />
                    </div>
                    <div className="event-information">
                      <h3 className="event-title">{event.title}</h3>
                      <p className="event-hook">{event.hook}</p>
                      <span className="event-divider">-------------</span>
                      <time className="event-time">{event.time}</time>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}{' '}
      {/* Include booking section inline */}
      <BookingForm
        backgroundImage="darkwood.webp"
        restaurantPhone="+84 123 456 789"
      />
      {/* Infinite Scrolling */}
      <InfiniteScrolling text="Thềm Xưa" />
    </Layout>
  );
}
