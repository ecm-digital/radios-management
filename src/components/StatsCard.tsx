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
        return "border-destructive/30 bg-destructive/10 backdrop-blur-md"
      case "warning":
        return "border-warning/30 bg-warning/10 backdrop-blur-md"
      case "success":
        return "border-success/30 bg-success/10 backdrop-blur-md"
      case "secondary":
        return "border-secondary/30 bg-secondary/40 backdrop-blur-md"
      case "outline":
        return "border-white/20 bg-white/20 backdrop-blur-xl shadow-sm"
      default:
        return "glass-card border-white/20"
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
        "relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:scale-[1.02] cursor-pointer group border-2 hover:border-primary/20", 
        getCardClass(),
        className
      )}
    >
      {/* Animated background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardHeader className="pb-2 relative z-10">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
            {title}
          </CardTitle>
          <div className={cn(
            "p-2 rounded-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-md", 
            getIconBgColor()
          )}>
            <Icon className={cn("w-5 h-5 transition-all duration-300 group-hover:scale-110", getIconColor())} />
          </div>
        </div>
        {description && (
          <CardDescription className="text-xs mt-1 group-hover:text-muted-foreground/80 transition-colors duration-300">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="relative z-10">
        {loading ? (
          <div className="h-9 w-24 bg-muted animate-pulse rounded" />
        ) : (
          <div className="text-2xl md:text-3xl font-bold text-foreground group-hover:scale-105 transition-transform duration-300">
            {value}
          </div>
        )}
      </CardContent>
      {change && (
        <CardFooter className="pt-0 relative z-10">
          <div className="flex items-center gap-1 text-sm group-hover:scale-105 transition-transform duration-300">
            <div className="group-hover:animate-bounce">
              <ChangeIcon />
            </div>
            <span className={cn("font-medium", getChangeColor())}>
              {change}
            </span>
            {timeFrame && (
              <span className="text-xs text-muted-foreground ml-1 group-hover:text-muted-foreground/70 transition-colors duration-300">
                {timeFrame}
              </span>
            )}
          </div>
        </CardFooter>
      )}
      
      {/* Subtle pulse animation for critical states */}
      {variant === "destructive" && (
        <div className="absolute inset-0 bg-destructive/5 animate-pulse opacity-50" />
      )}
    </Card>
  )
}