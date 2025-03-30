import { useEffect, useRef } from 'react'
import { theme } from 'antd'
import { useAppContext } from '../hooks/useAppContext'
import { initActionCards } from '../utils/actionCards'

let isInitialized = false

const ActionCardPreview: React.FC = () => {
  const container = useRef<HTMLDivElement>(null)
  const { actionCard, isDarkMode } = useAppContext()
  const { token } = theme.useToken()

  useEffect(() => {
    const refresh = () => {
      const actionCards = container.current?.querySelector('action-cards')
      if (actionCards) {
        actionCards.remove()
      }
      container.current?.appendChild(document.createElement('action-cards'))
    }
    if (actionCard) {
      const dataProvider = {
        getData: () => actionCard,
        getMode: () => (useAppContext.getState().isDarkMode ? 'dark' : 'light'),
      }
      if (!isInitialized) {
        isInitialized = true
        initActionCards(dataProvider).then(refresh).catch(console.error)
      } else {
        refresh()
      }
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
