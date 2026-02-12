'use client';

import { useEffect } from 'react';
import { getTelegramWebApp } from '@/lib/telegram';

export function useBackButton(onBack?: () => void) {
  useEffect(() => {
    const tg = getTelegramWebApp();
    if (!tg) return;

    if (onBack) {
      tg.BackButton.show();
      tg.BackButton.onClick(onBack);
    } else {
      tg.BackButton.hide();
    }

    return () => {
      if (onBack) {
        tg.BackButton.offClick(onBack);
      }
      tg.BackButton.hide();
    };
  }, [onBack]);
}
