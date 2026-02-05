import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import Button from './Button';

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'text';
  };
  className?: string;
  children?: ReactNode;
}

const EmptyState = ({
  icon: Icon,
  title,
  description,
  action,
  className,
  children,
}: EmptyStateProps) => {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center py-16 px-4', className)}>
      {Icon && (
        <Icon size={48} className="text-cloud-dancer/30 mb-4" strokeWidth={1.5} />
      )}
      <h3 className="text-xl font-unbounded font-bold mb-2 text-cloud-dancer">
        {title}
      </h3>
      <p className="text-cloud-dancer/60 text-sm max-w-md mb-6">
        {description}
      </p>
      {action && (
        <Button
          variant={action.variant || 'primary'}
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      )}
      {children}
    </div>
  );
};

EmptyState.displayName = 'EmptyState';

export default EmptyState;
