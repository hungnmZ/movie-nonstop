'use client';

import * as React from 'react';
import { SignUp } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';

const Page = () => {
  const { resolvedTheme } = useTheme();

  return (
    <div className='flex h-dvh items-center justify-center'>
      <SignUp
        appearance={{
          baseTheme: (resolvedTheme === 'dark' && dark) || undefined,
        }}
      />
    </div>
  );
};

export default Page;
