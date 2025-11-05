import { memo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useViewport } from '@/contexts/viewport-context';
import { createLayoutId } from '@/lib/layout-id-utils';

interface OrganizerEventCardProps {
  id: number;
  title: string;
  image: string;
  date?: string;
  time?: string;
  month?: string;
  day?: string;
  dayOfWeek?: string;
  attendeeCount?: number;
  eventType?: 'free' | 'paid';
  entryRequired?: boolean;
  className?: string;
  onClick?: () => void;
  variant?: 'horizontal' | 'grid';
}

export const OrganizerEventCard = memo(function OrganizerEventCard({
  id,
  title,
  image,
  month,
  day,
  dayOfWeek,
  eventType,
  entryRequired,
  className,
  onClick,
  variant = 'horizontal',
}: OrganizerEventCardProps) {
  const { viewportId } = useViewport();

  // Grid variant (past events) - simple image only
  if (variant === 'grid') {
    return (
      <article
        className={cn(
          'relative aspect-[3/4] rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity',
          className
        )}
        onClick={onClick}
      >
        <motion.img
          layoutId={createLayoutId.orgEventImage(id, viewportId)}
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        {/* Subtle overlay to indicate it's past */}
        <div className="absolute inset-0 bg-black/10" />
      </article>
    );
  }

  // Horizontal variant (upcoming events) - full card with badges
  return (
    <article
      className={cn(
        'flex-shrink-0 w-64 bg-card border border-border rounded-xl overflow-hidden cursor-pointer hover:border-primary/50 transition-colors',
        className
      )}
      onClick={onClick}
    >
      <motion.div
        layoutId={createLayoutId.orgEventCard(id, viewportId)}
        className="relative h-80 overflow-hidden"
      >
        <motion.img
          layoutId={createLayoutId.orgEventImage(id, viewportId)}
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />

        {/* Subtle gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

        {/* Event Type Badges - Top Right on Flyer */}
        {(eventType || entryRequired) && (
          <div className="absolute top-3 right-3 z-20 flex flex-col gap-1.5 items-end">
            {eventType === 'free' ? (
              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-black/40 backdrop-blur-sm">
                <div
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-lg"
                  style={{ boxShadow: '0 0 6px rgba(52, 211, 153, 0.8)' }}
                />
                <span className="text-[10px] font-bold text-emerald-300">Free</span>
              </div>
            ) : entryRequired ? (
              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-black/40 backdrop-blur-sm">
                <div
                  className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-lg"
                  style={{ boxShadow: '0 0 6px rgba(96, 165, 250, 0.8)' }}
                />
                <span className="text-[10px] font-bold text-blue-300">Entry Required</span>
              </div>
            ) : null}
          </div>
        )}

        {/* Date Badge - Top Left */}
        {month && day && dayOfWeek && (
          <div className="absolute top-3 left-3 w-14 h-16 rounded-lg overflow-hidden bg-black/40 backdrop-blur-[2px] opacity-70">
            <div className="h-4 bg-white/20 flex items-center justify-center">
              <span className="text-[9px] font-bold text-white uppercase tracking-wide">
                {month}
              </span>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-0.5">
              <span className="text-2xl font-bold text-white leading-none">{day}</span>
              <span className="text-[10px] font-semibold text-white/80 uppercase">
                {dayOfWeek}
              </span>
            </div>
          </div>
        )}

        {/* Event Title - Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <motion.h3
            layoutId={createLayoutId.orgEventTitle(id, viewportId)}
            className="text-lg font-bold text-white line-clamp-2"
          >
            {title}
          </motion.h3>
        </div>
      </motion.div>
    </article>
  );
});
