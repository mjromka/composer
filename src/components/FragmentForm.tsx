// filepath: /composer/composer/src/components/FragmentForm.tsx
import { Form, Input, Select } from 'antd'
import { Fragment } from '../interfaces/ActionCard'
import { DataService } from '../services/DataService'
import { useAppContext } from '../hooks/useAppContext'

const { TextArea } = Input

interface FormProps {
  data: Fragment
}

let debounceTimer: number

const FragmentForm: React.FC<FormProps> = ({ data }) => {
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
      <Form.Item label="Name" name="name">
        <Input />
      </Form.Item>

      <Form.Item label="Text" name="text">
        <TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
      </Form.Item>

      <Form.Item label="Tags" name="tags">
        <Select mode="tags" />
      </Form.Item>
    </Form>
  )
}

export default FragmentForm
