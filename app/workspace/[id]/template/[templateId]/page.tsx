"use client"

import { useCallback, useEffect, useState } from "react"
import { use } from "react"
import { Header } from "@/components/header"
import { TemplateSidebar } from "@/components/template-sidebar"
import { GeneralSection } from "@/components/general-section"
import { BuilderSection } from "@/components/builder-section"
import { IntegrationsSection } from "@/components/integrations-section"
import { useAuth } from "@/contexts/auth-context"
import { fetchTemplate } from "@/services/templates"
import { ErrorState } from "@/components/error-state"
import { LoadingState } from "@/components/loading-state"
import { useWorkspaceStore } from "@/store/workspaceStore"
import { TemplateDetails } from "@/interfaces/template-details"

export default function TemplateDetailPage({ params }: { params: Promise<{ id: string; templateId: string }> }) {
  const unwrappedParams = use(params)
  const [activeSection, setActiveSection] = useState("general")
  const { token } = useAuth()
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [templateData, setTemplateData] = useState<TemplateDetails | null>(null)
  const selectedWorkspace = useWorkspaceStore((state) => state.selectedWorkspace)

  const loadTemplate = useCallback(async (): Promise<void> => {
    if (!token) {
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await fetchTemplate(token, unwrappedParams.templateId)
      setTemplateData(response)
    } catch (err) {
      console.error("Error loading template JSON:", err)
      setError("Error connecting to API")
    } finally {
      setIsLoading(false)
    }
  }, [token, unwrappedParams.templateId])

  useEffect(() => {
    if (token) {
      loadTemplate()
    }
  }, [token, loadTemplate])

  const renderContent = (template: TemplateDetails) => {
    switch (activeSection) {
      case "general":
        return <GeneralSection template={template} />
      case "builder":
        return <BuilderSection template={template} />
      case "integrations":
        return <IntegrationsSection templateId={unwrappedParams.templateId} />
      default:
        return <GeneralSection template={template} />
    }
  }

  return (
    <div className="min-h-screen h-full flex flex-col bg-gray-50 dark:bg-gray-950">
      <Header
        breadcrumbs={[
          { label: selectedWorkspace?.name || "...", href: `/workspace/${unwrappedParams.id}` },
          {
            label: templateData?.name || "...",
            href: `/workspace/${unwrappedParams.id}/template/${unwrappedParams.templateId}`,
          },
        ]}
      />

      <div className="flex flex-1 overflow-hidden">
        <TemplateSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        {error && <ErrorState message={error} onRetry={loadTemplate} />}
        {isLoading ? (
          <div className="w-full p-8 flex items-center justify-center">
            <LoadingState title="Loading template" description="Please wait while we fetch your data..." />
          </div>
        ) : (
          <>
            {templateData && (
              <main className="flex-1 h-full bg-gray-50 dark:bg-gray-950">{renderContent(templateData)}</main>
            )}
          </>
        )}
      </div>
    </div>
  )
}
