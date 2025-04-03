import { Empty, theme } from 'antd'
import SectionForm from './SectionForm'
import { Section, Assessment, Question, Fragment } from '@playbooks/core/src/ActionCard'
import AssessmentForm from './AssessmentForm'
import QuestionForm from './QuestionForm'
import FragmentForm from './FragmentForm'

interface FormPlaceholderProps {
  data?: { type: string; object: { id: React.Key } }
}

const FormPlaceholder: React.FC<FormPlaceholderProps> = ({ data }) => {
  const { token } = theme.useToken()

  const editForms: { [key: string]: JSX.Element } = {
    section: <SectionForm key={data?.object.id} data={data?.object as Section} />,
    assessment: <AssessmentForm key={data?.object.id} data={data?.object as Assessment} />,
    question: <QuestionForm key={data?.object.id} data={data?.object as Question} />,
    fragment: <FragmentForm key={data?.object.id} data={data?.object as Fragment} />,
  }
  return (
    <div
      style={{ backgroundColor: token.colorBgContainer, borderRadius: token.borderRadius }}
      className="h-full w-full overflow-auto p-2"
    >
      {!data ? (
        <div className="flex justify-center items-center h-full">
          <Empty description="Select an item to edit" />
        </div>
      ) : (
        editForms[data.type]
      )}
    </div>
  )
}

export default FormPlaceholder
