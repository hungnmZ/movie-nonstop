'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import DarkModeToggle from '@/components/common/DarkModeToggle';
import { cn } from '@/lib/utils';

const LINKS = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'TV Shows',
    href: '/browse/show',
  },
  {
    label: 'Movies',
    href: '/browse/movie',
  },
  {
    label: 'Popular',
    href: '/popular',
  },
  {
    label: 'My List',
    href: '/my-list',
  },
];

const Header = () => {
  const pathName = usePathname();

  return (
    <header className='sticky top-0 z-10 w-full border-b bg-background/95 px-5 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-10'>
      <div className='flex h-14 items-center'>
        <div className='mr-4 flex'>
          <Link href='/'>
            <Image
              className='mr-6 h-8 w-auto cursor-pointer'
              src='/images/logo-full.png'
              width={264}
              height={85}
              alt='logo'
            />
          </Link>
          <nav className='hidden items-center space-x-6 text-sm font-medium md:flex'>
            {LINKS.map((link) => (
              <Link
                className={cn(
                  'text-foreground/60 transition-colors hover:text-foreground/80',
                  {
                    'text-foreground': link.href === pathName,
                  },
                )}
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className='flex flex-1 justify-end'>
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
