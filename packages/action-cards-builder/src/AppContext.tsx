import { createContext, useState, useEffect, ReactNode, useMemo } from 'react'
import { ActionCard } from '@playbooks/core/src/ActionCard'
import { AppContextType } from './interfaces/AppContextType'
import { useAppContext } from './hooks/useAppContext'
import { ComposerSettings } from './interfaces/ComposerSettings'
import { ChangeInfo } from './interfaces/ChangeInfo'

// eslint-disable-next-line react-refresh/only-export-components
export const Context = createContext<AppContextType | undefined>(undefined)

export const AppContext = ({ children, settings }: { children: ReactNode; settings: ComposerSettings }) => {
  const [data, setData] = useState<ActionCard | undefined>(undefined)
  const [isDarkMode, setIsDarkMode] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches)

  useEffect(() => {
    fetch(settings.dataUrl)
      .then(response => response.json() as Promise<ActionCard>)
      .then(data => setData(data))
      .catch(error => console.error('Error loading data:', error))
  }, [settings.dataUrl])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      setIsDarkMode(mediaQuery.matches)
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const context = useMemo(
    () => ({
      actionCard: data,
      isDarkMode: isDarkMode,
      onChange: (updatedData: ActionCard, info?: ChangeInfo) => {
        setData(updatedData)
        if (settings.onChange) {
          settings.onChange(updatedData, info)
        }
      },
    }),
    [data, isDarkMode, settings],
  )

  useEffect(() => {
    useAppContext.getState = () => context
  }, [context])
  return <Context.Provider value={context}>{children}</Context.Provider>
}
