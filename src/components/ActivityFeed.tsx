import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  AlertCircle,
  Clock 
} from "lucide-react"

interface Activity {
  id: string
  event: string
  device: string
  time: string
  status: "success" | "warning" | "info" | "error"
}

const activities: Activity[] = [
  {
    id: "1",
    event: "Device Connected",
    device: "AP-Floor2-Center",
    time: "10 minutes ago",
    status: "success"
  },
  {
    id: "2", 
    event: "High CPU Usage",
    device: "AP-Floor1-East",
    time: "25 minutes ago",
    status: "warning"
  },
  {
    id: "3",
    event: "Channel Changed",
    device: "AP-Floor1-West", 
    time: "45 minutes ago",
    status: "info"
  },
  {
    id: "4",
    event: "Device Offline",
    device: "AP-Floor3-North",
    time: "1 hour ago",
    status: "error"
  }
]

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

const getStatusBadge = (status: string) => {
  switch (status) {
    case "success":
      return <Badge variant="outline" className="text-success border-success/20 bg-success/10">Success</Badge>
    case "warning":
      return <Badge variant="outline" className="text-warning border-warning/20 bg-warning/10">Warning</Badge>
    case "info":
      return <Badge variant="outline" className="text-info border-info/20 bg-info/10">Info</Badge>
    case "error":
      return <Badge variant="outline" className="text-destructive border-destructive/20 bg-destructive/10">Alert</Badge>
    default:
      return <Badge variant="outline">Unknown</Badge>
  }
}

export function ActivityFeed() {
  return (
    <Card className="border-0">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
          <button className="text-sm text-primary hover:text-primary/80 font-medium">
            View All
          </button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-4 gap-4 text-xs font-medium text-muted-foreground uppercase tracking-wider pb-2 border-b">
          <div>Event</div>
          <div>Device</div>
          <div>Time</div>
          <div>Status</div>
        </div>
        
        {activities.map((activity) => (
          <div key={activity.id} className="grid grid-cols-4 gap-4 items-center py-3 hover:bg-muted/50 rounded-lg px-2 -mx-2 transition-colors">
            <div className="flex items-center gap-2">
              {getStatusIcon(activity.status)}
              <span className="text-sm font-medium">{activity.event}</span>
            </div>
            <div className="text-sm text-muted-foreground">{activity.device}</div>
            <div className="text-sm text-muted-foreground">{activity.time}</div>
            <div>{getStatusBadge(activity.status)}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}