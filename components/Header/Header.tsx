import * as React from 'react';
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
    <header className='sticky top-0 z-10 w-full border-b bg-background/95 px-5 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-10'>
      <div className='flex h-14 items-center'>
        <div className='mr-4 flex'>
          <Link href='/'>
            <Image
              className='mr-6 cursor-pointer'
              src='/images/logo-full.png'
              width={100}
              height='30'
              alt='logo'
            />
          </Link>
          <nav className='hidden items-center space-x-6 text-sm font-medium md:flex'>
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
        <div className='flex'></div>
      </div>
    </header>
  );
};

export default Header;
