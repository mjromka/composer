import { Tree, TreeDragDropEvent, TreeEventNodeEvent } from 'primereact/tree'
import React, { useContext, useEffect, useState } from 'react'
import { NodeService } from '../services/NodeService'
import { TreeNode } from 'primereact/treenode'
import { ActionCard } from '../interfaces/ActionCard'
import { AppContext } from '../AppContext'
import { AssessmentNodeData } from '../types/AssessmentNodeData'
import { SectionNodeData } from '../types/SectionNodeData'

interface NavigationProps {
  onSelect: (event: TreeEventNodeEvent) => void
  data: ActionCard | undefined
}

const Navigation: React.FC<NavigationProps> = ({ onSelect, data }) => {
  const [nodes, setNodes] = useState<TreeNode[]>([])
  const { onChange } = useContext(AppContext)
  useEffect(() => {
    if (data) {
      NodeService.getActionCardTree(data).then(nodes => setNodes(nodes))
    }
  }, [data])

  const handleDragDrop = (e: TreeDragDropEvent) => {
    console.log('handleDragDrop', e)
    // allow drag and drop only within one parent
    if (e.dragNode.data instanceof AssessmentNodeData && e.dropNode.data instanceof SectionNodeData) {
      const assessmentSection = e.dropNode.data.object
      const assessment = e.dragNode.data.object
      if (!assessmentSection.assessment?.some(ass => ass.id === assessment.id)) {
        return // drop not allowed
      }
      const dropNodeChildren = e.dropNode.children as TreeNode[]
      assessmentSection.assessment?.sort((a, b) => {
        const indexA = dropNodeChildren.findIndex(child => child.data.object.id === a.id)
        const indexB = dropNodeChildren.findIndex(child => child.data.object.id === b.id)
        return indexA - indexB
      })
      setNodes(e.value)
      onChange(assessmentSection)
      // TODO: save ranks
    }
  }

  return (
    <Tree
      value={nodes}
      selectionMode="single"
      dragdropScope="action-card"
      onSelect={onSelect}
      onDragDrop={handleDragDrop}
      filter
      filterMode="strict"
      filterPlaceholder="Search"
    />
  )
}

export default Navigation
