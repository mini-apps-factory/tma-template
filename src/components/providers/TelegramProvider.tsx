'use client';

import { createContext, useContext } from 'react';
import { useTelegram } from '@/hooks/useTelegram';

type TelegramContextType = ReturnType<typeof useTelegram>;

const TelegramContext = createContext<TelegramContextType | null>(null);

export function TelegramProvider({ children }: { children: React.ReactNode }) {
  const telegram = useTelegram();

  return (
    <TelegramContext.Provider value={telegram}>
      {children}
    </TelegramContext.Provider>
  );
}

export function useTelegramContext() {
  const ctx = useContext(TelegramContext);
  if (!ctx) throw new Error('useTelegramContext must be used within TelegramProvider');
  return ctx;
}
