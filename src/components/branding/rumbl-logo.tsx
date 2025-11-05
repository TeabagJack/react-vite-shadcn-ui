import { memo } from 'react';
import { cn } from '@/lib/utils';

interface RumblLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'white' | 'primary';
}

const sizeMap = {
  xs: 'w-6 h-6',
  sm: 'w-7 h-7',
  md: 'w-9 h-9',
  lg: 'w-11 h-11',
  xl: 'w-14 h-14',
};

export const RumblLogo = memo(function RumblLogo({
  className,
  size = 'md',
  variant = 'primary'
}: RumblLogoProps) {
  const fillColor = variant === 'white' ? '#ffffff' : variant === 'primary' ? 'currentColor' : '#000000';

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(sizeMap[size], className)}
      aria-label="Rumbl"
    >
      {/* Modern geometric R with sharp edges */}
      <defs>
        <linearGradient id="rumblGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: fillColor, stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: fillColor, stopOpacity: 0.9 }} />
        </linearGradient>
      </defs>

      {/* Main vertical stem - bold and geometric */}
      <path
        d="M 18 8 L 36 8 L 36 92 L 18 92 Z"
        fill="url(#rumblGradient)"
      />

      {/* Top bowl of R - rounded but geometric */}
      <path
        d="M 36 8 L 70 8 C 82 8, 88 15, 88 26 C 88 37, 82 44, 70 44 L 36 44 Z"
        fill="url(#rumblGradient)"
      />

      {/* Diagonal leg of R - dynamic and bold */}
      <path
        d="M 38 44 L 56 44 L 88 92 L 70 92 Z"
        fill="url(#rumblGradient)"
      />

      {/* Inner cut for dimension - rounded */}
      <circle
        cx="62"
        cy="26"
        r="10"
        fill="var(--background)"
        opacity="0.25"
      />

      {/* Sharp accent detail on leg */}
      <path
        d="M 56 44 L 60 44 L 78 78 L 74 78 Z"
        fill={fillColor}
        opacity="0.15"
      />
    </svg>
  );
});

export const RumblWordmark = memo(function RumblWordmark({
  className,
  size = 'default'
}: { className?: string; size?: 'small' | 'default' }) {
  const isSmall = size === 'small';

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <RumblLogo size={isSmall ? 'xs' : 'sm'} variant="primary" />
      <span
        className={cn(
          "font-bold tracking-tight",
          isSmall ? "text-base" : "text-lg"
        )}
        style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
          letterSpacing: '-0.03em',
          fontWeight: 700
        }}
      >
        rumbl
      </span>
    </div>
  );
});
