import { 
  BarChart3, 
  Map, 
  Router, 
  Activity, 
  Bell, 
  Users, 
  Settings,
  Radio
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  SidebarMenuBadge
} from "@/components/ui/sidebar"

// Management section items with descriptions
const managementItems = [
  { 
    title: "Dashboard", 
    url: "/", 
    icon: BarChart3,
    description: "System overview and statistics"
  },
  { 
    title: "Network Map", 
    url: "/network-map", 
    icon: Map,
    description: "Visual network topology"
  },
  { 
    title: "Device Wizard", 
    url: "/devices", 
    icon: Router,
    description: "Configure network devices"
  },
  { 
    title: "Analytics", 
    url: "/analytics", 
    icon: Activity,
    description: "Performance metrics and reports"
  },
  { 
    title: "Alerts", 
    url: "/alerts", 
    icon: Bell,
    description: "System notifications and warnings",
    badge: "3"
  },
]

// Settings section items with descriptions
const settingsItems = [
  { 
    title: "User Management", 
    url: "/user-management", 
    icon: Users,
    description: "Manage users and permissions"
  },
  { 
    title: "System Settings", 
    url: "/system-settings", 
    icon: Settings,
    description: "Configure system parameters"
  },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const collapsed = state === "collapsed"

  // Enhanced active state detection with exact and partial matching
  const checkIsActive = (path: string) => {
    if (path === "/") {
      return currentPath === path;
    }
    return currentPath.startsWith(path);
  };

  // Enhanced navigation class with active state styling
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
      isActive 
        ? "bg-primary text-primary-foreground shadow-sm font-medium" 
        : "hover:bg-secondary text-foreground hover:text-primary"
    }`

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent className="px-3 py-4">
        {/* Enhanced Logo with animation */}
        <div className="flex items-center gap-3 px-3 py-4 mb-6">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg transition-all duration-300 hover:scale-105">
            <Radio className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="transition-opacity duration-200">
              <h1 className="text-lg font-bold text-foreground">Radiance</h1>
              <p className="text-xs text-muted-foreground">Network Management</p>
            </div>
          )}
        </div>

        {/* Management Section with enhanced tooltips */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {managementItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    tooltip={collapsed ? item.description : undefined}
                    isActive={checkIsActive(item.url)}
                  >
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/"} 
                      className={({ isActive }) => getNavCls({ isActive: isActive || checkIsActive(item.url) })}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && (
                        <div className="flex flex-1 items-center justify-between">
                          <span className="truncate">{item.title}</span>
                          {item.badge && (
                            <span className="inline-flex h-5 items-center justify-center rounded-full bg-primary px-2 text-xs font-medium text-primary-foreground">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                  {collapsed && item.badge && (
                    <SidebarMenuBadge>
                      {item.badge}
                    </SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings Section with enhanced tooltips */}
        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Settings
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    tooltip={collapsed ? item.description : undefined}
                    isActive={checkIsActive(item.url)}
                  >
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => getNavCls({ isActive: isActive || checkIsActive(item.url) })}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && <span className="truncate">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Version information */}
        {!collapsed && (
          <div className="mt-auto pt-4 px-3 text-xs text-muted-foreground">
            <p>Radiance NMS v1.0.0</p>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  )
}