import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-normal transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1890ff] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[#1890ff] text-white hover:bg-[#40a9ff] active:bg-[#096dd9] shadow-sm border border-[#1890ff]",
        destructive:
          "bg-[#ff4d4f] text-white hover:bg-[#ff7875] active:bg-[#d9363e] shadow-sm border border-[#ff4d4f]",
        outline:
          "border border-[#d9d9d9] bg-white text-[rgba(0,0,0,0.85)] hover:text-[#40a9ff] hover:border-[#40a9ff] active:text-[#096dd9] active:border-[#096dd9]",
        secondary:
          "bg-[#f0f0f0] text-[rgba(0,0,0,0.85)] hover:bg-[#d9d9d9] active:bg-[#bfbfbf] border border-[#d9d9d9]",
        ghost: "text-[rgba(0,0,0,0.85)] hover:bg-[rgba(0,0,0,0.06)] active:bg-[rgba(0,0,0,0.1)]",
        link: "text-[#1890ff] hover:text-[#40a9ff] active:text-[#096dd9] underline-offset-4 hover:underline",
        dashed: "border border-dashed border-[#d9d9d9] bg-white text-[rgba(0,0,0,0.85)] hover:text-[#40a9ff] hover:border-[#40a9ff]",
        text: "text-[rgba(0,0,0,0.85)] hover:bg-[rgba(0,0,0,0.06)] active:bg-[rgba(0,0,0,0.1)]",
      },
      size: {
        default: "h-8 px-4 py-0 text-sm",
        sm: "h-6 px-3 py-0 text-xs",
        lg: "h-10 px-6 py-0 text-base",
        icon: "h-8 w-8 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
