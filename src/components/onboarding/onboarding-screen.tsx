import React, { ReactNode, useEffect, useRef } from 'react';
import { useOnboarding } from './onboarding-context';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface OnboardingScreenProps {
  children: ReactNode;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonDisabled?: boolean;
  onEnter?: () => void;
  onExit?: () => void;
  className?: string;
  keepKeyboardOpen?: boolean;
}

export function OnboardingScreen({
  children,
  title,
  description,
  buttonText = 'Continue',
  buttonDisabled = false,
  onEnter,
  onExit,
  className,
  keepKeyboardOpen = false,
}: OnboardingScreenProps) {
  const { updateButtonState } = useOnboarding();
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const hasEnteredRef = useRef(false);

  useEffect(() => {
    // Update button state when screen becomes active
    if (!hasEnteredRef.current) {
      updateButtonState({
        text: buttonText,
        disabled: buttonDisabled,
        loading: false,
      });

      onEnter?.();
      hasEnteredRef.current = true;

      // Keep keyboard open trick - focus hidden input
      if (keepKeyboardOpen && hiddenInputRef.current) {
        setTimeout(() => {
          hiddenInputRef.current?.focus();
        }, 100);
      }
    }

    return () => {
      onExit?.();
    };
  }, [buttonText, buttonDisabled, updateButtonState, onEnter, onExit, keepKeyboardOpen]);

  // Update button state when props change
  useEffect(() => {
    updateButtonState({
      text: buttonText,
      disabled: buttonDisabled,
    });
  }, [buttonText, buttonDisabled, updateButtonState]);

  return (
    <div className={cn("flex flex-col h-full w-full pt-28 pb-32 px-6 bg-background", className)}>
      <div className="max-w-md mx-auto w-full flex flex-col flex-1">
        {/* Header */}
        {(title || description) && (
          <div className="space-y-2 mb-10">
            {title && (
              <h1 className="text-3xl font-bold text-foreground">
                {title}
              </h1>
            )}
            {description && (
              <p className="text-base text-muted-foreground leading-relaxed">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1">
          {children}
        </div>

        {/* Hidden input for keyboard persistence */}
        {keepKeyboardOpen && (
          <input
            ref={hiddenInputRef}
            type="text"
            className="sr-only"
            tabIndex={-1}
            style={{ position: 'absolute', left: '-9999px' }}
          />
        )}
      </div>
    </div>
  );
}
