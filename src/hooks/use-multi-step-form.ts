import { useState, useCallback } from 'react';
import type { FormStep } from '@/types';

interface UseMultiStepFormOptions {
  steps: FormStep[];
  onComplete: () => void;
}

/**
 * Hook for managing multi-step form navigation and state
 * @param options - Configuration options for the multi-step form
 * @returns Form navigation utilities and state
 *
 * @example
 * const form = useMultiStepForm({
 *   steps: [
 *     { id: 'basic', title: 'Basic Info' },
 *     { id: 'details', title: 'Details' },
 *     { id: 'review', title: 'Review' }
 *   ],
 *   onComplete: () => console.log('Form completed!')
 * });
 *
 * // Navigate through steps
 * form.next(); // Go to next step
 * form.back(); // Go to previous step
 * form.goToStep(2); // Jump to specific step
 */
export function useMultiStepForm({ steps, onComplete }: UseMultiStepFormOptions) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const next = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCompletedSteps(prev => new Set([...prev, currentStep]));
      setCurrentStep(currentStep + 1);
    } else {
      setCompletedSteps(prev => new Set([...prev, currentStep]));
      onComplete();
    }
  }, [currentStep, steps.length, onComplete]);

  const back = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const goToStep = useCallback((step: number) => {
    if (step >= 0 && step < steps.length) {
      setCurrentStep(step);
    }
  }, [steps.length]);

  const isStepComplete = useCallback((step: number) => {
    return completedSteps.has(step);
  }, [completedSteps]);

  const progress = ((currentStep + 1) / steps.length) * 100;

  return {
    currentStep,
    totalSteps: steps.length,
    progress,
    next,
    back,
    goToStep,
    isStepComplete,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === steps.length - 1,
  };
}
