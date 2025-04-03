import { useMemo } from 'react'
import { ChangeType } from '../interfaces/ChangeInfo'
import { DataService } from '../services/DataService'
import { useAppContext } from './useAppContext'

export const useSaveForm = () => {
  const { actionCard, onChange } = useAppContext()
  return useMemo(() => {
    let timeoutId: number
    return (newData: { id: number }) => {
      const updatedCard = DataService.update(actionCard!, newData)
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        onChange(updatedCard, { type: ChangeType.Edit, key: newData.id })
      }, 1000)
    }
  }, [actionCard, onChange])
}
