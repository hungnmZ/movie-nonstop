import type { Locale } from '@/i18n/config';

type NameLocaleInput = {
  nameEn?: string | null;
  nameVi?: string | null;
};

const clean = (value: string | null | undefined) => value?.trim() || '';

export const localizeName = (locale: Locale, input: NameLocaleInput, fallback = '') => {
  const englishName = clean(input.nameEn);
  const vietnameseName = clean(input.nameVi);

  if (locale === 'vi') {
    return vietnameseName || englishName || fallback;
  }

  return englishName || vietnameseName || fallback;
};
