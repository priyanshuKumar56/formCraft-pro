export interface FormElement {
  id: string
  type: string
  label: string
  placeholder?: string
  required: boolean
  options?: string[]
  imagePosition?: "left" | "center" | "right"
  validation?: {
    min?: number
    max?: number
    pattern?: string
  }
}

export interface FormPage {
  id: string
  title: string
  type: "welcome" | "form" | "ending"
  elements: FormElement[]
}

export interface FormData {
  id: string
  title: string
  description: string
  pages: FormPage[]
  settings: {
    theme: string
    headerStyle: "gradient" | "solid"
    showLogo: boolean
    backgroundColor: string
    textColor: string
  }
}
