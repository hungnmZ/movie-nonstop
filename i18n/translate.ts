import type { Dictionary, DictionaryKey } from '@/i18n/dictionaries';

export type TranslationParams = Record<string, string | number>;

export const formatMessage = (message: string, params?: TranslationParams) => {
  if (!params) return message;

  return Object.entries(params).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, String(value)),
    message,
  );
};

export const translate = (
  dictionary: Dictionary,
  key: DictionaryKey,
  params?: TranslationParams,
) => {
  return formatMessage(dictionary[key], params);
};
