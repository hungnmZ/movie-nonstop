'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, ...props }) => (
  <NextThemesProvider {...props}>{children}</NextThemesProvider>
);

export default ThemeProvider;
