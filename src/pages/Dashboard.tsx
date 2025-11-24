import { Helmet } from 'react-helmet-async';
import { StatsCard } from "@/components/StatsCard"
import { ActivityFeed } from "@/components/ActivityFeed"
import { StatsCardSkeleton, ActivityFeedSkeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState, useEffect } from "react"
import { 
  Router, 
  WifiOff, 
  AlertTriangle, 
  Activity,
  TrendingUp,
  Users,
  Signal,
  Clock,
  RefreshCw,
  Settings,
  BarChart3,
  Zap,
  Info,
  ChevronRight,
  Wifi,
  Server,
  HardDrive,
  Shield,
  Database
} from "lucide-react"
import { 
  getNetworkStats, 
  mockAlerts, 
  mockActivityEvents, 
  formatSignalStrength 
} from "@/data/mockData"
import { FloatingActionButton } from "@/components/ui/floating-action-button"
import { NotificationCenter } from "@/components/ui/notification-center"

// Quick actions with dynamic badge counts
const getQuickActions = (alertCount: number) => [
  { label: "Add Device", icon: Router, action: "/devices" },
  { label: "View Alerts", icon: AlertTriangle, action: "/alerts", badge: alertCount > 0 ? alertCount.toString() : undefined },
  { label: "Analytics", icon: BarChart3, action: "/analytics" },
  { label: "Settings", icon: Settings, action: "/system-settings" }
];

// System health with realistic data
const getSystemHealth = (stats: ReturnType<typeof getNetworkStats>) => ({
  cpu: { value: stats.cpuUsage, status: stats.cpuUsage > 80 ? "warning" : "good", icon: Zap, label: "CPU Usage" },
  memory: { value: stats.memoryUsage, status: stats.memoryUsage > 85 ? "critical" : stats.memoryUsage > 70 ? "warning" : "good", icon: HardDrive, label: "Memory" },
  storage: { value: stats.storageUsage, status: stats.storageUsage > 90 ? "critical" : stats.storageUsage > 75 ? "warning" : "good", icon: Database, label: "Storage" },
  network: { value: stats.bandwidthUsage, status: stats.bandwidthUsage > 90 ? "warning" : "excellent", icon: Wifi, label: "Network" }
});

