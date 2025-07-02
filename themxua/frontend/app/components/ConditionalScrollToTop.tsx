'use client';

import { usePathname } from 'next/navigation';
import ScrollToTop from './ui/ScrollToTop';

const ConditionalScrollToTop: React.FC = () => {
  const pathname = usePathname();

  // Don't show scroll to top button on menu page
  const isMenuPage = pathname === '/booking' || pathname.endsWith('/booking');

  if (isMenuPage) {
    return null;
  }

  return <ScrollToTop />;
};

export default ConditionalScrollToTop;
