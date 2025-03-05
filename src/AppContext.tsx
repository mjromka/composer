import { createContext } from 'react'
import { AppContextData } from './interfaces/AppContextData'

export const AppContext = createContext<AppContextData>(null!)
