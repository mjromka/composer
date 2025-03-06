import { InputText } from 'primereact/inputtext'
import { Assessment } from '../interfaces/ActionCard'
import { ChangeEventHandler, useContext } from 'react'
import { AppContext } from '../AppContext'
import { Fieldset } from 'primereact/fieldset'

const AssessmentForm: React.FC<{ data: Assessment }> = ({ data }) => {
  const { onChange } = useContext(AppContext)

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    const newData = { ...data, [e.target.id]: e.target.value }
    onChange(newData)
  }

  return (
    <Fieldset className="h-full overflow-auto p-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="question">Question</label>
        <InputText id="question" value={data.question} onChange={handleChange} />
        <small id="username-help">Enter question text.</small>
      </div>
    </Fieldset>
  )
}

export default AssessmentForm
