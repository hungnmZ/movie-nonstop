import { cookies } from 'next/headers';

import { Locale, LOCALE_COOKIE_KEY, resolveLocale } from '@/i18n/config';
import type { DictionaryKey } from '@/i18n/dictionaries';
import { dictionaries } from '@/i18n/dictionaries';
import { translate, TranslationParams } from '@/i18n/translate';

import 'server-only';

export const getServerLocale = (): Locale => {
  const localeCookie = cookies().get(LOCALE_COOKIE_KEY)?.value;

  return resolveLocale(localeCookie);
};

export const getServerI18n = () => {
  const locale = getServerLocale();
  const dictionary = dictionaries[locale];
  const t = (key: DictionaryKey, params?: TranslationParams) =>
    translate(dictionary, key, params);

  return {
    locale,
    dictionary,
    t,
  };
};
