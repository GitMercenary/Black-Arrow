'use client';

import { ButtonHTMLAttributes, forwardRef, useState, MouseEvent } from 'react';
import { cn } from '@/lib/utils/cn';
import LoadingSpinner from './LoadingSpinner';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text';
  children: React.ReactNode;
  loading?: boolean;
  magnetic?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', children, loading = false, disabled, magnetic = true, ...props }, ref) => {
    const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });

    const baseStyles = 'font-geist font-semibold px-8 py-4 rounded-md transition-all duration-150 ease-smooth disabled:opacity-50 disabled:cursor-not-allowed relative hover:scale-[1.02] active:scale-[0.98]';

    const variantStyles = {
      primary: 'bg-warm-sand text-stone-900 hover:bg-warm-sand-hover shadow-sm hover:shadow-md',
      secondary: 'bg-transparent border-2 border-stone-300 dark:border-neutral-700 text-stone-900 dark:text-neutral-100 hover:bg-stone-100 dark:hover:bg-neutral-800',
      text: 'bg-transparent text-stone-600 dark:text-neutral-400 hover:text-warm-sand dark:hover:text-neutral-300 underline-offset-4 hover:underline px-0',
    };

    const spinnerColor = variant === 'primary' ? 'primary' : variant === 'secondary' ? 'secondary' : 'white';

    const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
      if (!magnetic || disabled || loading) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Subtle magnetic effect (max 4px movement)
      const magneticX = x * 0.1;
      const magneticY = y * 0.1;

      setMagneticOffset({
        x: Math.max(-4, Math.min(4, magneticX)),
        y: Math.max(-4, Math.min(4, magneticY)),
      });
    };

    const handleMouseLeave = () => {
      setMagneticOffset({ x: 0, y: 0 });
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], className)}
        disabled={loading || disabled}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `translate(${magneticOffset.x}px, ${magneticOffset.y}px)`,
        }}
        {...props}
      >
        <span className={cn('flex items-center justify-center gap-2', loading && 'opacity-0')}>
          {children}
        </span>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <LoadingSpinner size="sm" color={spinnerColor} />
          </div>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
