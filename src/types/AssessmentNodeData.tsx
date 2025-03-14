import { Assessment } from '../interfaces/ActionCard'
import { TreeNodeData } from '../interfaces/TreeNodeData'

export class AssessmentNodeData implements TreeNodeData {
  object: Assessment
  icon: string = 'pi pi-fw pi-list-check'

  constructor(data: Assessment) {
    this.object = data
  }

  render() {
    return <>{JSON.stringify(this.object)}</>
  }
}
