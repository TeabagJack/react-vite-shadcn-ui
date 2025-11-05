import { memo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useViewport, createLayoutId } from '@/contexts/viewport-context';
import { getEventById } from '@/lib/mock-data';

const EventDetailsScreen = memo(function EventDetailsScreen() {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const { viewport } = useViewport();
  const [isRegistered, setIsRegistered] = useState(false);

  // Get event data from centralized mock data store
  const event = getEventById(eventId || '1');

  // Fallback if event not found
  if (!event) {
    return (
      <div className="h-full flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Event Not Found</h2>
          <p className="text-muted-foreground mb-4">The event you're looking for doesn't exist.</p>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </div>
    );
  }

  const handleRegister = () => {
    setIsRegistered(!isRegistered);
  };

  const handleShare = () => {
    console.log('Sharing event...');
    // Implement share functionality
  };

  return (
    <motion.div
      className="h-full flex flex-col bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Sticky Header with Back, Title, Share */}
      <div className="sticky top-0 z-50 bg-background border-b border-border py-3">
        <div className="flex items-center justify-between px-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="h-auto p-0 hover:bg-transparent"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </Button>
          <h1 className="text-lg font-semibold text-foreground">Event Details</h1>
          <Button
            variant="ghost"
            onClick={handleShare}
            className="h-auto p-0 hover:bg-transparent"
            aria-label="Share event"
          >
            <Share2 className="w-6 h-6 text-foreground" />
          </Button>
        </div>
      </div>

      {/* Content - scrollable area */}
      <div className="flex-1 overflow-y-auto pb-6 relative">
        {/* Event Flyer Image with Title Overlay */}
        <motion.div
          className="relative h-80 overflow-hidden"
          layoutId={createLayoutId(`event-card-${eventId}`, viewport)}
        >
          <motion.img
            layoutId={createLayoutId(`event-image-${eventId}`, viewport)}
            src={event.flyerImage}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay for text readability */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.382, delay: 0.2 }}
          />
          {/* Event Title Overlay */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 px-6 pb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.382, delay: 0.3 }}
          >
            <motion.h2
              layoutId={createLayoutId(`event-title-${eventId}`, viewport)}
              className="text-3xl font-bold text-white leading-tight"
            >
              {event.title}
            </motion.h2>
          </motion.div>
        </motion.div>

        <div className="px-6 pt-6 space-y-4">
          {/* Date and Time Section */}
          <div className="bg-card border border-border rounded-xl overflow-hidden px-4 py-4">
            <div className="flex items-center gap-4">
              {/* Calendar Widget - Single Date */}
              <div className="flex flex-col w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden">
                <div className="bg-primary flex items-center justify-center py-0.5">
                  <span className="text-[10px] font-bold text-primary-foreground uppercase">{event.month}</span>
                </div>
                <div className="bg-primary/10 flex-1 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary leading-none">{event.day}</span>
                </div>
              </div>

              {/* Time Range */}
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">Time</p>
                <p className="text-lg font-semibold text-foreground">{event.time}</p>
              </div>
            </div>
          </div>

          {/* Connected Location Fields Group */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            {/* Venue Name */}
            <div className="relative border-b border-border">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <div className="pl-11 pr-4 h-14 flex items-center">
                <div>
                  <p className="text-xs text-muted-foreground">Venue</p>
                  <p className="text-base font-medium text-foreground">{event.venueName}</p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="relative border-b border-border">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <div className="pl-11 pr-4 h-14 flex items-center">
                <div>
                  <p className="text-xs text-muted-foreground">Address</p>
                  <p className="text-base font-medium text-foreground">{event.venueAddress}</p>
                </div>
              </div>
            </div>

            {/* Attendees */}
            <div className="px-4 py-4 flex flex-col items-center justify-center gap-2">
              <div className="flex -space-x-2">
                {event.attendees.slice(0, 3).map((attendee) => (
                  <Avatar key={attendee.id} className="w-9 h-9 border-2 border-background">
                    <AvatarImage src={attendee.avatar} alt={attendee.name} />
                    <AvatarFallback>{attendee.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                ))}
                <div className="w-9 h-9 rounded-full border-2 border-background bg-primary/90 flex items-center justify-center">
                  <span className="text-xs font-semibold text-primary-foreground">
                    +{event.attendeeCount - 3}
                  </span>
                </div>
              </div>
              <span className="text-base font-medium text-muted-foreground">{event.attendeeCount} going</span>
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                About Event
              </h3>
            </div>
            <div className="relative">
              <div className="px-4 py-4 max-h-64 overflow-y-auto">
                <p className="text-base text-foreground leading-relaxed whitespace-pre-line">
                  {event.description}
                </p>
              </div>
              {/* Scroll indicator blur */}
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-card via-card/40 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Host Information Card */}
          <div
            className="bg-card border border-border rounded-xl overflow-hidden cursor-pointer hover:border-primary/50 transition-colors"
            onClick={() => navigate(`/organizer/${event.host.id}`)}
          >
            <div className="px-4 py-3 border-b border-border">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                Event Host
              </h3>
            </div>
            <div className="px-4 py-4 flex items-center gap-4">
              <motion.div layoutId={createLayoutId(`org-avatar-${event.host.id}`, viewport)}>
                <Avatar className="w-14 h-14 border-2 border-border">
                  <AvatarImage src={event.host.avatar} alt={event.host.name} />
                  <AvatarFallback>{event.host.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </motion.div>
              <div className="flex-1">
                <p className="text-base font-semibold text-foreground">{event.host.name}</p>
                <p className="text-sm text-muted-foreground">{event.host.username}</p>
                <p className="text-xs text-muted-foreground mt-1">Event Organizer</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons at Bottom */}
        <div className="sticky bottom-0 left-0 right-0 bg-background border-t border-border px-6 py-4 space-y-3 mt-6 mb-20">
          <Button
            onClick={handleRegister}
            className={`w-full h-12 text-base font-semibold rounded-xl ${
              isRegistered
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-primary hover:bg-primary/90 text-primary-foreground'
            }`}
          >
            {isRegistered ? '✓ Registered' : 'Register for Event'}
          </Button>
          <Button
            onClick={handleShare}
            variant="outline"
            className="w-full h-12 text-base font-semibold rounded-xl border-2"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Share Event
          </Button>
        </div>
      </div>
    </motion.div>
  );
});

export default EventDetailsScreen;
