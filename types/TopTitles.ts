import { BasicTitle } from './Title';

export interface TopTitles {
  data: {
    topTitles: [
      {
        titleId: string;
        range: string;
        position: number;
        title: BasicTitleWithParent;
      },
    ];
  };
}

type BasicTitleWithParent = BasicTitle & {
  parent: BasicTitleWithParent;
};
