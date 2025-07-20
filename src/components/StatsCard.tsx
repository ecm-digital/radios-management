import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon, ArrowUp, ArrowDown, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: string
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  timeFrame?: string
  icon: LucideIcon
  iconColor?: string
  description?: string
  variant?: "default" | "outline" | "secondary" | "destructive" | "warning" | "success"
  loading?: boolean
  className?: string
}

export function StatsCard({ 
  title, 
  value, 
  change, 
  changeType = "neutral", 
  timeFrame = "vs. previous period", 
  icon: Icon,
  iconColor,
  description,
  variant = "default",
  loading = false,
  className
}: StatsCardProps) {
  // Determine colors based on change type and variant
  const getChangeColor = () => {
    switch (changeType) {
      case "positive":
        return "text-[#52c41a]"
      case "negative":
        return "text-[#f5222d]"
      default:
        return "text-[rgba(0,0,0,0.45)]"
    }
  }

  const getIconBgColor = () => {
    switch (variant) {
      case "destructive":
        return "bg-destructive/10"
      case "warning":
        return "bg-amber-100"
      case "success":
        return "bg-success/10"
      case "secondary":
        return "bg-secondary"
      default:
        switch (changeType) {
          case "positive":
            return "bg-success/10"
          case "negative":
            return "bg-destructive/10"
          default:
            return "bg-primary/10"
        }
    }
  }

  const getIconColor = () => {
    if (iconColor) return iconColor;
    
    switch (variant) {
      case "destructive":
        return "text-[#f5222d]"
      case "warning":
        return "text-[#faad14]"
      case "success":
        return "text-[#52c41a]"
      case "secondary":
        return "text-[rgba(0,0,0,0.65)]"
      default:
        return "text-[#1890ff]"
    }
  }

  const getCardClass = () => {
    switch (variant) {
      case "destructive":
        return "border-[#ffccc7] bg-[#fff2f0]"
      case "warning":
        return "border-[#ffe58f] bg-[#fffbe6]"
      case "success":
        return "border-[#b7eb8f] bg-[#f6ffed]"
      case "secondary":
        return "border-[#d9d9d9] bg-[#fafafa]"
      case "outline":
        return "border-[#f0f0f0] bg-white"
      default:
        return "border-[#f0f0f0] bg-white"
    }
  }

  // Change indicator icon based on change type
  const ChangeIcon = () => {
    switch (changeType) {
      case "positive":
        return <ArrowUp className="h-3 w-3 text-success" />
      case "negative":
        return <ArrowDown className="h-3 w-3 text-destructive" />
      default:
        return <Minus className="h-3 w-3 text-muted-foreground" />
    }
  }

  return (
    <Card 
      className={cn(
        "relative overflow-hidden transition-all duration-300 hover:shadow-md", 
        getCardClass(),
        className
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div className={cn("p-2 rounded-lg", getIconBgColor())}>
            <Icon className={cn("w-5 h-5", getIconColor())} />
          </div>
        </div>
        {description && (
          <CardDescription className="text-xs mt-1">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-9 w-24 bg-muted animate-pulse rounded" />
        ) : (
          <div className="text-2xl md:text-3xl font-bold text-foreground">
            {value}
          </div>
        )}
      </CardContent>
      {change && (
        <CardFooter className="pt-0">
          <div className="flex items-center gap-1 text-sm">
            <ChangeIcon />
            <span className={cn("font-medium", getChangeColor())}>
              {change}
            </span>
            {timeFrame && (
              <span className="text-xs text-muted-foreground ml-1">
                {timeFrame}
              </span>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  )
}