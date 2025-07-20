import * as React from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

export interface WizardStepProps {
  id: number
  title: string
  status: "completed" | "current" | "pending"
}

export interface WizardStepsProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: WizardStepProps[]
  onStepClick?: (stepId: number) => void
}

export function WizardSteps({ steps, onStepClick, className, ...props }: WizardStepsProps) {
  return (
    <div className={cn("wizard-steps-container", className)} {...props}>
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className={`wizard-step wizard-step-${step.status}`}>
            <div 
              className="wizard-step-icon"
              onClick={() => onStepClick?.(step.id)}
            >
              {step.status === "completed" ? <Check className="w-4 h-4" /> : step.id}
            </div>
            <div className="wizard-step-title">
              {step.title}
            </div>
          </div>
          
          {index < steps.length - 1 && (
            <div className={`wizard-step-line wizard-step-${step.status}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}