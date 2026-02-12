'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: 'default' | 'search';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, variant = 'default', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-tg-hint mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          {variant === 'search' && (
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tg-hint" />
          )}
          <input
            ref={ref}
            className={cn(
              'w-full h-11 bg-tg-secondary-bg text-tg-text rounded-xl border-0 outline-none',
              'placeholder:text-tg-hint',
              'focus:ring-2 focus:ring-tg-button/30',
              'transition-all',
              variant === 'search' ? 'pl-10 pr-4' : 'px-4',
              error && 'ring-2 ring-tg-destructive/30',
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1 text-sm text-tg-destructive">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
