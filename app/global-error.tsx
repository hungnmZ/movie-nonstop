'use client';

import * as React from 'react';

import type { Locale } from '@/i18n/config';
import { readLocaleFromCookieString } from '@/i18n/config';
import { dictionaries } from '@/i18n/dictionaries';

const GlobalError = () => {
  const [locale, setLocale] = React.useState<Locale>('en');

  React.useEffect(() => {
    const nextLocale = readLocaleFromCookieString(document.cookie);

    setLocale(nextLocale);
    document.documentElement.lang = nextLocale;
  }, []);

  const dictionary = dictionaries[locale];

  return (
    <html>
      <body>
        <div className='flex h-screen'>
          <div className='m-auto flex'>
            <h1 className='leading-12 mx-5 my-0 inline-block border-r border-gray-800 pr-6 align-top text-4xl font-bold dark:border-gray-200'>
              {dictionary['errors.global.title']}
            </h1>
            <div className='flex items-center'>
              <h2 className='leading-12 m-0 font-light'>
                {dictionary['errors.global.message']}
              </h2>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};

export default GlobalError;
