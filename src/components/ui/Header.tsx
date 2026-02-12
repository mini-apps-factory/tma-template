import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  onLeftClick?: () => void;
  onRightClick?: () => void;
  className?: string;
}

export function Header({
  title,
  subtitle,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  onLeftClick,
  onRightClick,
  className,
}: HeaderProps) {
  return (
    <div className={cn('flex items-center h-12 px-4 bg-tg-bg', className)}>
      {/* Left */}
      <div className="w-10">
        {LeftIcon && (
          <button onClick={onLeftClick} className="p-1.5 -ml-1.5 rounded-full active:bg-tg-secondary-bg">
            <LeftIcon className="w-5 h-5 text-tg-link" />
          </button>
        )}
      </div>
      {/* Center */}
      <div className="flex-1 text-center">
        <h1 className="text-base font-semibold text-tg-text leading-tight">{title}</h1>
        {subtitle && (
          <p className="text-xs text-tg-hint">{subtitle}</p>
        )}
      </div>
      {/* Right */}
      <div className="w-10 flex justify-end">
        {RightIcon && (
          <button onClick={onRightClick} className="p-1.5 -mr-1.5 rounded-full active:bg-tg-secondary-bg">
            <RightIcon className="w-5 h-5 text-tg-link" />
          </button>
        )}
      </div>
    </div>
  );
}
