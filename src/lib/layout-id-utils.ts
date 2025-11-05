/**
 * Layout ID utilities for shared element transitions
 * Provides consistent naming for Framer Motion layoutId props
 * Now supports viewport-specific prefixes to prevent cross-viewport transitions
 */

export const createLayoutId = {
  // FAB button circular expansion
  fabButton: (viewportId?: string) =>
    viewportId ? `${viewportId}-fab-create-button` : 'fab-create-button',

  // Event card shared elements
  eventCard: (eventId: string | number, viewportId?: string) =>
    viewportId ? `${viewportId}-event-card-${eventId}` : `event-card-${eventId}`,
  eventImage: (eventId: string | number, viewportId?: string) =>
    viewportId ? `${viewportId}-event-image-${eventId}` : `event-image-${eventId}`,
  eventTitle: (eventId: string | number, viewportId?: string) =>
    viewportId ? `${viewportId}-event-title-${eventId}` : `event-title-${eventId}`,

  // Home event card shared elements
  homeEventCard: (eventId: string | number, viewportId?: string) =>
    viewportId ? `${viewportId}-home-event-${eventId}` : `home-event-${eventId}`,
  homeEventImage: (eventId: string | number, viewportId?: string) =>
    viewportId ? `${viewportId}-home-event-image-${eventId}` : `home-event-image-${eventId}`,

  // Category card shared elements
  categoryCard: (categoryId: string | number, viewportId?: string) =>
    viewportId ? `${viewportId}-category-card-${categoryId}` : `category-card-${categoryId}`,
  categoryImage: (categoryId: string | number, viewportId?: string) =>
    viewportId ? `${viewportId}-category-image-${categoryId}` : `category-image-${categoryId}`,
  categoryTitle: (categoryId: string | number, viewportId?: string) =>
    viewportId ? `${viewportId}-category-title-${categoryId}` : `category-title-${categoryId}`,

  // Organizer event card shared elements
  orgEvent: (eventId: string | number, viewportId?: string) =>
    viewportId ? `${viewportId}-org-event-${eventId}` : `org-event-${eventId}`,
  orgEventCard: (eventId: string | number, viewportId?: string) =>
    viewportId ? `${viewportId}-org-event-card-${eventId}` : `org-event-card-${eventId}`,
  orgEventImage: (eventId: string | number, viewportId?: string) =>
    viewportId ? `${viewportId}-org-event-image-${eventId}` : `org-event-image-${eventId}`,
  orgEventTitle: (eventId: string | number, viewportId?: string) =>
    viewportId ? `${viewportId}-org-event-title-${eventId}` : `org-event-title-${eventId}`,

  // Navigation elements
  navItem: (tabId: string, viewportId?: string) =>
    viewportId ? `${viewportId}-nav-item-${tabId}` : `nav-item-${tabId}`,

  // Avatar transitions
  avatar: (userId: string, viewportId?: string) =>
    viewportId ? `${viewportId}-avatar-${userId}` : `avatar-${userId}`,

  // Host avatar in event cards
  hostAvatar: (eventId: string | number, hostId: string, viewportId?: string) =>
    viewportId ? `${viewportId}-avatar-host-${eventId}-${hostId}` : `avatar-host-${eventId}-${hostId}`,
} as const;
