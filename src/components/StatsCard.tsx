import { Card, CardContent } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  timeFrame?: string
  icon: LucideIcon
  iconColor?: string
}

export function StatsCard({ 
  title, 
  value, 
  change, 
  changeType = "neutral", 
  timeFrame, 
  icon: Icon,
  iconColor = "text-primary"
}: StatsCardProps) {
  const getChangeColor = () => {
    switch (changeType) {
      case "positive":
        return "text-success"
      case "negative":
        return "text-destructive"
      default:
        return "text-muted-foreground"
    }
  }

  const getIconBgColor = () => {
    switch (changeType) {
      case "positive":
        return "bg-success/10"
      case "negative":
        return "bg-destructive/10"
      default:
        return "bg-primary/10"
    }
  }

  return (
    <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg border-0 bg-card">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="space-y-1">
              <p className="text-3xl font-bold text-foreground">{value}</p>
              {change && (
                <div className="flex items-center gap-1">
                  <span className={`text-sm font-medium ${getChangeColor()}`}>
                    {change}
                  </span>
                  {timeFrame && (
                    <span className="text-xs text-muted-foreground">
                      {timeFrame}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className={`p-3 rounded-lg ${getIconBgColor()}`}>
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}