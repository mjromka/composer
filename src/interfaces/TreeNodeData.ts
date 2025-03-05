export interface TreeNodeData {
  object: { id: number }
  icon: string
  render: () => JSX.Element
}
