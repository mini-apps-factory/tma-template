'use client';

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useDragControls, type PanInfo } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  /** Full height modal */
  fullHeight?: boolean;
}

export function Modal({ open, onClose, title, children, className, fullHeight }: ModalProps) {
  const { impact } = useHaptic();
  const dragControls = useDragControls();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close on swipe down
  const handleDragEnd = useCallback((_: any, info: PanInfo) => {
    if (info.offset.y > 100 || info.velocity.y > 500) {
      impact('light');
      onClose();
    }
  }, [onClose, impact]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-40"
            onClick={onClose}
          />
          {/* Sheet — draggable */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 35, stiffness: 350 }}
            drag="y"
            dragControls={dragControls}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={handleDragEnd}
            className={cn(
              'fixed bottom-0 left-0 right-0 z-50',
              'bg-tg-bg rounded-t-[20px]',
              'overflow-hidden',
              fullHeight ? 'max-h-[92vh]' : 'max-h-[85vh]',
              className
            )}
          >
            {/* Drag handle — visual indicator for swipe */}
            <div
              className="flex justify-center pt-2.5 pb-1 cursor-grab active:cursor-grabbing"
              onPointerDown={(e) => dragControls.start(e)}
            >
              <div className="w-9 h-[5px] bg-tg-hint/25 rounded-full" />
            </div>

            {/* Header */}
            {title && (
              <div className="flex items-center justify-between px-4 pb-3">
                <h2 className="text-[17px] font-semibold text-tg-text">{title}</h2>
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => { impact('light'); onClose(); }}
                  className="p-1.5 rounded-full bg-tg-secondary-bg"
                >
                  <X className="w-4 h-4 text-tg-hint" />
                </motion.button>
              </div>
            )}

            {/* Content — scrollable */}
            <div className="px-4 pb-4 overflow-y-auto safe-bottom max-h-[70vh] overscroll-contain">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
