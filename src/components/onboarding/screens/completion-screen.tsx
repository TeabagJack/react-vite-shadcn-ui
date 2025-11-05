import React, { useEffect } from 'react';
import { OnboardingScreen } from '../onboarding-screen';
import { useOnboarding } from '../onboarding-context';

export function CompletionScreen() {
  const { formData, updateButtonState } = useOnboarding();

  useEffect(() => {
    updateButtonState({ text: 'Get Started' });
  }, [updateButtonState]);

  return (
    <OnboardingScreen
      title="All set"
      description="You're ready to start using your workspace"
      buttonText="Get Started"
    >
      <div className="space-y-6 pt-4">
        {/* Summary Info */}
        <div className="space-y-4">
          <div className="py-4 border-b border-border">
            <p className="text-sm text-muted-foreground mb-1">Organization</p>
            <p className="text-lg font-semibold text-foreground">
              {formData.organizationName || 'Not set'}
            </p>
          </div>

          <div className="py-4 border-b border-border">
            <p className="text-sm text-muted-foreground mb-1">Team size</p>
            <p className="text-lg font-semibold text-foreground">
              {formData.organizationSize ? `${formData.organizationSize} people` : 'Not set'}
            </p>
          </div>

          {formData.teamMembers && formData.teamMembers.length > 0 && (
            <div className="py-4 border-b border-border">
              <p className="text-sm text-muted-foreground mb-1">Team members</p>
              <p className="text-lg font-semibold text-foreground">
                {formData.teamMembers.length} invited
              </p>
            </div>
          )}
        </div>
      </div>
    </OnboardingScreen>
  );
}
