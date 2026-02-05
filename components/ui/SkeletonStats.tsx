import Skeleton from './Skeleton';

const SkeletonStats = () => {
  return (
    <div className="w-full py-12 bg-slate-ui/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="text-center">
              <Skeleton className="w-24 h-12 mx-auto mb-3" />
              <Skeleton className="w-32 h-4 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

SkeletonStats.displayName = 'SkeletonStats';

export default SkeletonStats;
