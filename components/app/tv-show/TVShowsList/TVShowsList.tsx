'use client';

import * as React from 'react';
import { useInView } from 'framer-motion';

import CardList from '@/components/CardList';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { getTitles } from '@/data/title';
import { Genres } from '@/types/Genres';
import { Titles } from '@/types/Titles';
import { range } from '@/utils';

interface TVShowsListProps {
  data: Titles['data']['titles'];
  genres: Genres['data']['genres'];
}

const TVShowsList: React.FC<TVShowsListProps> = ({ data, genres }) => {
  const [titles, setTitles] = React.useState(() => data.nodes);
  const [query, setQuery] = React.useState<{
    type: string;
    page: number;
    genre?: string;
  }>({ type: 'show', page: 1 });

  const loadMoreRef = React.useRef(null);
  const isLoadMoreInView = useInView(loadMoreRef);
  const [isLoadMoreVisible, setIsLoadMoreVisible] = React.useState(true);

  React.useEffect(() => {
    getTitles(query).then((data) => {
      if (data.nodes.length === 0) {
        setIsLoadMoreVisible(false);
      }

      if (query.page === 1) {
        getTitles(query).then((data) => setTitles(data.nodes));
        return;
      }

      setTitles((prevTitles) => [...prevTitles, ...data.nodes]);
    });
  }, [query]);

  React.useEffect(() => {
    setQuery((prev) => ({ ...prev, page: prev.page + 1 }));
  }, [isLoadMoreInView]);

  const onGenreChange = (genre: string) => {
    setIsLoadMoreVisible(true);

    if (genre === 'ALL_GENRES') {
      setQuery({ ...query, genre: undefined, page: 1 });
      return;
    }

    setQuery({ ...query, genre, page: 1 });
  };

  return (
    <main>
      <div className='m-5 flex gap-2 md:m-10'>
        <div className='col-span-1 text-3xl font-bold'>TV Shows</div>
        <div className='min-w-[12rem]'>
          <Select onValueChange={onGenreChange}>
            <SelectTrigger>
              <SelectValue placeholder='Genres' />
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
        </div>
      </div>
      <CardList data={titles} />
      {isLoadMoreVisible && (
        <div className='m-3 mb-10 flex justify-center gap-2' ref={loadMoreRef}>
          {range(0, 5).map((index) => (
            <Skeleton key={index} className='h-3 w-3 rounded-full bg-foreground/50' />
          ))}
        </div>
      )}
    </main>
  );
};

export default TVShowsList;
