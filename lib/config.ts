// Client-side configuration (safe to expose)
export const clientConfig = {
  oauth: {
    authUrl: process.env.NEXT_PUBLIC_OAUTH_AUTH_URL || "https://identity.linkando.com/oauth/auth",
    clientId: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID || "composer_client_id_demo",
    redirectUri: process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI || "http://localhost:3000/auth/callback",
    scope: process.env.NEXT_PUBLIC_OAUTH_SCOPE || "read write",
  },
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "https://composer.linkando.com/api",
    workspacesEndpoint: process.env.NEXT_PUBLIC_API_WORKSPACES_ENDPOINT || "/Objects/FinderSearch",
  },
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || "Composer",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  },
  demo: {
    enabled: process.env.NEXT_PUBLIC_DEMO_MODE === "true",
  },
}

// Server-side configuration (never exposed to client)
export const serverConfig = {
  oauth: {
    clientSecret: process.env.OAUTH_CLIENT_SECRET || "composer_client_secret_demo_keep_secure",
    tokenUrl: process.env.OAUTH_TOKEN_URL || "https://identity.linkando.com/oauth/token",
  },
}
