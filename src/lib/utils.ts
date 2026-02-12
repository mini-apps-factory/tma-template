import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

/** Merge Tailwind classes */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format date: "15 февраля" or "15 февраля 2026" */
export function formatDate(date: string | Date, withYear = false): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return format(d, withYear ? 'd MMMM yyyy' : 'd MMMM', { locale: ru });
}

/** Format relative time: "2 часа назад" */
export function formatRelative(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return formatDistanceToNow(d, { addSuffix: true, locale: ru });
}

/** Format price: 1500 → "1 500 ₽" */
export function formatPrice(amount: number, currency = '₽'): string {
  return `${amount.toLocaleString('ru-RU')} ${currency}`;
}

/** Generate initials from name */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/** Delay helper for animations */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
