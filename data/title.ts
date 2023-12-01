import { sendGraphQLReq } from '@/helpers/fetch';
import { HomeTitles } from '@/types/HomeTitles';
import { BasicTitle } from '@/types/Title';
import { getTmdbBackdropUrl, getTmdbPosterUrl } from '@/utils/image';

export const getTitleWatch = async (id: string) => {
  const query = /* GraphQL */ `
    query TitleWatch($id: String!, $server: String) {
      title(id: $id, server: $server) {
        id
        srcUrl
      }
    }
  `;

  const response = await sendGraphQLReq(query, { id });
  const { data } = await response.json();

  return data;
};

export const getTopTitles = async (id: string) => {
  // todo
  const query = /* GraphQL */ ``;

  return sendGraphQLReq(query, { id });
};

export const getHomeTitles = async () => {
  const query = /* GraphQL */ `
    query HomeTitles {
      recommendedTitles: titles(first: 12, sort: "recommended") {
        nodes {
          ...TitleBasics
        }
      }
      movieTitles: titles(first: 12, sort: "updated", types: ["movie"], watchable: true) {
        nodes {
          ...TitleBasics
        }
      }
      showTitles: titles(first: 12, sort: "updated", types: ["show"], watchable: true) {
        nodes {
          ...TitleBasics
        }
      }
    }
    fragment TitleBasics on Title {
      id
      nameEn
      tmdbPoster
      tmdbBackdrop
      publishDate
      imdbRating
      genres {
        nameEn
      }
      translation
      childrenCount
      movieInfo {
        duration
      }
    }
  `;

  const response = await sendGraphQLReq(query);
  const { data } = (await response.json()) as HomeTitles;

  for (const titleCategory in data) {
    if (data.hasOwnProperty(titleCategory)) {
      data[titleCategory].nodes = data[titleCategory].nodes.map(
        ({ tmdbBackdrop, ...rest }: BasicTitle) => ({
          tmdbBackdrop: tmdbBackdrop
            ? getTmdbBackdropUrl(tmdbBackdrop)
            : getTmdbPosterUrl(rest.tmdbPoster),
          ...rest,
        }),
      );
    }
  }

  return data;
};
