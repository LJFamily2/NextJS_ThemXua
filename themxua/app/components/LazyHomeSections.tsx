'use client';

import dynamic from 'next/dynamic';

const WelcomeSection = dynamic(() => import('./sections/WelcomeSection'), {
  loading: () => <div style={{ minHeight: 300 }} />,
});
const DiningAreasSection = dynamic(
  () => import('./sections/DiningAreasSection'),
  { loading: () => <div style={{ minHeight: 300 }} /> }
);
const MenuSection = dynamic(() => import('./sections/MenuSection'), {
  loading: () => <div style={{ minHeight: 200 }} />,
});
const FoodShowcaseSection = dynamic(
  () => import('./sections/FoodShowcaseSection'),
  { loading: () => <div style={{ minHeight: 300 }} /> }
);
const FooterNew = dynamic(() => import('./Footer'), {
  loading: () => <div style={{ minHeight: 100 }} />,
});

export default function LazyHomeSections() {
  return (
    <>
      <WelcomeSection />
      <DiningAreasSection />
      <MenuSection />
      <FoodShowcaseSection />
      <FooterNew />
    </>
  );
}
