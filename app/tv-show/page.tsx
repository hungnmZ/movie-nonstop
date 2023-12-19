import TVShowsList from '@/components/app/tv-show/TVShowsList';
import { getGenres } from '@/data/genre';
import { getTitles } from '@/data/title';

export const revalidate = 600;

const Page = async () => {
  const [data, genres] = await Promise.all([getTitles({ type: 'show' }), getGenres()]);

  return <TVShowsList data={data} genres={genres} />;
};

export default Page;
