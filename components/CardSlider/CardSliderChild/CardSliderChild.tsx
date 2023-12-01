import * as React from 'react';

interface CardSliderChildProps {
  children: React.ReactNode;
}

const CardSliderChild: React.FC<CardSliderChildProps> = ({ children }) => {
  return (
    <div className='inline-block aspect-video w-1/3 px-1 align-top first:pl-0 last:pr-0 lg:w-1/4 xl:w-1/6'>
      {children}
    </div>
  );
};

export default CardSliderChild;
