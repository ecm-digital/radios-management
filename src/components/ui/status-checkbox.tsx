import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

// Ant Design style checkbox variants
const statusVariants = {
  success: "border-[#52c41a] hover:border-[#52c41a] data-[state=checked]:bg-[#52c41a] data-[state=checked]:border-[#52c41a] data-[state=checked]:text-white",
  warning: "border-[#faad14] hover:border-[#faad14] data-[state=checked]:bg-[#faad14] data-[state=checked]:border-[#faad14] data-[state=checked]:text-white",
  info: "border-[#1890ff] hover:border-[#1890ff] data-[state=checked]:bg-[#1890ff] data-[state=checked]:border-[#1890ff] data-[state=checked]:text-white",
  error: "border-[#f5222d] hover:border-[#f5222d] data-[state=checked]:bg-[#f5222d] data-[state=checked]:border-[#f5222d] data-[state=checked]:text-white",
  processing: "border-[#1890ff] hover:border-[#1890ff] data-[state=checked]:bg-[#1890ff] data-[state=checked]:border-[#1890ff] data-[state=checked]:text-white",
  default: "border-[#d9d9d9] hover:border-[#1890ff] data-[state=checked]:bg-[#1890ff] data-[state=checked]:border-[#1890ff] data-[state=checked]:text-white",
}

interface StatusCheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  variant?: keyof typeof statusVariants
}

const StatusCheckbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  StatusCheckboxProps
>(({ className, variant = "default", ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border transition-all duration-200 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1890ff] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      statusVariants[variant],
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-3 w-3" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
StatusCheckbox.displayName = "StatusCheckbox"

export { StatusCheckbox }