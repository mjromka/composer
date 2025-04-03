import { useContext } from 'react'
import { AppContextType } from '../interfaces/AppContextType'
import { Context } from '../AppContext'

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
interface UseAppContext extends Function {
  (): AppContextType
  getState: () => AppContextType
}

export const useAppContext = (() => {
  const context = useContext(Context)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}) as UseAppContext
