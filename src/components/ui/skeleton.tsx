import * as React from "react"
import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted",
        className
      )}
      {...props}
    />
  )
}

// Specialized skeleton components for different use cases
function StatsCardSkeleton() {
  return (
    <div className="rounded-sm border border-[#f0f0f0] bg-white p-6 hover:shadow-[0_2px_8px_rgba(0,0,0,0.09)] transition-shadow">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-16" />
          <div className="flex items-center gap-1">
            <Skeleton className="h-3 w-3" />
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
        <div className="p-2 rounded-lg bg-primary/10">
          <Skeleton className="h-5 w-5" />
        </div>
      </div>
    </div>
  )
}

function ActivityFeedSkeleton() {
  return (
    <div className="space-y-4">
      {Array(5).fill(0).map((_, i) => (
        <div key={i} className="flex items-start py-4">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="ml-4 space-y-2 flex-1">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-1/4" />
          </div>
        </div>
      ))}
    </div>
  )
}

function DeviceTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 gap-2 pb-2 border-b">
        {Array(5).fill(0).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>
      {Array(3).fill(0).map((_, i) => (
        <div key={i} className="grid grid-cols-5 gap-2 items-center py-2">
          <div className="col-span-2 flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      ))}
    </div>
  )
}

export { 
  Skeleton, 
  StatsCardSkeleton, 
  ActivityFeedSkeleton, 
  DeviceTableSkeleton 
}