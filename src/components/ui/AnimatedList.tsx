'use client';

import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedListProps {
  children: React.ReactNode[];
  className?: string;
  /** Delay between each item animation (ms) */
  staggerDelay?: number;
  /** Animation style */
  variant?: 'fadeUp' | 'slideRight' | 'scale' | 'blur';
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
    visible: {
      opacity: 1, y: 0, filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
  },
  slideRight: {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1, x: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1, scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 25 },
    },
  },
  blur: {
    hidden: { opacity: 0, filter: 'blur(8px)' },
    visible: {
      opacity: 1, filter: 'blur(0px)',
      transition: { duration: 0.3 },
    },
  },
};

export function AnimatedList({
  children,
  className,
  staggerDelay = 0.06,
  variant = 'fadeUp',
}: AnimatedListProps) {
  const container = {
    ...containerVariants,
    visible: {
      transition: { staggerChildren: staggerDelay },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className={cn('', className)}
    >
      {children.map((child, i) => (
        <motion.div key={i} variants={itemVariants[variant]}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
