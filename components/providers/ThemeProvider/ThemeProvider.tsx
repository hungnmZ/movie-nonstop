'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => (
  <NextThemesProvider
    attribute='class'
    defaultTheme='system'
    storageKey='movie-nonstop-theme'
    enableSystem
    disableTransitionOnChange
  >
    {children}
  </NextThemesProvider>
);

export default ThemeProvider;
