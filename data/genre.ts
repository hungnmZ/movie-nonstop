import { sendGraphQLReq } from '@/helpers/fetch';
import { Genres } from '@/types/Genres';

export const getGenres = async () => {
  const query = /* GraphQL */ `
    query Genres {
      genres {
        nameEn
        slug
      }
    }
  `;
  const response = await sendGraphQLReq(query);
  const { data } = (await response.json()) as Genres;

  return data.genres;
};
