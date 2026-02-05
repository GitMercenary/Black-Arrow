import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  container?: boolean;
}

export default function Section({ className, children, container = true, ...props }: SectionProps) {
  return (
    <section
      className={cn('py-20', className)}
      {...props}
    >
      {container ? (
        <div className="container mx-auto px-4">
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
}
