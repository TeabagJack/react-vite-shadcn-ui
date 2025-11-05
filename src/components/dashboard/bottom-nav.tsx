import React from 'react';
import { Home, Calendar, Settings, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { MorphingCreateIcon } from '@/components/branding';

interface BottomNavProps {
  activeTab: 'home' | 'events' | 'organizer' | 'settings';
  onTabChange: (tab: 'home' | 'events' | 'organizer' | 'settings') => void;
  onCreateEvent: () => void;
}

export function BottomNav({ activeTab, onTabChange, onCreateEvent }: BottomNavProps) {
  const leftTabs = [
    { id: 'home' as const, label: 'Home', icon: Home },
    { id: 'events' as const, label: 'Events', icon: Calendar },
  ];

  const rightTabs = [
    { id: 'organizer' as const, label: 'Organizer', icon: Building2 },
    { id: 'settings' as const, label: 'Settings', icon: Settings },
  ];

  return (
    <nav
      className="absolute bottom-0 left-0 right-0 bg-background border-t border-border z-10 safe-bottom"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="relative flex items-center justify-around h-20 px-2 safe-left safe-right">
        {/* Left tabs */}
        <div className="flex items-center justify-around flex-1">
          {leftTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <Button
                key={tab.id}
                variant="ghost"
                onClick={() => onTabChange(tab.id)}
                aria-label={`${tab.label} tab`}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  "flex flex-col items-center justify-center flex-1 min-h-11 h-full gap-1 rounded-none",
                  "hover:bg-accent active:bg-accent/50"
                )}
              >
                <Icon
                  className={cn(
                    "w-6 h-6 transition-colors",
                    isActive ? "text-foreground" : "text-muted-foreground"
                  )}
                  aria-hidden="true"
                />
                <span
                  className={cn(
                    "text-xs font-medium transition-colors",
                    isActive ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {tab.label}
                </span>
              </Button>
            );
          })}
        </div>

        {/* Center Create Event button - half circle sticking out */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-0.5">
          <Button
            onClick={onCreateEvent}
            className="relative w-16 h-16 rounded-full shadow-2xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 ease-in-out flex items-center justify-center p-0"
            size="icon"
            aria-label="Create new event"
          >
            <div className="flex items-center justify-center w-full h-full">
              <MorphingCreateIcon className="text-primary-foreground" />
            </div>
          </Button>
        </div>

        {/* Spacer for center button */}
        <div className="w-20" />

        {/* Right tabs */}
        <div className="flex items-center justify-around flex-1">
          {rightTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <Button
                key={tab.id}
                variant="ghost"
                onClick={() => onTabChange(tab.id)}
                aria-label={`${tab.label} tab`}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  "flex flex-col items-center justify-center flex-1 min-h-11 h-full gap-1 rounded-none",
                  "hover:bg-accent active:bg-accent/50"
                )}
              >
                <Icon
                  className={cn(
                    "w-6 h-6 transition-colors",
                    isActive ? "text-foreground" : "text-muted-foreground"
                  )}
                  aria-hidden="true"
                />
                <span
                  className={cn(
                    "text-xs font-medium transition-colors",
                    isActive ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {tab.label}
                </span>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
