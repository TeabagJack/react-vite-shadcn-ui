import { Bell, Menu, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RumblLogo } from '@/components/branding';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

export function DashboardHeader({ title, subtitle, showBackButton = false, onBackClick }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-background border-b border-border safe-top-with-island">
      <div className="flex items-center justify-between px-1.5 py-4 safe-left safe-right">
        {showBackButton && onBackClick ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={onBackClick}
            className="mr-2 min-w-11 min-h-11 w-11 h-11 rounded-full hover:bg-accent"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </Button>
        ) : (
          <RumblLogo size="sm" variant="primary" className="text-primary opacity-80" />
        )}
        <div className="flex-1 ml-2">
          <h1 className="text-2xl font-bold text-foreground leading-tight">{title}</h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground leading-relaxed mt-0.5">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-2" role="group" aria-label="Header actions">
          <Button
            variant="ghost"
            size="icon"
            className="min-w-11 min-h-11 w-11 h-11 rounded-full hover:bg-accent"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="min-w-11 min-h-11 w-11 h-11 rounded-full hover:bg-accent"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 text-muted-foreground" />
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
