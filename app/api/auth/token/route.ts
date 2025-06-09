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

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: TokenRequest = await request.json()
    const { code, state } = body

    if (!code || !state) {
      return NextResponse.json({ error: "Missing code or state parameter" }, { status: 400 })
    }

    const tokenResponse = await exchangeCodeForToken(code)
    //const userInfo = await getUserInfo(tokenResponse.access_token)

    return NextResponse.json({
      success: true,
      token: tokenResponse,
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
