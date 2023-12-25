'use client';

import * as React from 'react';
import { motion, Variants } from 'framer-motion';

type SpinUpProps = {
  children: React.ReactNode;
};

const variants: Variants = {
  offscreen: {
    y: 50,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 30,
    },
  },
};

const SpinUp: React.FC<SpinUpProps> = ({ children, ...rest }) => {
  return (
    <motion.div
      initial='offscreen'
      whileInView='onscreen'
      viewport={{ once: true, amount: 0.8 }}
      variants={variants}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default SpinUp;
