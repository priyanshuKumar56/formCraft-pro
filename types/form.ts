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

export interface FormSection {
  id: string
  type: "container" | "input-zone"
  title?: string
  layout: {
    width: "full" | "half" | "third" | "quarter" | "custom"
    customWidth?: string
    padding: {
      top: number
      right: number
      bottom: number
      left: number
    }
    margin: {
      top: number
      right: number
      bottom: number
      left: number
    }
    backgroundColor: string
    backgroundGradient?: {
      enabled: boolean
      type: "linear" | "radial"
      colors: string[]
      angle: number
    }
    glassmorphism?: {
      enabled: boolean
      blur: number
      opacity: number
    }
    borderColor: string
    borderWidth: number
    borderRadius: number
    shadow?: {
      enabled: boolean
      x: number
      y: number
      blur: number
      spread: number
      color: string
    }
    alignment: "left" | "center" | "right"
    direction: "column" | "row"
    gap: number
  }
  elements: FormElement[]
  children: FormSection[]
}

export interface FormPage {
  id: string
  title: string
  type: "welcome" | "form" | "ending"
  sections: FormSection[]
  layout: {
    // Canvas (Outer Area)
    canvasBackground: string
    canvasGradient?: {
      enabled: boolean
      type: "linear" | "radial"
      colors: string[]
      angle: number
    }
    
    // Advanced Pages Backgrounds
    backgroundType?: "color" | "gradient" | "image" | "mesh" | "dots"
    backgroundImage?: string
    
    // Split Screen Layout Attributes
    splitLayout?: {
      enabled: boolean
      image: string
      position: "left" | "right"
      focalPoint: { x: number, y: number }
      overlay: { enabled: boolean, color: string, opacity: number }
    }

    // Card (Combined Section Container)
    backgroundColor: string // Kept for backward compat but used for card
    backgroundGradient?: {
      enabled: boolean
      type: "linear" | "radial"
      colors: string[]
      angle: number
    }
    borderColor: string
    borderWidth: number
    borderRadius: number
    shadow?: {
      enabled: boolean
      x: number
      y: number
      blur: number
      spread: number
      color: string
    }
    padding: {
      top: number
      right: number
      bottom: number
      left: number
    }
    textColor: string
    buttonColor: string
    buttonTextColor: string
    maxWidth: "sm" | "md" | "lg" | "xl" | "full" | "custom"
    customMaxWidth?: string
    alignment: "left" | "center" | "right"
  }
}

export interface FormData {
  id: string
  title: string
  description: string
  pages: FormPage[]
  settings: {
    theme: string
    headerStyle: string
    showLogo: boolean
    backgroundColor: string
    textColor: string
  }
}
