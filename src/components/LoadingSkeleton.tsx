export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Header skeleton */}
      <div className="mb-8 text-center">
        <div className="mb-4">
          <div className="inline-block w-20 h-6 bg-muted rounded-full"></div>
        </div>
        <div className="h-12 bg-muted rounded-lg mb-6 max-w-3xl mx-auto"></div>
        <div className="h-6 bg-muted rounded mb-6 max-w-2xl mx-auto"></div>
        <div className="flex items-center justify-center gap-4">
          <div className="w-2 h-2 bg-muted rounded-full"></div>
          <div className="h-4 bg-muted rounded w-32"></div>
          <div className="w-1 h-1 bg-muted rounded-full"></div>
          <div className="h-4 bg-muted rounded w-24"></div>
        </div>
      </div>
      
      {/* Content skeleton */}
      <div className="space-y-4">
        <div className="h-4 bg-muted rounded w-full"></div>
        <div className="h-4 bg-muted rounded w-5/6"></div>
        <div className="h-4 bg-muted rounded w-full"></div>
        <div className="h-4 bg-muted rounded w-4/5"></div>
        <div className="h-4 bg-muted rounded w-full"></div>
        <div className="h-4 bg-muted rounded w-3/4"></div>
        <div className="h-4 bg-muted rounded w-full"></div>
        <div className="h-4 bg-muted rounded w-5/6"></div>
        <div className="h-4 bg-muted rounded w-full"></div>
        <div className="h-4 bg-muted rounded w-4/5"></div>
      </div>
    </div>
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="card p-6 animate-pulse">
      <div className="h-6 bg-muted rounded mb-3"></div>
      <div className="h-4 bg-muted rounded mb-4 w-3/4"></div>
      <div className="h-4 bg-muted rounded w-1/3"></div>
    </div>
  );
}

export function BlogGridSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <BlogCardSkeleton key={i} />
      ))}
    </div>
  );
}
