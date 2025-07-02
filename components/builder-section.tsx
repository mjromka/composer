"use client"

import { useAuth } from "@/contexts/auth-context"
import { TemplateDetails } from "@/interfaces/template-details"
import { saveActionCard } from "@/services/templates"
import { useCallback, useEffect } from "react"

declare global {
  interface Window {
    initComposer: (
      elementId: string,
      options: {
        dataUrl: string
        locale: string
        onChange: (data: { version: number }) => void
        templateId: string
      },
    ) => void
  }
}

interface BuilderSectionProps {
  template: TemplateDetails
}

export function BuilderSection({ template }: BuilderSectionProps) {
  const { token } = useAuth()

  const handleActionCardsChange = useCallback(
    async (data: { version: number }): Promise<void> => {
      console.log("💾", data)
      if (!token || !template.id) {
        console.error("Token or templateId is missing")
        return
      }
      data.version = (data.version || 0) + 1

      await saveActionCard(token, template.id, "actionCardsData", data)
    },
    [token, template.id],
  )

  useEffect(() => {
    const root = document.getElementById("root") as HTMLElement & { __composerInitialized?: boolean }

    if (root && !root.__composerInitialized) {
      window.initComposer("root", {
        dataUrl: template.dataUrl || "",
        locale: "en-US",
        onChange: handleActionCardsChange,
        templateId: template.id,
      })
      root.__composerInitialized = true
    }
  }, [template.dataUrl, handleActionCardsChange, template.id])

  return <div className="h-full" id="root"></div>
}
