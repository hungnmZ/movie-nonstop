'use server';

import { sendGraphQLReq } from '@/helpers/fetch';
import { HomeTitles } from '@/types/HomeTitles';
import { BasicTitle } from '@/types/Title';
import { Titles } from '@/types/Titles';
import { TopTitles } from '@/types/TopTitles';
import { getTmdbBackdropUrl, getTmdbPosterUrl } from '@/utils/image';

const TITLES_BASIC_FRAGMENT = /* GraphQL */ `
  fragment TitleBasics on Title {
    id
    nameEn
    type
    tmdbPoster
    tmdbBackdrop
    publishDate
    imdbRating
    genres {
      nameEn
    }
    childrenCount
    movieInfo {
      duration
    }
  }
`;

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

export const getTopTitles = async () => {
  // todo
  const query = /* GraphQL */ `
    query TopTitles {
      topTitles {
        titleId
        range
        position
        title {
          ...TitleBasics
          parent {
            ...TitleBasics
            parent {
              ...TitleBasics
            }
          }
        }
      }
    }
    ${TITLES_BASIC_FRAGMENT}
  `;

  const response = await sendGraphQLReq(query);
  const { data } = (await response.json()) as TopTitles;

  const topCategories = data.topTitles.reduce(
    (pre, { range, title }) => {
      let newTitle = title.type !== 'movie' ? title.parent.parent : title;
      newTitle = {
        ...newTitle,
        tmdbPoster: getTmdbPosterUrl(newTitle.tmdbPoster),
        tmdbBackdrop: getTmdbBackdropUrl(newTitle.tmdbBackdrop),
      };

      switch (range) {
        case 'day':
          !pre.day.some((item) => item.id === newTitle.id) && pre.day.push(newTitle);
          break;
        case 'week':
          !pre.week.some((item) => item.id === newTitle.id) && pre.week.push(newTitle);
          break;
        case 'month':
          !pre.month.some((item) => item.id === newTitle.id) && pre.month.push(newTitle);
          break;
        default:
          break;
      }

      return pre;
    },
    {
      day: [],
      week: [],
      month: [],
    } as {
      day: BasicTitle[];
      week: BasicTitle[];
      month: BasicTitle[];
    },
  );

  return topCategories;
};

export const getHomeTitles = async (limit = 12) => {
  const query = /* GraphQL */ `
    query HomeTitles {
      recommendedTitles: titles(first: ${limit}, sort: "recommended") {
        nodes {
          ...TitleBasics
        }
      }
      movieTitles: titles(first: ${limit}, sort: "updated", types: ["movie"], watchable: true) {
        nodes {
          ...TitleBasics
        }
      }
      showTitles: titles(first: ${limit}, sort: "updated", types: ["show"], watchable: true) {
        nodes {
          ...TitleBasics
        }
      }
    }
    ${TITLES_BASIC_FRAGMENT}
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

export const getTitles = async ({
  type,
  genre,
  page,
  limit = 24,
}: {
  type: string;
  genre?: string;
  page?: number;
  limit?: number;
}) => {
  // todo
  const query = /* GraphQL */ `
    query Titles(
      $first: Int!
      $after: String
      $page: String
      $genre: String
      $watchable: Boolean
      $types: [String!]
    ) {
      titles(
        first: $first
        after: $after
        page: $page
        genre: $genre
        watchable: $watchable
        types: $types
      ) {
        nodes {
          ...TitleBasics
        }
        hasNextPage
        endCursor
        total
      }
    }
    ${TITLES_BASIC_FRAGMENT}
  `;

  const variables = {
    watchable: true,
    types: [type],
    first: limit,
    ...(page && { page: page.toString() }),
    ...(genre && { genre }),
  };
  const response = await sendGraphQLReq(query, variables);
  const { data } = (await response.json()) as Titles;

  data.titles.nodes = data.titles.nodes.map(({ tmdbBackdrop, ...rest }: BasicTitle) => ({
    tmdbBackdrop: tmdbBackdrop
      ? getTmdbBackdropUrl(tmdbBackdrop)
      : getTmdbPosterUrl(rest.tmdbPoster),
    ...rest,
  }));

  return data.titles;
};
