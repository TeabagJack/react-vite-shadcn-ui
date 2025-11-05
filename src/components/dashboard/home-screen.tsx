import React, { useState, useEffect, useMemo } from 'react';
import { ChevronDown, Search, ChevronRight, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { EventCard, FilterPill, EventCardSkeleton, CategoryCardSkeleton } from '@/components/shared';
import { EmptyState } from '@/components/shared/empty-state';
import { getCategoryIcon } from '@/lib/category-icons';
import { RumblWordmark, RumblLogo } from '@/components/branding';
import { cn } from '@/lib/utils';
import { useSkeletonSettings } from '@/contexts/skeleton-settings-context';
import { MOCK_EVENTS } from '@/lib/mock-data';

export function HomeScreen() {
  const navigate = useNavigate();
  const { getDurationMs } = useSkeletonSettings();
  const [activeFilters, setActiveFilters] = useState<string[]>(['This Month', 'Any Price']);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isCityListOpen, setIsCityListOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Maastricht');

  // Get trending events from centralized mock data and transform to match EventCard props
  const trendingEvents = useMemo(() => {
    return ['1', '2', '3'].map(id => {
      const event = MOCK_EVENTS[id];
      return {
        id: event.id,
        title: event.title,
        image: event.flyerImage,
        date: `${event.dayOfWeek}, ${event.month} ${event.day}`,
        time: event.time,
        price: event.price,
        venue: event.venueName,
        attendees: event.attendees.slice(0, 3).map(a => a.avatar),
        attendeeCount: event.attendeeCount,
        eventType: event.eventType,
        entryRequired: event.entryRequired,
      };
    });
  }, []);

  const categories = [
    {
      id: 1,
      name: 'party',
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=400&fit=crop',
      number: '01',
    },
    {
      id: 2,
      name: 'live performance',
      image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&h=400&fit=crop',
      number: '02',
    },
    {
      id: 3,
      name: 'activities',
      image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&h=400&fit=crop',
      number: '03',
    },
    {
      id: 4,
      name: 'food & drink',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=400&fit=crop',
      number: '04',
    },
    {
      id: 5,
      name: 'fitness',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop',
      number: '05',
    },
  ];

  // Category tags for quick navigation (smaller, with icons)
  const categoryTags = categories.map(cat => ({
    id: cat.id,
    name: cat.name,
    icon: getCategoryIcon(cat.name),
  }));

  const handleRemoveFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter));
  };

  const handleClearAll = () => {
    setActiveFilters([]);
  };

  const handleBrowseAll = () => {
    setActiveFilters([]);
    console.log('Browse all events');
  };

  const cities = [
    // Netherlands
    'Maastricht',
    'Amsterdam',
    'Groningen',
    'Eindhoven',
    'Utrecht',
    'Rotterdam',
    'Leiden',
    'Delft',
    'Tilburg',
    'Nijmegen',
    // Germany
    'Aachen',
    'Berlin',
    'Munich',
    'Cologne',
    'Hamburg',
    'Frankfurt',
    'Düsseldorf',
    // Belgium
    'Brussels',
    'Antwerp',
    'Ghent',
    'Leuven',
    'Liège',
    // UK
    'London',
    'Manchester',
    'Edinburgh',
    'Bristol',
    'Birmingham',
    'Leeds',
    'Oxford',
    'Cambridge',
  ];

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setIsCityListOpen(false);
  };

  // Simulate filtering logic - in production, this would filter actual data
  const hasActiveFilters = activeFilters.length > 0;
  // For demo purposes, show empty state when filters are active
  const filteredEventsCount = hasActiveFilters ? 0 : trendingEvents.length;

  useEffect(() => {
    // Simulate data loading for events - Duration controlled by skeleton settings
    const duration = getDurationMs('events');
    const eventsTimer = setTimeout(() => setIsLoadingEvents(false), duration);
    return () => clearTimeout(eventsTimer);
  }, [getDurationMs]);

  useEffect(() => {
    // Simulate data loading for categories - Duration controlled by skeleton settings
    const duration = getDurationMs('categories');
    const categoriesTimer = setTimeout(() => setIsLoadingCategories(false), duration);
    return () => clearTimeout(categoriesTimer);
  }, [getDurationMs]);

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header with branding - safe area aware for iOS Dynamic Island */}
      <div className="px-1.5 pb-4 safe-top-with-island">
        <h1 className="text-3xl font-bold text-foreground leading-tight mb-0.5">
          Find your world in
        </h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Button
              variant="ghost"
              onClick={() => setIsCityListOpen(!isCityListOpen)}
              className="flex items-center gap-2 text-3xl font-bold text-foreground leading-tight p-0 h-auto hover:bg-transparent"
              aria-label="Change location, currently selected city"
            >
              {selectedCity}
            </Button>

            {/* Cities dropdown */}
            {isCityListOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 mt-2 w-64 bg-background border border-border rounded-2xl shadow-2xl z-50 overflow-hidden"
              >
                <div className="max-h-80 overflow-y-auto p-2">
                  {cities.map((city) => (
                    <button
                      key={city}
                      onClick={() => handleCitySelect(city)}
                      className={cn(
                        "w-full text-left px-4 py-3 rounded-xl transition-colors text-base font-medium",
                        city === selectedCity
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent text-foreground"
                      )}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          <div className="flex items-center gap-2 opacity-85">
            {/* R logo rotates 135 degrees clockwise, then rotates extra 90 degrees clockwise when city list opens */}
            <motion.div
              initial={{
                rotate: 0
              }}
              animate={{
                rotate: isCityListOpen ? 225 : 135
              }}
              transition={{
                duration: isCityListOpen ? 0.618 : 1.0,
                ease: [0.4, 0, 0.2, 1],
                delay: isCityListOpen ? 0 : 0.3
              }}
              style={{
                transformOrigin: 'center'
              }}
            >
              <motion.div
                animate={{
                  opacity: isCityListOpen ? 1 : [0.85, 1, 0.85]
                }}
                transition={{
                  duration: 2,
                  repeat: isCityListOpen ? 0 : Infinity,
                  ease: "easeInOut"
                }}
              >
                <RumblLogo size="sm" variant="primary" />
              </motion.div>
            </motion.div>
            <span
              className="text-lg font-bold tracking-tight"
              style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
                letterSpacing: '-0.03em',
                fontWeight: 700
              }}
            >
              rumbl
            </span>
          </div>
        </div>
      </div>

      {/* Category Tags - Compact */}
      <div
        className="flex items-center gap-2 px-1.5 pb-3 overflow-x-auto scrollbar-hide"
        role="group"
        aria-label="Quick category filters"
      >
        {categoryTags.map((tag) => {
          const Icon = tag.icon;
          return (
            <button
              key={tag.id}
              onClick={() => navigate(`/categories/${tag.id}`)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted hover:bg-muted/80 active:scale-95 transition-all whitespace-nowrap flex-shrink-0"
              aria-label={`Browse ${tag.name} events`}
            >
              <Icon className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs font-medium text-foreground">{tag.name}</span>
            </button>
          );
        })}
      </div>

      <div className="flex-1 overflow-auto pb-24">
        {/* Trending Section */}
        <section className="px-1.5 mb-8" aria-labelledby="trending-heading">
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 id="trending-heading" className="text-xl font-bold text-foreground leading-tight">Trending</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">what your audience/users love</p>
            </div>
            <Button
              variant="ghost"
              className="flex items-center gap-1 text-sm text-muted-foreground leading-normal h-auto p-0"
              aria-label="View all trending events"
            >
              all
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Button>
          </div>

          {/* Horizontal Scroll */}
          {isLoadingEvents ? (
            <div
              className="flex gap-4 overflow-x-auto pb-2 -mx-1.5 px-1.5 scrollbar-hide"
              role="list"
              aria-label="Trending events"
            >
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
            </div>
          ) : filteredEventsCount === 0 && hasActiveFilters ? (
            <EmptyState
              icon={<Compass className="w-10 h-10" />}
              title="No events match your filters"
              description="We couldn't find any events matching your criteria. Try adjusting your filters or explore all available events!"
              action={{
                label: 'Browse All Events',
                onClick: handleBrowseAll,
              }}
              className="py-8"
            />
          ) : (
            <div
              className="flex gap-4 overflow-x-auto pb-2 -mx-1.5 px-1.5 scrollbar-hide"
              role="list"
              aria-label="Trending events"
            >
              {trendingEvents.map((event) => (
                <EventCard
                  key={event.id}
                  {...event}
                  onClick={() => navigate(`/events/${event.id}`)}
                  onBookmark={(id) => console.log('Bookmarked:', id)}
                />
              ))}
              <span className="sr-only">{trendingEvents.length} trending events</span>
            </div>
          )}
        </section>

        {/* Explore Popular Templates Section */}
        <section className="px-1.5" aria-labelledby="discover-heading">
          <div className="mb-4">
            <h2 id="discover-heading" className="text-xl font-bold text-foreground leading-tight">Explore popular templates</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">explore categories to find your vibe</p>
          </div>

          <div className="space-y-4" role="list" aria-label="Event categories">
            {isLoadingCategories ? (
              <>
                <CategoryCardSkeleton />
                <CategoryCardSkeleton />
                <CategoryCardSkeleton />
                <CategoryCardSkeleton />
                <CategoryCardSkeleton />
              </>
            ) : (
              categories.map((category) => (
                <Card
                  key={category.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => navigate(`/categories/${category.id}`)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      navigate(`/categories/${category.id}`);
                    }
                  }}
                  aria-label={`Browse ${category.name} events`}
                  className="relative h-32 rounded-2xl overflow-hidden border-0 cursor-pointer transition-transform hover:scale-[1.02]"
                >
                  <img
                    src={category.image}
                    alt=""
                    className="w-full h-full object-cover"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" aria-hidden="true" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-foreground leading-tight">{category.name}</h3>
                  </div>
                  <span className="absolute bottom-4 right-4 text-4xl font-bold text-muted-foreground/40 leading-none" aria-hidden="true">
                    {category.number}
                  </span>
                </Card>
              ))
            )}
          </div>
        </section>
      </div>

    </div>
  );
}
