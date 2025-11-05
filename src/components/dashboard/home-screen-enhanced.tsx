import React, { useState, useEffect } from 'react';
import { ChevronDown, Search, ChevronRight, Filter, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { EventCard, FilterPill, EventCardSkeleton, CategoryCardSkeleton } from '@/components/shared';
import { EmptyState } from '@/components/shared/empty-state';
import { cn } from '@/lib/utils';

export function HomeScreen() {
  const [activeFilters, setActiveFilters] = useState<string[]>(['This Month', 'Any Price']);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [showFilterHint, setShowFilterHint] = useState(false);
  const [filterAnimation, setFilterAnimation] = useState<string | null>(null);

  const trendingEvents = [
    {
      id: 1,
      title: 'No Sleep 2nite',
      image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400&h=600&fit=crop',
      date: 'FRI, NOV 21',
      time: '12AM',
      price: 'FREE',
      venue: 'Mister East',
    },
    {
      id: 2,
      title: 'TFA & MENASA SOUND SYSTEM',
      image: 'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=400&h=600&fit=crop',
      date: 'TODAY',
      time: '8PM',
      price: 'FREE',
      venue: 'XANADU',
    },
    {
      id: 3,
      title: 'MEZCLA @ MR. PURPLE',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=600&fit=crop',
      date: 'SAT, NOV 15',
      time: '10PM',
      price: 'FREE',
      venue: 'The Club by Mr. Purple',
    },
  ];

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

  const handleRemoveFilter = (filter: string) => {
    setFilterAnimation('removing');
    setTimeout(() => {
      setActiveFilters(activeFilters.filter((f) => f !== filter));
      setFilterAnimation(null);
    }, 150);
  };

  const handleClearAll = () => {
    setFilterAnimation('clearing');
    setTimeout(() => {
      setActiveFilters([]);
      setFilterAnimation(null);
    }, 150);
  };

  // Filter trending events based on active filters
  const filteredEvents = trendingEvents.filter((event) => {
    if (activeFilters.includes('FREE') && event.price !== 'FREE') {
      return false;
    }
    // Add more filter logic as needed
    return true;
  });

  useEffect(() => {
    // Simulate data loading for events
    const eventsTimer = setTimeout(() => setIsLoadingEvents(false), 1500);
    return () => clearTimeout(eventsTimer);
  }, []);

  useEffect(() => {
    // Simulate data loading for categories
    const categoriesTimer = setTimeout(() => setIsLoadingCategories(false), 1800);
    return () => clearTimeout(categoriesTimer);
  }, []);

  useEffect(() => {
    // Show hint on first visit
    const hasSeenHint = localStorage.getItem('hasSeenFilterHint');
    if (!hasSeenHint && activeFilters.length === 0) {
      setShowFilterHint(true);
      localStorage.setItem('hasSeenFilterHint', 'true');
    }
  }, [activeFilters.length]);

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="px-6 pt-16 pb-4">
        <h1 className="text-4xl font-bold text-foreground leading-tight mb-1">
          Find your world in
        </h1>
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-4xl font-bold text-foreground leading-tight p-0 h-auto hover:bg-transparent"
          aria-label="Change location, currently New York"
        >
          New York
          <ChevronDown className="w-6 h-6" aria-hidden="true" />
        </Button>
      </div>

      {/* Filters */}
      <div className="px-6 pb-4">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">
            Filters {activeFilters.length > 0 && `(${activeFilters.length})`}
          </span>
          {showFilterHint && activeFilters.length === 0 && (
            <span className="text-xs text-muted-foreground animate-pulse">
              👆 Tap to add filters
            </span>
          )}
        </div>
        <div
          className={cn(
            'flex items-center gap-3 overflow-x-auto pb-2',
            filterAnimation && 'transition-opacity duration-150',
            filterAnimation === 'removing' && 'opacity-70'
          )}
          role="group"
          aria-label="Event filters"
        >
          {activeFilters.map((filter, index) => (
            <div
              key={filter}
              className={cn(
                'animate-in fade-in slide-in-from-left-5',
                'transition-all duration-200'
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <FilterPill
                label={filter}
                active
                removable
                onRemove={() => handleRemoveFilter(filter)}
              />
            </div>
          ))}
          {activeFilters.length > 0 && (
            <>
              <span className="sr-only">{activeFilters.length} active filters</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAll}
                className="text-sm text-muted-foreground hover:text-foreground rounded-full px-4 flex-shrink-0"
              >
                Clear all
              </Button>
            </>
          )}
          <Button
            variant="outline"
            size="icon"
            className="min-w-11 min-h-11 w-11 h-11 rounded-full flex-shrink-0 ml-auto"
            aria-label="Search events"
          >
            <Search className="w-5 h-5" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
        {activeFilters.length > 0 && (
          <div className="mt-2 text-xs text-muted-foreground animate-in fade-in slide-in-from-top-2">
            Showing {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-auto pb-24">
        {/* Trending Section */}
        <section className="px-6 mb-8" aria-labelledby="trending-heading">
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 id="trending-heading" className="text-xl font-bold text-foreground leading-tight">Trending</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">what people are loving</p>
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
              className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide"
              role="list"
              aria-label="Trending events"
            >
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
            </div>
          ) : filteredEvents.length === 0 && activeFilters.length > 0 ? (
            <EmptyState
              icon={<Compass className="w-10 h-10" />}
              title="No events match your filters"
              description="Try adjusting your filters or browse all events to discover what's happening"
              action={{
                label: "Clear all filters",
                onClick: handleClearAll
              }}
            />
          ) : (
            <div
              className={cn(
                'flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide',
                'transition-all duration-300',
                filterAnimation && 'opacity-70'
              )}
              role="list"
              aria-label="Trending events"
            >
              {filteredEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="animate-in fade-in slide-in-from-bottom-5"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <EventCard
                    {...event}
                    onBookmark={(id) => console.log('Bookmarked:', id)}
                  />
                </div>
              ))}
              <span className="sr-only">{filteredEvents.length} trending events</span>
            </div>
          )}
        </section>

        {/* Discover More Section */}
        <section className="px-6" aria-labelledby="discover-heading">
          <div className="mb-4">
            <h2 id="discover-heading" className="text-xl font-bold text-foreground leading-tight">Discover more</h2>
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
