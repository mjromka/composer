import { Section, Assessment, Fragment, Response, Question, ActionCard } from '../interfaces/ActionCard'
import { TreeNode } from 'primereact/treenode'
import { SectionNodeData } from '../types/SectionNodeData'
import { AssessmentNodeData } from '../types/AssessmentNodeData'
import { QuestionNodeData } from '../types/QuestionNodeData'
import { FragmentNodeData } from '../types/FragmentNodeData'
import { ResponseNodeData } from '../types/ResponseNodeData'

export const NodeService = {
  async getActionCardTree(data: ActionCard): Promise<TreeNode[]> {
    const flatNodes = data.sections.map(mapSection) as TreeNode[]
    const tree: TreeNode[] = []
    flatNodes.forEach(node => {
      const section = node.data.object as Section
      if (section!.parent > 0) {
        const parentNode = flatNodes.find(n => n.key === section!.parent)
        if (parentNode) {
          parentNode.children!.push(node)
        } else {
          tree.push(node)
        }
      } else {
        tree.push(node)
      }
    })
    return tree
  },
}

function mapSection(section: Section): TreeNode {
  const nodeData = new SectionNodeData(section)
  return {
    key: section.id,
    label: section.name,
    data: nodeData,
    icon: nodeData.icon,
    children: mapChildren(section) || [],
  } as TreeNode
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
}

function mapAssessment(assessment: Assessment) {
  const nodeData = new AssessmentNodeData(assessment)
  return {
    key: assessment.id,
    label: assessment.question,
    data: nodeData,
    icon: nodeData.icon,
    children: assessment.responses.map(mapResponse),
  } as TreeNode
}

function mapQuestion(question: Question) {
  const nodeData = new QuestionNodeData(question)
  return {
    key: question.id,
    label: question.text,
    data: nodeData,
    icon: nodeData.icon,
  }
}

function mapFragment(fragment: Fragment) {
  const nodeData = new FragmentNodeData(fragment)
  return {
    key: fragment.id,
    label: fragment.name,
    data: nodeData,
    icon: nodeData.icon,
  }
}

function mapResponse(response: Response) {
  const nodeData = new ResponseNodeData(response)
  return {
    key: response.id,
    label: response.answer,
    data: nodeData,
    icon: nodeData.icon,
  }
}
