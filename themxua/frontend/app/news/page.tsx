'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Button from '../components/Button';

interface NewsArticle {
  _id: string;
  title: string;
  picture: string;
  details: Array<{
    heading: string;
    description: string;
    image: string;
  }>;
  createdAt: string;
  slug: string;
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setError(null);
      const response = await fetch('http://localhost:5000/api/news');
      if (response.ok) {
        const data = await response.json();
        setNews(data);
      } else {
        setError('Failed to load news articles');
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      setError('Failed to load news articles. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const articleDate = new Date(dateString);
    const diffInDays = Math.floor(
      (now.getTime() - articleDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-sage-50 to-cream-100 py-20 lg:py-28">
        <div className="absolute inset-0 bg-[url('/images/pattern-grain.png')] opacity-20"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-charcoal-800 mb-6">
            Latest News & Updates
          </h1>
          <p className="text-lg md:text-xl text-charcoal-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Stay connected with ThemXua Restaurant. Discover our latest culinary
            innovations, seasonal menus, special events, and behind-the-scenes
            stories from our kitchen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/events" variant="primary" size="lg" className="px-8">
              View Events
            </Button>
            <Button
              href="/booking"
              variant="outline"
              size="lg"
              className="px-8"
            >
              Make Reservation
            </Button>
          </div>
        </div>
      </section>

      {/* News Content */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-terracotta-500 mb-4"></div>
              <p className="text-charcoal-600 text-lg">
                Loading latest news...
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
                Unable to Load News
              </h3>
              <p className="text-charcoal-600 mb-6 max-w-md mx-auto">{error}</p>
              <Button onClick={fetchNews} variant="primary">
                Try Again
              </Button>
            </div>
          ) : news.length > 0 ? (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal-800 mb-4">
                  Restaurant News
                </h2>
                <p className="text-lg text-charcoal-600 max-w-2xl mx-auto">
                  From seasonal menu updates to special celebrations, stay
                  informed about everything happening at ThemXua
                </p>
              </div>

              {/* Featured Article */}
              {news.length > 0 && (
                <div className="mb-16">
                  <h3 className="text-2xl font-display font-semibold text-charcoal-800 mb-8 text-center">
                    Featured Story
                  </h3>
                  <Card
                    variant="default"
                    className="overflow-hidden lg:flex lg:items-center"
                  >
                    {' '}
                    <div className="lg:w-1/2">
                      <img
                        src={news[0].picture || '/images/placeholder-news.jpg'}
                        alt={news[0].title}
                        className="w-full h-64 lg:h-80 object-cover"
                      />
                    </div>
                    <div className="lg:w-1/2 p-8 lg:p-12">
                      <div className="flex items-center mb-4">
                        <div className="bg-terracotta-100 text-terracotta-800 px-3 py-1 rounded-full text-sm font-medium mr-4">
                          Featured
                        </div>
                        <span className="text-charcoal-500 text-sm">
                          {getTimeAgo(news[0].createdAt)}
                        </span>
                      </div>

                      <h4 className="text-2xl lg:text-3xl font-display font-bold text-charcoal-800 mb-4">
                        {news[0].title}
                      </h4>

                      {news[0].details.length > 0 && (
                        <p className="text-charcoal-600 mb-6 leading-relaxed">
                          {news[0].details[0].description.substring(0, 200)}...
                        </p>
                      )}

                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                          href={`/news/${news[0].slug}`}
                          variant="primary"
                        >
                          Read Full Story
                        </Button>
                        <Button href="/events" variant="outline">
                          View All Events
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {/* Other Articles Grid */}
              {news.length > 1 && (
                <div>
                  <h3 className="text-2xl font-display font-semibold text-charcoal-800 mb-8 text-center">
                    More Stories
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {news.slice(1).map(article => (
                      <Card
                        key={article._id}
                        variant="default"
                        className="overflow-hidden hover:shadow-xl transition-all duration-300 group"
                      >
                        <div className="relative overflow-hidden">
                          <img
                            src={
                              article.picture || '/images/placeholder-news.jpg'
                            }
                            alt={article.title}
                            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-charcoal-600 font-medium">
                            {getTimeAgo(article.createdAt)}
                          </div>
                        </div>

                        <div className="p-6">
                          <h4 className="text-xl font-display font-semibold text-charcoal-800 mb-3 line-clamp-2 leading-tight">
                            {article.title}
                          </h4>

                          {article.details.length > 0 && (
                            <p className="text-charcoal-600 mb-4 line-clamp-3 leading-relaxed">
                              {article.details[0].description}
                            </p>
                          )}

                          <div className="flex flex-col sm:flex-row gap-3">
                            <Button
                              href={`/news/${article.slug}`}
                              variant="primary"
                              size="sm"
                              className="flex-1"
                            >
                              Read More
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
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
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-display font-semibold text-charcoal-700 mb-4">
                No News Available
              </h3>
              <p className="text-charcoal-600 mb-8 max-w-md mx-auto">
                We&apos;re working on bringing you the latest updates and
                stories. Check back soon for exciting news from our restaurant!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/menu" variant="primary">
                  Explore Our Menu
                </Button>
                <Button href="/events" variant="outline">
                  View Upcoming Events
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="bg-gradient-to-br from-terracotta-500 to-terracotta-600 py-16 lg:py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
              Stay in the Loop
            </h2>
            <p className="text-xl text-terracotta-100 mb-8 leading-relaxed">
              Subscribe to our newsletter to receive the latest news, exclusive
              offers, and updates about special events directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-3 rounded-full border-0 focus:ring-2 focus:ring-white/50 focus:outline-none"
              />
              <Button
                variant="secondary"
                size="lg"
                className="px-8 whitespace-nowrap"
              >
                Subscribe
              </Button>
            </div>
            <p className="text-terracotta-200 text-sm mt-4">
              No spam, just delicious updates. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
