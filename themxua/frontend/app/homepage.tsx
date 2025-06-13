import Image from 'next/image';

export default function Home() {
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
              <a href="/events" className="text-gray-600 hover:text-gray-800">
                Events
              </a>
              <a href="/news" className="text-gray-600 hover:text-gray-800">
                News
              </a>
            </div>
            <div className="md:hidden">
              <button className="text-gray-600">☰</button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6 font-[family-name:var(--font-roboto-condensed)]">
            Welcome to ThemXua Restaurant
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience authentic Vietnamese cuisine in a warm and welcoming
            atmosphere. Book your table today for an unforgettable dining
            experience.
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/booking"
              className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium"
            >
              Book a Table
            </a>
            <a
              href="/menu"
              className="border border-orange-600 text-orange-600 px-8 py-3 rounded-lg hover:bg-orange-50 transition-colors font-medium"
            >
              View Menu
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Why Choose ThemXua?
            </h2>
            <p className="text-gray-600">
              Discover what makes our restaurant special
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🍜</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Authentic Cuisine</h3>
              <p className="text-gray-600">
                Traditional Vietnamese recipes passed down through generations
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏮</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Warm Atmosphere</h3>
              <p className="text-gray-600">
                Cozy and welcoming environment perfect for any occasion
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Excellent Service</h3>
              <p className="text-gray-600">
                Friendly staff dedicated to making your experience memorable
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 ThemXua Restaurant. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
