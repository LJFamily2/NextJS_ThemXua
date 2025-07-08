import { Roboto_Serif } from 'next/font/google';
import './globals.css';
import ThemXuaHeader from './components/ThemXuaHeader';
import { LanguageProvider } from './contexts/LanguageContext';
import ConditionalScrollToTop from './components/ConditionalScrollToTop';

const robotoSerif = Roboto_Serif({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-roboto-serif',
  display: 'swap',
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${robotoSerif.variable} antialiased select-none`}>
        <LanguageProvider>
          <ThemXuaHeader />
          <main>{children}</main>
          <ConditionalScrollToTop />
        </LanguageProvider>
      </body>
    </html>
  );
}
