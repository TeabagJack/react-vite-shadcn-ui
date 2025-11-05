import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

export function TeamMemberSkeleton() {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <div className="flex items-start gap-4">
          {/* Avatar Skeleton */}
          <Skeleton className="w-16 h-16 rounded-full" />

          {/* Info Skeleton */}
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-3 w-28" />
          </div>
        </div>
      </CardHeader>

      {/* Actions Skeleton */}
      <CardFooter className="flex gap-2 border-t border-border pt-4">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 flex-1" />
      </CardFooter>
    </Card>
  );
}
