export enum ChangeType {
  Reorder = 'reorder',
  Edit = 'edit',
}

export interface ChangeInfo {
  type: ChangeType
  key: React.Key
}
