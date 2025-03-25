import { Empty, theme } from 'antd'
import SectionForm from './SectionForm'
import { Section, Assessment } from '../interfaces/ActionCard'
import AssessmentForm from './AssessmentForm'

interface FormPlaceholderProps {
  data?: { type: string; object: { id: React.Key } }
}

const FormPlaceholder: React.FC<FormPlaceholderProps> = ({ data }) => {
  const { token } = theme.useToken()

  const editForms: { [key: string]: JSX.Element } = {
    section: <SectionForm key={data?.object.id} data={data?.object as Section} />,
    assessment: <AssessmentForm key={data?.object.id} data={data?.object as Assessment} />,
  }
  return (
    <div
      style={{ backgroundColor: token.colorBgContainer, borderRadius: token.borderRadius }}
      className="h-full w-full overflow-auto p-2"
    >
      {!data ? <Empty className="mt-[50%]" description="Select an item to edit" /> : editForms[data.type]}
    </div>
  )
}

export default FormPlaceholder
