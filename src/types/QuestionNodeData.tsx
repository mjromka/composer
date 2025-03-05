import { Question } from '../interfaces/ActionCard'
import { TreeNodeData } from '../interfaces/TreeNodeData'

export class QuestionNodeData implements TreeNodeData {
  object: Question
  icon: string = 'pi pi-fw pi-server'

  constructor(data: Question) {
    this.object = data
  }

  render() {
    return <>{JSON.stringify(this.object)}</>
  }
}
