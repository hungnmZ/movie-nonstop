'use server';

import { sendGraphQLReq } from '@/helpers/fetch';
import { ErrorResponse } from '@/types/ErrorResponse';
import { HomeTitles } from '@/types/HomeTitles';
import { BasicTitle } from '@/types/Title';
import {
  TitleDetail,
  TitleDetailCredits,
  TitleDetailPerson,
  TitleDetailSeason,
} from '@/types/TitleDetail';
import { GetTitlesParams, Titles } from '@/types/Titles';
import { TitleWatch } from '@/types/TitleWatch';
import { TopTitles } from '@/types/TopTitles';
import { getTmdbBackdropUrl, getTmdbPosterUrl } from '@/utils/image';

const TITLES_BASIC_FRAGMENT = /* GraphQL */ `
  fragment TitleBasics on Title {
    id
    nameEn
    nameVi
    type
    tmdbPoster
    tmdbBackdrop
    publishDate
    imdbRating
    genres {
      nameEn
      nameVi
    }
    childrenCount
    movieInfo {
      duration
    }
  }
`;

const TITLE_DETAIL_QUERY = /* GraphQL */ `
  query TitleDetail($id: String!) {
    title(id: $id) {
      id
      nameEn
      nameVi
      intro
      tmdbPoster
      tmdbBackdrop
      publishDate
      imdbRating
      contentRating
      countries
      type
      childrenCount
      genres {
        nameEn
        nameVi
        slug
      }
      movieInfo {
        duration
      }
      people {
        id
        name
        tmdbImage
        character
        role
      }
      relatedTitles {
        ...TitleBasics
      }
    }
  }
  ${TITLES_BASIC_FRAGMENT}
`;

const TITLE_SEASONS_QUERY = /* GraphQL */ `
  query ShowSeasons($parentId: String) {
    titles(first: 100, sort: "number", order: "asc", parentId: $parentId) {
      nodes {
        id
        number
        tmdbPoster
        publishDate
        type
        watchable
        childrenCount
      }
    }
  }
`;

const TITLE_SEASON_DETAIL_QUERY = /* GraphQL */ `
  query SeasonEpisodes($parentId: String, $number: String) {
    title(parentId: $parentId, number: $number) {
      id
      number
      seasonFull
      episodes {
        name
        tmdbPoster
        airDate
        number
      }
    }
  }
`;

const TITLE_EPISODES_QUERY = /* GraphQL */ `
  query EpisodeTitles($parentId: String) {
    titles(first: 500, sort: "number", order: "asc", parentId: $parentId) {
      nodes {
        id
        type
        number
        watchable
      }
    }
  }
`;

type TitleDetailQuery = {
  data: {
    title: {
      id: string;
      nameEn: string | null;
      nameVi: string | null;
      intro: string | null;
      tmdbPoster: string | null;
      tmdbBackdrop: string | null;
      publishDate: string | null;
      imdbRating: number | null;
      contentRating: string | null;
      countries: string[] | null;
      type: string;
      childrenCount: number;
      genres: Array<{
        nameEn: string | null;
        nameVi: string | null;
        slug: string | null;
      }>;
      movieInfo: {
        duration: number | null;
      } | null;
      people: Array<{
        id: string;
        name: string;
        tmdbImage: string | null;
        character: string | null;
        role: string;
      }> | null;
      relatedTitles: Array<{
        id: string;
        nameEn: string;
        nameVi: string | null;
        type: string;
        tmdbPoster: string | null;
        tmdbBackdrop: string | null;
        publishDate: string | null;
        imdbRating: number | null;
        genres: Array<{
          nameEn: string;
          nameVi: string | null;
        }>;
        childrenCount: number;
        movieInfo: {
          duration: number | null;
        } | null;
      }> | null;
    } | null;
  };
};

type TitleSeasonsQuery = {
  data: {
    titles: {
      nodes: Array<{
        id: string;
        number: string | null;
        tmdbPoster: string | null;
        publishDate: string | null;
        type: string;
        watchable: boolean;
        childrenCount: number;
      }>;
    };
  };
};

type TitleSeasonEpisodesQuery = {
  data: {
    title: {
      id: string;
      number: string;
      seasonFull: boolean | null;
      episodes: Array<{
        name: string | null;
        tmdbPoster: string | null;
        airDate: string | null;
        number: number;
      }> | null;
    } | null;
  };
};