// Format time ago helper
const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
};

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [statsLoading, setStatsLoading] = useState(true)
  const [activityLoading, setActivityLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [showEmptyState, setShowEmptyState] = useState(false)
  
  // Get dynamic data
  const networkStats = getNetworkStats()
  const systemHealth = getSystemHealth(networkStats)
  const activeAlerts = mockAlerts.filter(alert => alert.status === 'active')
  const quickActions = getQuickActions(activeAlerts.length)
  const recentAlerts = activeAlerts.slice(0, 3)

  // Simulate loading states for demo purposes
  useEffect(() => {
    // Simulate initial page load
    const timer = setTimeout(() => setIsLoading(false), 800)
    
    // Simulate stats loading
    const statsTimer = setTimeout(() => setStatsLoading(false), 1200)
    
    // Simulate activity feed loading
    const activityTimer = setTimeout(() => setActivityLoading(false), 1500)

    return () => {
      clearTimeout(timer)
      clearTimeout(statsTimer)
      clearTimeout(activityTimer)
    }
  }, [])

  const handleRefresh = () => {
    setIsRefreshing(true)
    setStatsLoading(true)
    setActivityLoading(true)
    setHasError(false)
    setLastUpdated(new Date())
    
    // Simulate occasional errors for demo
    const shouldError = Math.random() < 0.1; // 10% chance of error
    
    if (shouldError) {
      setTimeout(() => {
        setHasError(true)
        setIsRefreshing(false)
        setStatsLoading(false)
        setActivityLoading(false)
      }, 1000)
    } else {
      setTimeout(() => setStatsLoading(false), 1000)
      setTimeout(() => setActivityLoading(false), 1200)
      setTimeout(() => setIsRefreshing(false), 1300)
    }
  }

  // Simulate different UI states for demo
  const toggleEmptyState = () => {
    setShowEmptyState(!showEmptyState)
  }

  const getHealthColor = (status: string) => {
    switch (status) {
      case "excellent": return "text-[#52c41a]"
      case "good": return "text-[#52c41a]"
      case "warning": return "text-[#faad14]"
      case "critical": return "text-[#f5222d]"
      default: return "text-[rgba(0,0,0,0.45)]"
    }
  }

  const getHealthBg = (status: string) => {
    switch (status) {
      case "excellent": return "bg-[#f6ffed]"
      case "good": return "bg-[#f6ffed]"
      case "warning": return "bg-[#fffbe6]"
      case "critical": return "bg-[#fff2f0]"
      default: return "bg-[#fafafa]"
    }
  }

  return (
    <>
      <Helmet>
        <title>Dashboard - Radiance Network Management</title>
      </Helmet>
      <div className="space-y-6">
        {/* Enhanced Header with Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-foreground animate-in fade-in-0 duration-700">
              System Dashboard
            </h1>
            <p className="text-muted-foreground animate-in fade-in-0 duration-700 delay-100">
              Monitor your radio network devices and performance in real-time
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2 animate-in fade-in-0 duration-700 delay-200">
              <Clock className="w-4 h-4 animate-pulse" />
              <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <NotificationCenter />
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleEmptyState}
              className="text-xs"
            >
              {showEmptyState ? 'Show Data' : 'Show Empty'}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
            {hasError ? (
              <Badge variant="outline" className="text-destructive border-destructive/30 bg-destructive/10 backdrop-blur-sm">
                Connection Error
              </Badge>
            ) : networkStats.offlineDevices > 0 || networkStats.errorDevices > 0 ? (
              <Badge variant="outline" className="text-warning-foreground border-warning/30 bg-warning/10 backdrop-blur-sm">
                Issues Detected
              </Badge>
            ) : (
              <Badge variant="outline" className="text-success-foreground border-success/30 bg-success/10 backdrop-blur-sm">
                System Healthy
              </Badge>
            )}
          </div>
        </div>

        {/* Primary Stats Cards - Enhanced Layout */}
        <div className="grid grid-cols-1 gap-6">
          {statsLoading ? (
            <>
              <StatsCardSkeleton />
              <StatsCardSkeleton />
              <StatsCardSkeleton />
            </>
          ) : hasError ? (
            <div className="col-span-full">
              <Card className="border-destructive/30 bg-destructive/10 backdrop-blur-md">
                <CardContent className="flex items-center justify-center py-8">
                  <div className="text-center space-y-2">
                    <AlertTriangle className="w-8 h-8 text-[#f5222d] mx-auto" />
                    <p className="text-[#f5222d] font-medium">Failed to load statistics</p>
                    <p className="text-sm text-muted-foreground">Check your network connection</p>
                    <Button variant="outline" size="sm" onClick={handleRefresh} className="mt-2">
                      Try Again
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="animate-in fade-in-0 duration-500 delay-100">
                <StatsCard
                  title="Active Devices"
                  value={networkStats.activeDevices.toString()}
                  change="+40%"
                  changeType="positive"
                  timeFrame="Than last month"
                  className="bg-white/5 border-0 shadow-xl backdrop-blur-3xl"
                />
              </div>
              
              <div className="animate-in fade-in-0 duration-500 delay-200">
                <StatsCard
                  title="Offline Devices"
                  value={networkStats.offlineDevices.toString()}
                  change="+5%"
                  changeType="positive"
                  timeFrame="Than last month"
                  className="bg-white/5 border-0 shadow-xl backdrop-blur-3xl"
                />
              </div>
              
              <div className="animate-in fade-in-0 duration-500 delay-300">
                <StatsCard
                  title="Total Savings"
                  value="$8,000.00"
                  change="+30%"
                  changeType="positive"
                  timeFrame="Than last month"
                  className="bg-gradient-to-br from-[#7c3aed]/20 to-[#2563eb]/20 border-0 shadow-xl backdrop-blur-3xl"
                />
              </div>
            </div>
          )}
        </div>

        {/* Secondary Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {statsLoading ? (
            <>
              <StatsCardSkeleton />
              <StatsCardSkeleton />
              <StatsCardSkeleton />
              <StatsCardSkeleton />
            </>
          ) : hasError ? (
            <div className="col-span-full">
              <div className="h-24 bg-muted rounded-lg animate-pulse" />
            </div>
          ) : (
            <>
              <StatsCard
                title="Connected Users"
                value={networkStats.totalUsers.toString()}
                change={`Peak: ${networkStats.peakUsers}`}
                changeType="info"
                timeFrame="today"
                icon={Users}
                description="Active connections"
              />
              
              <StatsCard
                title="Signal Strength"
                value={`${networkStats.avgSignalStrength} dBm`}
                change={formatSignalStrength(networkStats.avgSignalStrength)}
                changeType={networkStats.avgSignalStrength > -50 ? "positive" : networkStats.avgSignalStrength > -70 ? "warning" : "negative"}
                timeFrame="average"
                icon={Signal}
                description="Network quality"
              />
              
              <StatsCard
                title="Data Transferred"
                value={networkStats.dataTransferred}
                change="+12%"
                changeType="positive"
                timeFrame="this month"
                icon={TrendingUp}
                description="Total bandwidth usage"
              />
              
              <StatsCard
                title="System Load"
                value={`${networkStats.cpuUsage}%`}
                change={networkStats.cpuUsage < 50 ? "Normal" : networkStats.cpuUsage < 80 ? "Moderate" : "High"}
                changeType={networkStats.cpuUsage < 50 ? "positive" : networkStats.cpuUsage < 80 ? "warning" : "negative"}
                timeFrame="current"
                icon={Zap}
                description="CPU & Memory usage"
              />
            </>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activity Feed - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            {activityLoading ? (
              <div className="glass-card p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">Recent Activity</h3>
                </div>
                <ActivityFeedSkeleton />
              </div>
            ) : (
              <ActivityFeed 
                activities={showEmptyState ? [] : mockActivityEvents}
                title="Recent Activity"
                description="Latest network events and system changes"
                maxItems={6}
                showViewAll={true}
                onViewAllClick={() => window.location.href = '/alerts'}
                emptyMessage="No recent activity to display"
              />
            )}
          </div>

          {/* Right Column - Quick Actions & System Health */}
          <div className="space-y-6">
            {/* Quick Actions Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
                <CardDescription>
                  Common management tasks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start h-auto p-3 hover:bg-[#f5f5f5] transition-colors duration-200 group"
                    onClick={() => window.location.href = action.action}
                  >
                    <action.icon className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform duration-200" />
                    <span className="flex-1 text-left">{action.label}</span>
                    {action.badge && (
                      <Badge 
                        variant={action.label.includes('Alerts') ? 'destructive' : 'secondary'} 
                        className="ml-2"
                      >
                        {action.badge}
                      </Badge>
                    )}
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* System Health Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">System Health</CardTitle>
                <CardDescription>
                  Current system resource usage
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <TooltipProvider>
                  {Object.entries(systemHealth).map(([key, data]) => (
                    <div key={key} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <data.icon className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{data.label}</span>
                        </div>
                        <Tooltip>
                          <TooltipTrigger>
                            <span className={`${getHealthColor(data.status)} font-medium`}>
                              {data.value}%
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Status: {data.status}</p>
                            <p className="text-xs text-muted-foreground">
                              {data.status === 'critical' ? 'Immediate attention required' :
                               data.status === 'warning' ? 'Monitor closely' :
                               'Operating normally'}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <Progress 
                        value={data.value} 
                        className="h-2"
                        style={{
                          '--progress-background': getHealthBg(data.status).replace('bg-', ''),
                        } as React.CSSProperties}
                      />
                    </div>
                  ))}
                </TooltipProvider>
              </CardContent>
            </Card>

            {/* Recent Alerts Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Recent Alerts
                </CardTitle>
                <CardDescription>
                  Latest system notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentAlerts.length === 0 ? (
                  <div className="text-center py-4">
                    <Shield className="w-8 h-8 text-[#52c41a] mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">No active alerts</p>
                    <p className="text-xs text-muted-foreground">System is running smoothly</p>
                  </div>
                ) : (
                  <>
                    {recentAlerts.map((alert) => (
                      <div key={alert.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-[#fafafa] transition-colors duration-200">
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          alert.type === 'error' ? 'bg-[#f5222d]' :
                          alert.type === 'warning' ? 'bg-[#faad14]' :
                          alert.type === 'info' ? 'bg-[#1890ff]' :
                          'bg-[#52c41a]'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {alert.title}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {alert.message}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatTimeAgo(alert.timestamp)}
                          </p>
                        </div>
                        {alert.severity === 'critical' && (
                          <Badge variant="destructive" className="text-xs">
                            Critical
                          </Badge>
                        )}
                      </div>
                    ))}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full mt-2 text-[#1890ff] hover:text-[#40a9ff] hover:bg-[#f0f9ff]"
                      onClick={() => window.location.href = '/alerts'}
                    >
                      View all alerts ({activeAlerts.length})
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Floating Action Button */}
        <FloatingActionButton />
      </div>
    </>
  )
}