import React, { useState, useEffect } from 'react';
import { OnboardingScreen } from '../onboarding-screen';
import { useOnboarding } from '../onboarding-context';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function OrganizationInfoScreen() {
  const { updateFormData, updateButtonState, formData } = useOnboarding();
  const [orgName, setOrgName] = useState(formData.organizationName || '');
  const [orgSize, setOrgSize] = useState(formData.organizationSize || '');

  const isValid = orgName.trim().length >= 2 && orgSize.trim().length > 0;

  useEffect(() => {
    updateFormData('organizationName', orgName);
    updateFormData('organizationSize', orgSize);
    updateButtonState({ disabled: !isValid });
  }, [orgName, orgSize, isValid, updateFormData, updateButtonState]);

  const sizeOptions = [
    { value: '1-10', label: '1-10 people' },
    { value: '11-50', label: '11-50 people' },
    { value: '51-200', label: '51-200 people' },
    { value: '201+', label: '201+ people' },
  ];

  return (
    <OnboardingScreen
      title="Organization name"
      description="What's the name of your company or team?"
      buttonText="Next"
      buttonDisabled={!isValid}
      keepKeyboardOpen
    >
      <div className="space-y-8">
        {/* Organization Name Input */}
        <div>
          <Input
            type="text"
            placeholder="Company name"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            className="w-full text-lg border-b-2 border-border focus:border-foreground outline-none pb-3 transition-colors bg-transparent rounded-none border-x-0 border-t-0 px-0"
            autoFocus
          />
        </div>

        {/* Organization Size */}
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Team size</p>
          <div className="space-y-2">
            {sizeOptions.map((option) => (
              <Button
                key={option.value}
                onClick={() => setOrgSize(option.value)}
                variant={orgSize === option.value ? "default" : "secondary"}
                className={cn(
                  "w-full text-left justify-start px-4 py-4 h-auto rounded-xl transition-all duration-200",
                  "active:scale-[0.98]"
                )}
              >
                <span className="font-medium">{option.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </OnboardingScreen>
  );
}
