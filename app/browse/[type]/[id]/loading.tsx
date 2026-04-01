import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <main className='pb-16'>
      <section className='relative min-h-[70vh] overflow-hidden'>
        <Skeleton className='absolute inset-0 rounded-none bg-foreground/10' />
        <div className='relative z-[1] mx-auto flex min-h-[70vh] w-full max-w-7xl items-end px-5 pb-16 pt-24 md:px-10'>
          <div className='grid w-full items-end gap-8 lg:grid-cols-[220px_1fr]'>
            <Skeleton className='mx-auto aspect-[2/3] w-52 rounded-xl bg-foreground/15 lg:mx-0' />
            <div className='space-y-4'>
              <Skeleton className='h-7 w-40 bg-foreground/15' />
              <Skeleton className='h-14 w-full max-w-3xl bg-foreground/15' />
              <Skeleton className='h-20 w-full max-w-3xl bg-foreground/15' />
              <Skeleton className='h-6 w-80 bg-foreground/15' />
            </div>
          </div>
        </div>
      </section>

      <section className='mx-auto mt-8 w-full max-w-7xl space-y-8 px-5 md:px-10'>
        <Skeleton className='h-40 w-full rounded-2xl bg-foreground/10' />
        <Skeleton className='h-72 w-full rounded-2xl bg-foreground/10' />
        <Skeleton className='h-72 w-full rounded-2xl bg-foreground/10' />
      </section>
    </main>
  );
};

export default Loading;
