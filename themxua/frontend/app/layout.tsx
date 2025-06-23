import type { Metadata } from 'next';
import './globals.css';

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
      <body>
        {children}
      </body>
    </html>
  );
}
