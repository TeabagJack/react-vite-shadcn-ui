import React, { useState, useEffect } from 'react';
import { OnboardingScreen } from '../onboarding-screen';
import { useOnboarding } from '../onboarding-context';
import { Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function OrganizationInfoBasic() {
  const { updateFormData, updateButtonState, formData } = useOnboarding();
  const [orgName, setOrgName] = useState(formData.organizationName || '');
  const [phoneNumber, setPhoneNumber] = useState(formData.phoneNumber || '');

  const isValidPhone = (phone: string) => {
    return phone.trim().length >= 10;
  };

  const isValid = orgName.trim().length >= 2 && isValidPhone(phoneNumber);

  useEffect(() => {
    updateFormData('organizationName', orgName);
    updateFormData('phoneNumber', phoneNumber);
    updateButtonState({ disabled: !isValid });
  }, [orgName, phoneNumber, isValid, updateFormData, updateButtonState]);

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
      const formatted = [match[1], match[2], match[3]].filter(Boolean).join('-');
      return formatted;
    }
    return value;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  return (
    <OnboardingScreen
      title="Organization setup"
      description="Let's get started with your organization details"
      buttonText="Send verification code"
      buttonDisabled={!isValid}
      keepKeyboardOpen
    >
      <div className="space-y-8">
        {/* Organization Name Input */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-1">
            Organization name
            <span className="text-destructive">*</span>
          </label>
          <Input
            type="text"
            placeholder="Company name"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            className="w-full text-lg border-b-2 border-border focus:border-foreground outline-none pb-3 transition-colors bg-transparent rounded-none border-x-0 border-t-0 px-0"
            autoFocus
            required
          />
        </div>

        {/* Phone Number Input */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-1">
            Phone number
            <span className="text-destructive">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="tel"
              placeholder="123-456-7890"
              value={phoneNumber}
              onChange={handlePhoneChange}
              className="w-full text-lg border-b-2 border-border focus:border-foreground outline-none pb-3 pl-8 transition-colors bg-transparent rounded-none border-x-0 border-t-0"
              maxLength={12}
              required
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            We'll send a verification code to this number
          </p>
        </div>
      </div>
    </OnboardingScreen>
  );
}
