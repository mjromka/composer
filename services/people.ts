import { User } from "@/interfaces"
import { clientConfig } from "@/lib/config"

export async function fetchProfile(token: string): Promise<User> {
  const apiUrl = `${clientConfig.api.baseUrl}/people/get`
  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`)
    }

    const userData = await response.json()
    return {
      id: userData.id,
      name: userData.fullName,
      email: userData.email,
      avatar: userData.avatar || undefined,
    }
  } catch (error) {
    console.error("API Error:", error)
    throw error
  }
}
