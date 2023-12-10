import * as React from 'react';

import CardSlider from '@/components/CardSlider/CardSlider';
import { getHomeTitles } from '@/data/title';

export const revalidate = 600;

const Home = async () => {
  const data = await getHomeTitles();

  return (
    <main>
      <div className='-mb-5'>
        <CardSlider header='Trending Now' titles={data.recommendedTitles?.nodes} />
      </div>

      <div className='-mb-5'>
        <CardSlider header='New Releases Movies' titles={data.movieTitles?.nodes} />
      </div>

      <div className='-mb-5'>
        <CardSlider header='New Releases TV Shows' titles={data.showTitles?.nodes} />
      </div>
    </main>
  );
};

export default Home;
