# React Router v6 Configuration

## Overview
This directory contains the routing configuration for the Phase 2 Foundation project using React Router v6.

## Features
- ✅ **Lazy Loading**: All route components are lazy-loaded for optimal performance
- ✅ **TypeScript Support**: Full TypeScript typing for routes and params
- ✅ **Suspense Boundaries**: Loading states for all lazy-loaded components
- ✅ **Nested Routes**: Dashboard layout with nested child routes
- ✅ **Dynamic Params**: Support for `:eventId` and `:categoryId` parameters

## Route Structure

```
/                           → HomeScreen
/events                     → EventsScreen
/events/:eventId           → EventDetailScreen (e.g., /events/123)
/events/create             → CreateEventScreen
/categories/:categoryId    → CategoryScreen (e.g., /categories/sports)
/search                    → SearchScreen
/team                      → TeamScreen
/settings                  → SettingsScreen
```

## Components

### `/src/routes/index.tsx`
Main routing configuration with:
- `createBrowserRouter` for data routing
- Lazy-loaded components with Suspense fallbacks
- Nested route structure under DashboardLayout
- PageLoader component for loading states

### `/src/components/dashboard/dashboard-layout.tsx`
Layout wrapper that:
- Uses `<Outlet />` for nested route rendering
- Integrates with existing BottomNav
- Maps routes to tab states
- Handles navigation via `useNavigate` hook

## Usage

### Navigating Programmatically
```tsx
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();

  // Navigate to event detail
  navigate('/events/123');

  // Navigate with state
  navigate('/events/create', { state: { from: 'home' } });

  // Navigate back
  navigate(-1);
}
```

### Getting Route Parameters
```tsx
import { useParams } from 'react-router-dom';

function EventDetailScreen() {
  const { eventId } = useParams<{ eventId: string }>();
  // eventId is typed and available
}
```

### Linking Between Routes
```tsx
import { Link } from 'react-router-dom';

<Link to="/events/123">View Event</Link>
<Link to="/search" state={{ query: 'music' }}>Search</Link>
```

## Phase 2 Placeholder Screens

The following screens are placeholders ready for full implementation:

1. **EventDetailScreen** (`/src/components/events/event-detail-screen.tsx`)
   - Event details page with params
   - Back navigation
   - Placeholder for registration, sharing, etc.

2. **CreateEventScreen** (`/src/components/events/create-event-screen.tsx`)
   - Event creation form placeholder
   - Form fields for title, description, date, location, etc.
   - Back navigation and cancel

3. **CategoryScreen** (`/src/components/categories/category-screen.tsx`)
   - Category browsing with params
   - Event listings by category
   - Back navigation

4. **SearchScreen** (`/src/components/search/search-screen.tsx`)
   - Search input with clear functionality
   - Filter buttons
   - Search results placeholder

## Performance Benefits

- **Code Splitting**: Each route is in a separate chunk
- **Lazy Loading**: Routes load only when accessed
- **Suspense**: Smooth loading transitions
- **Tree Shaking**: Unused routes excluded from bundle

## Testing

```bash
# Build and check for errors
npm run build

# Run dev server and test navigation
npm run dev

# TypeScript check
npm run typecheck
```

## Future Enhancements

- [ ] Route guards for authentication
- [ ] Meta tags and SEO for each route
- [ ] Error boundaries for route errors
- [ ] 404 Not Found page
- [ ] Redirect rules for legacy URLs
- [ ] Query parameter handling
- [ ] Route transitions and animations

## Migration Notes

- Replaced `DashboardContainer` tab-based navigation with React Router
- Maintained existing `BottomNav` component
- All existing screens work as before
- Added new Phase 2 screens as lazy-loaded routes
