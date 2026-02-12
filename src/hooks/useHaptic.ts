'use client';

import { useCallback } from 'react';
import { getTelegramWebApp } from '@/lib/telegram';

export function useHaptic() {
  const impact = useCallback((style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft' = 'medium') => {
    getTelegramWebApp()?.HapticFeedback.impactOccurred(style);
  }, []);

  const notification = useCallback((type: 'error' | 'success' | 'warning') => {
    getTelegramWebApp()?.HapticFeedback.notificationOccurred(type);
  }, []);

  const selection = useCallback(() => {
    getTelegramWebApp()?.HapticFeedback.selectionChanged();
  }, []);

  return { impact, notification, selection };
}
