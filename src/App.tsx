import { useState } from "react";
import { DualViewport, DeviceContent } from "@/components/devices";
import { OrganizationOnboarding } from "@/components/onboarding/organization-onboarding";
import { AppRouter } from "@/routes";
import { ThemeProvider } from "@/contexts/theme-context";
import { SkeletonSettingsProvider } from "@/contexts/skeleton-settings-context";
import { Toaster } from "@/components/ui/sonner";

function App() {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

  const handleOnboardingComplete = (data: Record<string, any>) => {
    console.log('Onboarding completed!', data);
    setIsOnboardingComplete(true);
  };

  return (
    <ThemeProvider>
      <SkeletonSettingsProvider>
        <DualViewport>
          <DeviceContent>
            {!isOnboardingComplete ? (
              <OrganizationOnboarding onComplete={handleOnboardingComplete} />
            ) : (
              <AppRouter />
            )}
            <Toaster position="bottom-center" richColors closeButton />
          </DeviceContent>
        </DualViewport>
      </SkeletonSettingsProvider>
    </ThemeProvider>
  );
}

export default App;
