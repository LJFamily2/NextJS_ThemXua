import type { Metadata } from 'next';
import { Roboto_Condensed } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import './styles/layout.css';
import './styles/animations.css';
import './styles/variables.css';
import './lib/fontawesome';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './components/Notifications';
import GoogleAnalytics from './components/GoogleAnalytics';

const robotoCondensed = Roboto_Condensed({
  variable: '--font-roboto-condensed',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'ThemXua Restaurant - Authentic Vietnamese Cuisine',
  description:
    'Experience authentic Vietnamese cuisine at ThemXua Restaurant. Traditional recipes, warm atmosphere, and excellent service in Tay Ninh, Vietnam.',
  keywords:
    'Vietnamese restaurant, authentic cuisine, ThemXua, Tay Ninh, Vietnamese food, traditional recipes',
  openGraph: {
    title: 'ThemXua Restaurant - Authentic Vietnamese Cuisine',
    description:
      'Experience authentic Vietnamese cuisine at ThemXua Restaurant',
    type: 'website',
    locale: 'vi_VN',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        {/* Font Awesome for icons */}
        <Script
          src="https://kit.fontawesome.com/6f8d1d8e9d.js"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
        {/* Favicon */}
        <link
          rel="shortcut icon"
          href="/images/favicon.jpg"
          type="image/x-icon"
        />
      </head>
      <body className={`${robotoCondensed.variable} antialiased`}>
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics
            GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
          />
        )}

        <NotificationProvider>
          <AuthProvider>{children}</AuthProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}
