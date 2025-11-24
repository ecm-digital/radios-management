import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  AlertCircle,
  Clock,
  Wifi,
  Router,
  Settings,
  User,
  Shield,
  RefreshCw,
  Radio,
  Database,
  WifiOff
} from "lucide-react"
import { cn } from "@/lib/utils"
import { format, formatDistanceToNow } from "date-fns"
import { mockActivityEvents, type ActivityEvent } from "@/data/mockData"

interface ActivityFeedProps {
  activities?: ActivityEvent[]
  title?: string
  description?: string
  maxItems?: number
  showViewAll?: boolean
  onViewAllClick?: () => void
  className?: string
  loading?: boolean
  emptyMessage?: string
}

// Use mock data as default
const defaultActivities = mockActivityEvents;

// Helper functions for status icons and event icons
const getStatusIcon = (status: string) => {
  switch (status) {
    case "success":
      return <CheckCircle className="w-4 h-4 text-success" />
    case "warning":
      return <AlertTriangle className="w-4 h-4 text-warning" />
    case "info":
      return <Info className="w-4 h-4 text-info" />
    case "error":
      return <AlertCircle className="w-4 h-4 text-destructive" />
    default:
      return <Clock className="w-4 h-4 text-muted-foreground" />
  }
}

const getEventIcon = (title: string, description: string) => {
  const text = (title + " " + description).toLowerCase();
  
  if (text.includes("offline") || text.includes("disconnect")) return <WifiOff className="w-4 h-4" />;
  if (text.includes("connect") || text.includes("online")) return <Wifi className="w-4 h-4" />;
  if (text.includes("device") || text.includes("router") || text.includes("ap-")) return <Router className="w-4 h-4" />;
  if (text.includes("config") || text.includes("setting")) return <Settings className="w-4 h-4" />;
  if (text.includes("user") || text.includes("admin") || text.includes("login")) return <User className="w-4 h-4" />;
  if (text.includes("security") || text.includes("auth") || text.includes("failed")) return <Shield className="w-4 h-4" />;
  if (text.includes("update") || text.includes("firmware")) return <RefreshCw className="w-4 h-4" />;
  if (text.includes("backup") || text.includes("maintenance")) return <Database className="w-4 h-4" />;
  if (text.includes("radio") || text.includes("channel") || text.includes("signal")) return <Radio className="w-4 h-4" />;
  
  // Default icon based on status
  return null;
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "success":
      return <Badge variant="outline" className="text-success border-success/30 bg-success/10 backdrop-blur-sm">Success</Badge>
    case "warning":
      return <Badge variant="outline" className="text-warning border-warning/30 bg-warning/10 backdrop-blur-sm">Warning</Badge>
    case "info":
      return <Badge variant="outline" className="text-info border-info/30 bg-info/10 backdrop-blur-sm">Info</Badge>
    case "error":
      return <Badge variant="outline" className="text-destructive border-destructive/30 bg-destructive/10 backdrop-blur-sm">Alert</Badge>
    default:
      return <Badge variant="outline" className="text-muted-foreground border-muted/30 bg-muted/10 backdrop-blur-sm">Unknown</Badge>
  }
}

// Format time function with smart display
const formatTime = (date: Date) => {
  const now = new Date();
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
  
  if (diffInHours < 24) {
    return formatDistanceToNow(date, { addSuffix: true });
  } else if (diffInHours < 48) {
    return `Yesterday at ${format(date, 'HH:mm')}`;
  } else {
    return format(date, 'MMM d, HH:mm');
  }
}

// Loading skeleton for activity items
const ActivitySkeleton = () => (
  <div className="flex items-start space-x-4 py-4 animate-pulse">
    <div className="h-8 w-8 rounded-full bg-muted"></div>
    <div className="space-y-2 flex-1">
      <div className="h-4 w-1/3 bg-muted rounded"></div>
      <div className="h-3 w-1/2 bg-muted rounded"></div>
      <div className="h-3 w-1/4 bg-muted rounded"></div>
    </div>
  </div>
)

export function ActivityFeed({
  activities = defaultActivities,
  title = "Recent Activity",
  description,
  maxItems = 5,
  showViewAll = true,
  onViewAllClick,
  className,
  loading = false,
  emptyMessage = "No recent activity"
}: ActivityFeedProps) {
  // Limit the number of activities to display
  const displayActivities = activities.slice(0, maxItems);
  
  return (
    <Card className={cn("glass-card", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            {description && (
              <CardDescription className="mt-1 text-sm text-muted-foreground">
                {description}
              </CardDescription>
            )}
          </div>
          {showViewAll && activities.length > 0 && (
            <button 
              className="text-sm text-primary hover:text-primary/80 font-medium"
              onClick={onViewAllClick}
            >
              View All
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px] px-6">
          {loading ? (
            <div className="space-y-4 py-4">
              {Array(3).fill(0).map((_, i) => (
                <ActivitySkeleton key={i} />
              ))}
            </div>
          ) : displayActivities.length > 0 ? (
            <div className="space-y-1">
              {displayActivities.map((activity, index) => (
                <div key={activity.id}>
                  <div className="flex items-start py-4 px-2 -mx-2 rounded-lg hover:bg-muted/50 transition-all duration-200 group cursor-pointer">
                    <div className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110 group-hover:shadow-md",
                      activity.type === "success" && "bg-success/10 group-hover:bg-success/20",
                      activity.type === "warning" && "bg-warning/10 group-hover:bg-warning/20",
                      activity.type === "info" && "bg-info/10 group-hover:bg-info/20",
                      activity.type === "error" && "bg-destructive/10 group-hover:bg-destructive/20"
                    )}>
                      <div className="group-hover:scale-110 transition-transform duration-300">
                        {getEventIcon(activity.title, activity.description) || getStatusIcon(activity.type)}
                      </div>
                    </div>
                    <div className="ml-4 space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium leading-none group-hover:text-primary transition-colors duration-200">
                          {activity.title}
                        </p>
                        <div className="flex items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity duration-200">
                          {activity.severity === 'critical' && (
                            <Badge variant="destructive" className="text-xs animate-pulse">
                              Critical
                            </Badge>
                          )}
                          <div className="group-hover:scale-105 transition-transform duration-200">
                            {getStatusBadge(activity.type)}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-200">
                        {activity.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-200">
                          {formatTime(activity.timestamp)}
                        </p>
                        {activity.deviceId && (
                          <span className="text-xs text-muted-foreground group-hover:text-primary/70 transition-colors duration-200 font-mono">
                            {activity.deviceId}
                          </span>
                        )}
                      </div>
                    </div>
                    {/* Hover indicator */}
                    <div className="w-1 h-8 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-2" />
                  </div>
                  {index < displayActivities.length - 1 && (
                    <Separator className="opacity-50 group-hover:opacity-100 transition-opacity duration-200" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">{emptyMessage}</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}