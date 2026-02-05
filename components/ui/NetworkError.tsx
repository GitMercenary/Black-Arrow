import { WifiOff } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import Button from './Button';

export interface NetworkErrorProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

const NetworkError = ({
  title = 'Connection Error',
  message = 'Unable to connect to the server. Please check your internet connection and try again.',
  onRetry,
  className,
}: NetworkErrorProps) => {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center py-12 px-4', className)}>
      <WifiOff size={48} className="text-red-400/30 mb-4" strokeWidth={1.5} />

      <h3 className="text-xl font-unbounded font-bold mb-2 text-cloud-dancer">
        {title}
      </h3>

      <p className="text-cloud-dancer/60 text-sm max-w-md mb-6">
        {message}
      </p>

      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          Retry
        </Button>
      )}
    </div>
  );
};

NetworkError.displayName = 'NetworkError';

export default NetworkError;
