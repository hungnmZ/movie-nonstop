'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import type { Locale } from '@/i18n/config';
import {
  LOCALE_COOKIE_KEY,
  LOCALE_COOKIE_MAX_AGE,
  readLocaleFromCookieString,
  resolveLocale,
} from '@/i18n/config';
import { dictionaries, type DictionaryKey } from '@/i18n/dictionaries';
import { translate, type TranslationParams } from '@/i18n/translate';

type LocaleContextValue = {
  locale: Locale;
  t: (_key: DictionaryKey, _params?: TranslationParams) => string;
  setLocale: (_locale: Locale) => void;
  toggleLocale: () => void;
};

type LocaleProviderProps = {
  initialLocale: Locale;
  children: React.ReactNode;
};

const LocaleContext = React.createContext<LocaleContextValue | null>(null);

const persistLocale = (locale: Locale) => {
  document.cookie = `${LOCALE_COOKIE_KEY}=${locale}; Path=/; Max-Age=${LOCALE_COOKIE_MAX_AGE}; SameSite=Lax`;
};

const LocaleProvider: React.FC<LocaleProviderProps> = ({ initialLocale, children }) => {
  const router = useRouter();
  const [locale, setLocaleState] = React.useState<Locale>(resolveLocale(initialLocale));

  React.useEffect(() => {
    const cookieLocale = readLocaleFromCookieString(document.cookie);

    setLocaleState(cookieLocale);
    document.documentElement.lang = cookieLocale;
  }, []);

  const setLocale = React.useCallback(
    (nextLocale: Locale) => {
      const resolvedLocale = resolveLocale(nextLocale);

      setLocaleState((currentLocale) => {
        if (currentLocale === resolvedLocale) return currentLocale;

        persistLocale(resolvedLocale);
        document.documentElement.lang = resolvedLocale;
        router.refresh();

        return resolvedLocale;
      });
    },
    [router],
  );

  const toggleLocale = React.useCallback(() => {
    setLocale(locale === 'en' ? 'vi' : 'en');
  }, [locale, setLocale]);

  const dictionary = React.useMemo(() => dictionaries[locale], [locale]);

  const t = React.useCallback(
    (key: DictionaryKey, params?: TranslationParams) =>
      translate(dictionary, key, params),
    [dictionary],
  );

  const contextValue = React.useMemo(
    () => ({
      locale,
      t,
      setLocale,
      toggleLocale,
    }),
    [locale, setLocale, t, toggleLocale],
  );

  return <LocaleContext.Provider value={contextValue}>{children}</LocaleContext.Provider>;
};

export const useLocale = () => {
  const localeContext = React.useContext(LocaleContext);

  if (!localeContext) {
    throw new Error('useLocale must be used within LocaleProvider');
  }

  return localeContext;
};

export default LocaleProvider;
