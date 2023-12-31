'use client';
import * as React from 'react';
import { useSearchParams } from 'next/navigation';

import CardList from '@/components/CardList';
import TimeUnitSelection from '@/components/TimeUnitSelection';
import { BasicTitle } from '@/types/Title';

type PopularListProps = {
  data: {
    day: BasicTitle[];
    week: BasicTitle[];
    month: BasicTitle[];
  };
};

const PopularList: React.FC<PopularListProps> = ({ data }) => {
  const searchParams = useSearchParams();
  const timeUnit = searchParams.get('time-unit') || 'day';
  const titles =
    timeUnit === 'day' || timeUnit === 'week' || timeUnit === 'month'
      ? data[timeUnit]
      : data?.day;

  return (
    <main>
      <div className='m-5 flex gap-2 md:m-10'>
        <div className='col-span-1 text-3xl font-bold'>Popular by</div>
        <div className='min-w-[8rem]'>
          <TimeUnitSelection />
        </div>
      </div>
      <CardList data={titles.slice(0, 24)} />
    </main>
  );
};

export default PopularList;
