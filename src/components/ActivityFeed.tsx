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
  Radio
} from "lucide-react"
import { cn } from "@/lib/utils"
import { format, formatDistanceToNow } from "date-fns"

export interface Activity {
  id: string
  event: string
  device?: string
  user?: string
  timestamp: Date
  status: "success" | "warning" | "info" | "error"
  details?: string
}

interface ActivityFeedProps {
  activities?: Activity[]
  title?: string
  description?: string
  maxItems?: number
  showViewAll?: boolean
  onViewAllClick?: () => void
  className?: string
  loading?: boolean
  emptyMessage?: string
}

// Sample activities data
const defaultActivities: Activity[] = [
  {
    id: "1",
    event: "Device Connected",
    device: "AP-Floor2-Center",
    timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
    status: "success",
    details: "Device successfully connected to the network"
  },
  {
    id: "2", 
    event: "High CPU Usage",
    device: "AP-Floor1-East",
    timestamp: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
    status: "warning",
    details: "CPU usage exceeded 80% threshold"
  },
  {
    id: "3",
    event: "Channel Changed",
    device: "AP-Floor1-West", 
    timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
    status: "info",
    details: "Channel automatically changed from 6 to 11"
  },
  {
    id: "4",
    event: "Device Offline",
    device: "AP-Floor3-North",
    timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    status: "error",
    details: "Device disconnected unexpectedly"
  },
  {
    id: "5",
    event: "Configuration Updated",
    device: "AP-Floor2-West",
    user: "admin",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    status: "success",
    details: "Radio settings updated"
  },
  {
    id: "6",
    event: "Security Alert",
    device: "AP-Floor1-South",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    status: "error",
    details: "Unauthorized access attempt detected"
  }
]

// Helper functions for status icons and event icons
const getStatusIcon = (status: string) => {
  switch (status) {
    case "success":
      return <CheckCircle className="w-4 h-4 text-[#52c41a]" />
    case "warning":
      return <AlertTriangle className="w-4 h-4 text-[#faad14]" />
    case "info":
      return <Info className="w-4 h-4 text-[#1890ff]" />
    case "error":
      return <AlertCircle className="w-4 h-4 text-[#f5222d]" />
    default:
      return <Clock className="w-4 h-4 text-[rgba(0,0,0,0.45)]" />
  }
}

const getEventIcon = (event: string) => {
  if (event.toLowerCase().includes("connect")) return <Wifi className="w-4 h-4" />;
  if (event.toLowerCase().includes("device")) return <Router className="w-4 h-4" />;
  if (event.toLowerCase().includes("config")) return <Settings className="w-4 h-4" />;
  if (event.toLowerCase().includes("user") || event.toLowerCase().includes("admin")) return <User className="w-4 h-4" />;
  if (event.toLowerCase().includes("security") || event.toLowerCase().includes("auth")) return <Shield className="w-4 h-4" />;
  if (event.toLowerCase().includes("update") || event.toLowerCase().includes("change")) return <RefreshCw className="w-4 h-4" />;
  if (event.toLowerCase().includes("radio") || event.toLowerCase().includes("channel")) return <Radio className="w-4 h-4" />;
  
  // Default icon based on status
  return null;
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "success":
      return <Badge variant="outline" className="text-[#52c41a] border-[#b7eb8f] bg-[#f6ffed]">Success</Badge>
    case "warning":
      return <Badge variant="outline" className="text-[#faad14] border-[#ffe58f] bg-[#fffbe6]">Warning</Badge>
    case "info":
      return <Badge variant="outline" className="text-[#1890ff] border-[#91d5ff] bg-[#e6f7ff]">Info</Badge>
    case "error":
      return <Badge variant="outline" className="text-[#f5222d] border-[#ffccc7] bg-[#fff2f0]">Alert</Badge>
    default:
      return <Badge variant="outline" className="text-[rgba(0,0,0,0.65)] border-[#d9d9d9] bg-[#fafafa]">Unknown</Badge>
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
    <Card className={cn("border shadow-sm", className)}>
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
                  <div className="flex items-start py-4">
                    <div className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                      activity.status === "success" && "bg-[#f6ffed]",
                      activity.status === "warning" && "bg-[#fffbe6]",
                      activity.status === "info" && "bg-[#e6f7ff]",
                      activity.status === "error" && "bg-[#fff2f0]"
                    )}>
                      {getEventIcon(activity.event) || getStatusIcon(activity.status)}
                    </div>
                    <div className="ml-4 space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium leading-none">
                          {activity.event}
                        </p>
                        <div className="flex items-center">
                          {getStatusBadge(activity.status)}
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        {activity.device && (
                          <span className="font-medium text-foreground">{activity.device}</span>
                        )}
                        {activity.user && (
                          <span className="ml-1">
                            {activity.device ? " by " : ""}
                            <span className="font-medium text-foreground">{activity.user}</span>
                          </span>
                        )}
                      </div>
                      {activity.details && (
                        <p className="text-sm text-muted-foreground">{activity.details}</p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {formatTime(activity.timestamp)}
                      </p>
                    </div>
                  </div>
                  {index < displayActivities.length - 1 && <Separator />}
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