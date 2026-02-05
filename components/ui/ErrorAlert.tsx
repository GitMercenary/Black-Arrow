import { ReactNode } from 'react';
import { AlertCircle, XCircle, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface ErrorAlertProps {
  variant?: 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  className?: string;
  onClose?: () => void;
  children?: ReactNode;
}

const ErrorAlert = ({
  variant = 'error',
  title,
  message,
  className,
  onClose,
  children,
}: ErrorAlertProps) => {
  const icons = {
    error: XCircle,
    warning: AlertTriangle,
    info: AlertCircle,
  };

  const styles = {
    error: 'bg-red-500/10 border-red-500/30 text-red-400',
    warning: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
    info: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
  };

  const Icon = icons[variant];

  return (
    <div
      className={cn(
        'flex items-start gap-3 p-4 rounded-lg border',
        styles[variant],
        className
      )}
    >
      <Icon size={20} className="flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        {title && (
          <h4 className="font-hanken font-bold text-sm mb-1">
            {title}
          </h4>
        )}
        <p className="font-hanken text-sm opacity-90">
          {message}
        </p>
        {children}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 hover:opacity-70 transition-opacity"
          aria-label="Close"
        >
          <XCircle size={18} />
        </button>
      )}
    </div>
  );
};

ErrorAlert.displayName = 'ErrorAlert';

export default ErrorAlert;
