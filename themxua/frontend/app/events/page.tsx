'use client';

import { useState, useEffect } from 'react';
import { publicEventsAPI } from '../utils/api';
import { EventData } from '../types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Button from '../components/Button';

export default function EventsPage() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);
  const fetchEvents = async () => {
    try {
      setError(null);
      const response = await publicEventsAPI.getAll();
      if (response.success && response.data) {
        setEvents(response.data as EventData[]);
      } else {
        // Fallback to direct fetch if API utility fails
        const directResponse = await fetch('http://localhost:5000/api/events');
        if (directResponse.ok) {
          const data = await directResponse.json();
          setEvents(data as EventData[]);
        } else {
          setError('Failed to load events. Please try again later.');
        }
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Failed to load events. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timeString: string) => {
    // Handle different time formats
    if (timeString.includes(':')) {
      return timeString;
    }
    return timeString;
  };

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-sage-50 to-cream-100 py-20 lg:py-28">
        <div className="absolute inset-0 bg-[url('/images/pattern-grain.png')] opacity-20"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-charcoal-800 mb-6">
            Special Events
          </h1>
          <p className="text-lg md:text-xl text-charcoal-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Join us for unforgettable dining experiences, seasonal celebrations,
            and exclusive culinary events that bring our community together
            around the table.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href="/booking"
              variant="primary"
              size="lg"
              className="px-8"
            >
              Reserve Your Spot
            </Button>
            <Button href="/menu" variant="outline" size="lg" className="px-8">
              View Our Menu
            </Button>
          </div>
        </div>
      </section>

      {/* Events Content */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-terracotta-500 mb-4"></div>
              <p className="text-charcoal-600 text-lg">
                Loading upcoming events...
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-red-500"
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
              <h3 className="text-2xl font-semibold text-charcoal-700 mb-4">
                Unable to Load Events
              </h3>
              <p className="text-charcoal-600 mb-6 max-w-md mx-auto">{error}</p>
              <Button onClick={fetchEvents} variant="primary">
                Try Again
              </Button>
            </div>
          ) : events.length > 0 ? (
            <div className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal-800 mb-4">
                  Upcoming Events
                </h2>
                <p className="text-lg text-charcoal-600 max-w-2xl mx-auto">
                  Experience the finest in culinary artistry at our specially
                  curated events
                </p>
              </div>

              <div className="grid gap-8 lg:gap-12">
                {events.map((event, index) => (
                  <Card
                    key={event._id}
                    variant="event"
                    className={`${
                      index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                    } transition-all duration-300 hover:shadow-xl`}
                  >
                    <div className="lg:w-1/2">
                      <img
                        src={event.image || '/images/placeholder-event.jpg'}
                        alt={event.title}
                        className="w-full h-64 lg:h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                        <div className="bg-terracotta-100 text-terracotta-800 px-4 py-2 rounded-full text-sm font-medium inline-block mb-2 sm:mb-0">
                          {formatDate(event.createdAt)}
                        </div>
                        {event.time && (
                          <div className="text-charcoal-500 text-sm font-medium">
                            {formatTime(event.time)}
                          </div>
                        )}
                      </div>

                      <h3 className="text-2xl lg:text-3xl font-display font-bold text-charcoal-800 mb-4">
                        {event.title}
                      </h3>

                      <p className="text-lg text-terracotta-600 mb-6 font-medium">
                        {event.hook}
                      </p>

                      <p className="text-charcoal-600 mb-8 leading-relaxed">
                        {event.description}
                      </p>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button href="/booking" variant="primary" size="lg">
                          Reserve Now
                        </Button>
                        <Button
                          href={`/events/${event.slug}`}
                          variant="outline"
                          size="lg"
                        >
                          Learn More
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg
                  className="w-12 h-12 text-sage-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-display font-semibold text-charcoal-700 mb-4">
                No Upcoming Events
              </h3>{' '}
              <p className="text-charcoal-600 mb-8 max-w-md mx-auto">
                We&apos;re planning something special! Check back soon or follow
                us on social media for updates on our upcoming events and
                celebrations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/menu" variant="primary">
                  Explore Our Menu
                </Button>
                <Button href="/booking" variant="outline">
                  Make a Reservation
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-br from-terracotta-500 to-terracotta-600 py-16 lg:py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            {' '}
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
              Don&apos;t Miss Our Special Events
            </h2>
            <p className="text-xl text-terracotta-100 mb-8 leading-relaxed">
              Be the first to know about our exclusive dining experiences, wine
              tastings, and seasonal celebrations. Reserve your table early to
              secure your spot.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href="/booking"
                variant="secondary"
                size="lg"
                className="px-8"
              >
                Make a Reservation
              </Button>
              <Button
                href="/news"
                variant="ghost"
                size="lg"
                className="px-8 border border-white/30 text-white hover:bg-white/10"
              >
                Stay Updated
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
