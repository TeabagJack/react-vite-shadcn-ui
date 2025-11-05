import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from './bottom-nav';
import { HomeScreen } from './home-screen';
import { EventsScreen } from './events-screen';
import { SettingsScreen } from './settings-screen';

export function DashboardContainer() {
  const [activeTab, setActiveTab] = useState<'home' | 'events' | 'organizer' | 'settings'>('home');
  const navigate = useNavigate();

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'events':
        return <EventsScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  const handleCreateEvent = () => {
    navigate('/events/create');
  };

  return (
    <div className="relative h-full w-full bg-background overflow-hidden">
      {/* Active Screen */}
      <div className="h-full w-full overflow-hidden">
        {renderScreen()}
      </div>

      {/* Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onCreateEvent={handleCreateEvent}
      />
    </div>
  );
}