type TitleEpisodesQuery = {
  data: {
    titles: {
      nodes: Array<{
        id: string;
        type: string;
        number: string | null;
        watchable: boolean;
      }>;
    };
  };
};

type TitleWatchQuery = {
  data: {
    title: {
      id: string;
      srcUrl: string | null;
      srcServer: string | null;
      watchable: boolean;
    } | null;
  };
};

const normalizeTmdbPoster = (path: string | null | undefined) =>
  path ? getTmdbPosterUrl(path) : '';

const normalizeTmdbBackdrop = (
  backdropPath: string | null | undefined,
  posterPath: string | null | undefined,
) => {
  if (backdropPath) return getTmdbBackdropUrl(backdropPath);
  return normalizeTmdbPoster(posterPath);
};

const dedupePeople = (people: TitleDetailPerson[]) => {
  const peopleMap = new Map<string, TitleDetailPerson>();

  for (const person of people) {
    if (!peopleMap.has(person.id)) {
      peopleMap.set(person.id, person);
    }
  }

  return Array.from(peopleMap.values());
};

const splitCredits = (people: TitleDetailPerson[]): TitleDetailCredits => {
  const directors = dedupePeople(people.filter(({ role }) => role === 'director'));
  const writers = dedupePeople(
    people.filter(({ role }) => role === 'writer' || role === 'screenplay'),
  );
  const creators = dedupePeople(people.filter(({ role }) => role === 'creator'));
  const cast = dedupePeople(people.filter(({ role }) => role === 'character'));

  return {
    directors,
    writers,
    creators,
    cast,
  };
};

const getShowSeasons = async (showId: string) => {
  const response = await sendGraphQLReq(TITLE_SEASONS_QUERY, { parentId: showId });
  const { data, errors } = (await response.json()) as TitleSeasonsQuery & ErrorResponse;

  if (errors) {
    throw new Error(errors[0].message);
  }

  const seasons = data.titles.nodes.filter(
    (season) => season.type === 'season' && Boolean(season.number),
  );

  const seasonDetails = await Promise.all(
    seasons.map(async (season) => {
      try {
        const [seasonRes, episodeRes] = await Promise.all([
          sendGraphQLReq(TITLE_SEASON_DETAIL_QUERY, {
            parentId: showId,
            number: season.number,
          }),
          sendGraphQLReq(TITLE_EPISODES_QUERY, {
            parentId: season.id,
          }),
        ]);
        const { data: seasonData, errors: seasonErrors } =
          (await seasonRes.json()) as TitleSeasonEpisodesQuery & ErrorResponse;
        const { data: episodeData, errors: episodeErrors } =
          (await episodeRes.json()) as TitleEpisodesQuery & ErrorResponse;

        if (seasonErrors) {
          throw new Error(seasonErrors[0].message);
        }

        if (episodeErrors) {
          throw new Error(episodeErrors[0].message);
        }

        const seasonDetail = seasonData.title;
        const episodeTitleByNumber = new Map<
          number,
          {
            id: string;
            watchable: boolean;
          }
        >();

        for (const episodeTitle of episodeData.titles.nodes) {
          if (episodeTitle.type !== 'episode' || !episodeTitle.number) continue;

          const episodeNumber = Number(episodeTitle.number);

          if (!Number.isFinite(episodeNumber)) continue;

          episodeTitleByNumber.set(episodeNumber, {
            id: episodeTitle.id,
            watchable: episodeTitle.watchable,
          });
        }

        const inlineEpisodes = seasonDetail?.episodes || [];
        const episodes = inlineEpisodes.length
          ? inlineEpisodes.map((episode) => {
              const matchedEpisode = episodeTitleByNumber.get(episode.number);

              return {
                id: matchedEpisode?.id || null,
                name: episode.name || '',
                tmdbPoster: normalizeTmdbPoster(episode.tmdbPoster),
                airDate: episode.airDate,
                number: episode.number,
                watchable: matchedEpisode?.watchable ?? false,
              };
            })
          : Array.from(episodeTitleByNumber.entries())
              .sort((a, b) => a[0] - b[0])
              .map(([number, episode]) => ({
                id: episode.id,
                name: '',
                tmdbPoster: '',
                airDate: null,
                number,
                watchable: episode.watchable,
              }));

        return {
          id: season.id,
          number: season.number || '-',
          tmdbPoster: normalizeTmdbPoster(season.tmdbPoster),
          publishDate: season.publishDate,
          watchable: season.watchable,
          childrenCount: season.childrenCount,
          seasonFull: seasonDetail?.seasonFull ?? null,
          episodes,
        } as TitleDetailSeason;
      } catch {
        return {
          id: season.id,
          number: season.number || '-',
          tmdbPoster: normalizeTmdbPoster(season.tmdbPoster),
          publishDate: season.publishDate,
          watchable: season.watchable,
          childrenCount: season.childrenCount,
          seasonFull: null,
          episodes: [],
        } as TitleDetailSeason;
      }
    }),
  );

  return seasonDetails.sort((a, b) => Number(a.number) - Number(b.number));
};

