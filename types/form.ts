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

// Button styling interface
export interface ButtonStyle {
  // Size
  paddingX: number
  paddingY: number
  fontSize: number
  fontWeight: "normal" | "medium" | "semibold" | "bold" | "black"
  
  // Colors
  backgroundColor: string
  textColor: string
  borderColor: string
  borderWidth: number
  borderRadius: number
  
  // Shadow
  shadow?: {
    enabled: boolean
    x: number
    y: number
    blur: number
    spread: number
    color: string
  }
  
  // Preset style identifier
  preset?: "default" | "rounded" | "pill" | "outline" | "gradient" | "minimal"
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
    backgroundImageBlur?: number // New: Blur for global background image
    backgroundOverlay?: { // New: Overlay for global background
        enabled: boolean
        color: string
        opacity: number
    }
    
    // Split Screen Layout Attributes
    splitLayout?: {
      enabled: boolean
      image: string
      position: "left" | "right"
      focalPoint: { x: number, y: number }
      overlay: { enabled: boolean, color: string, opacity: number }
    }

    // Card (Combined Section Container)
    backgroundColor: string
    backgroundGradient?: {
      enabled: boolean
      type: "linear" | "radial"
      colors: string[]
      angle: number
    }
    glassmorphism?: { // New: Glassmorphism for the entire form card
        enabled: boolean
        blur: number
        opacity: number
        borderOpacity?: number
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
    
    // Button Styling (replaces simple buttonColor/buttonTextColor)
    buttonColor: string // kept for backwards compatibility
    buttonTextColor: string // kept for backwards compatibility
    buttonStyle?: ButtonStyle
    
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
