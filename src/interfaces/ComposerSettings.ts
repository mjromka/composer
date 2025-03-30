import { ActionCard } from './ActionCard'
import { ChangeInfo } from './ChangeInfo'

export interface ComposerSettings {
  dataUrl: string
  onChange: (data: ActionCard, info?: ChangeInfo) => void
}
