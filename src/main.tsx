import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider, theme } from 'antd'
import './index.css'
import App from './App.tsx'
import { AppContext } from './AppContext.tsx'
import { useAppContext } from './hooks/useAppContext.ts'

// eslint-disable-next-line react-refresh/only-export-components
const Root = () => {
  const { isDarkMode } = useAppContext()

  return (
    <ConfigProvider theme={{ cssVar: true, algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
      <App />
    </ConfigProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppContext>
      <Root />
    </AppContext>
  </StrictMode>,
)
