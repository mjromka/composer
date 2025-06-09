"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { TemplateSidebar } from "@/components/template-sidebar"
import { GeneralSection } from "@/components/general-section"
import { BuilderSection } from "@/components/builder-section"
import { IntegrationsSection } from "@/components/integrations-section"

export default function TemplateDetailPage({
  params,
}: {
  params: { id: string; templateId: string }
}) {
  const [activeSection, setActiveSection] = useState("general")

  const workspaceName =
    params.id === "1"
      ? "Marketing Team"
      : params.id === "2"
        ? "Sales Department"
        : params.id === "3"
          ? "Customer Support"
          : "Product Team"

  const templateName =
    params.templateId === "1"
      ? "Welcome Email Template"
      : params.templateId === "2"
        ? "Sales Proposal Template"
        : params.templateId === "3"
          ? "Product Launch Announcement"
          : "Support Ticket Response"

  const renderContent = () => {
    switch (activeSection) {
      case "general":
        return <GeneralSection templateId={params.templateId} />
      case "builder":
        return <BuilderSection templateId={params.templateId} />
      case "integrations":
        return <IntegrationsSection templateId={params.templateId} />
      default:
        return <GeneralSection templateId={params.templateId} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header
        breadcrumbs={[
          { label: "Workspaces", href: "/" },
          { label: workspaceName, href: `/workspace/${params.id}` },
          { label: templateName, href: `/workspace/${params.id}/template/${params.templateId}` },
        ]}
      />

      <div className="flex">
        <TemplateSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <main className="flex-1 p-8 bg-gray-50 dark:bg-gray-950">{renderContent()}</main>
      </div>
    </div>
  )
}
