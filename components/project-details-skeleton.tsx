export function ProjectDetailsSkeleton() {
  return (
    <div className="animate-pulse p-4 sm:p-6 md:p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-start gap-6">
        <div className="flex-1 space-y-4">
          <div className="h-10 bg-gray-200 rounded-md w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="flex gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-6 w-20 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-32 h-32 sm:w-36 sm:h-36 bg-gray-200 rounded-lg"></div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 lg:gap-x-12">
        <div className="space-y-6">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-16"></div>
          <div className="h-[150px] bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}
