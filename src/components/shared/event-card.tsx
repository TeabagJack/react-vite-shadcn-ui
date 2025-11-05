import { memo } from 'react';
import { motion } from 'framer-motion';
import { Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useViewport, createLayoutId } from '@/contexts/viewport-context';

interface EventCardProps {
  id: number;
  title: string;
  image: string;
  date: string;
  time: string;
  price: string;
  venue: string;
  attendees?: string[]; // Array of profile picture URLs
  attendeeCount?: number; // Total number of attendees
  eventType?: 'free' | 'paid';
  entryRequired?: boolean;
  className?: string;
  onClick?: () => void;
  onBookmark?: (id: number) => void;
}

export const EventCard = memo(function EventCard({
  id,
  title,
  image,
  date,
  time,
  price,
  venue,
  attendees = [],
  attendeeCount,
  eventType,
  entryRequired,
  className,
  onClick,
  onBookmark,
}: EventCardProps) {
  const { viewport } = useViewport();
  const displayAttendees = attendees.slice(0, 3); // Show max 3 avatars
  const remainingCount = attendeeCount ? attendeeCount - displayAttendees.length : 0;

  return (
    <article
      className={cn('flex-shrink-0 w-56 cursor-pointer', className)}
      onClick={onClick}
      role="article"
      aria-label={`Event: ${title}`}
    >
      <motion.div
        className="relative mb-3 rounded-2xl overflow-hidden"
        layoutId={createLayoutId(`event-card-${id}`, viewport)}
      >
        <motion.img
          layoutId={createLayoutId(`event-image-${id}`, viewport)}
          src={image}
          alt={`${title} event poster`}
          className="w-full aspect-[3/4] object-cover rounded-2xl"
        />

        {/* Event Type Badge - Top Right */}
        <div className="absolute top-3 right-3 z-20 flex flex-col gap-1.5 items-end">
          {eventType === 'free' ? (
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-black/40 backdrop-blur-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-lg" style={{ boxShadow: '0 0 6px rgba(52, 211, 153, 0.8)' }} />
              <span className="text-[10px] font-bold text-emerald-300">Free</span>
            </div>
          ) : entryRequired ? (
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-black/40 backdrop-blur-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-lg" style={{ boxShadow: '0 0 6px rgba(96, 165, 250, 0.8)' }} />
              <span className="text-[10px] font-bold text-blue-300">Entry Required</span>
            </div>
          ) : null}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 left-3 min-w-11 min-h-11 w-11 h-11 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90 z-20"
          onClick={(e) => {
            e.stopPropagation();
            onBookmark?.(id);
          }}
          aria-label={`Bookmark ${title} event`}
        >
          <Bookmark className="w-5 h-5 text-foreground" />
          <span className="sr-only">Bookmark this event</span>
        </Button>

        {/* Attendee Avatars on Image */}
        {displayAttendees.length > 0 && (
          <div className="absolute bottom-3 left-3 flex items-center">
            <div className="flex -space-x-2">
              {displayAttendees.map((avatar, index) => (
                <img
                  key={index}
                  src={avatar}
                  alt=""
                  className="w-7 h-7 rounded-full border-2 border-background"
                  aria-hidden="true"
                />
              ))}
              {remainingCount > 0 && (
                <div className="w-7 h-7 rounded-full border-2 border-background bg-primary/90 flex items-center justify-center">
                  <span className="text-[10px] font-semibold text-primary-foreground">
                    +{remainingCount}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </motion.div>
      <motion.h3
        layoutId={createLayoutId(`event-title-${id}`, viewport)}
        className="font-semibold text-foreground mb-1 text-base"
      >
        {title}
      </motion.h3>
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
        <time className="uppercase" dateTime={date}>{date}</time>
        <span className="w-1 h-1 rounded-full bg-muted-foreground" aria-hidden="true" />
        <span>{time}</span>
      </div>
      <p className="text-xs text-muted-foreground">
        {price} · {venue}
      </p>
    </article>
  );
});
