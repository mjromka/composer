import { ActionCard } from '../interfaces/ActionCard'

export const DataService = {
  getTemplateData: async (template: string) => {
    const response = await fetch(template)

    if (!response.ok) {
      throw new Error('Failed to fetch template data')
    }
    const data: ActionCard = (await response.json()) as ActionCard
    return data
  },

  updateObject(data: ActionCard, updatedObject: { id: number }) {
    for (const section of data.sections) {
      if (section.id === updatedObject.id) {
        Object.assign(section, updatedObject)
      }
      if (section.assessment) {
        for (const assessment of section.assessment) {
          if (assessment.id === updatedObject.id) {
            Object.assign(assessment, updatedObject)
          }
          if (assessment.responses) {
            for (const response of assessment.responses) {
              if (response.id === updatedObject.id) {
                Object.assign(response, updatedObject)
              }
            }
          }
        }
      }
      if (section.fragments) {
        for (const fragment of section.fragments) {
          if (fragment.id === updatedObject.id) {
            Object.assign(fragment, updatedObject)
          }
        }
      }
      if (section.questions) {
        for (const question of section.questions) {
          if (question.id === updatedObject.id) {
            Object.assign(question, updatedObject)
          }
        }
      }
    }
  },
}
