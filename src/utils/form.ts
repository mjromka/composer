import { Tag } from '../interfaces/ActionCard'

export function mapTags(stringTags: string[], formData: { id: number; tags: Tag[] }) {
  return stringTags.map(tagName => {
    const existingTag = formData.tags?.find(tag => tag.name === tagName)
    return existingTag || { id: 0, name: tagName }
  })
}
