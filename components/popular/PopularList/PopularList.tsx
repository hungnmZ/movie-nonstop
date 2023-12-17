'use client';

import * as React from 'react';

import CardList from '@/components/CardList';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BasicTitle } from '@/types/Title';

interface PopularListProps {
  data: {
    day: BasicTitle[];
    week: BasicTitle[];
    month: BasicTitle[];
  };
}

const PopularList: React.FC<PopularListProps> = ({ data }) => {
  const [titles, setTitles] = React.useState(() => data.day);

  return (
    <main>
      <div className='m-5 flex gap-2 md:m-10'>
        <div className='col-span-1 text-3xl font-bold'>Popular by</div>
        <div className='min-w-[8rem]'>
          <Select
            onValueChange={(value) =>
              (value === 'day' || value === 'week' || value === 'month') &&
              setTitles(data[value])
            }
          >
            <SelectTrigger>
              <SelectValue placeholder='Day' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='day'>Day</SelectItem>
              <SelectItem value='week'>Week</SelectItem>
              <SelectItem value='month'>Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <CardList data={titles} />
    </main>
  );
};

export default PopularList;
