'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, ...props }) => {
  return (
    <NextThemesProvider
      attribute='class'
      defaultTheme='system'
      storageKey='movie-nonstop-theme'
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      <ThemeChangeDetector>{children}</ThemeChangeDetector>
    </NextThemesProvider>
  );
};

const ThemeChangeDetector: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { setTheme } = useTheme();

  React.useEffect(() => {
    const handleChange = () => setTheme('system');
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [setTheme]);

  return <>{children}</>;
};

export default ThemeProvider;
