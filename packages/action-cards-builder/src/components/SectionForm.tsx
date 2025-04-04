import { Form, Input, Select } from 'antd'
import { Section } from '@playbooks/core/src/ActionCard'
import FormSwitch from './ui/FormSwitch'
import { useSaveForm } from '../hooks/useSaveForm'
import { colors } from '../constants/fieldsData'
import { mapTags } from '../utils/form'

const { TextArea } = Input
const { Option } = Select

interface FormProps {
  data: Section
}

const SectionForm: React.FC<FormProps> = ({ data }) => {
  const [form] = Form.useForm()

  const saveForm = useSaveForm()

  const typeUpdated = (prev: Section, curr: Section) => {
    return prev.type !== curr.type
  }

  const customFormValues = {
    _stringTags: data.tags?.map(tag => tag.name),
  }

  const getModifiedData = (changedValues: { _stringTags: string[]; colorCode: string }) => {
    if (changedValues._stringTags) {
      return {
        ...data,
        tags: mapTags(changedValues._stringTags, data),
      }
    } else if (changedValues.colorCode !== undefined) {
      return {
        ...data,
        ...changedValues,
        color: { color: colors[changedValues.colorCode as keyof typeof colors] },
      }
    } else {
      return { ...data, ...changedValues }
    }
  }

  const handleFormChange = (changedValues: { _stringTags: string[]; colorCode: string }) => {
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
      <Form.Item label="Type" name="type">
        <Input disabled />
      </Form.Item>

      <Form.Item label="Color" name="colorCode">
        <Select>
          {Object.entries(colors).map(([key, value]) => (
            <Option key={key}>
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-sm ${value ? 'shadow-sm' : ''}`} style={{ backgroundColor: value }} />
                {key}
              </div>
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Name" name="name">
        <Input />
      </Form.Item>

      <Form.Item label="Hint" name="hint">
        <TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
      </Form.Item>

      <Form.Item label="Condition tags" name="_stringTags">
        <Select mode="tags" />
      </Form.Item>

      <Form.Item name="isOpened" label=" " valuePropName="checked">
        <FormSwitch label="Expand this section by default" />
      </Form.Item>

      <Form.Item name="isExcludedFromAi" label=" " valuePropName="checked">
        <FormSwitch label="Exclude from AI analysis" />
      </Form.Item>

      <Form.Item noStyle shouldUpdate={typeUpdated}>
        {({ getFieldValue }) =>
          (getFieldValue('type') === 'Assessment' && (
            <Form.Item name="isAutoCollapse" label=" " valuePropName="checked">
              <FormSwitch label="Start with collapsed questions (not scored until expanded)" />
            </Form.Item>
          )) ||
          (getFieldValue('type') === 'Separator' && (
            <Form.Item name="collapsePreviousHeader" label=" " valuePropName="checked">
              <FormSwitch label="Auto collapse previous header" />
            </Form.Item>
          ))
        }
      </Form.Item>
    </Form>
  )
}

export default SectionForm
