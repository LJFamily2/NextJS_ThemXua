'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface BookingFormProps {
  backgroundImage?: string;
  restaurantPhone?: string;
}

export default function BookingForm({
  backgroundImage = 'darkwood.webp',
  restaurantPhone = '+84 123 456 789',
}: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    numberOfPeople: '1-4',
    phoneNumber: '',
    date: '',
    time: '',
    userRequest: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would submit to your backend
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Đặt bàn thành công! Chúng tôi sẽ liên hệ với bạn sớm.');
        setFormData({
          name: '',
          numberOfPeople: '1-4',
          phoneNumber: '',
          date: '',
          time: '',
          userRequest: '',
        });
      } else {
        alert('Có lỗi xảy ra. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="bookingContainer" className="booking-section">
      <div className="bookingBackground">
        <Image
          src={`/images/${backgroundImage}`}
          alt="Hình ảnh đặt bàn của nhà hàng"
          fill
          className="booking-bg-image"
          sizes="50vw"
        />
      </div>

      <div className="bookingInformation">
        <form onSubmit={handleSubmit} className="booking-form">
          <div className="formTitle">
            <h1>Đặt bàn</h1>
          </div>

          <div className="formField">
            <div className="userInput">
              <label htmlFor="name">Tên</label>
              <input
                type="text"
                name="name"
                id="name"
                maxLength={20}
                placeholder="Nhập tên"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="userInput">
              <label htmlFor="numberOfPeople">Số người</label>
              <select
                name="numberOfPeople"
                id="numberOfPeople"
                value={formData.numberOfPeople}
                onChange={handleInputChange}
              >
                <option value="1-4">1 - 4</option>
                <option value="4-8">4 - 8</option>
                <option value="Trên 10">Trên 10</option>
                <option value="Tiệc">Tiệc</option>
              </select>
            </div>
          </div>

          <div className="formField">
            <div className="userInput">
              <label htmlFor="phoneNumber">Số Điện Thoại</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                maxLength={12}
                placeholder="Nhập số điện thoại"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="formField">
            <div className="userInput">
              <label htmlFor="date">Ngày đến</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="userInput">
              <label htmlFor="time">Thời gian</label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="formField">
            <div className="userInput">
              <label htmlFor="userRequest">Yêu Cầu</label>
              <textarea
                name="userRequest"
                id="userRequest"
                placeholder="Nhập yêu cầu (nếu có)"
                maxLength={100}
                value={formData.userRequest}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>

          <div className="contactBtn">
            <button
              type="submit"
              className="submitButton"
              disabled={isSubmitting}
            >
              <span className="top-line"></span>
              <span className="text">
                {isSubmitting ? 'ĐANG XỬ LÝ...' : 'ĐẶT BÀN NGAY'}
              </span>
              <span className="bottom-line-1"></span>
              <span className="bottom-line-2"></span>
            </button>

            <p className="booking-phone">
              Tư vấn ngay{' '}
              <a href={`tel:${restaurantPhone}`} className="phone-link">
                <strong>{restaurantPhone}</strong>
              </a>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
