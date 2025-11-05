import React from 'react';
import { cn } from '@/lib/utils';

interface AndroidFrameProps {
  children: React.ReactNode;
  className?: string;
  scale?: number;
}

export function AndroidFrame({ children, className, scale = 1 }: AndroidFrameProps) {
  return (
    <div
      className={cn("relative flex flex-col items-center justify-center", className)}
      style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}
    >
      {/* Pixel 8 Pro Frame */}
      <div className="relative bg-slate-800 rounded-[3rem] p-2 shadow-2xl border-[12px] border-slate-700">
        {/* Front Camera Punch Hole */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50">
          <div className="w-3 h-3 bg-slate-900 rounded-full border-2 border-slate-800" />
        </div>

        {/* Screen */}
        <div className="relative bg-slate-950 rounded-[2.5rem] overflow-hidden w-[412px] h-[915px] shadow-inner">
          {/* Status Bar */}
          <div className="absolute top-0 left-0 right-0 z-40 h-10 bg-gradient-to-b from-black/20 to-transparent px-6 pt-2 flex items-start justify-between text-white text-xs font-medium">
            <div className="flex items-center gap-1">
              <span>9:41</span>
            </div>
            <div className="flex items-center gap-2">
              {/* Network Signal */}
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              {/* WiFi */}
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
              {/* Battery */}
              <svg className="w-5 h-4" fill="currentColor" viewBox="0 0 24 24">
                <rect x="2" y="7" width="18" height="10" rx="2" />
                <rect x="4" y="9" width="14" height="6" fill="#22c55e" />
                <rect x="21" y="10" width="2" height="4" rx="1" />
              </svg>
            </div>
          </div>

          {/* Content Area */}
          <div className="relative h-full w-full overflow-auto">
            {children}
          </div>

          {/* Navigation Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-black/40 backdrop-blur-sm flex items-center justify-center gap-16 px-8">
            {/* Back Button */}
            <div className="w-6 h-6 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            {/* Home Button */}
            <div className="w-6 h-6 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            {/* Recent Apps Button */}
            <div className="w-6 h-6 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
          </div>
        </div>

        {/* Side Button (Power) */}
        <div className="absolute -right-[2px] top-32 w-[3px] h-14 bg-slate-600 rounded-r" />
      </div>

      {/* Device Label */}
      <div className="mt-4 text-center">
        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Android 14</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">Pixel 8 Pro</p>
      </div>
    </div>
  );
}
