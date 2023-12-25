import { BasicTitle } from './Title';

export type TopTitles = {
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
};

type BasicTitleWithParent = BasicTitle & {
  parent: BasicTitleWithParent;
};
