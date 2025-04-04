import type { TreeDataNode, TreeProps } from 'antd'
import { NodeService } from '../services/NodeService'

export const allowDrag = (node: TreeDataNode & { draggable?: boolean }): boolean => {
  return node.draggable ?? false
}

export const allowDrop =
  (tree: TreeDataNode[]): TreeProps['allowDrop'] =>
  info => {
    const dropKey = info.dropNode.key
    const dragKey = info.dragNode.key
    const dragParentKey = NodeService.getParentKey(dragKey, tree)
    const dropParentKey = NodeService.getParentKey(dropKey, tree)
    if (dragParentKey === dropParentKey) {
      // drop between nodes of the same parent
      return info.dropPosition !== 0
    } else if (dragParentKey === dropKey) {
      // drop at the top of the same parent
      return info.dropPosition === 0
    } else {
      return false
    }
  }
