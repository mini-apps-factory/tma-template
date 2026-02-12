/** Get Telegram WebApp instance (client-side only) */
export function getTelegramWebApp(): TelegramWebApp | null {
  if (typeof window === 'undefined') return null;
  return window.Telegram?.WebApp ?? null;
}

/** Check if running inside Telegram */
export function isTelegramContext(): boolean {
  return getTelegramWebApp() !== null && getTelegramWebApp()!.initData !== '';
}

/** Get current color scheme from Telegram */
export function getColorScheme(): 'light' | 'dark' {
  return getTelegramWebApp()?.colorScheme ?? 'light';
}
