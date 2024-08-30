'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';

import SunMoon from '@/components/common/Icons/SunMoon';

const DarkModeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();

  React.useEffect(() => {
    const handleChange = () => setTheme('system');
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [setTheme]);

  const handleToggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      className='flex h-8 w-8 items-center justify-center opacity-80 hover:opacity-100'
      onClick={handleToggleTheme}
    >
      <SunMoon />
    </button>
  );
};

export default DarkModeToggle;
