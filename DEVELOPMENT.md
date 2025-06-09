# Development Guidelines

## Code Quality Standards

This project uses ESLint and Prettier to maintain consistent code quality and formatting.

### ESLint Configuration

Our ESLint setup includes:
- **Next.js Core Web Vitals**: Essential rules for Next.js applications
- **TypeScript**: Type-aware linting rules
- **React**: React-specific best practices
- **React Hooks**: Hooks rules and dependency checking
- **Accessibility**: JSX accessibility rules
- **Import Organization**: Consistent import ordering

### Key Rules

#### TypeScript
- No unused variables (with underscore prefix exception)
- Prefer const over let
- No explicit any (warning)
- No var declarations

#### React
- No unescaped entities in JSX
- Required keys for list items
- Proper hooks usage
- No deprecated React features

#### Accessibility
- Alt text for images
- Proper ARIA attributes
- Valid anchor elements
- Role-based accessibility

#### Code Style
- Double quotes for strings
- No semicolons
- Trailing commas in multiline
- 2-space indentation
- 120 character line length

### Running Linting

\`\`\`bash
# Check for linting errors
npm run lint

# Fix auto-fixable linting errors
npm run lint:fix

# Format code with Prettier
npm run format

# Check formatting without fixing
npm run format:check

# Run all checks (TypeScript, ESLint, Prettier)
npm run check-all
\`\`\`

### Pre-commit Workflow

Before committing code:

1. **Type Check**: `npm run type-check`
2. **Lint**: `npm run lint:fix`
3. **Format**: `npm run format`
4. **Test**: Ensure all functionality works

### IDE Setup

#### VS Code
Install these extensions:
- ESLint
- Prettier - Code formatter
- TypeScript Importer

#### Settings
Add to your VS Code settings.json:
\`\`\`json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  }
}
\`\`\`

### Common Fixes

#### Import Organization
\`\`\`typescript
// ✅ Correct order
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"

// ❌ Wrong order
import { useAuth } from "@/contexts/auth-context"
import { useState } from "react"
import { Button } from "@/components/ui/button"
\`\`\`

#### Function Declarations
\`\`\`typescript
// ✅ Explicit return types for exported functions
export function fetchData(): Promise<Data> {
  return fetch("/api/data")
}

// ✅ Arrow functions for internal use
const handleClick = (): void => {
  console.log("clicked")
}
\`\`\`

#### Error Handling
\`\`\`typescript
// ✅ Proper error handling
try {
  const data = await fetchData()
  setData(data)
} catch (error) {
  console.error("Failed to fetch data:", error)
  setError("Failed to load data")
}

// ❌ Silent failures
try {
  const data = await fetchData()
  setData(data)
} catch {
  // Silent failure
}
\`\`\`

### Accessibility Guidelines

- Always provide alt text for images
- Use semantic HTML elements
- Ensure proper heading hierarchy
- Include ARIA labels for interactive elements
- Maintain proper color contrast ratios
- Support keyboard navigation

### Performance Best Practices

- Use React.memo for expensive components
- Implement proper dependency arrays for useEffect
- Avoid inline object/function creation in render
- Use proper loading states
- Implement error boundaries

### Security Guidelines

- Never expose sensitive data to client-side
- Validate all user inputs
- Use proper CSRF protection
- Implement proper authentication checks
- Sanitize data before rendering
