'use client';

import { cn } from '@/lib/utils';
import { HEADER_HEIGHT, TAB_BAR_HEIGHT } from '@/lib/constants';

interface AppShellProps {
  header?: React.ReactNode;
  tabBar?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function AppShell({ header, tabBar, children, className }: AppShellProps) {
  return (
    <div className="flex flex-col h-screen bg-tg-bg">
      {/* Header */}
      {header}
      {/* Content — scrollable area */}
      <main
        className={cn('flex-1 overflow-y-auto overscroll-contain scroll-area', className)}
        style={{
          paddingBottom: tabBar ? TAB_BAR_HEIGHT + 16 : 0,
        }}
      >
        {children}
      </main>
      {/* TabBar */}
      {tabBar}
    </div>
  );
}
