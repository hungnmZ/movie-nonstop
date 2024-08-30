'use client';

import * as React from 'react';
import dayjs from 'dayjs';
import { motion, Transition } from 'framer-motion';
import Image from 'next/image';

import PlayCircle from '@/components/common/Icons/PlayCircle';
import { BasicTitle } from '@/types/Title';
import { debounce } from '@/utils';
import { displayTitleTime } from '@/utils/time';

const SPRING: Transition = {
  type: 'spring',
  stiffness: 200,
  damping: 30,
  duration: 0.5,
};

type MovieCardProps = {
  isFirst?: boolean;
  isLast?: boolean;
  data: BasicTitle;
};

const MovieCard: React.FC<MovieCardProps> = ({
  isFirst = false,
  isLast = false,
  data,
}) => {
  const [isHover, setIsHover] = React.useState(false);
  const [zIndex, setZIndex] = React.useState(0);

  const setZIndexDebounce = React.useMemo(() => debounce(setZIndex, 500), []);

  return (
    <div
      className='cardWrapper relative h-full w-full'
      onMouseEnter={() => {
        setIsHover(true);
        setZIndexDebounce(20);
      }}
      onMouseLeave={() => {
        setIsHover(false);
        setZIndexDebounce(0);
      }}
    >
      <motion.div
        className='cardContent absolute flex cursor-pointer flex-col overflow-hidden rounded-lg shadow-md shadow-foreground/20 dark:shadow-background/20'
        style={{ zIndex }}
        transition={SPRING}
        animate={
          (isHover && isFirst && ['hover', 'hover1stEl']) ||
          (isHover && isLast && ['hover', 'hoverLastEl']) ||
          (isHover && 'hover') ||
          'default'
        }
        initial={false}
        variants={{
          default: { inset: 0 },
          hover: {
            inset: '-20%',
            left: '-20%',
            right: '-20%',
            transition: { delay: 0.5 },
          },
          hover1stEl: { left: 0, right: '-40%', transition: { delay: 0.5 } },
          hoverLastEl: { left: '-40%', right: 0, transition: { delay: 0.5 } },
        }}
      >
        <Image
          className='imageCard h absolute h-full w-full'
          width={320}
          height={180}
          src={data.tmdbBackdrop}
          alt={data.nameEn}
        />
        <motion.div
          className='filterColor absolute inset-0 bg-black'
          transition={SPRING}
          variants={{
            default: { opacity: 0 },
            hover: { opacity: 0.5 },
          }}
        />
        <motion.div
          className='playIcon relative flex w-full justify-end'
          transition={SPRING}
          variants={{
            default: { opacity: 0 },
            hover: { opacity: 1 },
          }}
        >
          <div className='mr-2 mt-2 aspect-square w-1/6 transition-transform hover:scale-110'>
            <PlayCircle className='h-full w-full' width={60} height={60} />
          </div>
        </motion.div>
        <div className='mx-3 mb-2 flex flex-1 flex-col justify-end'>
          <div
            style={{ textShadow: '#000 0px 0px 6px' }}
            className='cardTitle relative whitespace-normal text-lg font-semibold text-white xl:text-xl'
          >
            {data.nameEn}
          </div>
          <motion.div
            className='cardPreview relative overflow-hidden text-white'
            transition={SPRING}
            variants={{
              default: { opacity: 0, y: 20, height: 0 },
              hover: { opacity: 1, y: 0, height: 'auto' },
            }}
          >
            <div className='cardInfo text-sm text-gray-400'>
              {data.publishDate && <span>{dayjs(data.publishDate).get('year')} </span>}
              {!!data.childrenCount && <span>- {data.childrenCount} Seasons </span>}
              {data.movieInfo.duration && (
                <span>- {displayTitleTime(data.movieInfo.duration)} </span>
              )}
              {data.imdbRating && <span>- IMDb {data.imdbRating} </span>}
            </div>
            <div className='evidenceList overflow-hidden overflow-ellipsis'>
              {data.genres.length &&
                data.genres.map(({ nameEn }) => (
                  <div className='evidenceItem content-dot inline-block' key={nameEn}>
                    <span className='evidenceText whitespace-nowrap text-sm'>
                      {nameEn}
                    </span>
                  </div>
                ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default MovieCard;
