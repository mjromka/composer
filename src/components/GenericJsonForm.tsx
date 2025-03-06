import CodeMirror from '@uiw/react-codemirror'
import { useContext } from 'react'
import { AppContext } from '../AppContext'

const GenericJsonForm: React.FC<{ data: unknown }> = ({ data }) => {
  const { onChange } = useContext(AppContext)

  const handleChange = (value: string) => {
    try {
      const updatedNode = JSON.parse(value)
      onChange(updatedNode)
    } catch (error) {
      console.error('Invalid JSON', error)
    }
  }

  const theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

  return (
    <div className="h-full overflow-auto">
      <CodeMirror value={JSON.stringify(data, null, 2)} theme={theme} height="100%" onChange={handleChange} />
    </div>
  )
}

export default GenericJsonForm
