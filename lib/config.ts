// Client-side configuration (safe to expose)
export const clientConfig = {
  oauth: {
    authUrl: process.env.NEXT_PUBLIC_OAUTH_AUTH_URL || "https://identity.linkando.co/oauth2/auth",
    clientId: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID || "c1183d0a83ef45bc9769363bc0f400ee",
    redirectUri: process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI || "http://localhost:3000",
    scope: process.env.NEXT_PUBLIC_OAUTH_SCOPE || "Objects,People",
  },
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "https://composer.linkando.com/api",
  },
}

// Server-side configuration (never exposed to client)
export const serverConfig = {
  oauth: {
    clientSecret: process.env.OAUTH_CLIENT_SECRET || "",
    tokenUrl: process.env.OAUTH_TOKEN_URL || "https://identity.linkando.co/oauth2/token",
  },
}
