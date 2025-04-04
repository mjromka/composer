import { Form, Input, Select } from 'antd'
import { Assessment } from '@playbooks/core/src/ActionCard'
import FormSwitch from './ui/FormSwitch'
import { useSaveForm } from '../hooks/useSaveForm'
import { mapTags } from '../utils/form'

const { TextArea } = Input
const { Option } = Select

interface FormProps {
  data: Assessment
}

const AssessmentForm: React.FC<FormProps> = ({ data }) => {
  const [form] = Form.useForm()

  const saveForm = useSaveForm()

  const typeUpdated = (prev: Assessment, curr: Assessment) => {
    return prev.type !== curr.type
  }

  const customFormValues = {
    _scoringType: data.altScoring ? 'altScoring' : data.altScoringMax ? 'altScoringMax' : '',
    _stringTags: data.tags?.map(tag => tag.name),
  }

  const getModifiedData = (changedValues: { _scoringType: string; _stringTags: string[] }) => {
    if (changedValues._scoringType !== undefined) {
      return {
        ...data,
        altScoring: changedValues._scoringType === 'altScoring',
        altScoringMax: changedValues._scoringType === 'altScoringMax',
      }
    } else if (changedValues._stringTags) {
      return {
        ...data,
        tags: mapTags(changedValues._stringTags, data),
      }
    } else {
      return { ...data, ...changedValues }
    }
  }

  const handleFormChange = (changedValues: { _scoringType: string; _stringTags: string[] }) => {
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
        <Select>
          <Option value="multi select">Multi Select</Option>
          <Option value="single select">Single Select</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Question" name="question">
        <TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
      </Form.Item>

      <Form.Item label="Condition tags" name="_stringTags">
        <Select mode="tags" />
      </Form.Item>

      <Form.Item name="hasFreeText" label=" " valuePropName="checked">
        <FormSwitch label="Allow free text if last option was selected" />
      </Form.Item>

      <Form.Item noStyle shouldUpdate={typeUpdated}>
        {({ getFieldValue }) =>
          getFieldValue('type') === 'multi select' && (
            <Form.Item label="Scoring type" name="_scoringType">
              <Select>
                <Option value="">Weighted average</Option>
                <Option value="altScoring">Arithmetic Mean</Option>
                <Option value="altScoringMax">Maximum value of the selected options</Option>
              </Select>
            </Form.Item>
          )
        }
      </Form.Item>

      <Form.Item noStyle shouldUpdate>
        {({ getFieldValue }) =>
          getFieldValue('type') === 'single select' && (
            <>
              <Form.Item name="autoSelectFirstChoice" label=" " valuePropName="checked">
                <FormSwitch label="Auto-select first choice" disabled />
              </Form.Item>
              <Form.Item name="superScore" label=" " valuePropName="checked">
                <FormSwitch label="Super Score (for the entire header)" />
              </Form.Item>
            </>
          )
        }
      </Form.Item>
    </Form>
  )
}

export default AssessmentForm
