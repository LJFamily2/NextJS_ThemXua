'use client';

import React from 'react';
import Image from 'next/image';

interface DesignImage {
  src: string;
  alt: string;
  objectPosition?: string;
}

interface RestaurantDesignProps {
  title?: string;
  description?: string;
  images?: DesignImage[];
}

export default function RestaurantDesign({
  title = 'Không Gian Độc Đáo',
  description = 'Ánh đèn dịu nhẹ, chỗ ngồi êm ái và tiếng trò chuyện nhẹ nhàng tạo nên một không gian giống như sự mở rộng của ngôi nhà bạn.',
  images = [
    { src: 'center.webp', alt: 'Khu vực trung tâm nhà hàng' },
    { src: 'vip1.webp', alt: 'Phòng VIP nhà hàng', objectPosition: '40%' },
    {
      src: 'darkwood.webp',
      alt: 'Khu vực gỗ tối nhà hàng',
      objectPosition: '43%',
    },
  ],
}: RestaurantDesignProps) {
  return (
    <div className="restaurantDesign">
      <div className="designTitleContainer">
        <h1 className="designTitle">{title}</h1>
        <p className="designDescription">{description}</p>
      </div>

      <div className="designImage">
        {images.map((image, index) => (
          <div key={index} className="designContainer">
            <div className="imageContainer">
              <Image
                src={`/images/${image.src}`}
                alt={image.alt}
                fill
                className="design-image"
                style={{
                  objectFit: 'cover',
                  objectPosition: image.objectPosition || 'center',
                }}
                sizes="250px"
              />
            </div>
            <span className="verticalLine"></span>
            <span className="rhombus"></span>
            <span className="rhombus"></span>
            <span className="rhombus"></span>
          </div>
        ))}
      </div>
    </div>
  );
}
