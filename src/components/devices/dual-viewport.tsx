import React, { useState } from 'react';
import { IOSFrame } from './ios-frame';
import { AndroidFrame } from './android-frame';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, Maximize2, Minimize2, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ViewportProvider } from '@/contexts/viewport-context';
import { useSkeletonSettings, SKELETON_DURATION_LABELS } from '@/contexts/skeleton-settings-context';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DualViewportProps {
  children: React.ReactNode;
  className?: string;
}

export function DualViewport({ children, className }: DualViewportProps) {
  const [scale, setScale] = useState(0.9);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { duration, setDuration } = useSkeletonSettings();

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 1));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.3));
  };

  const handleReset = () => {
    setScale(0.5);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(prev => !prev);
  };

  return (
    <div className={cn("flex flex-col h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800", className)}>
      {/* Control Bar */}
      <div className="border-b border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomOut}
              disabled={scale <= 0.3}
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
            >
              <span className="text-xs font-mono">{Math.round(scale * 100)}%</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomIn}
              disabled={scale >= 1}
            >
              <ZoomIn className="w-4 h-4" />
            </Button>

            <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-2" />

            {/* Fullscreen Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFullscreen}
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </Button>
          </div>

          {/* Skeleton Duration Control */}
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-500" />
            <span className="text-xs text-slate-600 dark:text-slate-400">Skeleton:</span>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger className="h-8 w-[180px] text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="instant">{SKELETON_DURATION_LABELS.instant}</SelectItem>
                <SelectItem value="fast">{SKELETON_DURATION_LABELS.fast}</SelectItem>
                <SelectItem value="normal">{SKELETON_DURATION_LABELS.normal}</SelectItem>
                <SelectItem value="slow">{SKELETON_DURATION_LABELS.slow}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Device Viewports */}
      <div className="flex-1 overflow-auto">
        <div className={cn(
          "flex items-start justify-center gap-12 p-12",
          isFullscreen ? "min-h-screen" : "min-h-full"
        )}>
          {/* iOS Device - Light Mode */}
          <IOSFrame scale={scale}>
            <ViewportProvider viewport="ios">
              <div className="light h-full w-full">
                {children}
              </div>
            </ViewportProvider>
          </IOSFrame>

          {/* Android Device - Dark Mode */}
          <AndroidFrame scale={scale}>
            <ViewportProvider viewport="android">
              <div className="dark h-full w-full">
                {children}
              </div>
            </ViewportProvider>
          </AndroidFrame>
        </div>
      </div>

      
    </div>
  );
}
