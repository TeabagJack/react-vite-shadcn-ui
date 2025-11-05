import React, { useState, useEffect } from 'react';
import { OnboardingScreen } from '../onboarding-screen';
import { useOnboarding } from '../onboarding-context';
import { X, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function TeamSetupComplete() {
  const { updateFormData, updateButtonState, formData } = useOnboarding();
  const [orgSize, setOrgSize] = useState(formData.organizationSize || '');
  const [email, setEmail] = useState('');
  const [teamMembers, setTeamMembers] = useState<string[]>(formData.teamMembers || []);

  // Team size is required, team members are optional
  const isValid = orgSize.trim().length > 0;

  useEffect(() => {
    updateFormData('organizationSize', orgSize);
    updateFormData('teamMembers', teamMembers);
    updateButtonState({
      disabled: !isValid,
      text: teamMembers.length > 0 ? 'Continue' : 'Skip for now'
    });
  }, [orgSize, teamMembers, isValid, updateFormData, updateButtonState]);

  const sizeOptions = [
    { value: '1-10', label: '1-10 people' },
    { value: '11-50', label: '11-50 people' },
    { value: '51-200', label: '51-200 people' },
    { value: '201+', label: '201+ people' },
  ];

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
      title="Build your team"
      description="Set your team size and invite members"
      buttonText={teamMembers.length > 0 ? 'Continue' : 'Skip for now'}
      buttonDisabled={!isValid}
      keepKeyboardOpen
    >
      <div className="space-y-8">
        {/* Required: Team Size */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-foreground flex items-center gap-1">
            Team size
            <span className="text-destructive">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {sizeOptions.map((option) => (
              <Button
                key={option.value}
                onClick={() => setOrgSize(option.value)}
                variant={orgSize === option.value ? "default" : "secondary"}
                className={cn(
                  "w-full text-left justify-center px-4 py-3 h-auto rounded-xl transition-all duration-200",
                  "active:scale-[0.98]"
                )}
              >
                <span className="font-medium text-sm">{option.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Optional: Team Members */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-2 pb-2">
            <div className="h-px flex-1 bg-border/50" />
            <span className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider">
              Optional
            </span>
            <div className="h-px flex-1 bg-border/50" />
          </div>

          <label className="block text-sm font-medium text-muted-foreground">
            Invite team members
          </label>

          {/* Email Input with Add Button */}
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="team@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 text-base border-b-2 border-border focus:border-primary outline-none pb-3 transition-colors bg-transparent rounded-none border-x-0 border-t-0 px-0"
            />
            <Button
              onClick={addTeamMember}
              disabled={!isValidEmail(email)}
              size="icon"
              className={cn(
                "min-w-10 min-h-10 w-10 h-10 rounded-full transition-all",
                isValidEmail(email)
                  ? "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              )}
              aria-label="Add team member"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {/* Team Members List */}
          {teamMembers.length > 0 && (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {teamMembers.map((member) => (
                <div
                  key={member}
                  className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-xs font-semibold text-primary">
                        {member[0].toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm text-foreground">{member}</span>
                  </div>
                  <Button
                    onClick={() => removeTeamMember(member)}
                    variant="ghost"
                    size="icon"
                    className="min-w-8 min-h-8 w-8 h-8 rounded-full hover:bg-muted-foreground/20"
                    aria-label={`Remove ${member}`}
                  >
                    <X className="w-3 h-3 text-muted-foreground" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {teamMembers.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-4">
              You can invite team members later from settings
            </p>
          )}
        </div>
      </div>
    </OnboardingScreen>
  );
}
