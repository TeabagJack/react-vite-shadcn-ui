import React, { useState, useEffect, useRef } from 'react';
import { OnboardingScreen } from '../onboarding-screen';
import { useOnboarding } from '../onboarding-context';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export function OtpVerificationScreen() {
  const { updateFormData, updateButtonState, formData } = useOnboarding();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const phoneNumber = formData.phoneNumber || '';
  const isValid = otp.every(digit => digit !== '');

  useEffect(() => {
    updateFormData('otp', otp.join(''));
    updateButtonState({ disabled: !isValid });
  }, [otp, isValid, updateFormData, updateButtonState]);

  useEffect(() => {
    // Auto-focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only take last character
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Focus previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = [...otp];

    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }

    setOtp(newOtp);

    // Focus the next empty input or last input
    const nextEmptyIndex = newOtp.findIndex(digit => digit === '');
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleResendCode = () => {
    // TODO: Implement resend logic
    console.log('Resending verification code to:', phoneNumber);
  };

  return (
    <OnboardingScreen
      title="Verify your number"
      description={`Enter the 6-digit code sent to ${phoneNumber}`}
      buttonText="Verify & Continue"
      buttonDisabled={!isValid}
    >
      <div className="space-y-8">
        {/* OTP Input */}
        <div className="flex justify-center gap-2" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <Input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={cn(
                "w-12 h-14 text-center text-2xl font-semibold rounded-xl",
                "border-2 transition-all",
                digit ? "border-primary bg-primary/5" : "border-border",
                "focus:border-primary focus:bg-primary/5"
              )}
              aria-label={`Digit ${index + 1}`}
            />
          ))}
        </div>

        {/* Resend Code */}
        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Didn't receive the code?
          </p>
          <button
            onClick={handleResendCode}
            className="text-sm font-semibold text-primary hover:underline"
          >
            Resend verification code
          </button>
        </div>

        {/* Info */}
        <div className="bg-muted/50 rounded-xl p-4">
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            Standard message and data rates may apply. We'll never share your phone number.
          </p>
        </div>
      </div>
    </OnboardingScreen>
  );
}
