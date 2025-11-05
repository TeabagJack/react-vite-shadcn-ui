import { createContext, useContext, ReactNode, useState } from 'react';

type SkeletonDuration = 'instant' | 'fast' | 'normal' | 'slow';

interface SkeletonSettings {
  duration: SkeletonDuration;
  setDuration: (duration: SkeletonDuration) => void;
  getDurationMs: (type: 'events' | 'categories') => number;
}

const SkeletonSettingsContext = createContext<SkeletonSettings | undefined>(undefined);

const DURATION_PRESETS = {
  instant: {
    events: 0,
    categories: 0,
  },
  fast: {
    events: 300,
    categories: 500,
  },
  normal: {
    events: 1000,
    categories: 1618, // Golden ratio
  },
  slow: {
    events: 2000,
    categories: 3000,
  },
} as const;

export function SkeletonSettingsProvider({ children }: { children: ReactNode }) {
  const [duration, setDuration] = useState<SkeletonDuration>('instant');

  const getDurationMs = (type: 'events' | 'categories'): number => {
    return DURATION_PRESETS[duration][type];
  };

  return (
    <SkeletonSettingsContext.Provider value={{ duration, setDuration, getDurationMs }}>
      {children}
    </SkeletonSettingsContext.Provider>
  );
}

export function useSkeletonSettings() {
  const context = useContext(SkeletonSettingsContext);
  if (!context) {
    throw new Error('useSkeletonSettings must be used within SkeletonSettingsProvider');
  }
  return context;
}

export const SKELETON_DURATION_LABELS = {
  instant: 'Instant (No Delay)',
  fast: 'Fast (300-500ms)',
  normal: 'Normal (1000-1618ms)',
  slow: 'Slow (2000-3000ms)',
} as const;
