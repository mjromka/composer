import { Workspace } from "@/interfaces"
import { clientConfig } from "@/lib/config"
import { findControlByKey } from "@/lib/utils"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapWorkspace(rawWorkspace: any): Workspace {
  return {
    id: rawWorkspace.objectId,
    name: rawWorkspace.name,
    description: findControlByKey(rawWorkspace.controls, "description")?.value || "",
    templateCount: rawWorkspace.templateCount || 0,
    memberCount: rawWorkspace.memberCount || 0,
    accessType: rawWorkspace.accessTypeName,
    updatedAt: findControlByKey(rawWorkspace.controls, "latestActivityDate")?.value || "",
    imagePath: rawWorkspace.imagePath || "",
  }
}

export async function fetchWorkspaces(token: string): Promise<Workspace[]> {
  const apiUrl = `${clientConfig.api.baseUrl}/Objects/FinderSearch`

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        finderCode: "sys_workgroups",
      }),
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`)
    }

    const data = await response.json()
    return (data || []).map(mapWorkspace)
  } catch (error) {
    console.error("API Error:", error)
    throw error
  }
}
