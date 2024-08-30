'use client';

import * as React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type TimeUnitSelectionProp = {};

const TimeUnitSelection: React.FC<TimeUnitSelectionProp> = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const onUnitTimeChange = (timeUnit: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('time-unit', timeUnit);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Select onValueChange={onUnitTimeChange}>
      <SelectTrigger>
        <SelectValue placeholder='Day' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='day'>Day</SelectItem>
        <SelectItem value='week'>Week</SelectItem>
        <SelectItem value='month'>Month</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default TimeUnitSelection;
