import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';

import Header from '@/components/common/Header';
import LocaleProvider from '@/components/providers/LocaleProvider';
import ThemeProvider from '@/components/providers/ThemeProvider';
import { getServerI18n, getServerLocale } from '@/i18n/server';
import { cn } from '@/lib/utils';

import './globals.css';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const generateMetadata = (): Metadata => {
  const { t } = getServerI18n();

  return {
    title: 'MovieNonstop',
    description: t('app.meta.description'),
  };
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const locale = getServerLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <ThemeProvider>
          <LocaleProvider initialLocale={locale}>
            <Header />
            {children}
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
