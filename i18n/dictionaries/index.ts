import type { Locale } from '@/i18n/config';

import enDictionary, { type Dictionary, type DictionaryKey } from './en';
import viDictionary from './vi';

export type { Dictionary, DictionaryKey };

export const dictionaries: Record<Locale, Dictionary> = {
  en: enDictionary,
  vi: viDictionary,
};
