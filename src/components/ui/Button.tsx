'use client';

import { forwardRef, useRef, useCallback } from 'react';
import { motion, useAnimation, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
  /** Icon to show before text */
  icon?: React.ReactNode;
  /** Success state — shows checkmark briefly */
  success?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary: 'bg-tg-button text-tg-button-text shadow-sm',
  secondary: 'bg-tg-secondary-bg text-tg-text',
  ghost: 'bg-transparent text-tg-link',
  danger: 'bg-red-500/10 text-tg-destructive',
};

const sizeStyles: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-sm rounded-[10px] gap-1.5',
  md: 'h-12 px-5 text-[15px] rounded-[12px] gap-2',
  lg: 'h-14 px-6 text-[17px] rounded-[14px] gap-2.5',
};

const tapAnimation: Variants = {
  tap: { scale: 0.97 },
  hover: { scale: 1.01 },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, fullWidth, icon, success, children, onClick, ...props }, ref) => {
    const { impact } = useHaptic();
    const controls = useAnimation();

    const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      impact(variant === 'primary' ? 'medium' : 'light');
      onClick?.(e);
    }, [impact, variant, onClick]);

    const isDisabled = loading || props.disabled;

    return (
      <motion.button
        ref={ref}
        variants={tapAnimation}
        whileTap={isDisabled ? undefined : 'tap'}
        whileHover={isDisabled ? undefined : 'hover'}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className={cn(
          'relative inline-flex items-center justify-center font-semibold',
          'overflow-hidden select-none',
          'disabled:opacity-40 disabled:pointer-events-none',
          'transition-colors duration-150',
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className
        )}
        onClick={handleClick}
        disabled={isDisabled}
        {...(props as any)}
      >
        {/* Loading spinner */}
        {loading && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </motion.span>
        )}

        {/* Success checkmark */}
        {success && !loading && (
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <motion.path
                d="M5 13l4 4L19 7"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              />
            </svg>
          </motion.span>
        )}

        {/* Content */}
        <span className={cn(
          'inline-flex items-center gap-inherit transition-opacity',
          (loading || success) && 'opacity-0'
        )}>
          {icon}
          {children}
        </span>
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
