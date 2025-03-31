import { Section, Assessment, Fragment, Response, Question, ActionCard, ElementKind } from '../interfaces/ActionCard'
import { TreeDataNode } from 'antd'
import { CheckSquareFilled, ContainerFilled, EditFilled, InfoCircleFilled, LineOutlined } from '@ant-design/icons'
import React from 'react'

export const NodeService = {
  getTree(data: ActionCard): [TreeDataNode[], React.Key[]] {
    const flatSectionNodes = data.sections.map(mapSection)
    const tree: TreeDataNode[] = []
    flatSectionNodes.forEach(node => {
      const section = data.sections.find(s => s.id === node?.key)
      if (section!.parent > 0) {
        const parentNode = flatSectionNodes.find(n => n.key === section!.parent)
        if (parentNode) {
          parentNode.children.push(node)
        } else {
          tree.push(node)
        }
      } else {
        tree.push(node)
      }
    })
    return [tree, flatSectionNodes.map(n => n.key)]
  },

  getList(tree: TreeDataNode[]): { key: React.Key; title: string }[] {
    let dataList: { key: React.Key; title: string }[] = []
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i]
      dataList.push({ key: node.key, title: node.title as string })
      if (node.children) {
        dataList = dataList.concat(this.getList(node.children))
      }
    }
    return dataList
  },

  getParentKey(key: React.Key, tree: TreeDataNode[]): React.Key {
    let parentKey: React.Key
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i]
      if (node.children) {
        if (node.children.some(item => item.key === key)) {
          parentKey = node.key
        } else if (this.getParentKey(key, node.children)) {
          parentKey = this.getParentKey(key, node.children)
        }
      }
    }
    return parentKey!
  },
}

function mapSection(section: Section) {
  return {
    key: section.id,
    title: section.name,
    icon: section.type == 'Separator' ? React.createElement(LineOutlined) : React.createElement(ContainerFilled),
    children: mapChildren(section) || [],
  }
}

function mapChildren(section: Section) {
  if (section.assessment) {
    return section.assessment.map(mapAssessment)
  }
  if (section.fragments) {
    return section.fragments.map(mapFragment)
  }
  if (section.questions) {
    return section.questions.map(mapQuestion)
  }
  if (section.elements) {
    return section.elements.map(element => {
      switch (element.kind) {
        case ElementKind.ASSESSMENT:
          return mapAssessment(element as Assessment)
        case ElementKind.RECOMMENDATION:
          return mapFragment(element as Fragment)
        case ElementKind.QUESTION:
          return mapQuestion(element as Question)
      }
    })
  }
}

function mapAssessment(assessment: Assessment): TreeDataNode {
  return {
    key: assessment.id,
    title: assessment.question,
    icon: React.createElement(CheckSquareFilled),
    children: assessment.responses.map(mapResponse),
  } as TreeDataNode
}

function mapQuestion(question: Question): TreeDataNode {
  return {
    key: question.id,
    title: question.text,
    icon: React.createElement(EditFilled),
  } as TreeDataNode
}

function mapFragment(fragment: Fragment): TreeDataNode {
  return {
    key: fragment.id,
    title: fragment.name,
    icon: React.createElement(InfoCircleFilled),
  } as TreeDataNode
}

function mapResponse(response: Response): TreeDataNode {
  return {
    key: response.id,
    title: response.answer,
  } as TreeDataNode
}
