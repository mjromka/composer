"use client"

import { Loader2 } from "lucide-react"

interface LoadingStateProps {
  title?: string
  description?: string
  size?: "sm" | "md" | "lg"
}

export function LoadingState({ title = "Loading", description, size = "md" }: LoadingStateProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  }

  const textSizeClasses = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-xl",
  }

  return (
    <div className="flex items-center justify-center py-16">
      <div className="text-center">
        <Loader2 className={`${sizeClasses[size]} animate-spin text-blue-600 dark:text-blue-400 mx-auto mb-4`} />
        <p className={`${textSizeClasses[size]} font-medium text-gray-900 dark:text-white`}>{title}</p>
        {description && <p className="text-gray-600 dark:text-gray-400 mt-1">{description}</p>}
      </div>
    </div>
  )
}
