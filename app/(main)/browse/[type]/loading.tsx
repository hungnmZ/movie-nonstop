import MovieCardSkeleton from '@/components/common/MovieCardSkeleton';
import { Skeleton } from '@/components/ui/skeleton';
import { range } from '@/utils';

export default function Loading() {
  return (
    <main>
      <div className='m-5 flex gap-2 md:m-10'>
        <Skeleton className='min-h-[2.5rem] min-w-[10rem] bg-foreground/5' />
        <Skeleton className='min-h-[2.5rem] min-w-[12rem] bg-foreground/5' />
      </div>
      <div className='m-5 grid grid-cols-3 gap-2 gap-y-20 overflow-visible whitespace-nowrap md:m-10 lg:grid-cols-4 xl:grid-cols-6'>
        {range(0, 24).map((index) => (
          <div key={index} className='aspect-video w-full'>
            <MovieCardSkeleton />
          </div>
        ))}
      </div>
    </main>
  );
}
