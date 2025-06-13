'use client';

import { useState, useEffect } from 'react';

interface Event {
  _id: string;
  title: string;
  hook: string;
  description: string;
  time: string;
  image: string;
  imageMobile?: string;
  slug: string;
  createdAt: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/events');
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <div className="text-2xl font-bold text-gray-800">ThemXua</div>
            <div className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-600 hover:text-gray-800">
                Home
              </a>
              <a href="/menu" className="text-gray-600 hover:text-gray-800">
                Menu
              </a>
              <a href="/booking" className="text-gray-600 hover:text-gray-800">
                Booking
              </a>
              <a href="/events" className="text-orange-600 font-medium">
                Events
              </a>
              <a href="/news" className="text-gray-600 hover:text-gray-800">
                News
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Special Events
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join us for exciting events and special celebrations at ThemXua
            Restaurant
          </p>
        </div>
      </section>

      {/* Events Content */}
      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
            <p className="mt-4 text-gray-600">Loading events...</p>
          </div>
        ) : events.length > 0 ? (
          <div className="space-y-8">
            {events.map(event => (
              <div
                key={event._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-8">
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                        {formatDate(event.createdAt)}
                      </span>
                      {event.time && (
                        <span className="text-gray-500 text-sm">
                          {event.time}
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">
                      {event.title}
                    </h3>
                    <p className="text-lg text-orange-600 mb-4 font-medium">
                      {event.hook}
                    </p>
                    <p className="text-gray-600 mb-6 line-clamp-4">
                      {event.description}
                    </p>
                    <div className="flex gap-4">
                      <a
                        href="/booking"
                        className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium"
                      >
                        Reserve Now
                      </a>
                      <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎉</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Upcoming Events
            </h3>
            <p className="text-gray-500">
              Stay tuned for exciting events and special celebrations!
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Don't Miss Out!
          </h2>
          <p className="text-gray-600 mb-6">
            Book your table now to join us for our special events and
            celebrations
          </p>
          <a
            href="/booking"
            className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium text-lg"
          >
            Make a Reservation
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 ThemXua Restaurant. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
