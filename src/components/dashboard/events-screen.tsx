import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DashboardHeader } from './dashboard-header';
import { Users, Eye, Calendar, Sparkles, DollarSign, ChevronRight, Ticket, Heart, CheckCircle, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/shared/empty-state';
import { EventListCardSkeleton } from '@/components/shared';
import { cn } from '@/lib/utils';
import { useSkeletonSettings } from '@/contexts/skeleton-settings-context';
import { useViewport, createLayoutId } from '@/contexts/viewport-context';
import { MOCK_EVENTS } from '@/lib/mock-data';

export function EventsScreen() {
  const navigate = useNavigate();
  const { getDurationMs } = useSkeletonSettings();
  const { viewport } = useViewport();
  const [activeFilter, setActiveFilter] = useState<'all' | 'upcoming' | 'draft' | 'ended'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const filters = [
    { id: 'all' as const, label: 'All', count: 5 },
    { id: 'upcoming' as const, label: 'Upcoming', count: 3 },
    { id: 'draft' as const, label: 'Drafts', count: 1 },
    { id: 'ended' as const, label: 'Past', count: 1 },
  ];

  // Transform centralized mock events to match EventsScreen format
  const events = Object.values(MOCK_EVENTS).slice(0, 5).map((event, index) => {
    // Assign different statuses for variety in the management screen
    const statuses = ['upcoming', 'draft', 'ended', 'upcoming', 'upcoming'] as const;
    const status = statuses[index];
    const isPaid = event.eventType === 'paid';

    return {
      id: event.id,
      name: event.title,
      image: event.flyerImage,
      date: event.date,
      venue: event.venueName,
      month: event.month,
      day: event.day,
      dayOfWeek: event.dayOfWeek,
      status: status,
      eventType: event.eventType,
      entryRequired: event.entryRequired,
      pendingActions: status === 'draft', // Drafts need action
      stats: {
        revenue: isPaid ? (index === 0 ? '$2,450' : index === 3 ? '$5,230' : '$0') : '$0',
        ticketsSold: isPaid ? (index === 0 ? 156 : index === 3 ? 230 : 0) : 0,
        going: event.attendeeCount,
        interested: Math.floor(event.attendeeCount * 2.5),
        pageVisits: event.attendeeCount * (index === 0 ? 50 : index === 2 ? 35 : 20),
      },
    };
  });

  // Filter events based on active filter and search query
  const filteredEvents = events.filter((event) => {
    const matchesFilter =
      activeFilter === 'all' ||
      (activeFilter === 'upcoming' && event.status === 'upcoming') ||
      (activeFilter === 'draft' && event.status === 'draft') ||
      (activeFilter === 'ended' && event.status === 'ended');

    const matchesSearch =
      searchQuery === '' ||
      event.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Calculate overall metrics for veteran organizers (5+ events)
  const isVeteranOrganizer = events.length >= 5;
  const totalRevenue = events.reduce((sum, event) => {
    if (event.eventType === 'paid') {
      const revenue = parseFloat(event.stats.revenue.replace(/[$,]/g, ''));
      return sum + revenue;
    }
    return sum;
  }, 0);
  const totalTickets = events.reduce((sum, event) => sum + (event.stats.ticketsSold || 0), 0);
  const activeEvents = events.filter(e => e.status === 'upcoming' || e.status === 'draft').length;
  const totalViews = events.reduce((sum, event) => sum + event.stats.pageVisits, 0);

  const handleCreateEvent = () => {
    navigate('/events/create');
  };

  const handleEventClick = (eventId: string) => {
    navigate(`/events/${eventId}`);
  };

  useEffect(() => {
    // Simulate data loading - Duration controlled by skeleton settings
    const duration = getDurationMs('events');
    const timer = setTimeout(() => setIsLoading(false), duration);
    return () => clearTimeout(timer);
  }, [getDurationMs]);

  return (
    <div className="flex flex-col h-full bg-background">
      <DashboardHeader title="Events" subtitle="Manage your events" />

      <div className="flex-1 overflow-auto pb-24">
        {/* Compact Metrics Overview - Only for veteran organizers (5+ events) */}
        {isVeteranOrganizer && (
          <div className="px-1.5 pt-6 pb-4 flex justify-center">
            <div className="grid grid-cols-4 gap-3">
              <div className="space-y-1 text-center">
                <p className="text-xs text-muted-foreground">Revenue</p>
                <p className="text-lg font-bold text-foreground">${totalRevenue.toFixed(2)}</p>
              </div>
              <div className="space-y-1 text-center">
                <p className="text-xs text-muted-foreground">Tickets</p>
                <p className="text-lg font-bold text-foreground">{totalTickets}</p>
              </div>
              <div className="space-y-1 text-center">
                <p className="text-xs text-muted-foreground">Active</p>
                <p className="text-lg font-bold text-foreground">{activeEvents}</p>
              </div>
              <div className="space-y-1 text-center">
                <p className="text-xs text-muted-foreground">Views</p>
                <p className="text-lg font-bold text-foreground">{totalViews}</p>
              </div>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="px-1.5 pt-6 pb-4">
          <label htmlFor="event-search" className="sr-only">Search events</label>
          <Input
            id="event-search"
            type="text"
            placeholder="Search by name, description, or venue"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-12 bg-accent/50 border-border"
            aria-label="Search events by name, description, or venue"
          />
        </div>

        {/* Filter Tabs */}
        <div className="px-1.5 pb-6" role="group" aria-label="Event status filters">
          <Tabs value={activeFilter} onValueChange={(value) => setActiveFilter(value as any)}>
            <TabsList className="bg-transparent gap-2" role="tablist" aria-label="Filter events by status">
              {filters.map((filter) => (
                <TabsTrigger
                  key={filter.id}
                  value={filter.id}
                  role="tab"
                  aria-selected={activeFilter === filter.id}
                  aria-controls={`${filter.id}-panel`}
                  aria-label={`${filter.label} events, ${filter.count} items`}
                  className={cn(
                    "rounded-full px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                    "data-[state=inactive]:bg-accent data-[state=inactive]:text-muted-foreground"
                  )}
                >
                  {filter.label} {filter.count > 0 && `(${filter.count})`}
                  <span className="sr-only">{filter.count} events</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Events List */}
        <div className="px-1.5 space-y-4" role="list" aria-label="Your events">
          {isLoading ? (
            <>
              <EventListCardSkeleton />
              <EventListCardSkeleton />
              <EventListCardSkeleton />
            </>
          ) : filteredEvents.length === 0 ? (
            // Empty State
            <div role="status" aria-live="polite">
              {events.length === 0 ? (
                // No events at all
                <EmptyState
                  icon={<Sparkles className="w-10 h-10" aria-hidden="true" />}
                  title="Ready to host your first event?"
                  description="Create memorable experiences and connect with your audience. Let's get started on your event journey!"
                  action={{
                    label: 'Create Your First Event',
                    onClick: handleCreateEvent,
                  }}
                />
              ) : (
                // No results from filters/search
                <EmptyState
                  icon={<Calendar className="w-10 h-10" aria-hidden="true" />}
                  title="No events match your filters"
                  description="Try adjusting your filters or search query to discover more events."
                  action={{
                    label: searchQuery ? 'Clear Search' : 'Clear Filters',
                    onClick: () => {
                      if (searchQuery) {
                        setSearchQuery('');
                      } else {
                        setActiveFilter('all');
                      }
                    },
                    variant: 'outline',
                  }}
                />
              )}
            </div>
          ) : (
            <>
              <span className="sr-only">{filteredEvents.length} events found</span>
              {filteredEvents.map((event) => (
                <motion.div
                  key={event.id}
                  layoutId={createLayoutId(`event-card-${event.id}`, viewport)}
                >
                  <Card
                    className="overflow-hidden border-border cursor-pointer hover:border-primary/50 transition-colors relative"
                    role="article"
                    aria-label={`${event.name} event card`}
                    onClick={() => handleEventClick(event.id)}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleEventClick(event.id);
                      }
                    }}
                  >
                  {/* Background Image - Full Card */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src={event.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/80" />
                  </div>

                  {/* Event Flyer Image - Smaller with padding */}
                  <div className="relative z-10 p-4">
                    <div className="relative h-56 overflow-hidden rounded-xl">
                      <motion.img
                        layoutId={createLayoutId(`event-image-${event.id}`, viewport)}
                        src={event.image}
                        alt={event.name}
                        className="w-full h-full object-cover"
                      />
                      {/* Gradient overlay for title readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

                      {/* Event Type Badges - Top Right on Flyer, aligned with Action Required */}
                      <div className="absolute top-3 right-3 z-20 flex flex-col gap-1.5 items-end">
                        {event.pendingActions && (
                          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-black/40 backdrop-blur-sm animate-pulse">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-lg" style={{ boxShadow: '0 0 6px rgba(251, 191, 36, 0.8)' }} />
                            <span className="text-[10px] font-bold text-amber-300">Action Required</span>
                          </div>
                        )}
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
                          className="text-xl font-bold text-white line-clamp-2 leading-tight"
                        >
                          {event.name}
                        </motion.h3>
                      </div>
                    </div>
                  </div>

                  {/* Event Info Section */}
                  <CardContent className="relative z-10 pt-4 pb-3 space-y-3">
                    {/* Dynamic Stats Grid based on event type */}
                    <div className="grid grid-cols-3 gap-4">
                      {event.eventType === 'paid' ? (
                        <>
                          {/* Paid Event Stats */}
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-gray-400">
                              <DollarSign className="w-4 h-4" aria-hidden="true" />
                              <span className="text-xs">Revenue</span>
                            </div>
                            <p className="text-lg font-bold text-white">{event.stats.revenue}</p>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-gray-400">
                              <Ticket className="w-4 h-4" aria-hidden="true" />
                              <span className="text-xs">Sold</span>
                            </div>
                            <p className="text-lg font-bold text-white">{event.stats.ticketsSold}</p>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-gray-400">
                              <Eye className="w-4 h-4" aria-hidden="true" />
                              <span className="text-xs">Views</span>
                            </div>
                            <p className="text-lg font-bold text-white">{event.stats.pageVisits}</p>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Free Event Stats */}
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-gray-400">
                              <CheckCircle className="w-4 h-4" aria-hidden="true" />
                              <span className="text-xs">Going</span>
                            </div>
                            <p className="text-lg font-bold text-white">{event.stats.going}</p>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-gray-400">
                              <Heart className="w-4 h-4" aria-hidden="true" />
                              <span className="text-xs">Interested</span>
                            </div>
                            <p className="text-lg font-bold text-white">{event.stats.interested}</p>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-gray-400">
                              <Eye className="w-4 h-4" aria-hidden="true" />
                              <span className="text-xs">Views</span>
                            </div>
                            <p className="text-lg font-bold text-white">{event.stats.pageVisits}</p>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Venue */}
                    <div>
                      <p className="text-sm text-gray-300 leading-relaxed">{event.venue}</p>
                    </div>

                    {/* Status Badge + Manage Button */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-1.5">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          event.status === 'draft' && "bg-amber-400",
                          event.status === 'upcoming' && "bg-primary",
                          event.status === 'ended' && "bg-muted-foreground"
                        )} />
                        <span className={cn(
                          "text-xs",
                          event.status === 'draft' && "text-amber-400",
                          event.status === 'upcoming' && "text-primary",
                          event.status === 'ended' && "text-muted-foreground"
                        )}>
                          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        className="text-sm font-semibold text-white hover:text-gray-300 h-auto p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEventClick(event.id);
                        }}
                      >
                        Manage <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              ))}
            </>
          )}
        </div>
      </div>

    </div>
  );
}
