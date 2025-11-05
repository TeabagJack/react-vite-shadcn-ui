import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';

export default function SearchScreen() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <DashboardHeader
        title="Search Events"
        showBackButton={true}
        onBackClick={() => navigate('/')}
      />

      <div className="flex-1 overflow-y-auto px-6 py-4 pb-24 space-y-6">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for events, categories..."
            className="w-full h-12 pl-10 pr-10 bg-muted rounded-lg border-0 focus:ring-2 focus:ring-primary"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Search Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['All', 'Today', 'This Week', 'Free', 'Nearby'].map((filter) => (
            <Button
              key={filter}
              variant="outline"
              size="sm"
              className="whitespace-nowrap"
            >
              {filter}
            </Button>
          ))}
        </div>

        {/* Search Results */}
        {searchQuery ? (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Search Results</h2>

            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-lg p-4 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold">Event Result {i}</h3>
                    <p className="text-sm text-muted-foreground">
                      Matching event for "{searchQuery}"
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Date TBD</span>
                  <MapPin className="w-4 h-4 ml-2" />
                  <span>Location TBD</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <Search className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Start Searching</h3>
            <p className="text-sm text-muted-foreground text-center max-w-sm">
              Search for events by name, category, location, or date.
            </p>
          </div>
        )}

        {/* Note */}
        <div className="bg-muted/50 rounded-lg p-4">
          <p className="text-sm text-muted-foreground">
            This is a placeholder for the search screen. Full search implementation with filters coming in Phase 2.
          </p>
        </div>
      </div>
    </div>
  );
}
