import { BasicTitle } from './Title';

export interface HomeTitles {
  data: {
    [key: string]: {
      nodes: BasicTitle[];
    };
  };
}
