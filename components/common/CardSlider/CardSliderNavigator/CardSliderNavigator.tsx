import * as React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { range } from '@/utils';

type CardSliderNavigatorProps = {
  children: React.ReactNode;
  slideIndex: number;
  setSlideIndex: Function;
  maxSlideIndex: number;
  isHoverSlider: boolean;
};

const CardSliderNavigator: React.FC<CardSliderNavigatorProps> = ({
  children,
  slideIndex,
  setSlideIndex,
  maxSlideIndex,
  isHoverSlider,
}) => {
  const [isHoverPrev, setIsHoverPrev] = React.useState(false);
  const [isHoverNext, setIsHoverNext] = React.useState(false);

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
    <>
      {isHoverSlider && (
        <div className='sliderIndicator absolute -top-2 right-1 flex gap-0.5'>
          {range(0, maxSlideIndex + 1).map((i) => (
            <div
              key={i}
              className={cn('h-0.5 w-3 bg-foreground/60 transition-colors', {
                'bg-foreground/80': i === slideIndex,
              })}
            ></div>
          ))}
        </div>
      )}

      {isHoverSlider && (
        <span
          className='handlePrevious absolute -left-5 top-0 z-20 flex h-full w-5 items-center justify-center rounded-r-lg bg-background/30 hover:bg-background/60 md:-left-10 md:w-10'
          onMouseEnter={() => setIsHoverPrev(true)}
          onMouseLeave={() => setIsHoverPrev(false)}
          onClick={() => handleNavigation('left')}
          role='button'
        >
          <ChevronLeftIcon
            size={30}
            className={cn('transition-transform', { 'scale-150': isHoverPrev })}
            color='hsl(var(--foreground) / 0.6)'
          />
        </span>
      )}

      {/* Children */}
      {children}

      {isHoverSlider && (
        <span
          className='handleNext absolute -right-5 top-0 z-20 flex h-full w-5 items-center justify-center rounded-l-lg bg-background/30 hover:bg-background/60 md:-right-10 md:w-10'
          onMouseEnter={() => setIsHoverNext(true)}
          onMouseLeave={() => setIsHoverNext(false)}
          onClick={() => handleNavigation('right')}
          role='button'
        >
          <ChevronRightIcon
            color='hsl(var(--foreground) / 0.8)'
            size={30}
            className={cn('transition-transform', { 'scale-150': isHoverNext })}
          />
        </span>
      )}
    </>
  );
};

export default CardSliderNavigator;
