import { ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface ImagePlaceholderProps {
  label: string;
  className?: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'wide';
}

/**
 * Placeholder component to mark where images should be added
 * Remove this component once actual images are in place
 */
export default function ImagePlaceholder({
  label,
  className,
  aspectRatio = 'video',
}: ImagePlaceholderProps) {
  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    wide: 'aspect-[21/9]',
  };

  return (
    <div
      className={cn(
        'flex items-center justify-center',
        'bg-slate-ui/50 border-2 border-dashed border-warm-sand/30',
        'rounded-lg',
        aspectClasses[aspectRatio],
        className
      )}
    >
      <div className="text-center p-6">
        <ImageIcon size={48} className="mx-auto mb-3 text-warm-sand/40" />
        <p className="text-cloud-dancer/60 text-sm font-medium">{label}</p>
        <p className="text-cloud-dancer/40 text-xs mt-1">
          See docs/IMAGE_GUIDE.md
        </p>
      </div>
    </div>
  );
}
