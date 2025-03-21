import { useEffect, useRef } from 'react'
import { ActionCard } from '../interfaces/ActionCard'
import { theme } from 'antd'
import { useAppContext } from '../hooks/useAppContext'

declare global {
  interface Window {
    initActionCards: (dataProvider: { getData: () => ActionCard; getMode: () => string }) => void
  }
}

const ActionCardPreview: React.FC = () => {
  const container = useRef<HTMLDivElement>(null)
  const { actionCard, isDarkMode } = useAppContext()
  const { token } = theme.useToken()

  useEffect(() => {
    if (actionCard) {
      const dataProvider = {
        getData: () => actionCard,
        getMode: () => (useAppContext.getState().isDarkMode ? 'dark' : 'light'),
      }
      if (!customElements.get('action-cards')) {
        window.initActionCards(dataProvider)
      }
      const actionCards = container.current?.querySelector('action-cards')
      if (actionCards) {
        actionCards.remove()
      }
      container.current?.appendChild(document.createElement('action-cards'))
    }
  }, [actionCard, isDarkMode])

  return (
    <div
      style={{ backgroundColor: token.colorBgContainer, borderRadius: token.borderRadius }}
      className="h-full w-full overflow-auto p-2"
      ref={container}
    ></div>
  )
}

export default ActionCardPreview
