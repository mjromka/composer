import { useEffect, useRef } from 'react'
import { ActionCard } from '../interfaces/ActionCard'

declare global {
  interface Window {
    initActionCards: (dataProvider: { getData: () => Promise<ActionCard | undefined>; getMode: () => string }) => void
  }
}

interface ActionCardPreviewProps {
  data: ActionCard | undefined
  trigger: number
}

const ActionCardPreview: React.FC<ActionCardPreviewProps> = ({ data, trigger }) => {
  const container = useRef<HTMLDivElement>(null)

  useEffect(
    () => {
      console.log('ActionCardPreview', data)
      const dataProvider = {
        getData: async () => {
          return new Promise<ActionCard | undefined>(resolve => {
            resolve(data)
          })
        },
        getMode: () => {
          return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        },
      }
      if (!customElements.get('action-cards')) {
        window.initActionCards(dataProvider)
      }
      const actionCards = container.current?.querySelector('action-cards')
      if (actionCards) {
        actionCards.remove()
      }
      container.current?.appendChild(document.createElement('action-cards'))
    },
    // The data prop is not used in the useEffect dependencies array
    // as we want to debounce the updating using the trigger prop
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [trigger],
  )

  return <div ref={container}></div>
}

export default ActionCardPreview
