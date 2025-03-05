import { useEffect, useRef } from 'react'
import { ActionCard } from '../interfaces/ActionCard'

interface ActionCardPreviewProps {
  data: ActionCard | undefined
  trigger: number
}

const ActionCardPreview: React.FC<ActionCardPreviewProps> = ({ data, trigger }) => {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    console.log('ActionCardPreview', data)
    const dataProvider = {
      getData: async () => {
        return data
      },
      getMode: () => {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      },
    }
    if (!customElements.get('action-cards')) {
      // @ts-ignore
      window.initActionCards(dataProvider)
    }
    const actionCards = container.current?.querySelector('action-cards')
    if (actionCards) {
      actionCards.remove()
    }
    container.current?.appendChild(document.createElement('action-cards'))
  }, [trigger])

  return <div ref={container}></div>
}

export default ActionCardPreview
