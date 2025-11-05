import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export interface ScreenContainerProps {
  children: ReactNode;
  className?: string;
  withPadding?: boolean;
  withScrollbar?: boolean;
  fullHeight?: boolean;
}

export function ScreenContainer({
  children,
  className = "",
  withPadding = true,
  withScrollbar = true,
  fullHeight = true,
}: ScreenContainerProps) {
  return (
    <div
      className={cn(
        "w-full bg-background",
        fullHeight && "h-full",
        withPadding && "p-4 pb-20",
        withScrollbar
          ? "overflow-y-auto custom-scrollbar"
          : "overflow-y-auto scrollbar-hide",
        className
      )}
    >
      {children}
    </div>
  );
}
