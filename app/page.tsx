import * as React from 'react';

import CardSliderContainer from '@/components/CardSlider/CardSlider';
import { getHomeTitles } from '@/data/title';

const Home = async () => {
  const data = await getHomeTitles();

  return (
    <main>
      <div className='-mb-5'>
        <CardSliderContainer
          header='Trending Now'
          titles={data.recommendedTitles?.nodes}
        />
      </div>

      <div className='-mb-5'>
        <CardSliderContainer
          header='New Releases Movies'
          titles={data.movieTitles?.nodes}
        />
      </div>

      <div className='-mb-5'>
        <CardSliderContainer
          header='New Releases TV Shows'
          titles={data.showTitles?.nodes}
        />
      </div>
      <div style={{ height: '100vh' }}></div>
    </main>
  );
};

export default Home;
