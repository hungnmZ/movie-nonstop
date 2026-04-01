'use client';

import * as React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useLocale } from '@/components/providers/LocaleProvider';
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
  const { t } = useLocale();

  const onUnitTimeChange = (timeUnit: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('time-unit', timeUnit);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Select onValueChange={onUnitTimeChange}>
      <SelectTrigger>
        <SelectValue placeholder={t('time.day')} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='day'>{t('time.day')}</SelectItem>
        <SelectItem value='week'>{t('time.week')}</SelectItem>
        <SelectItem value='month'>{t('time.month')}</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default TimeUnitSelection;
