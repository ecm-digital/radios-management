import { useToast, Toast } from "@/hooks/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, CheckCircle, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ToastProps {
  toast: Toast
  onDismiss: (id: string) => void
}

function ToastComponent({ toast, onDismiss }: ToastProps) {
  const getIcon = () => {
    switch (toast.variant) {
      case "destructive":
        return <AlertTriangle className="w-5 h-5 text-red-500" />
      default:
        return <CheckCircle className="w-5 h-5 text-green-500" />
    }
  }

  const getVariantStyles = () => {
    switch (toast.variant) {
      case "destructive":
        return "border-red-200 bg-red-50"
      default:
        return "border-green-200 bg-green-50"
    }
  }

  return (
    <Card className={cn(
      "animate-in slide-in-from-right-full duration-300 shadow-lg",
      getVariantStyles()
    )}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {getIcon()}
          <div className="flex-1 space-y-1">
            {toast.title && (
              <p className="font-medium text-sm">{toast.title}</p>
            )}
            {toast.description && (
              <p className="text-sm text-muted-foreground">{toast.description}</p>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDismiss(toast.id)}
            className="p-1 h-auto"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function ToastContainer() {
  const { toasts, dismiss } = useToast()

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {toasts.map(toast => (
        <ToastComponent
          key={toast.id}
          toast={toast}
          onDismiss={dismiss}
        />
      ))}
    </div>
  )
}