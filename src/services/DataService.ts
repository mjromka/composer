import React from 'react'
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

  reorder(
    sectionKey: React.Key,
    elementKey: React.Key,
    dropPosition: number,
    dropToGap: boolean,
    actionCard: ActionCard,
  ): ActionCard {
    const updatedData: ActionCard = { ...actionCard }

    const section = updatedData.sections.find(s => s.id === sectionKey)

    if (section) {
      let element: unknown
      // Function to handle the reordering logic
      const reorderElement = (array: unknown[], element: unknown) => {
        const index = array.indexOf(element)
        if (index !== -1) {
          array.splice(index, 1) // Remove element from the current position
          if (!dropToGap) {
            array.unshift(element) // Add element to the start
          } else {
            if (dropPosition < index) {
              array.splice(dropPosition, 0, element) // moving up
            } else {
              array.splice(dropPosition - 1, 0, element) // moving down
            }
          }
        }
      }

      if (section.assessment) {
        element = section.assessment.find(a => a.id === elementKey)
        if (element) {
          reorderElement(section.assessment, element)
        }
      } else if (section.fragments) {
        element = section.fragments.find(f => f.id === elementKey)
        if (element) {
          reorderElement(section.fragments, element)
        }
      } else if (section.questions) {
        element = section.questions.find(q => q.id === elementKey)
        if (element) {
          reorderElement(section.questions, element)
        }
      }

      return updatedData
    }
    return actionCard
  },

  getObject(data: ActionCard, key: React.Key): { type: string; object: { id: React.Key } } | undefined {
    for (const section of data.sections) {
      if (section.id === key) {
        return { type: 'section', object: section }
      } else if (section.assessment) {
        for (const assessment of section.assessment) {
          if (assessment.id === key) {
            return { type: 'assessment', object: assessment }
          }
        }
      } else if (section.fragments) {
        for (const fragment of section.fragments) {
          if (fragment.id === key) {
            return { type: 'fragment', object: fragment }
          }
        }
      } else if (section.questions) {
        for (const question of section.questions) {
          if (question.id === key) {
            return { type: 'question', object: question }
          }
        }
      }
    }
  },

  update(actionCard: ActionCard, updatedObject: { id: number }): ActionCard {
    const updatedData: ActionCard = { ...actionCard }
    for (const section of updatedData.sections) {
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
    return updatedData
  },
}