export const getTitleDetail = async (id: string) => {
  const response = await sendGraphQLReq(TITLE_DETAIL_QUERY, { id });
  const { data, errors } = (await response.json()) as TitleDetailQuery & ErrorResponse;

  if (errors) {
    throw new Error(errors[0].message);
  }

  if (!data.title) {
    throw new Error('Title not found');
  }

  const people = (data.title.people || []).map((person) => ({
    id: person.id,
    name: person.name,
    tmdbImage: normalizeTmdbPoster(person.tmdbImage),
    character: person.character,
    role: person.role,
  }));

  const relatedTitles = (data.title.relatedTitles || []).map(
    ({ tmdbBackdrop, tmdbPoster, ...rest }) => ({
      ...rest,
      tmdbPoster: normalizeTmdbPoster(tmdbPoster),
      tmdbBackdrop: normalizeTmdbBackdrop(tmdbBackdrop, tmdbPoster),
      genres: rest.genres.map((genre) => ({
        nameEn: genre.nameEn,
        nameVi: genre.nameVi,
      })),
      movieInfo: {
        duration: rest.movieInfo?.duration ?? null,
      },
    }),
  );

  const seasons =
    data.title.type === 'show' ? await getShowSeasons(data.title.id).catch(() => []) : [];

  return {
    id: data.title.id,
    type: data.title.type,
    nameEn: data.title.nameEn || '',
    nameVi: data.title.nameVi || '',
    intro: data.title.intro || '',
    tmdbPoster: normalizeTmdbPoster(data.title.tmdbPoster),
    tmdbBackdrop: normalizeTmdbBackdrop(data.title.tmdbBackdrop, data.title.tmdbPoster),
    publishDate: data.title.publishDate,
    imdbRating: data.title.imdbRating,
    contentRating: data.title.contentRating,
    countries: data.title.countries || [],
    genres: data.title.genres.map((genre) => ({
      nameEn: genre.nameEn || '',
      nameVi: genre.nameVi || '',
      slug: genre.slug || '',
    })),
    movieInfo: {
      duration: data.title.movieInfo?.duration ?? null,
    },
    childrenCount: data.title.childrenCount,
    credits: splitCredits(people),
    relatedTitles,
    seasons,
  } as TitleDetail;
};

export const getTitleWatch = async (id: string, server?: string) => {
  const query = /* GraphQL */ `
    query TitleWatch($id: String!, $server: String) {
      title(id: $id, server: $server) {
        id
        srcUrl
        srcServer
        watchable
      }
    }
  `;

  const response = await sendGraphQLReq(query, {
    id,
    ...(server ? { server } : {}),
  });
  const { data, errors } = (await response.json()) as TitleWatchQuery & ErrorResponse;

  if (errors) {
    throw new Error(errors[0].message);
  }

  if (!data.title) {
    throw new Error('Watch source not found');
  }

  return data.title as TitleWatch;
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

export const getTitles = async ({ type, genre, page, limit = 24 }: GetTitlesParams) => {
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
  const { data, errors } = (await response.json()) as Titles & ErrorResponse;

  if (errors) {
    throw new Error(errors[0].message);
  }

  data.titles.nodes = data.titles.nodes.map(({ tmdbBackdrop, ...rest }: BasicTitle) => ({
    tmdbBackdrop: tmdbBackdrop
      ? getTmdbBackdropUrl(tmdbBackdrop)
      : getTmdbPosterUrl(rest.tmdbPoster),
    ...rest,
  }));

  return data.titles;
};
