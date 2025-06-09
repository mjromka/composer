"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    initComposer: (
      elementId: string,
      options: {
        dataUrl: string
        locale: string
        onChange: (data: unknown, info: unknown) => void
      },
    ) => void
  }
}

interface BuilderSectionProps {
  templateId: string
  dataUrl: string
}

export function BuilderSection({ dataUrl }: BuilderSectionProps) {
  useEffect(() => {
    const root = document.getElementById("root") as HTMLElement & { __composerInitialized?: boolean }

    if (dataUrl && root && !root.__composerInitialized) {
      window.initComposer("root", {
        dataUrl: dataUrl,
        locale: "en-US",
        onChange: (data: unknown, info: unknown) => {
          console.log("💾", data, info)
        },
      })
      root.__composerInitialized = true
    }
  }, [dataUrl])

  return <div className="h-full" id="root"></div>
}
