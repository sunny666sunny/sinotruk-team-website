interface SkeletonProps { className?: string; height?: string; width?: string; }

export function Skeleton({ className = '', height = '1rem', width = '100%' }: SkeletonProps) {
  return <div className={`ui-skeleton ${className}`.trim()} aria-hidden="true" style={{ height, width }} />;
}
