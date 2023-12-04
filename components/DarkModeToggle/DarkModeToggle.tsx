'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';

import SunMoon from '../Icons/SunMoon';

const SunMoonLazy = dynamic(() => import('../Icons/SunMoon'), {
  ssr: false,
  loading: () => <SunMoon theme='light' />,
});

const DarkModeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const theme = resolvedTheme as 'light' | 'dark';

  const handleToggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return (
    <button
      className='flex h-8 w-8 items-center justify-center opacity-80 hover:opacity-100'
      onClick={handleToggleTheme}
    >
      <SunMoonLazy theme={theme} />
    </button>
  );
};

export default DarkModeToggle;
