import { Music, Trophy, Utensils, Palette, Dumbbell, PartyPopper, Mic2, Calendar, LucideIcon } from 'lucide-react';

export interface CategoryIconMap {
  [key: string]: LucideIcon;
}

export const categoryIcons: CategoryIconMap = {
  'party': PartyPopper,
  'live performance': Mic2,
  'music': Music,
  'activities': Calendar,
  'food & drink': Utensils,
  'fitness': Dumbbell,
  'sports': Trophy,
  'arts': Palette,
  'entertainment': Music,
  'nightlife': PartyPopper,
  'concerts': Mic2,
  'dining': Utensils,
  'wellness': Dumbbell,
  'default': Calendar,
};

/**
 * Get the icon component for a category
 * @param category - The category name (case-insensitive)
 * @returns The corresponding Lucide icon component
 */
export function getCategoryIcon(category: string): LucideIcon {
  const normalizedCategory = category.toLowerCase().trim();
  return categoryIcons[normalizedCategory] || categoryIcons.default;
}
