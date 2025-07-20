import * as React from "react"
import { cn } from "@/lib/utils"

export interface AntSwitchProps extends React.HTMLAttributes<HTMLDivElement> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  label?: string
}

export const AntSwitch = React.forwardRef<HTMLDivElement, AntSwitchProps>(
  ({ className, checked = false, onCheckedChange, disabled = false, label, ...props }, ref) => {
    const handleClick = () => {
      if (!disabled && onCheckedChange) {
        onCheckedChange(!checked)
      }
    }

    return (
      <div className="flex items-center">
        <div
          ref={ref}
          className={cn(
            "ant-switch",
            checked && "ant-switch-checked",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
          onClick={handleClick}
          role="switch"
          aria-checked={checked}
          aria-disabled={disabled}
          {...props}
        >
          <div className="ant-switch-handle" />
        </div>
        {label && <span className="ml-2">{label}</span>}
      </div>
    )
  }
)