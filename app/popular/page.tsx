import * as React from 'react';

import PopularList from '@/app/popular/_components/PopularList';
import { getTopTitles } from '@/data/title';

export const revalidate = 600;

const Page = async () => {
  const data = await getTopTitles();

  return <PopularList data={data} />;
};

export default Page;
