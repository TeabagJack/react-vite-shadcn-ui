import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

export function ProfileCardSkeleton() {
  return (
    <Card className="border-border bg-card">
      <CardContent className="flex items-center gap-4 p-4">
        {/* Avatar Skeleton */}
        <Skeleton className="w-16 h-16 rounded-full" />

        {/* Info Skeleton */}
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>

        {/* Arrow Skeleton */}
        <Skeleton className="w-5 h-5 rounded" />
      </CardContent>
    </Card>
  );
}
