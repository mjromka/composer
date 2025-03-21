import { createContext, useState, useEffect, ReactNode, useMemo } from 'react'
import { ActionCard } from './interfaces/ActionCard'
import { AppContextType } from './interfaces/AppContextType'
import { useAppContext } from './hooks/useAppContext'

// eslint-disable-next-line react-refresh/only-export-components
export const Context = createContext<AppContextType | undefined>(undefined)
const urlParams = new URLSearchParams(window.location.search)

export const AppContext = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<ActionCard | undefined>(undefined)
  const [isDarkMode, setIsDarkMode] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches)

  useEffect(() => {
    const template = urlParams.get('template')
    fetch(template ? template : '/data.json')
      .then(response => response.json() as Promise<ActionCard>)
      .then(data => setData(data))
      .catch(error => console.error('Error loading data:', error))
  }, [])

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
      onChange: (updatedData: ActionCard) => {
        console.log('💾 Data changed:', updatedData)
        setData(updatedData)
      },
    }),
    [data, isDarkMode],
  )

  useEffect(() => {
    useAppContext.getState = () => context
  }, [context])
  return <Context.Provider value={context}>{children}</Context.Provider>
}
