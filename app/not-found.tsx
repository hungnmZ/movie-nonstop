import { getServerI18n } from '@/i18n/server';

const NotFound = () => {
  const { t } = getServerI18n();

  return (
    <div className='fixed inset-0 top-14 flex'>
      <div className='m-auto flex'>
        <h1 className='leading-12 mx-5 my-0 inline-block border-r border-gray-800 pr-6 align-top text-4xl font-bold dark:border-gray-200'>
          404
        </h1>
        <div className='flex items-center'>
          <h2 className='leading-12 m-0 font-light'>{t('errors.notFound.message')}</h2>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
