import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';

import Header from '@/components/Header';
import { cn } from '@/lib/utils';

import './globals.css';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'MovieNonstop',
  description: 'Your movies ready for a nonstop movie marathon!',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <Header />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
