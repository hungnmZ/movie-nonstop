import { BasicTitle } from './Title';

export interface Titles {
  data: {
    titles: {
      nodes: BasicTitle[];
      hasNextPage: boolean;
      endCursor: number;
      total: number;
    };
  };
}
