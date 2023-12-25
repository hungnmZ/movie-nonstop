import { BasicTitle } from './Title';

export type HomeTitles = {
  data: {
    [key: string]: {
      nodes: BasicTitle[];
    };
  };
};
