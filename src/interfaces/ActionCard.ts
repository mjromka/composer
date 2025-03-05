export interface ActionCard {
  sections: Section[]
  name: string
  templateId: number
  isUiSimple: boolean
  scoreMode: string
}

export interface Section {
  id: number
  name: string
  hint: string | null
  color: Color
  colorCode: string
  type: string
  text: string | null
  tags: Tag[]
  isAutoCollapse: boolean
  rank: number
  parent: number
  isRecommendation: boolean
  isOpened: boolean
  _originalId: number
  isExcludedFromAi: boolean
  recType: number | null
  collapsePreviousHeader: boolean
  fragments: Fragment[]
  widgets: Widget[]
  showWidgets?: boolean
  isSetTagsEnabled?: boolean
  assessment?: Assessment[]
  questions?: Question[]
  conditionRule?: string
  scoreBased?: number
  maxScore?: string
  minScore?: string
}

export interface Widget {
  id: number
  name: string
  type: string
}

export interface Color {
  rank: number
  color: string
  id: number
  name: string
}

export interface Tag {
  id: number
  name: string
}

export interface Fragment {
  id: number
  name: string
  text: string | null
  tags: Tag[]
  conditionRule?: string
  isRecommendation: boolean
  widgets: any[]
  setTags: Tag[]
  scoreBased?: number
  maxScore?: string
  minScore?: string
}

export interface Assessment {
  id: number
  type: string
  question: string
  responses: Response[]
  tags: Tag[]
  hasFreeText: boolean
  _originalId: number
  altScoring: boolean
  altScoringMax: boolean
  autoSelectFirstChoice: boolean
  superScore: boolean
  conditionRule?: string
}

export interface Response {
  id: number
  answer: string
  rank: number
  tags: Tag[]
  _originalId: number
  checked: boolean
  flow: string
}

export interface Question {
  id: number
  type: string
  text: string
  rank: number
  tags: Tag[]
  _originalId: number
  code: string | null
  data?: Data[]
  conditionRule?: string
}

export interface Data {
  id: number
  name: string
  rank: number
}
