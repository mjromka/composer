"use client"

import { useEffect, useMemo, useState, use, useCallback } from "react" // Import React.use
import { Button } from "@/components/ui/button"
import { Loader2, Plus, Search } from "lucide-react"
import { Header } from "@/components/header"
import { TemplateCard } from "@/components/template-card"
import { SearchBar } from "@/components/search-bar"
import { EmptyState } from "@/components/empty-state"
import { useWorkspaceStore } from "@/store/workspaceStore"
import { Template } from "@/interfaces"
import { createTemplate, fetchTemplates } from "@/services/templates"
import { useAuth } from "@/contexts/auth-context"
import { LoadingState } from "@/components/loading-state"
import { ErrorState } from "@/components/error-state"
import { useRouter } from "next/navigation"

export default function WorkspaceTemplatesPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const unwrappedParams = use(params)
  const [searchTerm, setSearchTerm] = useState("")
  const { token } = useAuth()
  const [templates, setTemplates] = useState<Template[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState("")
  const selectedWorkspace = useWorkspaceStore((state) => state.selectedWorkspace)
  const filteredTemplates = useMemo(() => {
    return templates.filter(
      (template) =>
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.category.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [templates, searchTerm])

  const loadTemplates = useCallback(async (): Promise<void> => {
    if (!token) {
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await fetchTemplates(token, parseInt(unwrappedParams.id))
      setTemplates(response)
    } catch (err) {
      console.error("Error loading templates:", err)
      setError("Error connecting to API")
    } finally {
      setIsLoading(false)
    }
  }, [token, unwrappedParams.id])

  useEffect(() => {
    if (token) {
      loadTemplates()
    }
  }, [token, loadTemplates])

  const workspaceName = selectedWorkspace?.name || "Workspace Templates"

  const handleCreateTemplate = async (): Promise<void> => {
    if (!token) {
      return
    }

    setIsCreating(true)
    setError("")

    try {
      // Create a new template with default values
      const templateId = await createTemplate(token, "New Template", parseInt(unwrappedParams.id))

      // Navigate to the new template page
      router.push(`/workspace/${unwrappedParams.id}/template/${templateId}`)
    } catch (err) {
      console.error("Error creating template:", err)
      setError("Error creating template")
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header breadcrumbs={[{ label: workspaceName, href: `/workspace/${unwrappedParams.id}` }]} />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{workspaceName}</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your templates and configurations • {filteredTemplates.length} templates
            </p>
          </div>
          <Button
            onClick={handleCreateTemplate}
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            disabled={isCreating}
          >
            {isCreating ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                New Template
              </>
            )}
          </Button>
        </div>

        <div className="mb-8">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search templates..."
            className="max-w-md"
          />
        </div>
        {error && <ErrorState message={error} onRetry={loadTemplates} />}
        {isLoading ? (
          <LoadingState title="Loading templates" description="Please wait while we fetch your data..." />
        ) : (
          <>
            {filteredTemplates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => (
                  <TemplateCard key={template.id} template={template} workspaceId={unwrappedParams.id} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={searchTerm ? Search : Plus}
                title={searchTerm ? "No templates found" : "No templates yet"}
                description={
                  searchTerm
                    ? `No templates match "${searchTerm}". Try adjusting your search terms.`
                    : "Get started by creating your first template for this workspace."
                }
                actionLabel="Create Template"
                onAction={handleCreateTemplate}
              />
            )}
          </>
        )}
      </main>
    </div>
  )
}
