import MoviesList from '@/components/app/movie/MoviesList';
import { getGenres } from '@/data/genre';
import { getTitles } from '@/data/title';

export const revalidate = 600;

const Page = async () => {
  const [data, genres] = await Promise.all([getTitles({ type: 'movie' }), getGenres()]);

  return <MoviesList data={data} genres={genres} />;
};

export default Page;
