import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string;
  height?: string;
}

const Skeleton = ({
  className,
  variant = 'rectangular',
  width,
  height,
  ...props
}: SkeletonProps) => {
  const baseStyles = 'animate-pulse bg-slate-ui/30';

  const variantStyles = {
    text: 'rounded-md h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-md',
  };

  const style = {
    ...(width && { width }),
    ...(height && { height }),
  };

  return (
    <div
      className={cn(baseStyles, variantStyles[variant], className)}
      style={style}
      {...props}
    />
  );
};

Skeleton.displayName = 'Skeleton';

export default Skeleton;
