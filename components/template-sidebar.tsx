"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Settings, Code, Zap } from "lucide-react"

interface TemplateSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

const navigationItems = [
  {
    id: "general",
    label: "General",
    icon: Settings,
    description: "Basic template information and actions",
  },
  {
    id: "builder",
    label: "Builder",
    icon: Code,
    description: "Edit template structure and content",
  },
  {
    id: "integrations",
    label: "Integrations",
    icon: Zap,
    description: "CRM system mappings and connections",
  },
]

export function TemplateSidebar({ activeSection, onSectionChange }: TemplateSidebarProps) {
  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 min-h-screen">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Template Settings</h2>
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start h-auto p-3",
                  activeSection === item.id &&
                    "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900",
                )}
                onClick={() => onSectionChange(item.id)}
              >
                <div className="flex items-start space-x-3">
                  <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div className="text-left">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.description}</div>
                  </div>
                </div>
              </Button>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
