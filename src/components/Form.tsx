import { TreeNodeData } from '../interfaces/TreeNodeData'

interface FormProps {
  data: TreeNodeData
}

const Form: React.FC<FormProps> = ({ data }) => {
  return <>{data.render()}</>
}

export default Form
