import { Form, Input, InputNumber, Select, Switch } from 'antd'
import { Question } from '../interfaces/ActionCard'
import { DataService } from '../services/DataService'
import { useAppContext } from '../hooks/useAppContext'

const { Option } = Select

interface FormProps {
  data: Question
}

let debounceTimer: number

const QuestionForm: React.FC<FormProps> = ({ data }) => {
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
      <Form.Item label="Question" name="text">
        <Input />
      </Form.Item>

      <Form.Item label="Type" name="type">
        <Select>
          <Option value="Checkbox">Checkbox</Option>
          <Option value="Text">Text</Option>
          <Option value="Number">Number</Option>
          <Option value="Amount">Amount</Option>
          <Option value="Date">Date</Option>
          <Option value="Dropdown">Dropdown</Option>
          <Option value="LongText">Long Text</Option>
          <Option value="Email">Email</Option>
          <Option value="File">File</Option>
        </Select>
      </Form.Item>

      <Form.Item noStyle shouldUpdate>
        {({ getFieldValue }) =>
          (getFieldValue('type') === 'Number' && (
            <Form.Item name="thousand" label="Show thousand separator" valuePropName="checked">
              <Switch />
            </Form.Item>
          )) ||
          (getFieldValue('type') === 'Dropdown' && (
            <Form.Item label="Data" name="data">
              {JSON.stringify(getFieldValue('data'))}
            </Form.Item>
          ))
        }
      </Form.Item>

      <Form.Item label="Rank" name="rank">
        <InputNumber min={1} max={10} />
      </Form.Item>

      <Form.Item label="Condition tags" name="tags">
        <Select mode="tags" />
      </Form.Item>

      <Form.Item label="Code" name="code">
        <Input />
      </Form.Item>
    </Form>
  )
}

export default QuestionForm
