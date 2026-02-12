'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NumberTickerProps {
  value: number;
  /** Format function: e.g. (n) => `${n.toLocaleString()} ₽` */
  format?: (value: number) => string;
  className?: string;
  /** Animation duration in seconds */
  duration?: number;
}

export function NumberTicker({
  value,
  format = (n) => n.toLocaleString('ru-RU'),
  className,
  duration = 1,
}: NumberTickerProps) {
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    stiffness: 100,
    damping: 30,
    duration: duration * 1000,
  });

  const [display, setDisplay] = useState(format(0));

  useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);

  useEffect(() => {
    const unsubscribe = spring.on('change', (latest) => {
      setDisplay(format(Math.round(latest)));
    });
    return unsubscribe;
  }, [spring, format]);

  return (
    <motion.span
      className={cn('tabular-nums', className)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {display}
    </motion.span>
  );
}
