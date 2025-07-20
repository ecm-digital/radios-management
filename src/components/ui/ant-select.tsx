import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export interface AntSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[]
  label?: string
  error?: string
}

export const AntSelect = React.forwardRef<HTMLSelectElement, AntSelectProps>(
  ({ className, options, label, error, ...props }, ref) => {
    return (
      <div className="ant-select-container">
        {label && <label className="ant-form-label">{label}</label>}
        <div className="relative">
          <select
            className={cn(
              "ant-select-selector",
              error && "border-[#ff4d4f]",
              className
            )}
            ref={ref}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[rgba(0,0,0,0.25)]" />
        </div>
        {error && <div className="mt-1 text-xs text-[#ff4d4f]">{error}</div>}
      </div>
    )
  }
)