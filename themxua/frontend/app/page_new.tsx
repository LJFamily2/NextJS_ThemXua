'use client';

import Header from './components/Header';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* New page content will go here */}
        <div className="container mx-auto px-6 py-20">
          <h1 className="text-4xl font-heading text-center">
            Welcome to Thềm Xưa
          </h1>
          <p className="text-center mt-4 font-body text-lg">
            Fresh start with a completely new design
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
