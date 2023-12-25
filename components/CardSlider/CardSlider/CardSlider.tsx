'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

import MovieCard from '@/components/MovieCard';
import { useResponsiveSize } from '@/hooks/useResponsiveSize';
import { BasicTitle } from '@/types/Title';

import CardSliderChild from '../CardSliderChild';
import CardSliderNavigator from '../CardSliderNavigator';

const SPRING = {
  type: 'spring',
  stiffness: 200,
  damping: 30,
};

type CardSliderProps = {
  header: string;
  titles: BasicTitle[];
};

const CardSlider: React.FC<CardSliderProps> = ({ header, titles }) => {
  const [isHoverSlider, setIsHoverSlider] = React.useState(false);
  const [slideIndex, setSlideIndex] = React.useState(0);

  const [responsiveSize] = useResponsiveSize();

  const [childPerSlider, maxSlideIndex] = React.useMemo(() => {
    setSlideIndex(0);
    switch (responsiveSize) {
      case '2xl':
      case 'xl':
        return [6, titles.length / 6 - 1];
      case 'lg':
        return [4, titles.length / 4 - 1];
      case 'md':
      case 'sm':
      default:
        return [3, titles.length / 3 - 1];
    }
  }, [responsiveSize, titles.length]);

  return (
    <div
      className='sliderWrapper overflow-hidden whitespace-nowrap p-5 md:p-10'
      onMouseEnter={() => setIsHoverSlider(true)}
      onMouseLeave={() => setIsHoverSlider(false)}
    >
      <div className='mb-2 text-xl font-extrabold xl:text-2xl'>{header}</div>

      <div className='sliderContent relative'>
        <CardSliderNavigator
          slideIndex={slideIndex}
          setSlideIndex={setSlideIndex}
          maxSlideIndex={maxSlideIndex}
          isHoverSlider={isHoverSlider}
        >
          <motion.div
            transition={SPRING}
            className='sliderItems'
            animate={{ x: `calc(-100% * ${slideIndex})` }}
          >
            {titles.map((title: BasicTitle, index: number) => (
              <CardSliderChild key={title.id}>
                <MovieCard
                  isFirst={index % childPerSlider === 0}
                  isLast={index % childPerSlider === childPerSlider - 1}
                  data={title}
                />
              </CardSliderChild>
            ))}
          </motion.div>
        </CardSliderNavigator>
      </div>
    </div>
  );
};

export default CardSlider;
