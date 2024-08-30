'use client';

import * as React from 'react';

import MovieCard from '@/components/common/MovieCard';
import { useResponsiveSize } from '@/hooks/useResponsiveSize';
import { BasicTitle } from '@/types/Title';

type CardListProps = {
  data: BasicTitle[];
};

const CardList: React.FC<CardListProps> = ({ data }) => {
  const [responsiveSize] = useResponsiveSize();

  const childPerRow = React.useMemo(() => {
    switch (responsiveSize) {
      case '2xl':
      case 'xl':
        return 6;
      case 'lg':
        return 4;
      case 'md':
      case 'sm':
      default:
        return 3;
    }
  }, [responsiveSize]);

  return (
    <div className='m-5 grid grid-cols-3 gap-2 gap-y-20 overflow-visible whitespace-nowrap md:m-10 lg:grid-cols-4 xl:grid-cols-6'>
      {data.map((title: BasicTitle, index: number) => (
        <div key={title.id} className='aspect-video w-full'>
          <MovieCard
            data={title}
            isFirst={index % childPerRow === 0}
            isLast={index % childPerRow === childPerRow - 1}
          />
        </div>
      ))}
    </div>
  );
};

export default CardList;
