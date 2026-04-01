import MovieCardSkeleton from '@/components/common/MovieCardSkeleton';
import { getServerI18n } from '@/i18n/server';
import { range } from '@/utils';

export default function Loading() {
  const { t } = getServerI18n();

  return (
    <main>
      <div className='-mb-5 overflow-hidden whitespace-nowrap p-5 md:p-10'>
        <div className='mb-2 text-xl font-extrabold xl:text-2xl'>
          {t('home.trendingNow')}
        </div>
        {range(0, 12).map((index) => (
          <div
            key={index}
            className='inline-block aspect-video w-1/3 px-1 align-top first:pl-0 last:pr-0 lg:w-1/4 xl:w-1/6'
          >
            <MovieCardSkeleton />
          </div>
        ))}
      </div>

      <div className='-mb-5 overflow-hidden whitespace-nowrap p-5 md:p-10'>
        <div className='mb-2 text-xl font-extrabold xl:text-2xl'>
          {t('home.newReleaseMovies')}
        </div>
        {range(0, 12).map((index) => (
          <div
            key={index}
            className='inline-block aspect-video w-1/3 px-1 align-top first:pl-0 last:pr-0 lg:w-1/4 xl:w-1/6'
          >
            <MovieCardSkeleton />
          </div>
        ))}
      </div>

      <div className='-mb-5 overflow-hidden whitespace-nowrap p-5 md:p-10'>
        <div className='mb-2 text-xl font-extrabold xl:text-2xl'>
          {t('home.newReleaseShows')}
        </div>
        {range(0, 12).map((index) => (
          <div
            key={index}
            className='inline-block aspect-video w-1/3 px-1 align-top first:pl-0 last:pr-0 lg:w-1/4 xl:w-1/6'
          >
            <MovieCardSkeleton />
          </div>
        ))}
      </div>
    </main>
  );
}
