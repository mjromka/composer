import { type NextRequest, NextResponse } from "next/server"
import { serverConfig, clientConfig } from "@/lib/config"

interface TokenRequest {
  code: string
  state: string
}

interface TokenResponse {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token: string
  scope: string
}

interface UserInfo {
  id: string
  name: string
  email: string
  avatar?: string
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: TokenRequest = await request.json()
    const { code, state } = body

    if (!code || !state) {
      return NextResponse.json({ error: "Missing code or state parameter" }, { status: 400 })
    }

    // In demo mode, return mock data
    if (clientConfig.demo.enabled) {
      return handleDemoTokenExchange(code, state)
    }

    // Real OAuth token exchange
    const tokenResponse = await exchangeCodeForToken(code)
    const userInfo = await getUserInfo(tokenResponse.access_token)

    return NextResponse.json({
      success: true,
      token: tokenResponse,
      user: userInfo,
    })
  } catch (error) {
    console.error("OAuth token exchange error:", error)
    return NextResponse.json({ error: "Token exchange failed" }, { status: 500 })
  }
}

async function exchangeCodeForToken(code: string): Promise<TokenResponse> {
  const tokenUrl = serverConfig.oauth.tokenUrl
  const clientId = clientConfig.oauth.clientId
  const clientSecret = serverConfig.oauth.clientSecret
  const redirectUri = clientConfig.oauth.redirectUri

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
  })

  if (!response.ok) {
    throw new Error(`Token exchange failed: ${response.statusText}`)
  }

  return response.json()
}

async function getUserInfo(accessToken: string): Promise<UserInfo> {
  // This would typically call the user info endpoint
  // For now, we'll mock this as well
  const response = await fetch("https://identity.linkando.com/oauth/userinfo", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    throw new Error(`User info fetch failed: ${response.statusText}`)
  }

  return response.json()
}

// Mock implementation for demo mode
async function handleDemoTokenExchange(_code: string, _state: string): Promise<NextResponse> {
  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const mockTokenResponse: TokenResponse = {
    access_token: `demo_token_${Date.now()}_${Math.random().toString(36).substring(7)}`,
    token_type: "Bearer",
    expires_in: 3600,
    refresh_token: `demo_refresh_${Date.now()}_${Math.random().toString(36).substring(7)}`,
    scope: clientConfig.oauth.scope,
  }

  const mockUserInfo: UserInfo = {
    id: "demo_user_123",
    name: "John Doe",
    email: "john.doe@linkando.com",
    avatar: "/placeholder.svg?height=40&width=40",
  }

  return NextResponse.json({
    success: true,
    token: mockTokenResponse,
    user: mockUserInfo,
  })
}
