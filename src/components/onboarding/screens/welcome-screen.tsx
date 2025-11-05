import React from 'react';
import { OnboardingScreen } from '../onboarding-screen';

export function WelcomeScreen() {
  return (
    <OnboardingScreen
      title="Welcome"
      description="Let's set up your organization in a few simple steps"
      buttonText="Get Started"
    >
      <div className="flex-1" />
    </OnboardingScreen>
  );
}
