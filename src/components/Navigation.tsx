import React, { useEffect, useMemo, useState } from 'react'
import { Empty, Input, Tree } from 'antd'
import type { TreeDataNode, TreeProps } from 'antd'
import { NodeService } from '../services/NodeService'
import { allowDrop } from '../utils/tree'
import { DataService } from '../services/DataService'
import { useAppContext } from '../hooks/useAppContext'

const { Search } = Input

interface NavigationProps {
  onSelect: (selectedKey: React.Key) => void
}

const Navigation: React.FC<NavigationProps> = ({ onSelect }) => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [autoExpandParent, setAutoExpandParent] = useState(true)

  const [tree, setTree] = useState<TreeDataNode[]>([])
  const [flat, setFlat] = useState<{ key: React.Key; title: string }[]>([])
  const [noData, setNoData] = useState(false)

  const { actionCard, onChange } = useAppContext()

  useEffect(() => {
    if (actionCard) {
      const [tree, sectionKeys] = NodeService.getTree(actionCard)
      const list = NodeService.getList(tree)
      setTree(tree)
      setExpandedKeys(sectionKeys)
      setFlat(list)
    }
  }, [actionCard])

  const onExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys)
    setAutoExpandParent(false)
  }

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    let isFound = false
    const newExpandedKeys = flat
      .map(item => {
        if (item.title.indexOf(value) > -1) {
          isFound = true
          return NodeService.getParentKey(item.key, tree)
        }
        return null
      })
      .filter((item, i, self): item is React.Key => !!(item && self.indexOf(item) === i))
    setExpandedKeys(newExpandedKeys)
    setSearchValue(value)
    setAutoExpandParent(true)
    setNoData(!isFound)
  }

  // TODO: move to tree.ts -> .tsx
  const treeData = useMemo(() => {
    const loop = (data: TreeDataNode[]): TreeDataNode[] =>
      data.map(item => {
        const strTitle = item.title as string
        const index = strTitle.indexOf(searchValue)
        const beforeStr = strTitle.substring(0, index)
        const afterStr = strTitle.slice(index + searchValue.length)
        const title =
          index > -1 ? (
            <span key={item.key}>
              {beforeStr}
              <span className="text-red-600">{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span key={item.key}>{strTitle}</span>
          )
        if (item.children) {
          return { ...item, title, children: loop(item.children) }
        }

        return {
          ...item,
          title,
        }
      })
    return loop(tree)
  }, [searchValue, tree])

  const onDrop: TreeProps['onDrop'] = info => {
    const elementKey = info.dragNode.key
    const dropPosition = info.dropPosition
    const dropToGap = info.dropToGap
    const sectionKey = NodeService.getParentKey(elementKey, tree)

    const updatedData = DataService.reorder(sectionKey, elementKey, dropPosition, dropToGap, actionCard!)
    onChange(updatedData)
  }

  return (
    <div className="h-full flex flex-col">
      <Search className="mb-2" placeholder="Search" onChange={onSearch} />
      {noData && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
      {!noData && (
        <Tree
          className="flex-1 overflow-auto p-2"
          draggable
          onDrop={onDrop}
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          treeData={treeData}
          onSelect={(keys, { selected }) => {
            if (selected) onSelect(keys[0])
          }}
          showIcon
          allowDrop={allowDrop(tree)}
        />
      )}
    </div>
  )
}

export default Navigation
