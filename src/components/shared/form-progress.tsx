import { cn } from '@/lib/utils';
import type { FormStep } from '@/types';

interface FormProgressProps {
  steps: FormStep[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

/**
 * Visual progress indicator for multi-step forms
 * Shows numbered step indicators with completion status
 * Supports click navigation for completed/active steps
 *
 * @param props - Component props
 * @param props.steps - Array of form steps to display
 * @param props.currentStep - Index of the currently active step
 * @param props.onStepClick - Optional callback when a step is clicked
 *
 * @example
 * <FormProgress
 *   steps={formSteps}
 *   currentStep={2}
 *   onStepClick={(step) => form.goToStep(step)}
 * />
 */
export function FormProgress({ steps, currentStep, onStepClick }: FormProgressProps) {
  return (
    <div className="w-full py-4">
      {/* Progress Bar */}
      <div className="relative mb-6">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            role="progressbar"
            aria-valuenow={currentStep + 1}
            aria-valuemin={1}
            aria-valuemax={steps.length}
            aria-label={`Step ${currentStep + 1} of ${steps.length}`}
          />
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isComplete = index < currentStep;
          const isClickable = onStepClick && (isComplete || isActive);

          return (
            <button
              key={step.id}
              onClick={() => isClickable && onStepClick(index)}
              disabled={!isClickable}
              className={cn(
                "flex flex-col items-center gap-2 flex-1",
                isClickable && "cursor-pointer hover:opacity-80 transition-opacity",
                !isClickable && "cursor-not-allowed opacity-50"
              )}
              aria-label={`Step ${index + 1}: ${step.title}`}
              aria-current={isActive ? 'step' : undefined}
              type="button"
            >
              {/* Step Number */}
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors",
                  isActive && "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2",
                  isComplete && "bg-primary/20 text-primary",
                  !isActive && !isComplete && "bg-muted text-muted-foreground"
                )}
              >
                {isComplete ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>

              {/* Step Title */}
              <span
                className={cn(
                  "text-xs font-medium text-center leading-tight max-w-[100px]",
                  isActive && "text-foreground font-semibold",
                  !isActive && "text-muted-foreground"
                )}
              >
                {step.title}
              </span>

              {/* Optional Description */}
              {step.description && isActive && (
                <span className="text-[10px] text-muted-foreground text-center max-w-[100px] leading-tight">
                  {step.description}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
