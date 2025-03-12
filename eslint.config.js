import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'

/**
 * ESLint configuration for TypeScript React projects, based on defaults
 * from create-vite (https://vite.dev/guide/) and best practices from J. Goldberg
 * (https://www.joshuakgoldberg.com/blog/configuring-eslint-prettier-and-typescript-together/)
 */
export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },
  {
    files: ['**/*.{ts,tsx}'],
    // Set the react version
    settings: { react: { version: '18.3' } },
    // Extend the recommended configs for JS and TypeScript
    extends: [js.configs.recommended, ...tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
      // Set the parser options for TypeScript - suggested by create-vite
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      // Default plugins for React and Vite hot refresh
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // Recommended rules for React and React Hooks
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      // Additional rules for JSX, React Refresh, suggested by create-vite
      ...react.configs['jsx-runtime'].rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      // Disable PropTypes rule (added by jsx-runtime config) - PropTypes are redundant
      // in TypeScript projects
      'react/prop-types': 'off',
    },
  },
  // Enable the rule to report unused ESLint directives, recommended by J. Goldberg
  { linterOptions: { reportUnusedDisableDirectives: 'error' } },
)
