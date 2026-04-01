'use client';

import * as React from 'react';

import { useLocale } from '@/components/providers/LocaleProvider';

const LanguageToggle = () => {
  const { locale, t, toggleLocale } = useLocale();
  const nextLocale = locale === 'en' ? 'vi' : 'en';

  return (
    <button
      type='button'
      className='min-w-10 rounded border border-border px-2 py-1 text-xs font-semibold uppercase tracking-wide opacity-80 transition-opacity hover:opacity-100'
      aria-label={
        nextLocale === 'vi'
          ? t('nav.switchLanguageToVietnamese')
          : t('nav.switchLanguageToEnglish')
      }
      onClick={toggleLocale}
    >
      {locale.toUpperCase()}
    </button>
  );
};

export default LanguageToggle;
