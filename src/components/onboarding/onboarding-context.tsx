import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface ButtonState {
  text: string;
  disabled: boolean;
  loading: boolean;
  variant?: 'default' | 'outline' | 'ghost';
}

interface OnboardingContextType {
  currentStep: number;
  totalSteps: number;
  buttonState: ButtonState;
  formData: Record<string, any>;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  goToStep: (step: number) => void;
  updateButtonState: (state: Partial<ButtonState>) => void;
  updateFormData: (key: string, value: any) => void;
  canGoNext: boolean;
  canGoBack: boolean;
  isLastStep: boolean;
  isFirstStep: boolean;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

interface OnboardingProviderProps {
  children: ReactNode;
  totalSteps: number;
  onComplete?: (data: Record<string, any>) => void;
}

export function OnboardingProvider({ children, totalSteps, onComplete }: OnboardingProviderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [buttonState, setButtonState] = useState<ButtonState>({
    text: 'Continue',
    disabled: false,
    loading: false,
    variant: 'default',
  });
  const [formData, setFormData] = useState<Record<string, any>>({});

  const goToNextStep = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else if (currentStep === totalSteps - 1) {
      // Last step - trigger completion
      onComplete?.(formData);
    }
  }, [currentStep, totalSteps, formData, onComplete]);

  const goToPreviousStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const goToStep = useCallback((step: number) => {
    if (step >= 0 && step < totalSteps) {
      setCurrentStep(step);
    }
  }, [totalSteps]);

  const updateButtonState = useCallback((state: Partial<ButtonState>) => {
    setButtonState(prev => ({ ...prev, ...state }));
  }, []);

  const updateFormData = useCallback((key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  }, []);

  const canGoNext = currentStep < totalSteps - 1 || currentStep === totalSteps - 1;
  const canGoBack = currentStep > 0;
  const isLastStep = currentStep === totalSteps - 1;
  const isFirstStep = currentStep === 0;

  const value: OnboardingContextType = {
    currentStep,
    totalSteps,
    buttonState,
    formData,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    updateButtonState,
    updateFormData,
    canGoNext,
    canGoBack,
    isLastStep,
    isFirstStep,
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
}
