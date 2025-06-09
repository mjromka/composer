"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Search } from "lucide-react"
import { Header } from "@/components/header"
import { TemplateCard } from "@/components/template-card"
import { SearchBar } from "@/components/search-bar"
import { EmptyState } from "@/components/empty-state"

interface Template {
  id: string
  name: string
  description: string
  category: string
  lastModified: string
  status: string
  author: string
}

const templates: Template[] = [
  {
    id: "1",
    name: "Welcome Email Template",
    description: "Onboarding email for new customers with personalized content and call-to-action buttons",
    category: "Email",
    lastModified: "2024-01-15",
    status: "published",
    author: "Sarah Johnson",
  },
  {
    id: "2",
    name: "Sales Proposal Template",
    description: "Comprehensive proposal format for sales team with pricing tables and terms",
    category: "Document",
    lastModified: "2024-01-12",
    status: "draft",
    author: "Mike Chen",
  },
  {
    id: "3",
    name: "Product Launch Announcement",
    description: "Marketing template for product launch communications across multiple channels",
    category: "Marketing",
    lastModified: "2024-01-10",
    status: "published",
    author: "Emily Davis",
  },
  {
    id: "4",
    name: "Support Ticket Response",
    description: "Standard responses for common support issues with escalation procedures",
    category: "Support",
    lastModified: "2024-01-08",
    status: "published",
    author: "Alex Rodriguez",
  },
  {
    id: "5",
    name: "Newsletter Template",
    description: "Monthly newsletter template with sections for news, updates, and featured content",
    category: "Email",
    lastModified: "2024-01-05",
    status: "draft",
    author: "Lisa Wang",
  },
  {
    id: "6",
    name: "Contract Agreement",
    description: "Legal contract template with standard terms and customizable clauses",
    category: "Document",
    lastModified: "2024-01-03",
    status: "published",
    author: "David Brown",
  },
]

export default function WorkspaceTemplatesPage({ params }: { params: { id: string } }) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTemplates = templates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const workspaceName =
    params.id === "1"
      ? "Marketing Team"
      : params.id === "2"
        ? "Sales Department"
        : params.id === "3"
          ? "Customer Support"
          : "Product Team"

  const handleCreateTemplate = (): void => {
    // TODO: Implement template creation
    console.log("Create template clicked")
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header
        breadcrumbs={[
          { label: "Workspaces", href: "/" },
          { label: workspaceName, href: `/workspace/${params.id}` },
        ]}
      />

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
          >
            <Plus className="h-4 w-4 mr-2" />
            New Template
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

        {filteredTemplates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} workspaceId={params.id} />
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
      </main>
    </div>
  )
}
