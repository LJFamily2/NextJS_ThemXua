'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

// Define gtag function for TypeScript
declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}

interface GoogleAnalyticsProps {
  GA_MEASUREMENT_ID: string;
}

const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({
  GA_MEASUREMENT_ID,
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      const url = pathname + searchParams.toString();

      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
      });
    }
  }, [pathname, searchParams, GA_MEASUREMENT_ID]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
};

// Google Analytics tracking functions
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!, {
      page_path: url,
    });
  }
};

// Booking tracking
export const trackBookingSubmit = (numberOfPeople: string) => {
  trackEvent(
    'booking_submit',
    'engagement',
    'booking_form',
    parseInt(numberOfPeople)
  );
};

export const trackBookingSuccess = () => {
  trackEvent('booking_success', 'conversion', 'booking_completed');
};

// Menu tracking
export const trackMenuView = (category?: string) => {
  trackEvent('menu_view', 'engagement', category || 'menu_page');
};

// News tracking
export const trackNewsView = (articleTitle: string) => {
  trackEvent('news_view', 'engagement', articleTitle);
};

// Contact tracking
export const trackContactClick = (method: string) => {
  trackEvent('contact_click', 'engagement', method);
};

export default GoogleAnalytics;
