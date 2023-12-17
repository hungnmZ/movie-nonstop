import * as React from 'react';

import { Skeleton } from '../ui/skeleton';

const MovieCardSkeleton = () => {
  return (
    <div className='flex h-full w-full cursor-pointer flex-col justify-end gap-2 overflow-hidden rounded-lg bg-foreground/5 px-3 pb-2'>
      <Skeleton className='h-1/5 w-3/5 bg-foreground/10' />
      <Skeleton className='h-1/5 w-full bg-foreground/10' />
    </div>
  );
};

export default MovieCardSkeleton;
