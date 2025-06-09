import { Template } from "@/interfaces"
import { TemplateDetails } from "@/interfaces/template-details"
import { clientConfig } from "@/lib/config"
import { findControlByAttributeName, findControlByKey } from "@/lib/utils"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapTemplate(rawTemplate: any): Template {
  return {
    id: rawTemplate.objectId,
    name: rawTemplate.name,
    description: findControlByAttributeName(rawTemplate.controls, "templateDescription")?.value || "",
    category: "Sales",
    lastModified: findControlByKey(rawTemplate.controls, "latestActivityDate")?.value || "",
    status: rawTemplate.isDraft ? "draft" : "published",
    author: findControlByKey(rawTemplate.controls, "modifiedBy")?.data[0].name || "",
    imagePath: rawTemplate.imagePath || "",
  }
}

export async function fetchTemplates(token: string, workspaceId: number): Promise<Template[]> {
  const apiUrl = `${clientConfig.api.baseUrl}/Objects/FinderSearch`

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        finderCode: "sys_templates",
        filters: [
          {
            attributeId: 1758,
            value: workspaceId,
          },
        ],
      }),
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`)
    }

    const data = await response.json()
    return (data || []).map(mapTemplate)
  } catch (error) {
    console.error("API Error:", error)
    throw error
  }
}

export async function fetchTemplate(token: string, templateId: string): Promise<TemplateDetails> {
  const apiUrl = `${clientConfig.api.baseUrl}/Objects/Get`

  try {
    const response = await fetch(`${apiUrl}?id=${templateId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`)
    }

    const data = await response.json()
    return {
      id: data.id,
      name: data.name,
      description: data.attributes.templateDescription,
      category: "Sales",
      lastModified: data.modifiedDate,
      status: data.isDraft ? "draft" : "published",
      author: "N/A",
      dataUrl: data.attributes.actionCardsData[0].url,
      tags: ["some", "fake", "tags"],
      imagePath: data.imagePath || "",
    }
  } catch (error) {
    console.error("API Error:", error)
    throw error
  }
}
