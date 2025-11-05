import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

export function CategoryCardSkeleton() {
  return (
    <Card className="relative h-32 rounded-2xl overflow-hidden border-0">
      <Skeleton className="w-full h-full" />
      {/* Number placeholder */}
      <div className="absolute bottom-4 right-4">
        <Skeleton className="w-12 h-12 bg-muted/40" />
      </div>
    </Card>
  );
}
