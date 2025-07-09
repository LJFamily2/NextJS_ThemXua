// Google Analytics and Search Console configuration
// Replace the placeholder IDs with your actual Google Analytics and Search Console IDs

export interface AnalyticsConfig {
  googleAnalyticsId: string;
  googleSearchConsoleId: string;
  facebookPixelId: string;
  microsoftClarityId?: string;
}

export const analyticsConfig: AnalyticsConfig = {
  // Replace with your actual Google Analytics 4 ID
  googleAnalyticsId: 'G-3PL1EPJY3K',

  // Replace with your Google Search Console verification code
  googleSearchConsoleId: 'uqMorhH6TQTpzo7dScpjr-UKriCF-f6XD7sYrMVO_Fo',

  // Replace with your Facebook Pixel ID
  facebookPixelId: '4086193828336260',
};

// Google Analytics tracking events for restaurant
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, string | number | boolean>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      custom_map: {
        restaurant_name: 'Quán Thềm Xưa Tây Ninh',
        business_type: 'restaurant',
        location: 'Tay Ninh, Vietnam',
      },
      ...parameters,
    });
  }
};

// Specific tracking events for restaurant actions
export const trackMenuView = (section?: string) => {
  trackEvent('view_menu', {
    content_type: 'menu',
    item_category: section || 'all',
    event_category: 'engagement',
    event_label: 'Menu Viewing',
  });
};

export const trackBookingAttempt = () => {
  trackEvent('begin_checkout', {
    content_type: 'booking',
    event_category: 'conversion',
    event_label: 'Booking Attempt',
  });
};

export const trackBookingComplete = () => {
  trackEvent('purchase', {
    content_type: 'booking',
    event_category: 'conversion',
    event_label: 'Booking Complete',
    value: 1,
  });
};

export const trackPhoneCall = () => {
  trackEvent('contact', {
    method: 'phone',
    event_category: 'engagement',
    event_label: 'Phone Call',
  });
};

export const trackLocationView = () => {
  trackEvent('view_item', {
    content_type: 'location',
    event_category: 'engagement',
    event_label: 'Location Viewed',
  });
};

export const trackLanguageChange = (language: string) => {
  trackEvent('language_change', {
    language: language,
    event_category: 'engagement',
    event_label: 'Language Switch',
  });
};

// Facebook Pixel events
export const trackFacebookEvent = (
  eventName: string,
  parameters?: Record<string, string | number>
) => {
  if (typeof window !== 'undefined' && window.fbq) {
    if (parameters) {
      window.fbq('track', eventName, parameters);
    } else {
      window.fbq('track', eventName);
    }
  }
};

export const trackFacebookPageView = () => {
  trackFacebookEvent('PageView');
};

export const trackFacebookLead = () => {
  trackFacebookEvent('Lead', {
    content_name: 'Restaurant Booking',
    content_category: 'Booking',
  });
};

// Microsoft Clarity tracking
export const initClarity = (clarityId: string) => {
  if (typeof window !== 'undefined') {
    // Initialize Microsoft Clarity
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.clarity.ms/tag/${clarityId}`;
    document.head.appendChild(script);
  }
};

// Declare global functions for TypeScript
declare global {
  interface Window {
    gtag: (
      command: string,
      ...args: (string | Record<string, unknown>)[]
    ) => void;
    fbq: (
      command: string,
      ...args: (string | Record<string, unknown>)[]
    ) => void;
    clarity: (command: string, ...args: string[]) => void;
  }
}
