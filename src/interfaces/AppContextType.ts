import { ActionCard } from './ActionCard'

export interface AppContextType {
  actionCard: ActionCard | undefined
  onChange: (data: ActionCard) => void
  isDarkMode: boolean
}
