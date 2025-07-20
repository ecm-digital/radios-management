import * as React from "react"
import { cn } from "@/lib/utils"

export interface AntInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const AntInput = React.forwardRef<HTMLInputElement, AntInputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="ant-input-container">
        {label && <label className="ant-form-label">{label}</label>}
        <input
          className={cn(
            "ant-input",
            error && "border-[#ff4d4f]",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <div className="mt-1 text-xs text-[#ff4d4f]">{error}</div>}
      </div>
    )
  }
)