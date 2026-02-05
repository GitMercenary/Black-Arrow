import Image, { ImageProps } from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils/cn';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad'> {
  fallbackSrc?: string;
  showLoadingSkeleton?: boolean;
  sizes?: string;
}

export default function OptimizedImage({
  src,
  alt,
  fallbackSrc,
  showLoadingSkeleton = true,
  className,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setError(true);
    setIsLoading(false);
  };

  // Check if this is a fill image (no width/height specified)
  const isFillImage = props.fill === true;

  // Default sizes for fill images if not provided
  const imageSizes = props.sizes || (isFillImage ? '100vw' : undefined);

  // For fill images, we need a wrapper with relative positioning
  if (isFillImage) {
    return (
      <div className="relative w-full h-full">
        {showLoadingSkeleton && isLoading && (
          <div className="absolute inset-0 bg-slate-ui/30 animate-pulse z-10" />
        )}
        <Image
          src={error && fallbackSrc ? fallbackSrc : src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          sizes={imageSizes}
          className={cn(
            'transition-opacity duration-500',
            isLoading ? 'opacity-50' : 'opacity-100',
            className
          )}
          {...props}
        />
      </div>
    );
  }

  // For regular images with fixed dimensions
  return (
    <>
      {showLoadingSkeleton && isLoading && (
        <div className="absolute inset-0 bg-slate-ui/30 animate-pulse z-10" style={{
          width: props.width,
          height: props.height
        }} />
      )}
      <Image
        src={error && fallbackSrc ? fallbackSrc : src}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        sizes={imageSizes}
        className={cn(
          'transition-opacity duration-500',
          isLoading ? 'opacity-50' : 'opacity-100',
          className
        )}
        {...props}
      />
    </>
  );
}
