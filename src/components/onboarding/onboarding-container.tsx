import React, { ReactNode, useRef, useEffect, memo } from 'react';
import { useOnboarding } from './onboarding-context';
import { OnboardingStepper } from './onboarding-stepper';
import { ChevronLeft, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface OnboardingContainerProps {
  children: ReactNode[];
  className?: string;
}

export const OnboardingContainer = memo(function OnboardingContainer({ children, className }: OnboardingContainerProps) {
  const {
    currentStep,
    buttonState,
    goToNextStep,
    goToPreviousStep,
    canGoBack,
    isFirstStep,
  } = useOnboarding();

  const containerRef = useRef<HTMLDivElement>(null);
  const previousStepRef = useRef(currentStep);

  useEffect(() => {
    previousStepRef.current = currentStep;
  }, [currentStep]);

  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-background", className)}>
      {/* Minimal Header */}
      <div className="absolute top-0 left-0 right-0 z-50 pt-4 pb-6 px-6 bg-background/95 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          {/* Back Button */}
          {canGoBack && (
            <button
              onClick={goToPreviousStep}
              className="flex items-center justify-center min-w-11 min-h-11 w-11 h-11 -ml-2 rounded-full hover:bg-accent active:bg-accent/80 transition-colors"
              aria-label="Go back"
            >
              <ChevronLeft className="w-6 h-6 text-foreground" />
            </button>
          )}

          {/* Stepper in center */}
          <div className="flex-1 flex justify-center">
            <OnboardingStepper />
          </div>

          {/* Close button placeholder for balance (invisible on first screen) */}
          <div className="w-11 h-11" />
        </div>
      </div>

      {/* Screen Container with Smooth Transitions */}
      <div
        ref={containerRef}
        className="relative h-full w-full"
      >
        {React.Children.map(children, (child, index) => {
          const isActive = index === currentStep;
          const offset = (index - currentStep) * 100;

          return (
            <div
              key={index}
              className={cn(
                "absolute inset-0 w-full h-full transition-all duration-500 ease-out",
                "flex flex-col"
              )}
              style={{
                transform: `translateX(${offset}%)`,
                opacity: isActive ? 1 : 0,
                pointerEvents: isActive ? 'auto' : 'none',
              }}
            >
              {child}
            </div>
          );
        })}
      </div>

      {/* Native-style Bottom Button */}
      <div className="absolute bottom-0 left-0 right-0 z-50 pb-8 px-6 bg-background/95 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto">
          <Button
            onClick={goToNextStep}
            disabled={buttonState.disabled}
            className="w-full h-14 rounded-full font-semibold text-base"
            size="lg"
          >
            {buttonState.loading && (
              <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            )}
            {buttonState.text}
          </Button>
        </div>
      </div>
    </div>
  );
});
