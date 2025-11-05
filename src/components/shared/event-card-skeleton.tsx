import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

export function EventCardSkeleton() {
  return (
    <Card className="flex-shrink-0 w-72 overflow-hidden border-0 bg-card">
      {/* Image Skeleton */}
      <Skeleton className="w-full h-96 rounded-t-2xl" />

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Date & Time */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>

        {/* Title */}
        <Skeleton className="h-6 w-full" />

        {/* Venue & Price */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </Card>
  );
}
