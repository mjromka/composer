import type { TreeDataNode, TreeProps } from 'antd'
import { NodeService } from '../services/NodeService'

export const allowDrop =
  (tree: TreeDataNode[]): TreeProps['allowDrop'] =>
  info => {
    const dropKey = info.dropNode.key
    const dragKey = info.dragNode.key
    const dragParent = NodeService.getParentKey(dragKey, tree)
    const dropParent = NodeService.getParentKey(dropKey, tree)
    if (dragParent === dropParent) {
      // drop between nodes of the same parent
      return info.dropPosition !== 0
    } else if (dragParent === dropKey) {
      // drop at the top of the same parent
      return info.dropPosition === 0
    } else {
      return false
    }
  }
