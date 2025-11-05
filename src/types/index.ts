/**
 * Core data model interfaces for the event management application
 * @module types
 */

/**
 * Statistics for an individual event
 * @interface EventStats
 */
export interface EventStats {
  /** Number of tickets sold */
  tickets: number;
  /** Total revenue generated in USD */
  revenue: number;
  /** Number of page visits/views */
  visits: number;
}

/**
 * Main event entity representing a scheduled event
 * @interface Event
 */
export interface Event {
  /** Unique identifier for the event */
  id: string;
  /** Short name/code for the event */
  name: string;
  /** Full display title of the event */
  title: string;
  /** URL or path to the event's image/poster */
  image: string;
  /** Event date in ISO format or human-readable string */
  date: string;
  /** Event time (e.g., "7:00 PM") */
  time: string;
  /** Ticket price in USD */
  price: number;
  /** Venue name or location */
  venue: string;
  /** Current status of the event */
  status: 'active' | 'draft' | 'cancelled' | 'completed';
  /** Event performance statistics */
  stats: EventStats;
}

/**
 * Team member/user in the system
 * @interface TeamMember
 */
export interface TeamMember {
  /** Unique identifier for the team member */
  id: string;
  /** Full name of the team member */
  name: string;
  /** Email address */
  email: string;
  /** Role or position in the organization */
  role: string;
  /** Timestamp of last login in ISO format */
  lastLogin: string;
  /** Initials for avatar display (e.g., "JD" for John Doe) */
  initials: string;
  /** Optional avatar image URL */
  avatar?: string;
}

/**
 * Event category for organizing and filtering events
 * @interface Category
 */
export interface Category {
  /** Unique identifier for the category */
  id: string;
  /** Display name of the category */
  name: string;
  /** URL or path to category icon/image */
  image: string;
  /** Number of events in this category */
  number: number;
}

/**
 * Filter option used in dropdown menus and filter panels
 * @interface FilterOption
 */
export interface FilterOption {
  /** Unique identifier for the filter option */
  id: string;
  /** Display label for the filter */
  label: string;
  /** Number of items matching this filter */
  count: number;
}

/**
 * Individual setting item within a settings section
 * @interface SettingsItem
 */
export interface SettingsItem {
  /** Display label for the setting */
  label: string;
  /** Icon component or icon name */
  icon: React.ComponentType<any> | string;
  /** Navigation link or route */
  href: string;
  /** Optional description text */
  description?: string;
}

/**
 * Section grouping related settings together
 * @interface SettingsSection
 */
export interface SettingsSection {
  /** Section title/heading */
  title: string;
  /** Array of setting items in this section */
  items: SettingsItem[];
}

/**
 * User profile information
 * @interface UserProfile
 */
export interface UserProfile {
  /** Unique identifier for the user */
  id: string;
  /** Full name */
  name: string;
  /** Email address */
  email: string;
  /** Profile avatar URL */
  avatar?: string;
  /** User role/permissions */
  role: 'admin' | 'organizer' | 'viewer';
  /** Account creation date */
  createdAt: string;
}

/**
 * Notification item for activity feed
 * @interface Notification
 */
export interface Notification {
  /** Unique identifier */
  id: string;
  /** Notification message */
  message: string;
  /** Notification type */
  type: 'info' | 'success' | 'warning' | 'error';
  /** Timestamp in ISO format */
  timestamp: string;
  /** Whether notification has been read */
  read: boolean;
  /** Optional link to related content */
  link?: string;
}

/**
 * Dashboard analytics data
 * @interface Analytics
 */
export interface Analytics {
  /** Total revenue across all events */
  totalRevenue: number;
  /** Total tickets sold */
  totalTickets: number;
  /** Total event views */
  totalViews: number;
  /** Period comparison data */
  comparison: {
    revenue: number;
    tickets: number;
    views: number;
  };
}

/**
 * API response wrapper for paginated data
 * @interface PaginatedResponse
 */
export interface PaginatedResponse<T> {
  /** Array of data items */
  data: T[];
  /** Current page number */
  page: number;
  /** Items per page */
  pageSize: number;
  /** Total number of items */
  total: number;
  /** Total number of pages */
  totalPages: number;
}

/**
 * API error response
 * @interface ApiError
 */
export interface ApiError {
  /** Error message */
  message: string;
  /** HTTP status code */
  status: number;
  /** Error code for client handling */
  code?: string;
  /** Additional error details */
  details?: Record<string, any>;
}

/**
 * Toast notification message
 * @interface ToastMessage
 */
export interface ToastMessage {
  /** Unique identifier for the toast */
  id?: string;
  /** Toast type/severity */
  type: 'success' | 'error' | 'warning' | 'info';
  /** Main heading/title */
  title: string;
  /** Optional description/body text */
  description?: string;
  /** Duration in milliseconds (default: 3000) */
  duration?: number;
}

/**
 * Form step definition for multi-step forms
 * @interface FormStep
 */
export interface FormStep {
  /** Unique identifier for the step */
  id: string;
  /** Display title of the step */
  title: string;
  /** Optional description of what the step involves */
  description?: string;
  /** Optional icon component for the step */
  icon?: React.ComponentType<any>;
}
