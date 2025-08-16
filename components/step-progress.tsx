"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  title: string;
  description?: string;
}

interface StepProgressProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export function StepProgress({
  steps,
  currentStep,
  className,
}: StepProgressProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          const isUpcoming = stepNumber > currentStep;

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center relative">
                {/* Step Circle */}
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold z-10",
                    {
                      "text-white": isActive || isCompleted,
                      "bg-[#EFEFEF] text-[#33333366]": isUpcoming,
                    }
                  )}
                  style={{
                    backgroundColor:
                      isActive || isCompleted ? "#BD3E2B" : undefined,
                  }}
                >
                  {stepNumber}
                </div>

                {/* Step Title */}
                <div className="mt-3 text-center">
                  <p
                    className={cn("text-lg font-semibold", {
                      "text-gray-400": isUpcoming,
                    })}
                    style={{
                      color: isActive || isCompleted ? "#BD3E2B" : undefined,
                    }}
                  >
                    {step.title}
                  </p>
                  {step.description && (
                    <p className="text-xs text-gray-500 mt-1">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-1 relative top-[-20px] -mx-14 translate-y-1/2">
                  <div
                    className={cn(
                      "h-full",
                      stepNumber < currentStep ? "bg-[#BD3E2B]" : "bg-[#EFEFEF]"
                    )}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

// Example usage component
export function BookingSteps() {
  const [currentStep, setCurrentStep] = React.useState(1);

  const steps = [
    { id: 1, title: "Booking Details" },
    { id: 2, title: "Your Details" },
    { id: 3, title: "Complete" },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <StepProgress steps={steps} currentStep={currentStep} />

      {/* Navigation buttons for demo */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={() =>
            setCurrentStep(Math.min(steps.length, currentStep + 1))
          }
          disabled={currentStep === steps.length}
          className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}
