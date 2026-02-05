import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface FieldErrorProps {
  error?: string;
  className?: string;
}

const FieldError = ({ error, className }: FieldErrorProps) => {
  if (!error) return null;

  return (
    <div className={cn('flex items-center gap-1.5 text-red-400 text-sm mt-1', className)}>
      <AlertCircle size={14} className="flex-shrink-0" />
      <span className="font-hanken">{error}</span>
    </div>
  );
};

FieldError.displayName = 'FieldError';

export default FieldError;
