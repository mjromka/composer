"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Building2, RefreshCw } from "lucide-react"
import { Header } from "@/components/header"
import { AuthDialog } from "@/components/auth-dialog"
import { WorkspaceCard } from "@/components/workspace-card"
import { LoadingState } from "@/components/loading-state"
import { ErrorState } from "@/components/error-state"
import { EmptyState } from "@/components/empty-state"
import { useAuth } from "@/contexts/auth-context"
import { fetchWorkspaces } from "@/services/workspaces"
import { Workspace } from "@/interfaces"

export default function WorkspacesPage() {
  const { user, token, initiateOAuth, isLoading: authLoading } = useAuth()
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const loadWorkspaces = useCallback(async (): Promise<void> => {
    if (!token) {
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await fetchWorkspaces(token)
      setWorkspaces(response)
    } catch (err) {
      console.error("Error loading workspaces:", err)
      setError("Error connecting to API")
    } finally {
      setIsLoading(false)
    }
  }, [token])

  useEffect(() => {
    if (token) {
      loadWorkspaces()
    }
  }, [token, loadWorkspaces])

  const handleCreateWorkspace = (): void => {
    // TODO: Implement workspace creation
    console.log("Create workspace clicked")
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header breadcrumbs={[]} />

      <main className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Workspaces</h1>
            <p className="text-gray-600 dark:text-gray-400">
              {user ? "Select a workspace to manage your templates" : "Sign in to access your workspaces and templates"}
            </p>
          </div>
          {user && token && (
            <Button variant="outline" onClick={loadWorkspaces} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          )}
        </div>

        {/* Show authentication dialog if not authenticated */}
        {!user || !token ? (
          <AuthDialog onLogin={initiateOAuth} isLoading={authLoading} />
        ) : (
          <>
            {/* Show error if any */}
            {error && <ErrorState message={error} onRetry={loadWorkspaces} />}

            {/* Show loading state */}
            {isLoading ? (
              <LoadingState title="Loading workspaces" description="Please wait while we fetch your data..." />
            ) : (
              <>
                {/* Show workspaces grid */}
                {workspaces.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {workspaces.map((workspace) => (
                      <WorkspaceCard key={workspace.id} workspace={workspace} />
                    ))}
                  </div>
                ) : (
                  /* Show empty state */
                  <EmptyState
                    icon={Building2}
                    title="No workspaces found"
                    description="Get started by creating your first workspace to organize your templates and collaborate with your team."
                    actionLabel="Create Workspace"
                    onAction={handleCreateWorkspace}
                  />
                )}
              </>
            )}
          </>
        )}
      </main>
    </div>
  )
}
