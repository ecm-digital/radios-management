import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Ant Design style badge variants
const alertBadgeVariants = cva(
  "inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-normal transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary border border-primary/20",
        success: "bg-green-500/10 text-green-400 border border-green-500/20",
        warning: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
        info: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
        error: "bg-red-500/10 text-red-400 border border-red-500/20",
        processing: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface AlertBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertBadgeVariants> {}

function AlertBadge({ className, variant, ...props }: AlertBadgeProps) {
  return (
    <div className={cn(alertBadgeVariants({ variant }), className)} {...props} />
  )
}

export { AlertBadge, alertBadgeVariants }
