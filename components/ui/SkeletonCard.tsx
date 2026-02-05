import Skeleton from './Skeleton';
import { cn } from '@/lib/utils/cn';

export interface SkeletonCardProps {
  className?: string;
}

const SkeletonCard = ({ className }: SkeletonCardProps) => {
  return (
    <div
      className={cn(
        'p-8 rounded-xl bg-slate-ui/20 border border-slate-ui/40',
        className
      )}
    >
      <Skeleton className="w-12 h-12 mb-6" variant="circular" />
      <Skeleton className="w-3/4 h-6 mb-3" />
      <Skeleton className="w-full h-4 mb-2" />
      <Skeleton className="w-5/6 h-4 mb-6" />
      <Skeleton className="w-32 h-10 mt-4" />
    </div>
  );
};

SkeletonCard.displayName = 'SkeletonCard';

export default SkeletonCard;
