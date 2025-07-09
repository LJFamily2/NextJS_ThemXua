export const dynamic = 'force-static';
// Static generation enabled for home page
import HeroSection from './components/sections/HeroSection';
import WelcomeSection from './components/sections/WelcomeSection';
import MenuSection from './components/sections/MenuSection';
import FoodShowcaseSection from './components/sections/FoodShowcaseSection';
import DiningAreasSection from './components/sections/DiningAreasSection';
import FooterNew from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <WelcomeSection />
      <DiningAreasSection />
      <MenuSection />
      <FoodShowcaseSection />
      <FooterNew />
    </div>
  );
}
