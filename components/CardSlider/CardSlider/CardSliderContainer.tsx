'use client';
import * as React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import MovieCard from '@/components/MovieCard';
import { useResponsiveSize } from '@/hooks/useResponsiveSize';
import { BasicTitle } from '@/types/Title';

import CardSliderChild from '../CardSliderChild';

const SPRING = {
  type: 'spring',
  stiffness: 200,
  damping: 30,
};

interface CardSliderContainerProps {
  header: string;
  titles: BasicTitle[];
}

const CardSliderContainer: React.FC<CardSliderContainerProps> = ({ header, titles }) => {
  const [isHoverSlider, setIsHoverSlider] = React.useState(false);
  const [isHoverPrev, setIsHoverPrev] = React.useState(false);
  const [isHoverNext, setIsHoverNext] = React.useState(false);
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

  const handleNavigation = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      if (slideIndex === 0) {
        setSlideIndex(maxSlideIndex);
      } else {
        setSlideIndex(slideIndex - 1);
      }
    } else {
      if (slideIndex === maxSlideIndex) {
        setSlideIndex(0);
      } else {
        setSlideIndex(slideIndex + 1);
      }
    }
  };

  return (
    <div
      className='sliderWrapper overflow-hidden whitespace-nowrap p-5 md:p-10'
      onMouseOver={() => setIsHoverSlider(true)}
      onMouseLeave={() => setIsHoverSlider(false)}
    >
      <div className='mb-2 text-lg font-extrabold xl:text-xl'>{header}</div>

      <div className='sliderContent relative'>
        {isHoverSlider && (
          <span
            className='handlePrevious absolute -left-5 top-0 z-20 flex h-full w-5 items-center justify-center rounded-lg bg-black bg-opacity-10 hover:bg-opacity-30  md:-left-10 md:w-10'
            onMouseOver={() => setIsHoverPrev(true)}
            onMouseLeave={() => setIsHoverPrev(false)}
            onClick={() => handleNavigation('left')}
            role='button'
          >
            <ChevronLeftIcon color='#FFF' size={(isHoverPrev && 40) || 30} />
          </span>
        )}

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

        {isHoverSlider && (
          <span
            className='handleNext absolute -right-5 top-0 z-20 flex h-full w-5 items-center justify-center rounded-lg bg-black bg-opacity-10 hover:bg-opacity-30 md:-right-10 md:w-10'
            onMouseOver={() => setIsHoverNext(true)}
            onMouseLeave={() => setIsHoverNext(false)}
            onClick={() => handleNavigation('right')}
            role='button'
          >
            <ChevronRightIcon color='#FFF' size={(isHoverNext && 40) || 30} />
          </span>
        )}
      </div>
    </div>
  );
};

export default CardSliderContainer;
