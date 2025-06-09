"use client"

interface ErrorStateProps {
  message: string
  onRetry?: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="mb-6 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-xl">
      <div className="flex items-center justify-between">
        <p className="text-red-800 dark:text-red-200 font-medium">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 text-sm font-medium"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  )
}
