import React from 'react';
import { OnboardingProvider } from './onboarding-context';
import { OnboardingContainer } from './onboarding-container';
import { WelcomeScreen } from './screens/welcome-screen';
import { OrganizationInfoBasic } from './screens/organization-info-basic';
import { OtpVerificationScreen } from './screens/otp-verification-screen';
import { TeamSetupComplete } from './screens/team-setup-complete';
import { CompletionScreen } from './screens/completion-screen';

interface OrganizationOnboardingProps {
  onComplete?: (data: Record<string, any>) => void;
}

export function OrganizationOnboarding({ onComplete }: OrganizationOnboardingProps) {
  const handleComplete = (data: Record<string, any>) => {
    console.log('Onboarding completed with data:', data);
    onComplete?.(data);
  };

  return (
    <OnboardingProvider totalSteps={5} onComplete={handleComplete}>
      <OnboardingContainer>
        <WelcomeScreen />
        <OrganizationInfoBasic />
        <OtpVerificationScreen />
        <TeamSetupComplete />
        <CompletionScreen />
      </OnboardingContainer>
    </OnboardingProvider>
  );
}
