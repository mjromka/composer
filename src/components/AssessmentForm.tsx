import { Form, Input, Select, Switch } from 'antd'
import { Assessment } from '../interfaces/ActionCard'
import { DataService } from '../services/DataService'
import { useAppContext } from '../hooks/useAppContext'

const { TextArea } = Input
const { Option } = Select

interface FormProps {
  data: Assessment
}

let debounceTimer: number

const AssessmentForm: React.FC<FormProps> = ({ data }) => {
  const [form] = Form.useForm()

  const { actionCard, onChange } = useAppContext()

  interface ChangedValues {
    [key: string]: unknown
  }

  const handleFormChange = (changedValues: ChangedValues) => {
    const newData = { ...data, ...changedValues }
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      const updatedCard = DataService.update(actionCard!, newData)
      onChange(updatedCard)
    }, 1000)
  }

  return (
    <Form
      className="mt-4"
      form={form}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      initialValues={data}
      onValuesChange={handleFormChange}
    >
      <Form.Item label="Type" name="type">
        <Select>
          <Option value="multi select">Multi Select</Option>
          <Option value="single select">Single Select</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Question" name="question" rules={[{ required: true, message: 'Please enter a question' }]}>
        <TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
      </Form.Item>

      <Form.Item label="Condition tags" name="tags">
        <Select mode="tags" />
      </Form.Item>

      <Form.Item name="hasFreeText" label="Allow free text if last option was selected" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item name="altScoring" label="Alternative Scoring" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item name="altScoringMax" label="Alt Scoring Max" valuePropName="checked">
        <Switch />
      </Form.Item>

      {data.type === 'single select' && (
        <Form.Item name="autoSelectFirstChoice" label="Auto-select first choice" valuePropName="checked">
          <Switch />
        </Form.Item>
      )}
      {data.type === 'single select' && (
        <Form.Item name="superScore" label="Super Score (for the entire header)" valuePropName="checked">
          <Switch />
        </Form.Item>
      )}
    </Form>
  )
}

export default AssessmentForm
