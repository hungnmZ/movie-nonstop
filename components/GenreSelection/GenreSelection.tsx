'use client';

import * as React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { GenresItem } from '@/types/Genres';

interface GenreSelectionProps {
  genres: GenresItem;
}

const GenreSelection: React.FC<GenreSelectionProps> = ({ genres }) => {
  const searchParams = useSearchParams();
  const defaulValue = searchParams.get('genre') || 'ALL_GENRES';
  const pathname = usePathname();
  const { replace } = useRouter();

  const onGenreChange = (genre: string) => {
    const params = new URLSearchParams(searchParams);

    if (genre === 'ALL_GENRES') params.delete('genre');
    else params.set('genre', genre);

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Select onValueChange={onGenreChange}>
      <SelectTrigger>
        <SelectValue
          placeholder={genres.find((g) => g.slug === defaulValue)?.nameEn || 'All genres'}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='ALL_GENRES'>All genres</SelectItem>
        {genres.map((genre) => (
          <SelectItem key={genre.slug} value={genre.slug}>
            {genre.nameEn}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default GenreSelection;
