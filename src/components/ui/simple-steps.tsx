import * as React from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

export interface SimpleStepProps {
  id: number
  title: string
  status: "completed" | "current" | "pending"
}

export interface SimpleStepsProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: SimpleStepProps[]
  onStepClick?: (stepId: number) => void
}

export function SimpleSteps({ steps, onStepClick, className, ...props }: SimpleStepsProps) {
  return (
    <div className={cn("flex items-center justify-between w-full my-6", className)} {...props}>
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className="flex flex-col items-center">
            <div 
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all cursor-pointer",
                step.status === "completed" && "bg-[#1890ff] border-[#1890ff] text-white",
                step.status === "current" && "border-[#1890ff] text-[#1890ff] bg-[#e6f7ff]",
                step.status === "pending" && "border-[#d9d9d9] text-[rgba(0,0,0,0.45)]"
              )}
              onClick={() => onStepClick?.(step.id)}
            >
              {step.status === "completed" ? <Check className="w-5 h-5" /> : step.id}
            </div>
            <div className="mt-2 text-center">
              <p className={cn(
                "text-sm font-medium",
                step.status === "current" && "text-[#1890ff]",
                step.status === "pending" && "text-[rgba(0,0,0,0.45)]"
              )}>
                {step.title}
              </p>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className={cn(
              "w-24 h-1 mx-4",
              step.status === "completed" ? "bg-[#1890ff]" : "bg-[#f0f0f0]"
            )} />
          )}
        </div>
      ))}
    </div>
  )
}