import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

export function EventListCardSkeleton() {
  return (
    <Card className="overflow-hidden border-border bg-card">
      {/* Event Image Skeleton */}
      <Skeleton className="h-40 rounded-t-2xl" />

      {/* Event Info Skeleton */}
      <CardHeader className="pb-2 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>

      <CardContent className="pb-3">
        {/* Stats Skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
      </CardContent>

      <CardFooter>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
}
