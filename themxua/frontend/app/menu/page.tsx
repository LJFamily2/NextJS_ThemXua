'use client';

import { useState, useEffect } from 'react';

interface MenuItem {
  _id: string;
  description: string;
  image: string;
  imageMobile?: string;
  URL: string;
  URLMobile?: string;
}

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/menu');
      if (response.ok) {
        const data = await response.json();
        setMenuItems(data);
      }
    } catch (error) {
      console.error('Error fetching menu items:', error);
    } finally {
      setLoading(false);
    }
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
              <a href="/menu" className="text-orange-600 font-medium">
                Menu
              </a>
              <a href="/booking" className="text-gray-600 hover:text-gray-800">
                Booking
              </a>
              <a href="/events" className="text-gray-600 hover:text-gray-800">
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
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Menu</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our authentic Vietnamese dishes crafted with traditional
            recipes and fresh ingredients
          </p>
        </div>
      </section>

      {/* Menu Content */}
      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
            <p className="mt-4 text-gray-600">Loading menu...</p>
          </div>
        ) : menuItems.length > 0 ? (
          <div className="grid gap-8">
            {menuItems.map(item => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img
                      src={item.image}
                      alt={item.description}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-8">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        {item.description}
                      </h3>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a
                        href={item.URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors text-center font-medium"
                      >
                        View Full Menu
                      </a>
                      {item.URLMobile && (
                        <a
                          href={item.URLMobile}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border border-orange-600 text-orange-600 px-6 py-3 rounded-lg hover:bg-orange-50 transition-colors text-center font-medium"
                        >
                          Mobile Menu
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🍽️</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Menu Available
            </h3>
            <p className="text-gray-500">
              Our menu is being updated. Please check back soon!
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to Order?
          </h2>
          <p className="text-gray-600 mb-6">
            Make a reservation to experience our delicious Vietnamese cuisine
          </p>
          <a
            href="/booking"
            className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium text-lg"
          >
            Book a Table
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
