import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <main className='min-h-screen bg-[#070707] px-5 pb-12 pt-8 md:px-10'>
      <div className='mx-auto w-full max-w-[1440px] space-y-6'>
        <Skeleton className='h-10 w-44 rounded-full bg-white/15' />

        <div className='grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]'>
          <div className='space-y-4'>
            <Skeleton className='aspect-video w-full rounded-2xl bg-white/10' />
            <Skeleton className='h-6 w-full max-w-lg rounded-lg bg-white/10' />
            <Skeleton className='h-20 w-full rounded-lg bg-white/10' />
          </div>

          <Skeleton className='h-72 w-full rounded-2xl bg-white/10' />
        </div>
      </div>
    </main>
  );
};

export default Loading;
