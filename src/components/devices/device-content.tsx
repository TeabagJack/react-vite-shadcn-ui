import React from 'react';
import { cn } from '@/lib/utils';

interface DeviceContentProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Wrapper component for content that will be displayed in device viewports.
 * Ensures proper sizing and scrolling behavior.
 */
export function DeviceContent({ children, className }: DeviceContentProps) {
  return (
    <div className={cn(
      "h-full w-full overflow-auto bg-background",
      className
    )}>
      {children}
    </div>
  );
}
