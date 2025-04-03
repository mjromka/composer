import { ActionCard } from '@playbooks/core/src/ActionCard'
import { ChangeInfo } from './ChangeInfo'

export interface AppContextType {
  actionCard: ActionCard | undefined
  onChange: (data: ActionCard, info?: ChangeInfo) => void
  isDarkMode: boolean
}
