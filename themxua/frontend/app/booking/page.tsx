'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import Card from '../components/Card';

export default function BookingPage() {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    date: '',
    time: '',
    numberOfPeople: '',
    userRequest: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = 'Please select a future date';
      }
    }

    if (!formData.time) {
      newErrors.time = 'Time is required';
    }

    if (!formData.numberOfPeople) {
      newErrors.numberOfPeople = 'Number of people is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          phoneNumber: '',
          email: '',
          date: '',
          time: '',
          numberOfPeople: '',
          userRequest: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const timeSlots = [
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
    '20:30',
    '21:00',
  ];

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-sage-50 to-cream-100 py-20 lg:py-28">
        <div className="absolute inset-0 bg-[url('/images/pattern-grain.png')] opacity-20"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-charcoal-800 mb-6">
            Make a Reservation
          </h1>
          <p className="text-lg md:text-xl text-charcoal-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Reserve your table for an unforgettable dining experience.
            We&apos;re here to make your visit special with authentic Vietnamese
            flavors and warm hospitality.
          </p>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {submitStatus === 'success' && (
              <Card
                variant="default"
                className="mb-8 border-l-4 border-l-sage-500 bg-sage-50"
              >
                <div className="flex items-center p-6">
                  <div className="w-12 h-12 bg-sage-500 rounded-full flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-sage-800 mb-1">
                      Reservation Submitted Successfully!
                    </h3>
                    <p className="text-sage-600">
                      We&apos;ve received your reservation request and will
                      contact you shortly to confirm the details.
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {submitStatus === 'error' && (
              <Card
                variant="default"
                className="mb-8 border-l-4 border-l-red-500 bg-red-50"
              >
                <div className="flex items-center p-6">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-red-800 mb-1">
                      Submission Failed
                    </h3>
                    <p className="text-red-600">
                      There was an error submitting your reservation. Please try
                      again or call us directly.
                    </p>
                  </div>
                </div>
              </Card>
            )}

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Form */}
              <div className="lg:col-span-2">
                <Card variant="default" className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-terracotta-300 focus:border-terracotta-500 transition-all duration-200 ${
                            errors.name
                              ? 'border-red-300 bg-red-50'
                              : 'border-sage-200 focus:border-terracotta-500'
                          }`}
                          placeholder="Enter your full name"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-terracotta-300 focus:border-terracotta-500 transition-all duration-200 ${
                            errors.phoneNumber
                              ? 'border-red-300 bg-red-50'
                              : 'border-sage-200 focus:border-terracotta-500'
                          }`}
                          placeholder="Enter your phone number"
                        />
                        {errors.phoneNumber && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.phoneNumber}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-terracotta-300 focus:border-terracotta-500 transition-all duration-200 ${
                          errors.email
                            ? 'border-red-300 bg-red-50'
                            : 'border-sage-200 focus:border-terracotta-500'
                        }`}
                        placeholder="Enter your email address (optional)"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                      <p className="text-charcoal-500 text-sm mt-1">
                        We&apos;ll use this to send you a confirmation email
                      </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                          Date *
                        </label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          min={today}
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-terracotta-300 focus:border-terracotta-500 transition-all duration-200 ${
                            errors.date
                              ? 'border-red-300 bg-red-50'
                              : 'border-sage-200 focus:border-terracotta-500'
                          }`}
                        />
                        {errors.date && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.date}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                          Time *
                        </label>
                        <select
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-terracotta-300 focus:border-terracotta-500 transition-all duration-200 ${
                            errors.time
                              ? 'border-red-300 bg-red-50'
                              : 'border-sage-200 focus:border-terracotta-500'
                          }`}
                        >
                          <option value="">Select time</option>
                          {timeSlots.map(time => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                        {errors.time && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.time}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                          Party Size *
                        </label>
                        <select
                          name="numberOfPeople"
                          value={formData.numberOfPeople}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-terracotta-300 focus:border-terracotta-500 transition-all duration-200 ${
                            errors.numberOfPeople
                              ? 'border-red-300 bg-red-50'
                              : 'border-sage-200 focus:border-terracotta-500'
                          }`}
                        >
                          <option value="">Select size</option>
                          <option value="1">1 person</option>
                          <option value="2">2 people</option>
                          <option value="3">3 people</option>
                          <option value="4">4 people</option>
                          <option value="5">5 people</option>
                          <option value="6">6 people</option>
                          <option value="7">7 people</option>
                          <option value="8">8 people</option>
                          <option value="8+">8+ people</option>
                        </select>
                        {errors.numberOfPeople && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.numberOfPeople}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                        Special Requests
                      </label>
                      <textarea
                        name="userRequest"
                        value={formData.userRequest}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 border-2 border-sage-200 rounded-lg focus:ring-2 focus:ring-terracotta-300 focus:border-terracotta-500 transition-all duration-200 resize-none"
                        placeholder="Let us know about any dietary restrictions, special occasions, or other requests..."
                      />
                      <p className="text-charcoal-500 text-sm mt-1">
                        Please mention any allergies, dietary preferences, or
                        special celebrations
                      </p>
                    </div>{' '}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-terracotta-500 hover:bg-terracotta-600 disabled:bg-charcoal-300 disabled:cursor-not-allowed text-white font-body font-semibold rounded-full transition-all duration-300 inline-flex items-center justify-center px-8 py-4 text-lg"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Submitting...
                          </div>
                        ) : (
                          'Reserve Table'
                        )}
                      </button>
                    </div>
                  </form>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                <Card variant="default" className="p-6">
                  <h3 className="text-xl font-display font-semibold text-charcoal-800 mb-4">
                    Restaurant Hours
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-charcoal-600">
                        Monday - Thursday
                      </span>
                      <span className="font-medium text-charcoal-800">
                        11:00 AM - 9:00 PM
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal-600">
                        Friday - Saturday
                      </span>
                      <span className="font-medium text-charcoal-800">
                        11:00 AM - 10:00 PM
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal-600">Sunday</span>
                      <span className="font-medium text-charcoal-800">
                        11:00 AM - 9:00 PM
                      </span>
                    </div>
                  </div>
                </Card>

                <Card variant="default" className="p-6">
                  <h3 className="text-xl font-display font-semibold text-charcoal-800 mb-4">
                    Contact Information
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start">
                      <svg
                        className="w-4 h-4 text-terracotta-500 mt-1 mr-3 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <div>
                        <p className="font-medium text-charcoal-700">Phone</p>
                        <p className="text-charcoal-600">(555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <svg
                        className="w-4 h-4 text-terracotta-500 mt-1 mr-3 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <div>
                        <p className="font-medium text-charcoal-700">Address</p>
                        <p className="text-charcoal-600">
                          123 Vietnamese Street
                          <br />
                          Food District, City 12345
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card
                  variant="default"
                  className="p-6 bg-gradient-to-br from-terracotta-50 to-sage-50"
                >
                  <h3 className="text-lg font-display font-semibold text-charcoal-800 mb-3">
                    Need Help?
                  </h3>
                  <p className="text-sm text-charcoal-600 mb-4">
                    For large parties (8+ people) or special events, please call
                    us directly.
                  </p>
                  <Button
                    href="tel:+15551234567"
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    Call Us
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
