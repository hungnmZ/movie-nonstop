export type Genres = {
  data: {
    genres: [
      {
        nameEn: string;
        slug: string;
      },
    ];
  };
};

export type GenresItem = Genres['data']['genres'];
