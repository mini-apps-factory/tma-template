import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import { Inbox } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon: Icon = Inbox,
  title = 'Здесь пока пусто',
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 px-6 text-center', className)}>
      <div className="w-14 h-14 rounded-full bg-tg-secondary-bg flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-tg-hint" />
      </div>
      <h3 className="text-base font-semibold text-tg-text mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-tg-hint max-w-[240px]">{description}</p>
      )}
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction} className="mt-4">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
