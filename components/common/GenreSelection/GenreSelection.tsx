'use client';

import * as React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useLocale } from '@/components/providers/LocaleProvider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { localizeName } from '@/i18n/localize';
import { GenresItem } from '@/types/Genres';

type GenreSelectionProps = {
  genres: GenresItem;
};

const GenreSelection: React.FC<GenreSelectionProps> = ({ genres }) => {
  const searchParams = useSearchParams();
  const defaulValue = searchParams.get('genre') || 'ALL_GENRES';
  const pathname = usePathname();
  const { replace } = useRouter();
  const { locale, t } = useLocale();

  const onGenreChange = (genre: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (genre === 'ALL_GENRES') params.delete('genre');
    else params.set('genre', genre);

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Select onValueChange={onGenreChange}>
      <SelectTrigger>
        <SelectValue
          placeholder={
            localizeName(locale, genres.find((g) => g.slug === defaulValue) || {}, '') ||
            t('genre.all')
          }
        />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='ALL_GENRES'>{t('genre.all')}</SelectItem>
        {genres.map((genre) => (
          <SelectItem key={genre.slug} value={genre.slug}>
            {localizeName(locale, genre, genre.nameEn)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default GenreSelection;
