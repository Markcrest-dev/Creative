/**
 * Skeleton Loading Components
 * Provides better perceived performance during data loading
 */

import '../styles/skeleton.css';

interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
  variant?: 'text' | 'circular' | 'rectangular';
}

/**
 * Base Skeleton component
 */
export const Skeleton = ({
  className = '',
  width,
  height,
  variant = 'rectangular'
}: SkeletonProps) => {
  const styles = {
    width: width || '100%',
    height: height || (variant === 'text' ? '1em' : '100%'),
  };

  const variantClass = `skeleton-${variant}`;

  return (
    <div
      className={`skeleton ${variantClass} ${className}`}
      style={styles}
      aria-label="Loading..."
    />
  );
};

/**
 * Skeleton for text content
 */
export const SkeletonText = ({ lines = 3, className = '' }: { lines?: number; className?: string }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          width={index === lines - 1 ? '70%' : '100%'}
        />
      ))}
    </div>
  );
};

/**
 * Skeleton for card components
 */
export const SkeletonCard = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      {/* Image placeholder */}
      <Skeleton className="mb-4" height="200px" />

      {/* Title */}
      <Skeleton variant="text" className="mb-2" width="60%" height="1.5em" />

      {/* Description */}
      <SkeletonText lines={3} className="mb-4" />

      {/* Tags/metadata */}
      <div className="flex gap-2">
        <Skeleton width="60px" height="24px" />
        <Skeleton width="80px" height="24px" />
        <Skeleton width="70px" height="24px" />
      </div>
    </div>
  );
};

/**
 * Skeleton for blog post cards
 */
export const SkeletonBlogCard = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}>
      {/* Featured image */}
      <Skeleton height="250px" />

      <div className="p-6">
        {/* Category badge */}
        <Skeleton width="80px" height="24px" className="mb-3" />

        {/* Title */}
        <Skeleton variant="text" height="1.75em" className="mb-2" />

        {/* Excerpt */}
        <SkeletonText lines={2} className="mb-4" />

        {/* Author and date */}
        <div className="flex items-center gap-3">
          <Skeleton variant="circular" width="40px" height="40px" />
          <div className="flex-1">
            <Skeleton variant="text" width="120px" className="mb-1" />
            <Skeleton variant="text" width="80px" />
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Skeleton for portfolio project cards
 */
export const SkeletonProjectCard = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-xl overflow-hidden ${className}`}>
      {/* Project preview */}
      <Skeleton height="200px" />

      <div className="p-6">
        {/* Title */}
        <Skeleton variant="text" height="1.5em" className="mb-2" />

        {/* Description */}
        <SkeletonText lines={2} className="mb-4" />

        {/* Tags */}
        <div className="flex gap-2 mb-4">
          <Skeleton width="70px" height="28px" />
          <Skeleton width="90px" height="28px" />
          <Skeleton width="60px" height="28px" />
        </div>

        {/* CTA Button */}
        <Skeleton height="40px" />
      </div>
    </div>
  );
};

/**
 * Skeleton Grid - displays multiple skeleton cards
 */
export const SkeletonGrid = ({
  count = 6,
  type = 'card',
  className = ''
}: {
  count?: number;
  type?: 'card' | 'blog' | 'project';
  className?: string;
}) => {
  const getSkeletonComponent = () => {
    switch (type) {
      case 'blog':
        return SkeletonBlogCard;
      case 'project':
        return SkeletonProjectCard;
      default:
        return SkeletonCard;
    }
  };

  const SkeletonComponent = getSkeletonComponent();

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonComponent key={index} />
      ))}
    </div>
  );
};
