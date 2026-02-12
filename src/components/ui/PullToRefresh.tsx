'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, useMotionValue, useTransform, type PanInfo } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';
import { Loader2 } from 'lucide-react';

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
  className?: string;
  /** Threshold to trigger refresh (px) */
  threshold?: number;
}

export function PullToRefresh({
  onRefresh,
  children,
  className,
  threshold = 80,
}: PullToRefreshProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { notification } = useHaptic();
  const containerRef = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);
  const opacity = useTransform(y, [0, threshold], [0, 1]);
  const scale = useTransform(y, [0, threshold], [0.5, 1]);
  const rotate = useTransform(y, [0, threshold * 2], [0, 360]);

  const handleDragEnd = useCallback(async (_: any, info: PanInfo) => {
    if (info.offset.y >= threshold && !isRefreshing) {
      setIsRefreshing(true);
      notification('success');
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
      }
    }
  }, [threshold, isRefreshing, notification, onRefresh]);

  // Only allow pull if scrolled to top
  const handleDragStart = useCallback((_: any, info: PanInfo) => {
    const el = containerRef.current;
    if (el && el.scrollTop > 0) {
      return false;
    }
  }, []);

  return (
    <div ref={containerRef} className={cn('relative overflow-hidden', className)}>
      {/* Pull indicator */}
      <motion.div
        style={{ opacity, scale }}
        className="absolute top-0 left-0 right-0 flex justify-center py-4 z-10"
      >
        <motion.div style={isRefreshing ? {} : { rotate }}>
          <Loader2
            className={cn(
              'w-6 h-6 text-tg-button',
              isRefreshing && 'animate-spin'
            )}
          />
        </motion.div>
      </motion.div>

      {/* Content */}
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0.4, bottom: 0 }}
        onDragEnd={handleDragEnd}
        style={{ y }}
        className="min-h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
