'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface SpotlightItem {
  id: string;
  picture: string;
  pictureMobile?: string;
  isVideo?: boolean;
}

interface SpotlightProps {
  items: SpotlightItem[];
}

export default function Spotlight({ items }: SpotlightProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (items.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % items.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [items.length]);

  const goToPrevious = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % items.length);
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="spotlightContainer">
      <div className="spotlightWrapper">
        <div className="spotlight-carousel">
          <div className="carousel-inner">
            {items.map((item, index) => (
              <div
                key={item.id}
                className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
              >
                {item.isVideo ? (
                  <video
                    autoPlay
                    muted
                    loop
                    className="spotlight-media"
                    playsInline
                  >
                    <source src={`/images/${item.picture}`} type="video/mp4" />
                  </video>
                ) : (
                  <picture>
                    {item.pictureMobile && (
                      <source
                        media="(max-width: 767px)"
                        srcSet={`/images/${item.pictureMobile}`}
                      />
                    )}
                    <Image
                      src={`/images/${item.picture}`}
                      alt="Hình ảnh nổi bật của nhà hàng"
                      fill
                      className="spotlight-media"
                      priority={index === 0}
                      sizes="100vw"
                    />
                  </picture>
                )}
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <button
            className="carousel-control carousel-control-prev"
            onClick={goToPrevious}
            type="button"
            aria-label="Previous"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
          </button>

          <button
            className="carousel-control carousel-control-next"
            onClick={goToNext}
            type="button"
            aria-label="Next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
          </button>
        </div>
      </div>
    </div>
  );
}
