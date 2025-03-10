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
  widgets: WidgetData[] | null
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

/**
 * Enum for the types of widgets that can be incorporated into various places of the Action Card.
 */
export enum WidgetType {
  GenericAiPrompt = 'GenericAiPrompt',
  TextToSpeech = 'TextToSpeech',
  UpdateWithAi = 'UpdateWithAi',
  CreateCrmObject = 'CreateCrmObject',
  CodeSnippet = 'CodeSnippet',
  SetTag = 'SetTag',
}

/**
 * Enum for the output modes of the AI widgets (where to display the generated text).
 */
export enum WidgetOutputMode {
  /** Append the generated text under the widget */
  Add = 'Add',
  /** Replace the recommendation text with the generated text (#10482) */
  Replace = 'Replace',
}

/**
 * Widget entity: represents an interactive widget
 * that can be incorporated into various places of the Action Card.
 */
export type WidgetData = {
  /** Unique ID of the widget */
  id: number
  /** Type of the widget */
  type: WidgetType
  /** Logical rule for applying tag-based conditions */
  conditionRule: string | null
  /** Tags that can be used to conditionally show/hide the widget */
  tags: Tag[] | null
  /** Tags that can be set by the object in order to influence visibility of other entities */
  setTags: Tag[] | null
  /** Object states that can set tags in order to influence visibility of other entities */
  states: WidgetObjectState[] | null
}

/**
 * Object state
 */
export interface ObjectState {
  type: string
  isActive: boolean | null
  activeTags: Tag[] | null
  inactiveTags: Tag[] | null
}

export type WidgetObjectState = ObjectState & {}

export interface Data {
  id: number
  name: string
  rank: number
}
