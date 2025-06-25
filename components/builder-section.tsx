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
  dataUrl: string
  onChange: (data: unknown, info: unknown) => void
}

export function BuilderSection({ dataUrl, onChange }: BuilderSectionProps) {
  useEffect(() => {
    const root = document.getElementById("root") as HTMLElement & { __composerInitialized?: boolean }

    if (dataUrl && root && !root.__composerInitialized) {
      window.initComposer("root", {
        dataUrl: dataUrl,
        locale: "en-US",
        onChange: onChange,
      })
      root.__composerInitialized = true
    }
  }, [dataUrl, onChange])

  return <div className="h-full" id="root"></div>
}
