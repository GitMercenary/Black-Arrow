import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';
import { Loader2 } from 'lucide-react';

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'light' | 'dark';
}

const Spinner = ({
  className,
  size = 'md',
  variant = 'primary',
  ...props
}: SpinnerProps) => {
  const sizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  const variantStyles = {
    primary: 'text-warm-sand',
    light: 'text-cloud-dancer',
    dark: 'text-deep-obsidian',
  };

  return (
    <div className={cn('flex items-center justify-center', className)} {...props}>
      <Loader2
        className={cn('animate-spin', sizeStyles[size], variantStyles[variant])}
      />
    </div>
  );
};

Spinner.displayName = 'Spinner';

export default Spinner;
