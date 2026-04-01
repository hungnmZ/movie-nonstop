export type BasicTitle = {
  id: string;
  nameEn: string;
  nameVi: string | null;
  type: string;
  tmdbPoster: string;
  tmdbBackdrop: string;
  publishDate: string | null;
  imdbRating: number | null;
  genres: Array<{
    nameEn: string;
    nameVi: string | null;
  }>;
  childrenCount: number;
  movieInfo: {
    duration: number | null;
  };
};
