import type { Metadata } from 'next';
import {
  DM_Serif_Display,
  Instrument_Sans,
  Roboto_Serif,
} from 'next/font/google';
import './globals.css';
import ThemXuaHeader from './components/ThemXuaHeader';

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-dm-serif-display',
  display: 'swap',
});

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-instrument-sans',
  display: 'swap',
});

const robotoSerif = Roboto_Serif({
  subsets: ['latin'],
  weight: ['200', '400', '500', '600', '800'],
  variable: '--font-roboto-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ThemXua Restaurant',
  description: 'Authentic Vietnamese Cuisine',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${dmSerifDisplay.variable} ${instrumentSans.variable} ${robotoSerif.variable} antialiased`}
      >
        <ThemXuaHeader />
        <main>{children}</main>
      </body>
    </html>
  );
}
