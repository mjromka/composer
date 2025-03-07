import GenericJsonForm from '../components/GenericJsonForm'
import { Section } from '../interfaces/ActionCard'
import { TreeNodeData } from '../interfaces/TreeNodeData'

export class SectionNodeData implements TreeNodeData {
  object: Section
  icon: string

  constructor(data: Section) {
    this.object = data
    this.icon = data.type == 'Separator' ? 'pi pi-fw pi-folder' : 'pi pi-fw pi-clipboard'
  }

  render() {
    return <GenericJsonForm data={this.object} />
  }
}
