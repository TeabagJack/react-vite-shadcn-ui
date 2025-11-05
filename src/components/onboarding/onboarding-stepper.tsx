import React from 'react';
import { useOnboarding } from './onboarding-context';
import { cn } from '@/lib/utils';

interface OnboardingStepperProps {
  className?: string;
}

export function OnboardingStepper({ className }: OnboardingStepperProps) {
  const { currentStep, totalSteps } = useOnboarding();

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      {Array.from({ length: totalSteps }).map((_, index) => {
        const isActive = index === currentStep;

        return (
          <div
            key={index}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300 ease-out",
              isActive ? "w-8 bg-primary" : "w-1.5 bg-muted"
            )}
          />
        );
      })}
    </div>
  );
}
