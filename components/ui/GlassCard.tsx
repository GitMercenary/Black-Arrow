'use client';

import { ReactNode, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'hover' | 'static';
  intensity?: 'subtle' | 'medium' | 'bold';
  className?: string;
}

/**
 * GlassCard - Museum-aesthetic glassmorphic card component
 *
 * Features:
 * - Subtle backdrop blur (20px default, 40px on hover)
 * - Semi-transparent background with border
 * - Micro-scale transform on hover
 * - Configurable intensity levels
 *
 * Usage:
 * <GlassCard variant="hover" intensity="subtle">Content</GlassCard>
 */
export default function GlassCard({
  children,
  variant = 'default',
  intensity = 'subtle',
  className,
  ...props
}: GlassCardProps) {
  const intensityClasses = {
    subtle: 'glass', // 30% opacity, 20px blur
    medium: 'bg-white/50 dark:bg-neutral-900/50 backdrop-blur-glass-md border border-stone-300/30 dark:border-neutral-700/30',
    bold: 'bg-white/70 dark:bg-neutral-900/70 backdrop-blur-glass-lg border border-stone-300/50 dark:border-neutral-700/50',
  };

  const variantClasses = {
    default: '',
    hover: 'glass-hover cursor-pointer',
    static: '',
  };

  return (
    <div
      className={cn(
        'rounded-lg',
        intensityClasses[intensity],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
