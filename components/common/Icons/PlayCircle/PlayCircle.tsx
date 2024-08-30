import * as React from 'react';

import { cn } from '@/lib/utils';

const PlayCircle = (props: React.SVGProps<SVGSVGElement>) => {
  const { width, height, className } = props;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      stroke='#FFF'
      strokeWidth='1'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={cn('feather feather-play-circle', className)}
    >
      <circle cx='12' cy='12' r='10'></circle>
      <polygon points='9 7 17 12 9 17 9 7' fill='#FFF'></polygon>
    </svg>
  );
};

export default PlayCircle;
