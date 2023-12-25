'use client';

import * as React from 'react';
import { useInView } from 'framer-motion';
import useSWRInfinite from 'swr/infinite';

import CardList from '@/components/CardList';
import LoadingIndicator from '@/components/LoadingIndicator';
import { useToast } from '@/components/ui/use-toast';
import { BasicTitle } from '@/types/Title';
import { TitlesItem } from '@/types/Titles';
import { fetcher } from '@/utils';

interface TitlesListProps {
  titles: TitlesItem;
  query: {
    type: string;
    genre?: string;
  };
}

const fetcherData = async (url: string) => (await fetcher(url)) as TitlesItem;

const TitlesList: React.FC<TitlesListProps> = ({ titles: initTitles, query }) => {
  const loadingRef = React.useRef(null);
  const isLoadingInView = useInView(loadingRef);
  const { toast } = useToast();

  const getKey = (index: number) => {
    const params = new URLSearchParams();
    params.set('genre', query.genre || '');
    params.set('type', query.type || '');
    params.set('page', (index + 1).toString());

    return `/api/titles?${params.toString()}`;
  };

  const { data, error, setSize } = useSWRInfinite<TitlesItem>(getKey, fetcherData, {
    fallbackData: [initTitles],
    revalidateOnMount: false,
    revalidateFirstPage: false,
  });
  const titles = data?.reduce<BasicTitle[]>((pre, cur) => [...pre, ...cur.nodes], []);

  if (error) {
    toast({
      title: 'Uh oh! Something went wrong.',
      description: 'There was a problem with your request.',
    });
  }

  React.useEffect(() => {
    if (isLoadingInView) setSize((size) => size + 1);
  }, [isLoadingInView, setSize]);

  return (
    <>
      {titles && <CardList data={titles} />}
      {data?.at(-1)?.hasNextPage && <LoadingIndicator ref={loadingRef} />}
    </>
  );
};

export default TitlesList;
