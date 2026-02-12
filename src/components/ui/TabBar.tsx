'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';
import type { LucideIcon } from 'lucide-react';

export interface TabItem {
  id: string;
  label: string;
  icon: LucideIcon;
  /** Badge count */
  badge?: number;
}

interface TabBarProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (id: string) => void;
  className?: string;
}

export function TabBar({ tabs, activeTab, onTabChange, className }: TabBarProps) {
  const { selection } = useHaptic();

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0',
        'bg-tg-bg/95 backdrop-blur-lg',
        'border-t border-tg-secondary-bg/50',
        'safe-bottom z-30',
        className
      )}
    >
      <div className="flex items-center justify-around h-[52px]">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          const Icon = tab.icon;

          return (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.85 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              onClick={() => {
                if (tab.id !== activeTab) {
                  selection();
                  onTabChange(tab.id);
                }
              }}
              className={cn(
                'relative flex flex-col items-center justify-center',
                'w-full h-full gap-[2px]',
              )}
            >
              {/* Active background pill */}
              {isActive && (
                <motion.div
                  layoutId="tabIndicator"
                  className="absolute -top-[1px] w-8 h-[3px] rounded-full bg-tg-button"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}

              {/* Icon with badge */}
              <div className="relative">
                <motion.div
                  animate={isActive ? { y: -1 } : { y: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <Icon
                    className={cn(
                      'w-[22px] h-[22px] transition-colors duration-200',
                      isActive ? 'text-tg-button' : 'text-tg-hint'
                    )}
                    strokeWidth={isActive ? 2.5 : 1.8}
                  />
                </motion.div>
                {/* Badge */}
                {tab.badge && tab.badge > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-2 min-w-[16px] h-[16px] px-1
                      bg-tg-destructive text-white text-[10px] font-bold
                      rounded-full flex items-center justify-center"
                  >
                    {tab.badge > 99 ? '99+' : tab.badge}
                  </motion.span>
                )}
              </div>

              {/* Label */}
              <span className={cn(
                'text-[10px] font-medium transition-colors duration-200',
                isActive ? 'text-tg-button' : 'text-tg-hint'
              )}>
                {tab.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
