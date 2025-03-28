import { Form, Input, Select, Switch } from 'antd'
import { Section } from '../interfaces/ActionCard'
import { DataService } from '../services/DataService'
import { useAppContext } from '../hooks/useAppContext'
import { ChangeType } from '../interfaces/ChangeInfo'

const { TextArea } = Input
const { Option } = Select

interface FormProps {
  data: Section
}

let debounceTimer: number

const SectionForm: React.FC<FormProps> = ({ data }) => {
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
      onChange(updatedCard, { type: ChangeType.Edit, key: data.id })
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
        <Input disabled />
      </Form.Item>

      <Form.Item label="Color Code" name="colorCode">
        <Select>
          <Option value={1847}>Green</Option>
          <Option value={1848}>Yellow</Option>
          <Option value={1849}>Red</Option>
          <Option value={1850}>Blue</Option>
          <Option value={1851}>Grey</Option>
          <Option value={2259}>Pink</Option>
          <Option value={2260}>Orange</Option>
          <Option value={2261}>Turquoise</Option>
          <Option value={2262}>Purple</Option>
          <Option value={2263}>Shadow</Option>
          <Option value={2334}>None</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter a name' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Hint" name="hint">
        <TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
      </Form.Item>

      <Form.Item label="Condition tags" name="tags">
        <Select mode="tags" />
      </Form.Item>

      <Form.Item name="isAutoCollapse" label="Auto Collapse" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item name="isRecommendation" label="Limit by score" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item name="isOpened" label="Expand this section by default" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item name="isExcludedFromAi" label="Exclude from AI analysis" valuePropName="checked">
        <Switch />
      </Form.Item>

      {data.type === 'Separator' && (
        <Form.Item name="collapsePreviousHeader" label="Auto collapse previous header" valuePropName="checked">
          <Switch />
        </Form.Item>
      )}
    </Form>
  )
}

export default SectionForm
