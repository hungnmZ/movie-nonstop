import * as React from 'react';

export const useResponsiveSize = () => {
  const [responsiveSize, setResponsiveSize] = React.useState('');

  React.useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;

      if (windowWidth >= 1536) {
        setResponsiveSize('2xl');
      } else if (windowWidth >= 1280) {
        setResponsiveSize('xl');
      } else if (windowWidth >= 1024) {
        setResponsiveSize('lg');
      } else if (windowWidth >= 768) {
        setResponsiveSize('md');
      } else {
        setResponsiveSize('sm');
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return [responsiveSize];
};
