import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

interface BentoGridProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function BentoGrid({ className, children, ...props }: BentoGridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// Grid variations for different layouts
export function BentoGrid2Col({ className, children, ...props }: BentoGridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 gap-6',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function BentoGrid3Col({ className, children, ...props }: BentoGridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
