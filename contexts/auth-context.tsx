"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { clientConfig } from "@/lib/config"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  initiateOAuth: () => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored token on mount
    const storedToken = localStorage.getItem("composer_token")
    const storedUser = localStorage.getItem("composer_user")

    if (storedToken && storedUser) {
      try {
        setToken(storedToken)
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse stored user data:", error)
        localStorage.removeItem("composer_token")
        localStorage.removeItem("composer_user")
      }
    }

    // Handle OAuth callback
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get("code")
    const state = urlParams.get("state")

    if (code && state) {
      handleOAuthCallback(code, state)
    } else {
      setIsLoading(false)
    }
  }, [])

  const generateState = (): string => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  const initiateOAuth = (): void => {
    const state = generateState()
    localStorage.setItem("oauth_state", state)

    if (clientConfig.demo.enabled) {
      // Demo mode: simulate OAuth flow
      simulateOAuthFlow(state)
    } else {
      // Real OAuth: redirect to provider
      const authUrl = new URL(clientConfig.oauth.authUrl)
      authUrl.searchParams.set("client_id", clientConfig.oauth.clientId)
      authUrl.searchParams.set("redirect_uri", clientConfig.oauth.redirectUri)
      authUrl.searchParams.set("scope", clientConfig.oauth.scope)
      authUrl.searchParams.set("response_type", "code")
      authUrl.searchParams.set("state", state)

      window.location.href = authUrl.toString()
    }
  }

  const simulateOAuthFlow = async (state: string): Promise<void> => {
    setIsLoading(true)

    // Simulate OAuth provider redirect and user interaction
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock successful OAuth response
    const mockCode = "demo_auth_code_" + Date.now()

    // Simulate redirect back to our app with code
    const newUrl = `${window.location.origin}?code=${mockCode}&state=${state}`
    window.history.pushState({}, "", newUrl)

    // Handle the callback
    await handleOAuthCallback(mockCode, state)
  }

  const handleOAuthCallback = async (code: string, state: string): Promise<void> => {
    setIsLoading(true)

    try {
      // Verify state parameter
      const storedState = localStorage.getItem("oauth_state")
      if (state !== storedState) {
        throw new Error("Invalid state parameter")
      }

      // Exchange code for token using our server endpoint
      const response = await fetch("/api/auth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, state }),
      })

      if (!response.ok) {
        throw new Error("Token exchange failed")
      }

      const data = await response.json()

      if (data.success && data.token && data.user) {
        setToken(data.token.access_token)
        setUser(data.user)

        // Store in localStorage
        localStorage.setItem("composer_token", data.token.access_token)
        localStorage.setItem("composer_user", JSON.stringify(data.user))

        // Clean up OAuth state and URL
        localStorage.removeItem("oauth_state")
        window.history.replaceState({}, "", window.location.pathname)
      } else {
        throw new Error("Invalid response from token exchange")
      }
    } catch (error) {
      console.error("OAuth callback error:", error)
      // Clear any stored state on error
      localStorage.removeItem("oauth_state")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = (): void => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("composer_token")
    localStorage.removeItem("composer_user")
    localStorage.removeItem("oauth_state")
  }

  return (
    <AuthContext.Provider value={{ user, token, initiateOAuth, logout, isLoading }}>{children}</AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
