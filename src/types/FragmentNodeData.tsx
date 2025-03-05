import { Fragment } from '../interfaces/ActionCard'
import { TreeNodeData } from '../interfaces/TreeNodeData'

export class FragmentNodeData implements TreeNodeData {
  object: Fragment
  icon: string = 'pi pi-fw pi-align-justify'

  constructor(data: Fragment) {
    this.object = data
  }

  render() {
    return <>{JSON.stringify(this.object)}</>
  }
}
