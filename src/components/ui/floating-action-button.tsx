import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Plus, X, Router, AlertTriangle, BarChart3, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

interface FloatingAction {
  icon: React.ComponentType<{ className?: string }>
  label: string
  onClick: () => void
  color?: string
}

interface FloatingActionButtonProps {
  actions?: FloatingAction[]
  className?: string
}

export function FloatingActionButton({ 
  actions,
  className 
}: FloatingActionButtonProps) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false)

  const defaultActions: FloatingAction[] = [
    {
      icon: Router,
      label: "Add Device",
      onClick: () => navigate("/devices"),
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      icon: AlertTriangle,
      label: "View Alerts",
      onClick: () => navigate("/alerts"),
      color: "bg-red-500 hover:bg-red-600"
    },
    {
      icon: BarChart3,
      label: "Analytics",
      onClick: () => navigate("/analytics"),
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      icon: Settings,
      label: "Settings",
      onClick: () => navigate("/system-settings"),
      color: "bg-gray-500 hover:bg-gray-600"
    }
  ]

  const finalActions = actions || defaultActions;

  return (
    <TooltipProvider>
      <div className={cn("fixed bottom-6 right-6 z-50", className)}>
        {/* Action buttons */}
        <div className={cn(
          "flex flex-col-reverse gap-3 mb-3 transition-all duration-300",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}>
          {finalActions.map((action, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  className={cn(
                    "w-12 h-12 rounded-full shadow-lg transition-all duration-300 hover:scale-110",
                    action.color || "bg-primary hover:bg-primary/90",
                    "animate-in fade-in-0 slide-in-from-bottom-2"
                  )}
                  style={{ 
                    animationDelay: `${index * 50}ms`,
                    animationFillMode: 'both'
                  }}
                  onClick={() => {
                    action.onClick()
                    setIsOpen(false)
                  }}
                >
                  <action.icon className="w-5 h-5 text-white" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>{action.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        {/* Main FAB button */}
        <Button
          size="lg"
          className={cn(
            "w-14 h-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-110 animate-pulse-glow",
            isOpen && "rotate-45"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white transition-transform duration-300" />
          ) : (
            <Plus className="w-6 h-6 text-white transition-transform duration-300" />
          )}
        </Button>
      </div>
    </TooltipProvider>
  )
}