import MovieCardSkeleton from '@/components/common/MovieCardSkeleton';
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getServerI18n } from '@/i18n/server';
import { range } from '@/utils';

export default function Loading() {
  const { t } = getServerI18n();

  return (
    <main>
      <div className='m-5 flex gap-2 md:m-10'>
        <div className='col-span-1 text-3xl font-bold'>{t('popular.header')}</div>
        <div className='min-w-[8rem]'>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder={t('time.day')} />
            </SelectTrigger>
          </Select>
        </div>
      </div>
      <div className='m-5 grid grid-cols-3 gap-2 gap-y-20 overflow-visible whitespace-nowrap md:m-10 lg:grid-cols-4 xl:grid-cols-6'>
        {range(0, 24).map((index) => (
          <div key={index} className='aspect-video w-full'>
            <MovieCardSkeleton />
          </div>
        ))}
      </div>
    </main>
  );
}
