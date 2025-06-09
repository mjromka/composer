# Composer - Template Management System

A modern workspace and template management system with OAuth authentication and dark mode support.

## Environment Setup

1. Copy the environment template:
\`\`\`bash
cp .env.local.example .env.local
\`\`\`

2. Configure your environment variables in `.env.local`:

### OAuth Configuration
- `NEXT_PUBLIC_OAUTH_AUTH_URL`: Linkando OAuth authorization endpoint
- `NEXT_PUBLIC_OAUTH_CLIENT_ID`: Your OAuth client ID
- `NEXT_PUBLIC_OAUTH_REDIRECT_URI`: OAuth callback URL
- `OAUTH_CLIENT_SECRET`: Your OAuth client secret (server-side only)
- `OAUTH_TOKEN_URL`: Token exchange endpoint

### API Configuration
- `NEXT_PUBLIC_API_BASE_URL`: Base URL for Composer API
- `NEXT_PUBLIC_API_WORKSPACES_ENDPOINT`: Workspaces API endpoint

### Demo Mode
- `NEXT_PUBLIC_DEMO_MODE`: Set to "true" for demo/development mode

## OAuth Flow

### Server-Side Token Exchange
Yes, you need a server-side endpoint to securely exchange the OAuth authorization code for an access token. This is implemented in `/app/api/auth/token/route.ts`.

**Why a server is required:**
1. **Security**: Client secrets must never be exposed to client-side code
2. **OAuth Standard**: Authorization code flow requires server-side token exchange
3. **Token Security**: Access tokens should be handled securely on the server

### Real vs Demo Mode

**Demo Mode** (`NEXT_PUBLIC_DEMO_MODE=true`):
- Simulates OAuth flow without external dependencies
- Uses mock API responses
- Perfect for development and testing

**Production Mode** (`NEXT_PUBLIC_DEMO_MODE=false`):
- Redirects to actual Linkando OAuth provider
- Makes real API calls to Composer backend
- Requires valid OAuth credentials

## Development

\`\`\`bash
npm run dev
\`\`\`

## Production Deployment

1. Set up environment variables on your hosting platform
2. Ensure `OAUTH_CLIENT_SECRET` is securely stored
3. Configure proper redirect URIs in your OAuth provider
4. Set `NEXT_PUBLIC_DEMO_MODE=false` for production

## Security Notes

- Never commit `.env.local` to version control
- Keep `OAUTH_CLIENT_SECRET` secure and server-side only
- Use HTTPS in production for OAuth callbacks
- Validate state parameters to prevent CSRF attacks
