export const SUPPORTED_LOCALES = ['en', 'vi'] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';
export const LOCALE_COOKIE_KEY = 'movie-nonstop-locale';
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const resolveLocale = (value: string | null | undefined): Locale => {
  if (!value) return DEFAULT_LOCALE;

  const locale = value.toLowerCase();

  return SUPPORTED_LOCALES.includes(locale as Locale)
    ? (locale as Locale)
    : DEFAULT_LOCALE;
};

const getCookieValue = (cookieString: string, key: string) => {
  const cookie = cookieString
    .split(';')
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${key}=`));

  if (!cookie) return null;

  return cookie.substring(key.length + 1);
};

export const readLocaleFromCookieString = (cookieString: string) => {
  const locale = getCookieValue(cookieString, LOCALE_COOKIE_KEY);

  return resolveLocale(locale);
};
