import { ActionCard } from './ActionCard'
import { ChangeInfo } from './ChangeInfo'

export interface AppContextType {
  actionCard: ActionCard | undefined
  onChange: (data: ActionCard, info?: ChangeInfo) => void
  isDarkMode: boolean
}
