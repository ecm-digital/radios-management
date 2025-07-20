import * as React from "react"
import { cn } from "@/lib/utils"

export interface AntRadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  description?: string
}

export const AntRadio = React.forwardRef<HTMLInputElement, AntRadioProps>(
  ({ className, label, description, ...props }, ref) => {
    return (
      <label className="flex items-center cursor-pointer">
        <span className={cn("ant-radio", props.checked && "ant-radio-checked", className)}>
          <input
            type="radio"
            className="sr-only"
            ref={ref}
            {...props}
          />
          <span className="ant-radio-inner" />
        </span>
        {(label || description) && (
          <span className="ml-2">
            {label && <span className="text-sm font-medium">{label}</span>}
            {description && (
              <span className="block text-xs text-[rgba(0,0,0,0.45)]">{description}</span>
            )}
          </span>
        )}
      </label>
    )
  }
)