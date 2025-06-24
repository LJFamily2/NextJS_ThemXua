import type { Metadata } from 'next';
import { Roboto_Serif } from 'next/font/google';
import './globals.css';
import ThemXuaHeader from './components/ThemXuaHeader';

const robotoSerif = Roboto_Serif({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
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
      <body className={`${robotoSerif.variable} antialiased select-none`}>
        <ThemXuaHeader />
        <main>{children}</main>
      </body>
    </html>
  );
}
