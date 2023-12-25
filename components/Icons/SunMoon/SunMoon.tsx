'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

const SPRING = {
  type: 'spring',
};

type SunMoonProps = {
  theme: 'light' | 'dark';
};

const SunMoon: React.FC<SunMoonProps> = ({ theme }) => {
  const svgVariants = {
    dark: { rotate: 40 },
    light: { rotate: 90 },
  };

  const sunMoonVariants = {
    dark: { r: 8 },
    light: { r: 5 },
  };

  const maskVariants = {
    dark: { cx: 10, cy: 2 },
    light: { cx: 25, cy: 0 },
  };

  const dotVariants = {
    dark: { scale: 0, transition: { delay: 0 } },
    light: (i: number) => ({ scale: 1, transition: { ...SPRING, delay: i * 0.08 } }),
  };

  const criclePositions = [
    { cx: '17', cy: '9' },
    { cx: '13', cy: '15.9282' },
    { cx: '5', cy: '15.9282' },
    { cx: '1', cy: '9' },
    { cx: '5', cy: '2.0718' },
    { cx: '13', cy: '2.0718' },
  ];

  return (
    <motion.svg
      className='overflow-visible'
      width='20'
      height='20'
      viewBox='0 0 18 18'
      variants={svgVariants}
      animate={theme}
      transition={SPRING}
    >
      <mask id='moon-mask-main-nav'>
        <rect x='0' y='0' width='18' height='18' fill='#FFF'></rect>
        <motion.circle variants={maskVariants} r='8' fill='black' transition={SPRING} />
      </mask>
      <motion.circle
        cx='9'
        cy='9'
        initial={{ r: 5 }}
        fill='currentColor'
        mask='url(#moon-mask-main-nav)'
        variants={sunMoonVariants}
        transition={SPRING}
      />
      <g>
        {criclePositions.map((position, index) => (
          <motion.circle
            key={index}
            custom={index}
            cx={position.cx}
            cy={position.cy}
            r='1.5'
            fill='currentColor'
            variants={dotVariants}
          />
        ))}
      </g>
    </motion.svg>
  );
};

export default SunMoon;
