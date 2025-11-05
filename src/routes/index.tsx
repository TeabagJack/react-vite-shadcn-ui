import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';

// Lazy load screens
const HomeScreen = lazy(() => import('@/components/dashboard/home-screen').then(m => ({ default: m.HomeScreen })));
const EventsScreen = lazy(() => import('@/components/dashboard/events-screen').then(m => ({ default: m.EventsScreen })));
const TeamScreen = lazy(() => import('@/components/dashboard/team-screen').then(m => ({ default: m.TeamScreen })));
const SettingsScreen = lazy(() => import('@/components/dashboard/settings-screen').then(m => ({ default: m.SettingsScreen })));

// Phase 2 screens (lazy loaded)
const EventDetailsScreen = lazy(() => import('@/components/events/event-details-screen'));
const CreateEventScreen = lazy(() => import('@/components/events/create-event-screen'));
const CategoryScreen = lazy(() => import('@/components/categories/category-screen'));
const SearchScreen = lazy(() => import('@/components/search/search-screen'));
const OrgProfileScreen = lazy(() => import('@/components/organizer/org-profile-screen'));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <HomeScreen />
          </Suspense>
        ),
      },
      {
        path: 'events',
        element: (
          <Suspense fallback={<PageLoader />}>
            <EventsScreen />
          </Suspense>
        ),
      },
      {
        path: 'events/create',
        element: (
          <Suspense fallback={<PageLoader />}>
            <CreateEventScreen />
          </Suspense>
        ),
      },
      {
        path: 'events/:eventId',
        element: (
          <Suspense fallback={<PageLoader />}>
            <EventDetailsScreen />
          </Suspense>
        ),
      },
      {
        path: 'categories/:categoryId',
        element: (
          <Suspense fallback={<PageLoader />}>
            <CategoryScreen />
          </Suspense>
        ),
      },
      {
        path: 'search',
        element: (
          <Suspense fallback={<PageLoader />}>
            <SearchScreen />
          </Suspense>
        ),
      },
      {
        path: 'organizer/:orgId',
        element: (
          <Suspense fallback={<PageLoader />}>
            <OrgProfileScreen />
          </Suspense>
        ),
      },
      {
        path: 'team',
        element: (
          <Suspense fallback={<PageLoader />}>
            <TeamScreen />
          </Suspense>
        ),
      },
      {
        path: 'settings',
        element: (
          <Suspense fallback={<PageLoader />}>
            <SettingsScreen />
          </Suspense>
        ),
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
