import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { BottomNav } from './bottom-nav';

export function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active tab from route
  const getActiveTab = (): 'home' | 'events' | 'organizer' | 'settings' => {
    if (location.pathname.startsWith('/events')) return 'events';
    if (location.pathname.startsWith('/organizer')) return 'organizer';
    if (location.pathname.startsWith('/settings')) return 'settings';
    return 'home';
  };

  const handleTabChange = (tab: 'home' | 'events' | 'organizer' | 'settings') => {
    const routes = {
      home: '/',
      events: '/events',
      organizer: '/organizer/1',
      settings: '/settings',
    };
    navigate(routes[tab]);
  };

  const handleCreateEvent = () => {
    navigate('/events/create');
  };

  return (
    <div className="relative h-full w-full bg-background overflow-hidden">
      {/* Active Screen - Shared element transitions enabled via AnimatePresence */}
      <div className="h-full w-full overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <BottomNav
        activeTab={getActiveTab()}
        onTabChange={handleTabChange}
        onCreateEvent={handleCreateEvent}
      />
    </div>
  );
}
