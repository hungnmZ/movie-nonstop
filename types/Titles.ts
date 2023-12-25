import { BasicTitle } from './Title';

export type Titles = {
  data: {
    titles: {
      nodes: BasicTitle[];
      hasNextPage: boolean;
      endCursor: number;
      total: number;
    };
  };
};

export type GetTitlesParams = {
  type: string;
  genre?: string;
  page?: number | string;
  limit?: number;
};

export type TitlesItem = Titles['data']['titles'];
