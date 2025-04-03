import { Form, Input, InputNumber, Select } from 'antd'
import { Question } from '@playbooks/core/src/ActionCard'
import { mapTags } from '../utils/form'
import FormSwitch from './ui/FormSwitch'
import { useSaveForm } from '../hooks/useSaveForm'

const { Option } = Select

interface FormProps {
  data: Question
}

const QuestionForm: React.FC<FormProps> = ({ data }) => {
  const [form] = Form.useForm()

  const saveForm = useSaveForm()

  const typeUpdated = (prev: Question, curr: Question) => {
    return prev.type !== curr.type
  }

  const customFormValues = {
    _stringTags: data.tags?.map(tag => tag.name),
  }

  const getModifiedData = (changedValues: { _stringTags: string[] }) => {
    if (changedValues._stringTags) {
      return {
        ...data,
        tags: mapTags(changedValues._stringTags, data),
      }
    } else {
      return { ...data, ...changedValues }
    }
  }

  const handleFormChange = (changedValues: { _stringTags: string[] }) => {
    const newData = getModifiedData(changedValues)
    saveForm(newData)
  }

  return (
    <Form
      className="mt-4"
      form={form}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ ...data, ...customFormValues }}
      onValuesChange={handleFormChange}
      colon={false}
    >
      <Form.Item label="Label" name="text">
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

      <Form.Item noStyle shouldUpdate={typeUpdated}>
        {({ getFieldValue }) =>
          (getFieldValue('type') === 'Number' && (
            <Form.Item name="thousand" label=" " valuePropName="checked">
              <FormSwitch label="Show thousand separator" />
            </Form.Item>
          )) ||
          (getFieldValue('type') === 'Dropdown' && (
            <Form.Item label="Data">{JSON.stringify(getFieldValue('data'))}</Form.Item>
          ))
        }
      </Form.Item>

      <Form.Item label="Rank" name="rank">
        <InputNumber min={1} max={10} />
      </Form.Item>

      <Form.Item label="Condition tags" name="_stringTags">
        <Select mode="tags" />
      </Form.Item>

      <Form.Item label="Code" name="code">
        <Input />
      </Form.Item>
    </Form>
  )
}

export default QuestionForm
