import * as React from 'react';

import { getTopTitles } from '@/data/title';

import PopularList from './_components/PopularList';

export const revalidate = 600;

const Page = async () => {
  const data = await getTopTitles();

  return <PopularList data={data} />;
};

export default Page;
