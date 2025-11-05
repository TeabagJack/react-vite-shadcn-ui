import React from 'react';
import { cn } from '@/lib/utils';

interface IOSFrameProps {
  children: React.ReactNode;
  className?: string;
  scale?: number;
}

export function IOSFrame({ children, className, scale = 1 }: IOSFrameProps) {
  return (
    <div
      className={cn("relative flex flex-col items-center justify-center", className)}
      style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}
    >
      {/* iPhone 16 Pro Frame */}
      <div className="relative bg-slate-900 rounded-[3.5rem] p-3 shadow-2xl border-[14px] border-slate-800">
        {/* Screen */}
        <div className="relative bg-white rounded-[2.8rem] overflow-hidden w-[393px] h-[852px] shadow-inner">
          {/* Dynamic Island */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-50 bg-black rounded-full w-[120px] h-[37px] pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-black rounded-full" />
          </div>

          {/* Status Bar */}
          <div className="absolute top-0 left-0 right-0 z-40 h-14 bg-gradient-to-b from-black/20 to-transparent px-8 pt-3 flex items-start justify-between text-white text-xs font-medium">
            <div className="flex items-center gap-1">
              <span>9:41</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              <svg className="w-3 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 4h18v16H3z" />
                <path fill="#22c55e" d="M5 6h14v12H5z" />
              </svg>
            </div>
          </div>

          {/* Content Area */}
          <div className="relative h-full w-full overflow-auto">
            {children}
          </div>

          {/* Home Indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-slate-700 rounded-full z-50" />
        </div>

        {/* Side Buttons */}
        <div className="absolute -left-[2px] top-28 w-[3px] h-8 bg-slate-700 rounded-l" />
        <div className="absolute -left-[2px] top-40 w-[3px] h-12 bg-slate-700 rounded-l" />
        <div className="absolute -left-[2px] top-56 w-[3px] h-12 bg-slate-700 rounded-l" />
        <div className="absolute -right-[2px] top-44 w-[3px] h-16 bg-slate-700 rounded-r" />
      </div>

      {/* Device Label */}
      <div className="mt-4 text-center">
        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">iOS 16</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">iPhone 16 Pro</p>
      </div>
    </div>
  );
}
