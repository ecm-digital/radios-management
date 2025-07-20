import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-8 w-full rounded-sm border border-[#d9d9d9] bg-white px-3 py-1 text-sm transition-all placeholder:text-[rgba(0,0,0,0.25)] hover:border-[#40a9ff] focus:border-[#40a9ff] focus:outline-none focus:shadow-[0_0_0_2px_rgba(24,144,255,0.2)] disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#f5f5f5]",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
