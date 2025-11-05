import React, { useState, useEffect } from 'react';
import { DashboardHeader } from './dashboard-header';
import { Mail, Plus, Users as UsersIcon } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/shared/empty-state';
import { TeamMemberSkeleton } from '@/components/shared';

export function TeamScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const teamMembers = [
    {
      id: 1,
      name: 'Vikram Venkat',
      email: 'vikram@company.com',
      role: 'Owner',
      lastLogin: '5 hours ago',
      initials: 'VV',
    },
  ];

  const handleInviteTeam = () => {
    console.log('Invite team clicked');
  };

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col h-full bg-background">
      <DashboardHeader title="Team" subtitle="Manage your team members" />

      <div className="flex-1 overflow-auto pb-24">
        <div className="px-6 pt-6 space-y-4">
          {/* Add Member Button */}
          <Button className="w-full h-14 rounded-full" size="lg">
            <Plus className="w-5 h-5 mr-2" />
            Add Team Member
          </Button>

          {/* Team Members List */}
          <div className="space-y-4">
            {isLoading ? (
              <>
                <TeamMemberSkeleton />
                <TeamMemberSkeleton />
              </>
            ) : (
              teamMembers.map((member) => (
              <Card key={member.id} className="border-border bg-card">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <Avatar className="w-16 h-16">
                      <AvatarFallback className="bg-accent text-foreground text-xl font-semibold">
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-foreground leading-tight mb-1">
                        {member.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs font-medium">
                          {member.role}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground leading-normal mb-1">{member.email}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">Last login: {member.lastLogin}</p>
                    </div>
                  </div>
                </CardHeader>

                {/* Actions */}
                <CardFooter className="flex gap-2 border-t border-border pt-4">
                  <Button variant="outline" className="flex-1 text-base font-medium">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>
                  <Button className="flex-1 text-base font-medium">
                    View Profile
                  </Button>
                </CardFooter>
              </Card>
              ))
            )}
          </div>

          {/* Grow Your Team Section */}
          {teamMembers.length === 1 && (
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-6">
                <EmptyState
                  icon={<UsersIcon className="w-10 h-10" />}
                  title="Grow your team"
                  description="Collaborate better by inviting team members. Share the workload and create amazing events together!"
                  action={{
                    label: 'Invite Team Members',
                    onClick: handleInviteTeam,
                  }}
                  className="py-4"
                />
              </CardContent>
            </Card>
          )}

          {/* Info Card */}
          <Card className="bg-muted/50 border-border">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Team members are automatically added to all events by default.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
