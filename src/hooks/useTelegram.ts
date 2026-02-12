'use client';

import { useEffect, useState } from 'react';
import { getTelegramWebApp } from '@/lib/telegram';

export function useTelegram() {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null);

  useEffect(() => {
    const tg = getTelegramWebApp();
    if (tg) {
      tg.ready();
      tg.expand();
      setWebApp(tg);
    }
  }, []);

  const user = webApp?.initDataUnsafe?.user ?? null;
  const colorScheme = webApp?.colorScheme ?? 'light';
  const platform = webApp?.platform ?? 'unknown';

  return {
    webApp,
    user,
    colorScheme,
    platform,
    isReady: webApp !== null,
    isTelegram: webApp !== null && webApp.initData !== '',
  };
}
