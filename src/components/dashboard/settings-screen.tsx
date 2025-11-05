import React, { useState, useEffect } from 'react';
import { DashboardHeader } from './dashboard-header';
import { ChevronRight, Building2, User, CreditCard, Bell, Lock, HelpCircle, LogOut, Moon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useTheme } from '@/contexts/theme-context';
import { ProfileCardSkeleton } from '@/components/shared';

export function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  const settingsSections = [
    {
      title: 'Organization',
      items: [
        { label: 'Organization Details', icon: Building2, href: '#' },
        { label: 'Team Members', icon: User, href: '#' },
      ],
    },
    {
      title: 'Account',
      items: [
        { label: 'Profile', icon: User, href: '#' },
        { label: 'Payment Methods', icon: CreditCard, href: '#' },
        { label: 'Privacy & Security', icon: Lock, href: '#' },
      ],
    },
    {
      title: 'Support',
      items: [
        { label: 'Help Center', icon: HelpCircle, href: '#' },
      ],
    },
  ];

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col h-full bg-background">
      <DashboardHeader title="Settings" subtitle="Manage your preferences" />

      <div className="flex-1 overflow-auto pb-24">
        <div className="px-6 pt-6 space-y-8">
          {/* Profile Card */}
          {isLoading ? (
            <ProfileCardSkeleton />
          ) : (
            <Card className="border-border bg-card cursor-pointer hover:bg-accent/50 transition-colors">
              <CardContent className="flex items-center gap-4 p-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="bg-accent text-foreground text-xl font-semibold">
                    VV
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-foreground leading-tight">Vikram Venkat</h3>
                  <p className="text-sm text-muted-foreground leading-normal">vikram@company.com</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              </CardContent>
            </Card>
          )}

          {/* Dark Mode Toggle */}
          <Card className="border-border bg-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Moon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-base font-medium text-foreground leading-normal">Dark Mode</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">Toggle dark theme</p>
                  </div>
                </div>
                <Switch
                  checked={theme === 'dark'}
                  onCheckedChange={toggleTheme}
                />
              </div>
            </CardContent>
          </Card>

          {/* Notifications Toggle */}
          <Card className="border-border bg-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-base font-medium text-foreground leading-normal">Notifications</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">Push and email alerts</p>
                  </div>
                </div>
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
            </CardContent>
          </Card>

          {/* Settings Sections */}
          {settingsSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
                {section.title}
              </h3>
              <div className="space-y-3">
                {section.items.map((item, itemIndex) => {
                  const Icon = item.icon;
                  return (
                    <Card
                      key={itemIndex}
                      className="border-border bg-card cursor-pointer hover:bg-accent/50 transition-colors"
                    >
                      <CardContent className="flex items-center gap-3 p-4">
                        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <span className="flex-1 text-left text-base font-medium text-foreground leading-normal">{item.label}</span>
                        <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Logout Button */}
          <Button
            variant="destructive"
            className="w-full h-14 rounded-full text-base font-medium"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Log Out
          </Button>

          {/* Version */}
          <p className="text-center text-xs text-muted-foreground leading-relaxed">Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
}
