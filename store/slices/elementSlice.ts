import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface ElementState {
  clipboard: {
    element: any
    section: any
    page: any
  }
  elementLibrary: {
    categories: any[]
    elements: any[]
    loading: boolean
    error: string | null
  }
  customElements: any[]
  elementStyles: {
    presets: any[]
    custom: Record<string, any>
  }
  elementValidation: {
    rules: Record<string, any[]>
    patterns: Record<string, RegExp>
  }
}

const initialState: ElementState = {
  clipboard: {
    element: null,
    section: null,
    page: null,
  },
  
  elementLibrary: {
    categories: [],
    elements: [],
    loading: false,
    error: null,
  },
  
  customElements: [],
  
  elementStyles: {
    presets: [],
    custom: {},
  },
  
  elementValidation: {
    rules: {},
    patterns: {
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      phone: /^[\+]?[1-9][\d]{0,15}$/,
      url: /^https?:\/\/[^\s/$.?#].[^\s]*$/,
      number: /^\d+$/,
      alphanumeric: /^[a-zA-Z0-9]+$/,
    },
  },
}

const elementSlice = createSlice({
  name: "element",
  initialState,
  reducers: {
    // Clipboard actions
    copyElement: (state, action: PayloadAction<any>) => {
      state.clipboard.element = JSON.parse(JSON.stringify(action.payload))
    },
    
    copySection: (state, action: PayloadAction<any>) => {
      state.clipboard.section = JSON.parse(JSON.stringify(action.payload))
    },
    
    copyPage: (state, action: PayloadAction<any>) => {
      state.clipboard.page = JSON.parse(JSON.stringify(action.payload))
    },
    
    clearClipboard: (state) => {
      state.clipboard.element = null
      state.clipboard.section = null
      state.clipboard.page = null
    },
    
    // Element Library actions
    setElementLibraryLoading: (state, action: PayloadAction<boolean>) => {
      state.elementLibrary.loading = action.payload
    },
    
    setElementLibraryError: (state, action: PayloadAction<string | null>) => {
      state.elementLibrary.error = action.payload
    },
    
    setElementLibraryCategories: (state, action: PayloadAction<any[]>) => {
      state.elementLibrary.categories = action.payload
    },
    
    setElementLibraryElements: (state, action: PayloadAction<any[]>) => {
      state.elementLibrary.elements = action.payload
    },
    
    // Custom Elements actions
    addCustomElement: (state, action: PayloadAction<any>) => {
      state.customElements.push(action.payload)
    },
    
    updateCustomElement: (state, action: PayloadAction<{ id: string; updates: any }>) => {
      const { id, updates } = action.payload
      const index = state.customElements.findIndex(el => el.id === id)
      if (index !== -1) {
        state.customElements[index] = { ...state.customElements[index], ...updates }
      }
    },
    
    removeCustomElement: (state, action: PayloadAction<string>) => {
      state.customElements = state.customElements.filter(el => el.id !== action.payload)
    },
    
    // Element Styles actions
    addStylePreset: (state, action: PayloadAction<any>) => {
      state.elementStyles.presets.push(action.payload)
    },
    
    updateStylePreset: (state, action: PayloadAction<{ id: string; updates: any }>) => {
      const { id, updates } = action.payload
      const index = state.elementStyles.presets.findIndex(preset => preset.id === id)
      if (index !== -1) {
        state.elementStyles.presets[index] = { ...state.elementStyles.presets[index], ...updates }
      }
    },
    
    removeStylePreset: (state, action: PayloadAction<string>) => {
      state.elementStyles.presets = state.elementStyles.presets.filter(preset => preset.id !== action.payload)
    },
    
    setCustomStyle: (state, action: PayloadAction<{ elementId: string; style: any }>) => {
      const { elementId, style } = action.payload
      state.elementStyles.custom[elementId] = style
    },
    
    removeCustomStyle: (state, action: PayloadAction<string>) => {
      delete state.elementStyles.custom[action.payload]
    },
    
    // Element Validation actions
    setValidationRule: (state, action: PayloadAction<{ elementType: string; rules: any[] }>) => {
      const { elementType, rules } = action.payload
      state.elementValidation.rules[elementType] = rules
    },
    
    addValidationPattern: (state, action: PayloadAction<{ name: string; pattern: RegExp }>) => {
      const { name, pattern } = action.payload
      state.elementValidation.patterns[name] = pattern
    },
    
    removeValidationPattern: (state, action: PayloadAction<string>) => {
      delete state.elementValidation.patterns[action.payload]
    },
  },
})

export const {
  copyElement,
  copySection,
  copyPage,
  clearClipboard,
  setElementLibraryLoading,
  setElementLibraryError,
  setElementLibraryCategories,
  setElementLibraryElements,
  addCustomElement,
  updateCustomElement,
  removeCustomElement,
  addStylePreset,
  updateStylePreset,
  removeStylePreset,
  setCustomStyle,
  removeCustomStyle,
  setValidationRule,
  addValidationPattern,
  removeValidationPattern,
} = elementSlice.actions

export default elementSlice.reducer
