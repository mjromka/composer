import { Form, Input, Select } from 'antd'
import { Fragment } from '../interfaces/ActionCard'
import { mapTags } from '../utils/form'
import { useSaveForm } from '../hooks/useSaveForm'

const { TextArea } = Input

interface FormProps {
  data: Fragment
}

const FragmentForm: React.FC<FormProps> = ({ data }) => {
  const [form] = Form.useForm()

  const saveForm = useSaveForm()

  const customFormValues = {
    _stringTags: data.tags.map(tag => tag.name),
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
      <Form.Item label="Name" name="name">
        <Input />
      </Form.Item>

      <Form.Item label="Text" name="text">
        <TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
      </Form.Item>

      <Form.Item label="Tags" name="_stringTags">
        <Select mode="tags" />
      </Form.Item>
    </Form>
  )
}

export default FragmentForm
