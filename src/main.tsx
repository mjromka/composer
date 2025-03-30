import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider, theme } from 'antd'
import App from './App.tsx'
import { AppContext } from './AppContext.tsx'
import { useAppContext } from './hooks/useAppContext.ts'
import styles from './assets/styles.css?inline'
import { StyleProvider } from '@ant-design/cssinjs'
import { ComposerSettings } from './interfaces/ComposerSettings.ts'

// eslint-disable-next-line react-refresh/only-export-components
const Root: React.FC<{ container: HTMLElement }> = ({ container }) => {
  const { isDarkMode } = useAppContext()

  return (
    <ConfigProvider
      getPopupContainer={() => {
        return container
      }}
      theme={{ cssVar: true, algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm }}
    >
      <App />
    </ConfigProvider>
  )
}

export const initComposer = (containerId: string, settings: ComposerSettings) => {
  const rootElement = document.getElementById(containerId)
  if (!rootElement) {
    console.error(`Container with ID "${containerId}" not found.`)
    return
  }

  const shadowRoot = rootElement.attachShadow({ mode: 'open' })

  const el: HTMLStyleElement = document.createElement('style')
  el.textContent = styles
  shadowRoot.appendChild(el)

  createRoot(shadowRoot).render(
    <StrictMode>
      <AppContext settings={settings}>
        <StyleProvider container={shadowRoot}>
          <Root container={shadowRoot as unknown as HTMLElement} />
        </StyleProvider>
      </AppContext>
    </StrictMode>,
  )
}

declare global {
  interface Window {
    initComposer: typeof initComposer
  }
}

window.initComposer = initComposer
