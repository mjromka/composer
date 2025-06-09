export interface Workspace {
  id: string
  name: string
  description: string
  templateCount: number
  memberCount: number
  accessType: "owner" | "contributor"
  updatedAt: string
  imagePath: string
}
