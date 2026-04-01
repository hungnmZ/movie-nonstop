import * as React from 'react';

import CardSlider from '@/components/common/CardSlider/CardSlider';
import { getHomeTitles } from '@/data/title';
import { getServerI18n } from '@/i18n/server';

export const revalidate = 600;

const Home = async () => {
  const data = await getHomeTitles(24);
  const { t } = getServerI18n();

  return (
    <main>
      <div className='-mb-5'>
        <CardSlider
          header={t('home.trendingNow')}
          titles={data.recommendedTitles?.nodes}
        />
      </div>

      <div className='-mb-5'>
        <CardSlider
          header={t('home.newReleaseMovies')}
          titles={data.movieTitles?.nodes}
        />
      </div>

      <div className='-mb-5'>
        <CardSlider header={t('home.newReleaseShows')} titles={data.showTitles?.nodes} />
      </div>
    </main>
  );
};

export default Home;
