import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface StepProps {
  title: string
  description?: string
  icon?: React.ReactNode
  status?: "pending" | "current" | "completed" | "error"
}

export interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  current?: number
  direction?: "horizontal" | "vertical"
  size?: "default" | "small"
  status?: "pending" | "current" | "completed" | "error"
  steps: StepProps[]
  onChange?: (current: number) => void
}

const Steps = React.forwardRef<HTMLDivElement, StepsProps>(
  ({ 
    className, 
    current = 0, 
    direction = "horizontal", 
    size = "default", 
    status = "current", 
    steps = [],
    onChange,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "steps-container",
          direction === "vertical" && "flex-col",
          className
        )}
        {...props}
      >
        {steps.map((step, index) => {
          let stepStatus = step.status;
          
          if (!stepStatus) {
            if (index < current) {
              stepStatus = "completed";
            } else if (index === current) {
              stepStatus = status;
            } else {
              stepStatus = "pending";
            }
          }

          return (
            <div
              key={index}
              className={cn(
                "step-item",
                `step-${stepStatus}`,
                size === "small" && "step-small",
                direction === "vertical" && "step-vertical"
              )}
              onClick={() => onChange?.(index)}
            >
              <div className="step-icon-container">
                <div className="step-icon">
                  {stepStatus === "completed" ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    step.icon || index + 1
                  )}
                </div>
                <div className="step-line"></div>
              </div>
              <div className="step-content">
                <div className="step-title">{step.title}</div>
                {step.description && (
                  <div className="step-description">{step.description}</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  }
)
Steps.displayName = "Steps"

export { Steps }