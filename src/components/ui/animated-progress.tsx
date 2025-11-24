import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface AnimatedProgressProps {
  value: number
  className?: string
  showValue?: boolean
  animated?: boolean
  color?: 'default' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
}

export function AnimatedProgress({
  value,
  className,
  showValue = false,
  animated = true,
  color = 'default',
  size = 'md'
}: AnimatedProgressProps) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setDisplayValue(value)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      setDisplayValue(value)
    }
  }, [value, animated])

  const getColorClass = () => {
    switch (color) {
      case 'success':
        return 'text-[#52c41a]'
      case 'warning':
        return 'text-[#faad14]'
      case 'error':
        return 'text-[#f5222d]'
      default:
        return 'text-primary'
    }
  }

  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'h-1'
      case 'lg':
        return 'h-4'
      default:
        return 'h-2'
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      <Progress 
        value={displayValue} 
        className={cn(
          "transition-all duration-1000 ease-out",
          getSizeClass()
        )}
      />
      {showValue && (
        <div className={cn(
          "text-right text-sm font-medium transition-colors duration-300",
          getColorClass()
        )}>
          {Math.round(displayValue)}%
        </div>
      )}
    </div>
  )
}