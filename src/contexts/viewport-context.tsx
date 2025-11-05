import { createContext, useContext, ReactNode } from 'react';

type ViewportType = 'ios' | 'android';

interface ViewportContextType {
  viewport: ViewportType;
}

const ViewportContext = createContext<ViewportContextType | null>(null);

export function ViewportProvider({
  children,
  viewport
}: {
  children: ReactNode;
  viewport: ViewportType;
}) {
  return (
    <ViewportContext.Provider value={{ viewport }}>
      {children}
    </ViewportContext.Provider>
  );
}

export function useViewport() {
  const context = useContext(ViewportContext);
  if (!context) {
    throw new Error('useViewport must be used within ViewportProvider');
  }
  return context;
}

/**
 * Creates a viewport-aware layoutId for Framer Motion shared element transitions.
 * This ensures transitions only occur within the same viewport (iOS to iOS, Android to Android).
 *
 * @param baseId - The base identifier (e.g., "event-card-123")
 * @param viewport - The viewport type ('ios' or 'android')
 * @returns A unique layoutId scoped to the viewport (e.g., "ios-event-card-123")
 *
 * @example
 * const { viewport } = useViewport();
 * <motion.div layoutId={createLayoutId('event-card-1', viewport)}>
 */
export function createLayoutId(baseId: string, viewport: ViewportType): string {
  return `${viewport}-${baseId}`;
}
