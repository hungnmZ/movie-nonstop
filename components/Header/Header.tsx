import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const LINKS = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Popular',
    href: '/popular',
  },
  {
    label: 'TV Shows',
    href: '/show',
  },
  {
    label: 'Movies',
    href: '/movies',
  },
  {
    label: 'My List',
    href: '/my-list',
  },
];

const Header = () => {
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-14 items-center'>
        <div className='mr-4 hidden md:flex'>
          <Image className='mr-6' src='/images/logo-full.png' width={100} height='30' alt='logo' />
          <nav className='flex items-center space-x-6 text-sm font-medium'>
            {LINKS.map((link) => (
              <Link
                className='text-foreground/60 transition-colors hover:text-foreground/80'
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
