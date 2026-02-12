'use client';

import { useCallback } from 'react';
import { motion, useMotionValue, useTransform, type PanInfo } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';
import { Trash2, CheckCircle2 } from 'lucide-react';

interface SwipeableCardProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  leftLabel?: string;
  rightLabel?: string;
  className?: string;
  threshold?: number;
}

export function SwipeableCard({
  children,
  onSwipeLeft,
  onSwipeRight,
  leftLabel = 'Удалить',
  rightLabel = 'Готово',
  className,
  threshold = 100,
}: SwipeableCardProps) {
  const x = useMotionValue(0);
  const { impact } = useHaptic();

  // Background reveal
  const leftBg = useTransform(x, [-threshold, 0], [1, 0]);
  const rightBg = useTransform(x, [0, threshold], [0, 1]);

  const handleDragEnd = useCallback((_: any, info: PanInfo) => {
    if (info.offset.x < -threshold && onSwipeLeft) {
      impact('heavy');
      onSwipeLeft();
    } else if (info.offset.x > threshold && onSwipeRight) {
      impact('medium');
      onSwipeRight();
    }
  }, [threshold, onSwipeLeft, onSwipeRight, impact]);

  return (
    <div className={cn('relative overflow-hidden rounded-tg', className)}>
      {/* Left action (swipe right reveals) */}
      <motion.div
        style={{ opacity: rightBg }}
        className="absolute inset-y-0 left-0 w-24 flex items-center justify-center bg-green-500 rounded-l-tg"
      >
        <CheckCircle2 className="w-6 h-6 text-white" />
      </motion.div>

      {/* Right action (swipe left reveals) */}
      <motion.div
        style={{ opacity: leftBg }}
        className="absolute inset-y-0 right-0 w-24 flex items-center justify-center bg-tg-destructive rounded-r-tg"
      >
        <Trash2 className="w-6 h-6 text-white" />
      </motion.div>

      {/* Card content */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.3}
        onDragEnd={handleDragEnd}
        style={{ x }}
        className="relative bg-tg-section rounded-tg cursor-grab active:cursor-grabbing"
      >
        {children}
      </motion.div>
    </div>
  );
}
