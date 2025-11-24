import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface StatsCardProps {
  title: string
  value: string
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  timeFrame?: string
  icon?: LucideIcon
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
  timeFrame,
  variant = "default",
  loading = false,
  className
}: StatsCardProps) {

  const getBadgeColor = () => {
    switch (changeType) {
      case "positive":
        return "bg-[#22c55e]/20 text-[#22c55e]"
      case "negative":
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-white/10 text-white/60"
    }
  }

  return (
    <Card 
      className={cn(
        "relative overflow-hidden border-0 bg-white/5 backdrop-blur-2xl rounded-3xl shadow-xl transition-all duration-300 hover:bg-white/10", 
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium text-white/90">
          {title}
        </CardTitle>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-white/50 hover:text-white hover:bg-white/10 rounded-full">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-9 w-24 bg-white/10 animate-pulse rounded" />
        ) : (
          <div className="flex items-baseline gap-3">
            <div className="text-4xl font-bold text-white tracking-tight">
              {value}
            </div>
            {change && (
              <div className={cn(
                "px-2.5 py-0.5 rounded-full text-xs font-semibold",
                getBadgeColor()
              )}>
                {change}
              </div>
            )}
          </div>
        )}
      </CardContent>
      {timeFrame && (
        <CardFooter className="pt-0 pb-6">
          <p className="text-sm text-white/50">
            {timeFrame}
          </p>
        </CardFooter>
      )}
    </Card>
  )
}
