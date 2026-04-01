export type Genres = {
  data: {
    genres: Array<{
      nameEn: string;
      nameVi: string | null;
      slug: string;
    }>;
  };
};

export type GenresItem = Genres['data']['genres'];
