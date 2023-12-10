'use client';

import * as React from 'react';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import Image from 'next/image';

import { BasicTitle } from '@/types/Title';
import { displayTitleTime } from '@/utils/time';

import PlayCircle from '../Icons/PlayCircle';

const SPRING = {
  type: 'spring',
  stiffness: 200,
  damping: 30,
};

interface MovieCardProps {
  isFirst: boolean;
  isLast: boolean;
  data: BasicTitle;
}

const MovieCard: React.FC<MovieCardProps> = ({
  isFirst = false,
  isLast = false,
  data,
}) => {
  const [isHover, setIsHover] = React.useState(false);
  const [zIndex, setZIndex] = React.useState(0);
  const [isExitAnimation, setIsExitAnimation] = React.useState(false);

  const getCardVariant = () => {
    if (isHover && isFirst) return 'hover1stEl';
    if (isHover && isLast) return 'hoverLastEl';
    if (isHover) return 'hover';
  };

  return (
    <div
      onMouseLeave={() => setIsHover(false)}
      onMouseOver={() => setIsHover(true)}
      className='cardWrapper relative h-full w-full cursor-pointer overflow-visible'
      style={{
        zIndex: isHover ? 12 : zIndex,
      }}
    >
      <motion.div
        className='cardContent absolute inset-0 flex flex-col overflow-hidden rounded-lg shadow-md shadow-foreground/20 dark:shadow-background/20'
        initial={false}
        transition={SPRING}
        animate={getCardVariant()}
        variants={{
          hover: { top: '-20%', bottom: '-20%', left: '-20%', right: '-20%' },
          hover1stEl: { top: '-20%', bottom: '-20%', left: 0, right: '-40%' },
          hoverLastEl: { top: '-20%', bottom: '-20%', left: '-40%', right: 0 },
        }}
        onAnimationStart={() => setZIndex(11)}
        onAnimationComplete={() => {
          !isHover && isExitAnimation && setZIndex(0);
          setIsExitAnimation(!isExitAnimation);
        }}
      >
        <Image
          className='imageCard absolute inset-0 h-full w-full '
          width={320}
          height={180}
          src={data.tmdbBackdrop}
          alt='Loki'
        />
        <motion.div
          className='filterColor absolute inset-0 bg-black'
          initial={false}
          transition={SPRING}
          animate={{
            opacity: isHover ? 0.5 : 0,
          }}
        />
        <motion.div
          className='playIcon relative flex w-full justify-end'
          initial={false}
          transition={SPRING}
          animate={{
            opacity: isHover ? 1 : 0,
          }}
        >
          <div className='mr-2 mt-2 aspect-square w-1/6 transition-transform hover:scale-110'>
            <PlayCircle className='h-full w-full' width={60} height={60} />
          </div>
        </motion.div>

        <div className='mb-2 ml-3 flex flex-1 flex-col justify-end'>
          <div
            style={{ textShadow: '#000 0px 0px 6px' }}
            className='cardTitle relative whitespace-break-spaces text-lg font-semibold text-white xl:text-xl'
          >
            {data.nameEn}
          </div>
          <motion.div
            className='cardPreview relative overflow-hidden text-white'
            initial={false}
            transition={SPRING}
            animate={{
              width: isHover ? '100%' : 0,
              height: isHover ? 'auto' : 0,
              opacity: isHover ? 1 : 0,
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
            <div className='evidenceList flex'>
              {data.genres.length &&
                data.genres.map(({ nameEn }) => (
                  <div className='evidenceItem content-dot' key={nameEn}>
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
