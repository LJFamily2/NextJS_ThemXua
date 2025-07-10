import HeroSection from './components/sections/HeroSection';
import LazyHomeSections from './components/LazyHomeSections';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <LazyHomeSections />
    </div>
  );
}
