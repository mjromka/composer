import GenericJsonForm from '../components/GenericJsonForm'
import { Response } from '../interfaces/ActionCard'
import { TreeNodeData } from '../interfaces/TreeNodeData'

export class ResponseNodeData implements TreeNodeData {
  object: Response
  icon: string = 'pi pi-fw pi-check-square'

  constructor(data: Response) {
    this.object = data
  }

  render() {
    return <GenericJsonForm data={this.object} />
  }
}
