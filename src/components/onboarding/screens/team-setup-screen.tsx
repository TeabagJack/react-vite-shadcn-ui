import React, { useState, useEffect } from 'react';
import { OnboardingScreen } from '../onboarding-screen';
import { useOnboarding } from '../onboarding-context';
import { X, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function TeamSetupScreen() {
  const { updateFormData, formData } = useOnboarding();
  const [email, setEmail] = useState('');
  const [teamMembers, setTeamMembers] = useState<string[]>(formData.teamMembers || []);

  useEffect(() => {
    updateFormData('teamMembers', teamMembers);
  }, [teamMembers, updateFormData]);

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const addTeamMember = () => {
    if (isValidEmail(email) && !teamMembers.includes(email)) {
      setTeamMembers([...teamMembers, email]);
      setEmail('');
    }
  };

  const removeTeamMember = (emailToRemove: string) => {
    setTeamMembers(teamMembers.filter(e => e !== emailToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isValidEmail(email)) {
      e.preventDefault();
      addTeamMember();
    }
  };

  return (
    <OnboardingScreen
      title="Invite team members"
      description="Add people who will be working with you"
      buttonText={teamMembers.length > 0 ? 'Next' : 'Skip'}
      keepKeyboardOpen
    >
      <div className="space-y-6">
        {/* Email Input with Add Button */}
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 text-base border-b-2 border-border focus:border-primary outline-none pb-3 transition-colors bg-transparent"
            autoFocus
          />
          <Button
            onClick={addTeamMember}
            disabled={!isValidEmail(email)}
            size="icon"
            className={cn(
              "min-w-11 min-h-11 w-11 h-11 rounded-full transition-all",
              isValidEmail(email)
                ? "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            )}
            aria-label="Add team member"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>

        {/* Team Members List */}
        {teamMembers.length > 0 && (
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {teamMembers.map((member) => (
              <div
                key={member}
                className="flex items-center justify-between py-3 px-4 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-muted-foreground/20 flex items-center justify-center">
                    <span className="text-sm font-semibold text-foreground">
                      {member[0].toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm text-foreground">{member}</span>
                </div>
                <Button
                  onClick={() => removeTeamMember(member)}
                  variant="ghost"
                  size="icon"
                  className="min-w-11 min-h-11 w-11 h-11 rounded-full hover:bg-muted-foreground/20 active:bg-muted-foreground/30"
                  aria-label={`Remove ${member}`}
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </OnboardingScreen>
  );
}
