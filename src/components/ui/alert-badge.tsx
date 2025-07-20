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
        success: "bg-[#f6ffed] text-[#52c41a] border border-[#b7eb8f]",
        warning: "bg-[#fffbe6] text-[#faad14] border border-[#ffe58f]",
        info: "bg-[#e6f7ff] text-[#1890ff] border border-[#91d5ff]",
        error: "bg-[#fff2f0] text-[#f5222d] border border-[#ffccc7]",
        processing: "bg-[#e6f7ff] text-[#1890ff] border border-[#91d5ff]",
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