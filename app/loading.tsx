import MovieCardSkeleton from '@/components/MovieCardSkeleton';
import { range } from '@/utils';

export default function Loading() {
  return (
    <main>
      <div className='-mb-5 overflow-hidden whitespace-nowrap p-5 md:p-10'>
        <div className='mb-2 text-xl font-extrabold xl:text-2xl'>Trending Now</div>
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
        <div className='mb-2 text-xl font-extrabold xl:text-2xl'>New Releases Movies</div>
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
          New Releases TV Shows
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
