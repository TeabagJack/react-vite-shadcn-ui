import { memo, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useViewport, createLayoutId } from '@/contexts/viewport-context';
import { getOrganizerById, getEventsByOrganizerId } from '@/lib/mock-data';

const OrgProfileScreen = memo(function OrgProfileScreen() {
  const navigate = useNavigate();
  const { orgId } = useParams();
  const { viewport } = useViewport();
  const [isFollowing, setIsFollowing] = useState(false);

  // Get organizer data from centralized mock data store
  const organizer = getOrganizerById(orgId || '1');

  // Get all events for this organizer
  const allEvents = useMemo(() => getEventsByOrganizerId(orgId || '1'), [orgId]);

  // Split events into upcoming (first 3) and past events (rest)
  const upcomingEvents = useMemo(() => allEvents.slice(0, 3), [allEvents]);
  const pastEvents = useMemo(() => allEvents.slice(3), [allEvents]);

  // Fallback if organizer not found
  if (!organizer) {
    return (
      <div className="h-full flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Organizer Not Found</h2>
          <p className="text-muted-foreground mb-4">The organizer you're looking for doesn't exist.</p>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    console.log('Sharing organizer profile...');
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleMessage = () => {
    console.log('Opening message...');
  };

  return (
    <motion.div
      className="h-full flex flex-col bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border py-3">
        <div className="flex items-center justify-between px-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="h-auto p-0 hover:bg-transparent"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </Button>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold text-foreground">{organizer.name}</h1>
            <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-semibold rounded-full">
              Org
            </span>
          </div>
          <Button
            variant="ghost"
            onClick={handleShare}
            className="h-auto p-0 hover:bg-transparent"
            aria-label="Share"
          >
            <Share2 className="w-6 h-6 text-foreground" />
          </Button>
        </div>
      </div>

      {/* Content - scrollable */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Cover Image + Avatar + Stats */}
        <div className="relative">
          {/* Cover Photo */}
          <div className="h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
            <img
              src={organizer.coverImage}
              alt="Cover"
              className="w-full h-full object-cover opacity-60"
            />
          </div>

          {/* Avatar positioned over cover edge + Compact Info */}
          <div className="px-1.5 -mt-12 flex items-end justify-between">
            <motion.div layoutId={createLayoutId(`org-avatar-${orgId}`, viewport)}>
              <Avatar className="w-20 h-20 border-4 border-background">
                <AvatarImage src={organizer.avatar} alt={organizer.name} />
                <AvatarFallback>{organizer.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </motion.div>

            {/* Only show member count for associations */}
            {organizer.isAssociation && (
              <div className="mb-2">
                <p className="text-sm text-muted-foreground text-right">
                  {organizer.memberCount} members
                </p>
              </div>
            )}
          </div>

          {/* Organizer Name */}
          <div className="px-1.5 pt-3 pb-4">
            <h2 className="text-xl font-bold text-foreground">{organizer.name}</h2>
          </div>

          {/* CTA Buttons - Compact */}
          <div className="px-1.5 pb-6 flex gap-3">
            <Button
              onClick={handleFollow}
              className={`flex-1 h-10 text-sm font-semibold rounded-lg ${
                isFollowing
                  ? 'bg-muted text-foreground hover:bg-muted/80'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90'
              }`}
            >
              {isFollowing ? (organizer.isAssociation ? 'Member' : 'Following') : (organizer.isAssociation ? 'Join' : 'Follow')}
            </Button>
            <Button
              onClick={handleMessage}
              variant="outline"
              className="flex-1 h-10 text-sm font-semibold rounded-lg"
            >
              Message
            </Button>
          </div>

          {/* Description */}
          <div className="px-1.5 pb-6">
            <p className="text-sm text-foreground leading-relaxed">
              {organizer.description}
            </p>
          </div>
        </div>

        {/* Upcoming Events Section */}
        <div className="pt-8 pb-4">
          <div className="px-1.5 pb-4">
            <h2 className="text-xl font-bold text-foreground">Upcoming Events</h2>
          </div>

          {/* Horizontal Scrollable Event Cards */}
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 px-1.5 pb-2">
              {upcomingEvents.map((event) => (
                <motion.div
                  key={event.id}
                  onClick={() => navigate(`/events/${event.id}`)}
                  className="flex-shrink-0 w-64 bg-card border border-border rounded-xl overflow-hidden cursor-pointer hover:border-primary/50 transition-colors"
                  layoutId={createLayoutId(`event-card-${event.id}`, viewport)}
                >
                  <div className="relative h-80 overflow-hidden bg-muted">
                    <motion.img
                      layoutId={createLayoutId(`event-image-${event.id}`, viewport)}
                      src={event.flyerImage}
                      alt={event.title}
                      className="w-full h-full object-contain"
                    />
                    {/* Subtle gradient for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

                    {/* Event Type Badges - Top Right on Flyer */}
                    <div className="absolute top-3 right-3 z-20 flex flex-col gap-1.5 items-end">
                      {event.eventType === 'free' ? (
                        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-black/40 backdrop-blur-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-lg" style={{ boxShadow: '0 0 6px rgba(52, 211, 153, 0.8)' }} />
                          <span className="text-[10px] font-bold text-emerald-300">Free</span>
                        </div>
                      ) : event.entryRequired ? (
                        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-black/40 backdrop-blur-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-lg" style={{ boxShadow: '0 0 6px rgba(96, 165, 250, 0.8)' }} />
                          <span className="text-[10px] font-bold text-blue-300">Entry Required</span>
                        </div>
                      ) : null}
                    </div>

                    {/* Date Badge - Top Left */}
                    <div className="absolute top-3 left-3 w-14 h-16 rounded-lg overflow-hidden bg-black/40 backdrop-blur-[2px] opacity-70">
                      <div className="h-4 bg-white/20 flex items-center justify-center">
                        <span className="text-[9px] font-bold text-white uppercase tracking-wide">
                          {event.month}
                        </span>
                      </div>
                      <div className="flex-1 flex flex-col items-center justify-center gap-0.5">
                        <span className="text-2xl font-bold text-white leading-none">{event.day}</span>
                        <span className="text-[10px] font-semibold text-white/80 uppercase">{event.dayOfWeek}</span>
                      </div>
                    </div>

                    {/* Event Title - Bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <motion.h3
                        layoutId={createLayoutId(`event-title-${event.id}`, viewport)}
                        className="text-lg font-bold text-white line-clamp-2"
                      >
                        {event.title}
                      </motion.h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Past Events Section */}
        <div className="pt-4 px-1.5 pb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">Past Events</h2>
            <span className="px-3 py-1 bg-muted text-muted-foreground text-sm font-semibold rounded-full">
              {pastEvents.length}
            </span>
          </div>

          {/* 2-Column Grid */}
          <div className="grid grid-cols-2 gap-3">
            {pastEvents.map((event) => (
              <motion.div
                key={event.id}
                onClick={() => navigate(`/events/${event.id}`)}
                className="relative aspect-[3/4] rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity bg-muted"
                layoutId={createLayoutId(`event-card-${event.id}`, viewport)}
              >
                <motion.img
                  layoutId={createLayoutId(`event-image-${event.id}`, viewport)}
                  src={event.flyerImage}
                  alt="Past event"
                  className="w-full h-full object-contain"
                />
                {/* Subtle overlay to indicate it's past */}
                <div className="absolute inset-0 bg-black/10" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default OrgProfileScreen;
