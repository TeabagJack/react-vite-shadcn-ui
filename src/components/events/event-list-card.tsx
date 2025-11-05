import { memo } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useViewport } from '@/contexts/viewport-context';

interface EventListCardProps {
  id: number;
  title: string;
  image: string;
  date: string;
  time: string;
  venue: string;
  attendeeCount: number;
  price: string;
  className?: string;
  onClick?: () => void;
}

export const EventListCard = memo(function EventListCard({
  id,
  title,
  image,
  date,
  time,
  venue,
  attendeeCount,
  price,
  className,
  onClick,
}: EventListCardProps) {
  const { viewportId } = useViewport();
  const layoutPrefix = 'event-list';

  return (
    <motion.div
      layoutId={`${viewportId}-${layoutPrefix}-card-${id}`}
      className={cn(
        'flex gap-4 p-4 bg-card border border-border rounded-xl cursor-pointer hover:bg-accent/50 transition-colors',
        className
      )}
      onClick={onClick}
    >
      {/* Left: Square thumbnail */}
      <div className="relative flex-shrink-0">
        <motion.img
          layoutId={`${viewportId}-${layoutPrefix}-image-${id}`}
          src={image}
          alt={title}
          className="w-20 h-20 rounded-lg object-cover"
        />
      </div>

      {/* Right: Event details */}
      <div className="flex-1 min-w-0">
        <motion.h3
          layoutId={`${viewportId}-${layoutPrefix}-title-${id}`}
          className="font-semibold text-foreground text-base mb-1 line-clamp-1"
        >
          {title}
        </motion.h3>

        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5" />
            <span>{date} • {time}</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="w-3.5 h-3.5" />
            <span className="line-clamp-1">{venue}</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Users className="w-3.5 h-3.5" />
              <span>{attendeeCount} going</span>
            </div>
            <span className="font-semibold text-primary">{price}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
});
