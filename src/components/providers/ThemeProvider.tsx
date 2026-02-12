'use client';

import { useEffect } from 'react';
import { getTelegramWebApp } from '@/lib/telegram';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const tg = getTelegramWebApp();
    if (!tg) return;

    // Apply Telegram theme params as CSS variables
    const params = tg.themeParams;
    const root = document.documentElement;

    Object.entries(params).forEach(([key, value]) => {
      // Convert camelCase to kebab-case: bgColor → bg-color
      const cssVar = `--tg-theme-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      root.style.setProperty(cssVar, value);
    });
  }, []);

  return <>{children}</>;
}
