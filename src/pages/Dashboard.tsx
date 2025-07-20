import { Helmet } from 'react-helmet-async';
import { StatsCard } from "@/components/StatsCard"
import { ActivityFeed } from "@/components/ActivityFeed"
import { 
  Router, 
  WifiOff, 
  AlertTriangle, 
  Activity 
} from "lucide-react"

export default function Dashboard() {
  return (
    <>
      <Helmet>
        <title>Dashboard - Radiance Network Management</title>
      </Helmet>
      <div className="space-y-6">
        {/* Header */}
        <div className="border-b pb-4">
          <h1 className="text-2xl font-bold text-foreground">System Dashboard</h1>
          <p className="text-muted-foreground">Monitor your radio network devices and performance</p>
        </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Active Devices"
          value="124"
          change="+3.3%"
          changeType="positive"
          timeFrame="from last 24 hours"
          icon={Router}
          iconColor="text-success"
        />
        
        <StatsCard
          title="Offline Devices"
          value="7"
          change="+1%"
          changeType="negative"
          timeFrame="from last 24 hours"
          icon={WifiOff}
          iconColor="text-destructive"
        />
        
        <StatsCard
          title="Warning Status"
          value="12"
          change="from last 24 hours"
          changeType="neutral"
          icon={AlertTriangle}
          iconColor="text-info"
        />
        
        <StatsCard
          title="Network Uptime"
          value="99.8%"
          change="last 30 days"
          changeType="positive"
          icon={Activity}
          iconColor="text-info"
        />
      </div>

      {/* Activity Feed */}
      <ActivityFeed />
    </div>
    </>
  )
}