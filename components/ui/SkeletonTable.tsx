import Skeleton from './Skeleton';

export interface SkeletonTableProps {
  rows?: number;
  columns?: number;
}

const SkeletonTable = ({ rows = 5, columns = 5 }: SkeletonTableProps) => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-full">
        {/* Table Header */}
        <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={`header-${i}`} className="h-10" />
          ))}
        </div>
        {/* Table Rows */}
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            className="grid gap-4 mb-3"
            style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
          >
            {Array.from({ length: columns }).map((_, colIndex) => (
              <Skeleton key={`cell-${rowIndex}-${colIndex}`} className="h-12" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

SkeletonTable.displayName = 'SkeletonTable';

export default SkeletonTable;
