import { clientConfig } from "@/lib/config"

interface Workspace {
  id: string
  name: string
  description: string
  templateCount: number
  memberCount: number
  status: "active" | "inactive"
  createdAt: string
  updatedAt: string
}

interface ApiResponse {
  success: boolean
  data: Workspace[]
  total: number
  page: number
  limit: number
}

// Mock data that simulates API response
const mockWorkspaces: Workspace[] = [
  {
    id: "ws_001",
    name: "Marketing Automation Hub",
    description:
      "Comprehensive email templates and campaign workflows for marketing initiatives and customer engagement",
    templateCount: 24,
    memberCount: 12,
    status: "active",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-20T14:45:00Z",
  },
  {
    id: "ws_002",
    name: "Sales Operations Center",
    description: "Sales proposals, contract templates, and client communication workflows for the sales department",
    templateCount: 18,
    memberCount: 8,
    status: "active",
    createdAt: "2024-01-10T09:15:00Z",
    updatedAt: "2024-01-18T16:20:00Z",
  },
  {
    id: "ws_003",
    name: "Customer Support Knowledge Base",
    description: "Support ticket responses, FAQ templates, and customer service documentation management system",
    templateCount: 31,
    memberCount: 15,
    status: "active",
    createdAt: "2024-01-05T11:00:00Z",
    updatedAt: "2024-01-19T13:30:00Z",
  },
  {
    id: "ws_004",
    name: "Product Documentation Suite",
    description: "Technical documentation templates, API guides, and product specification management tools",
    templateCount: 12,
    memberCount: 6,
    status: "inactive",
    createdAt: "2023-12-20T14:20:00Z",
    updatedAt: "2024-01-02T10:15:00Z",
  },
  {
    id: "ws_005",
    name: "Legal Document Templates",
    description: "Contract templates, legal notices, and compliance documentation for legal department workflows",
    templateCount: 9,
    memberCount: 4,
    status: "active",
    createdAt: "2024-01-08T08:45:00Z",
    updatedAt: "2024-01-17T12:10:00Z",
  },
  {
    id: "ws_006",
    name: "HR Onboarding System",
    description: "Employee onboarding templates, policy documents, and HR communication workflows",
    templateCount: 16,
    memberCount: 7,
    status: "active",
    createdAt: "2024-01-12T13:25:00Z",
    updatedAt: "2024-01-21T09:40:00Z",
  },
]

export async function fetchWorkspaces(token: string): Promise<ApiResponse> {
  const apiUrl = `${clientConfig.api.baseUrl}${clientConfig.api.workspacesEndpoint}`

  if (clientConfig.demo.enabled) {
    // Demo mode: return mock data
    await new Promise((resolve) => setTimeout(resolve, 800))
    return {
      success: true,
      data: mockWorkspaces,
      total: mockWorkspaces.length,
      page: 1,
      limit: 50,
    }
  }

  // Real API call
  try {
    const response = await fetch(apiUrl, {
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
      success: true,
      data: data.workspaces || [],
      total: data.total || 0,
      page: data.page || 1,
      limit: data.limit || 50,
    }
  } catch (error) {
    console.error("API Error:", error)
    throw error
  }
}
