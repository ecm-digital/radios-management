import { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

interface ErrorStateProps {
  icon?: ReactNode
  title?: string
  description?: string
  retry?: {
    label?: string
    onClick: () => void
    loading?: boolean
  }
  className?: string
  variant?: 'card' | 'inline'
}

export function ErrorState({
  icon = <AlertTriangle className="w-8 h-8" />,
  title = "Something went wrong",
  description = "We encountered an error while loading this content.",
  retry,
  className,
  variant = 'card'
}: ErrorStateProps) {
  const content = (
    <div className={cn(
      "flex flex-col items-center justify-center py-8 px-4 text-center",
      className
    )}>
      <div className="mb-4 text-[#f5222d]">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-muted-foreground mb-6 max-w-sm">
          {description}
        </p>
      )}
      {retry && (
        <Button 
          onClick={retry.onClick} 
          variant="outline"
          disabled={retry.loading}
          className="flex items-center gap-2"
        >
          <RefreshCw className={cn("w-4 h-4", retry.loading && "animate-spin")} />
          {retry.label || "Try Again"}
        </Button>
      )}
    </div>
  )

  if (variant === 'card') {
    return (
      <Card className="border-[#ffccc7] bg-[#fff2f0]">
        <CardContent className="p-0">
          {content}
        </CardContent>
      </Card>
    )
  }

  return content
}