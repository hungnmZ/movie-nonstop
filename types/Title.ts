export interface BasicTitle {
  id: string;
  nameEn: string;
  type: string;
  tmdbPoster: string;
  tmdbBackdrop: string;
  publishDate: string;
  imdbRating: number;
  genres: [
    {
      nameEn: string;
    },
  ];
  translation: string;
  childrenCount: number;
  movieInfo: {
    duration: number;
  };
}
