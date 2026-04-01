import { notFound } from 'next/navigation';

import TitlesList from '@/app/browse/_components/TitlesList';
import GenreSelection from '@/components/common/GenreSelection';
import { getGenres } from '@/data/genre';
import { getTitles } from '@/data/title';
import { getServerI18n } from '@/i18n/server';

export const revalidate = 600;

type PageProps = {
  searchParams: {
    genre?: string;
  };
  params: {
    type: string;
  };
};

const getHeader = (
  type: string,
  movieText: string,
  showText: string,
  titleText: string,
) => {
  switch (type) {
    case 'movie':
      return movieText;
    case 'show':
      return showText;

    default:
      return titleText;
  }
};

const Page = async ({ searchParams, params }: PageProps) => {
  if (!['movie', 'show'].includes(params.type)) notFound();

  const { t } = getServerI18n();

  const query = { type: params.type, genre: searchParams.genre };

  const [titles, genres] = await Promise.all([getTitles(query), getGenres()]);

  return (
    <main>
      <div className='m-5 flex gap-2 md:m-10'>
        <div className='col-span-1 text-3xl font-bold'>
          {getHeader(
            params.type,
            t('browse.headerMovies'),
            t('browse.headerShows'),
            t('browse.headerTitles'),
          )}
        </div>
        <div className='min-w-[12rem]'>
          <GenreSelection genres={genres} />
        </div>
      </div>
      <TitlesList titles={titles} query={query} key={query.genre} />
    </main>
  );
};

export default Page;
