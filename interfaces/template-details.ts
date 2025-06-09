import { Template } from "./template"

export interface TemplateDetails extends Template {
  dataUrl: string
  tags: string[]
}
