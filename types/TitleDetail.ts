import { BasicTitle } from './Title';

export type TitleDetailPerson = {
  id: string;
  name: string;
  tmdbImage: string;
  character: string | null;
  role: string;
};

export type TitleDetailEpisode = {
  name: string;
  tmdbPoster: string;
  airDate: string | null;
  number: number;
};

export type TitleDetailSeason = {
  id: string;
  number: string;
  tmdbPoster: string;
  publishDate: string | null;
  watchable: boolean;
  childrenCount: number;
  seasonFull: boolean | null;
  episodes: TitleDetailEpisode[];
};

export type TitleDetailCredits = {
  directors: TitleDetailPerson[];
  writers: TitleDetailPerson[];
  creators: TitleDetailPerson[];
  cast: TitleDetailPerson[];
};

export type TitleDetail = {
  id: string;
  type: string;
  nameEn: string;
  nameVi: string;
  intro: string;
  tmdbPoster: string;
  tmdbBackdrop: string;
  publishDate: string | null;
  imdbRating: number | null;
  contentRating: string | null;
  countries: string[];
  genres: Array<{
    nameEn: string;
    nameVi: string;
    slug: string;
  }>;
  movieInfo: {
    duration: number | null;
  };
  childrenCount: number;
  credits: TitleDetailCredits;
  relatedTitles: BasicTitle[];
  seasons: TitleDetailSeason[];
};
