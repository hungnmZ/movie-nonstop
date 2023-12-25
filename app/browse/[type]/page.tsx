import { notFound } from 'next/navigation';

import MoviesList from '@/components/app/browse/TitlesList';
import GenreSelection from '@/components/GenreSelection';
import { getGenres } from '@/data/genre';
import { getTitles } from '@/data/title';

export const revalidate = 600;

type PageProps = {
  searchParams: {
    genre?: string;
  };
  params: {
    type: string;
  };
};

export const getHeader = (type: string) => {
  switch (type) {
    case 'movie':
      return 'Movies';
    case 'show':
      return 'TV Shows';

    default:
      return 'Titles';
  }
};

const Page = async ({ searchParams, params }: PageProps) => {
  if (!['movie', 'show'].includes(params.type)) notFound();

  const query = { type: params.type, genre: searchParams.genre };

  const [titles, genres] = await Promise.all([getTitles(query), getGenres()]);

  return (
    <main>
      <div className='m-5 flex gap-2 md:m-10'>
        <div className='col-span-1 text-3xl font-bold'>{getHeader(params.type)}</div>
        <div className='min-w-[12rem]'>
          <GenreSelection genres={genres} />
        </div>
      </div>
      <MoviesList titles={titles} query={query} key={query.genre} />
    </main>
  );
};

export default Page;
