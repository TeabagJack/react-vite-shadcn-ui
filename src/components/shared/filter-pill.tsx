import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterPillProps {
  label: string;
  active?: boolean;
  removable?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
  className?: string;
  count?: number;
}

export function FilterPill({
  label,
  active = false,
  removable = false,
  onClick,
  onRemove,
  className,
  count,
}: FilterPillProps) {
  return (
    <Button
      variant={active ? 'default' : 'outline'}
      size="sm"
      role="button"
      aria-pressed={active}
      aria-label={`${active ? 'Active filter' : 'Filter by'} ${label}${removable ? ', click to remove' : ''}`}
      className={cn(
        'rounded-full px-5 py-2.5 h-auto font-medium text-sm transition-all duration-200',
        active
          ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm'
          : 'border-border bg-transparent hover:bg-accent',
        removable && 'pr-3',
        className
      )}
      onClick={onClick}
    >
      <span className="flex items-center gap-2">
        {label}
        {count !== undefined && count > 0 && (
          <span className="bg-primary-foreground/20 text-xs px-2 py-0.5 rounded-full">
            {count}
          </span>
        )}
      </span>
      {removable && (
        <button
          className={cn(
            'ml-2 min-w-7 min-h-7 w-7 h-7 flex items-center justify-center rounded-full transition-all duration-200',
            'hover:bg-background/20 active:bg-background/30 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30',
            'group'
          )}
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          aria-label={`Remove ${label} filter`}
          type="button"
          title="Remove filter"
        >
          <X className="w-4 h-4 group-hover:scale-110 transition-transform" aria-hidden="true" />
        </button>
      )}
    </Button>
  );
}
