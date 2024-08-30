import * as React from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { range } from '@/utils';

const LoadingIndicator: React.ForwardRefRenderFunction<HTMLDivElement> = (_, ref) => {
  return (
    <div className='m-3 mb-10 flex justify-center gap-2' ref={ref}>
      {range(0, 5).map((index) => (
        <Skeleton key={index} className='h-3 w-3 rounded-full bg-foreground/50' />
      ))}
    </div>
  );
};

export default React.forwardRef(LoadingIndicator);
