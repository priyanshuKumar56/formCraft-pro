import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface ThemeState {
  currentTheme: string
  customThemes: any[]
  colorPalettes: {
    primary: string[]
    secondary: string[]
    neutral: string[]
    success: string[]
    warning: string[]
    error: string[]
  }
  fonts: {
    current: string
    available: string[]
    custom: string[]
  }
  spacing: {
    scale: number[]
    current: number
  }
  animations: {
    enabled: boolean
    speed: 'slow' | 'normal' | 'fast'
    easing: string
  }
}

interface LayoutState {
  breakpoints: {
    mobile: number
    tablet: number
    desktop: number
    wide: number
  }
  containerWidths: {
    sm: number
    md: number
    lg: number
    xl: number
    '2xl': number
    full: boolean
  }
  gridSystem: {
    columns: number
    gap: number
    enabled: boolean
  }
  responsive: {
    enabled: boolean
    currentBreakpoint: string
    previewDevice: 'desktop' | 'tablet' | 'mobile'
  }
}

interface ComponentState {
  components: Record<string, any>
  variants: Record<string, any[]>
  customComponents: any[]
  componentLibrary: {
    loading: boolean
    error: string | null
    categories: any[]
    items: any[]
  }
}

interface DesignSystemState {
  theme: ThemeState
  layout: LayoutState
  components: ComponentState
  tokens: {
    colors: Record<string, string>
    typography: Record<string, any>
    spacing: Record<string, string>
    shadows: Record<string, string>
    borders: Record<string, string>
  }
  patterns: {
    layouts: any[]
    sections: any[]
    elements: any[]
  }
}

const initialState: DesignSystemState = {
  theme: {
    currentTheme: 'default',
    customThemes: [],
    colorPalettes: {
      primary: ['#3b82f6', '#2563eb', '#1d4ed8', '#1e40af', '#1e3a8a'],
      secondary: ['#6b7280', '#4b5563', '#374151', '#1f2937', '#111827'],
      neutral: ['#f9fafb', '#f3f4f6', '#e5e7eb', '#d1d5db', '#9ca3af'],
      success: ['#10b981', '#059669', '#047857', '#065f46', '#064e3b'],
      warning: ['#f59e0b', '#d97706', '#b45309', '#92400e', '#78350f'],
      error: ['#ef4444', '#dc2626', '#b91c1c', '#991b1b', '#7f1d1d'],
    },
    fonts: {
      current: 'Inter',
      available: ['Inter', 'Roboto', 'Open Sans', 'Poppins', 'Montserrat', 'Lato', 'Raleway'],
      custom: [],
    },
    spacing: {
      scale: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128, 160, 192, 224, 256],
      current: 8,
    },
    animations: {
      enabled: true,
      speed: 'normal',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  
  layout: {
    breakpoints: {
      mobile: 640,
      tablet: 768,
      desktop: 1024,
      wide: 1280,
    },
    containerWidths: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536,
      full: true,
    },
    gridSystem: {
      columns: 12,
      gap: 16,
      enabled: true,
    },
    responsive: {
      enabled: true,
      currentBreakpoint: 'desktop',
      previewDevice: 'desktop',
    },
  },
  
  components: {
    components: {},
    variants: {},
    customComponents: [],
    componentLibrary: {
      loading: false,
      error: null,
      categories: [],
      items: [],
    },
  },
  
  tokens: {
    colors: {},
    typography: {},
    spacing: {},
    shadows: {},
    borders: {},
  },
  
  patterns: {
    layouts: [],
    sections: [],
    elements: [],
  },
}

const designSystemSlice = createSlice({
  name: "designSystem",
  initialState,
  reducers: {
    // Theme actions
    setCurrentTheme: (state, action: PayloadAction<string>) => {
      state.theme.currentTheme = action.payload
    },
    
    addCustomTheme: (state, action: PayloadAction<any>) => {
      state.theme.customThemes.push(action.payload)
    },
    
    updateCustomTheme: (state, action: PayloadAction<{ id: string; updates: any }>) => {
      const { id, updates } = action.payload
      const index = state.theme.customThemes.findIndex(theme => theme.id === id)
      if (index !== -1) {
        state.theme.customThemes[index] = { ...state.theme.customThemes[index], ...updates }
      }
    },
    
    removeCustomTheme: (state, action: PayloadAction<string>) => {
      state.theme.customThemes = state.theme.customThemes.filter(theme => theme.id !== action.payload)
    },
    
    updateColorPalette: (state, action: PayloadAction<{ palette: keyof ThemeState['colorPalettes']; colors: string[] }>) => {
      const { palette, colors } = action.payload
      state.theme.colorPalettes[palette] = colors
    },
    
    setCurrentFont: (state, action: PayloadAction<string>) => {
      state.theme.fonts.current = action.payload
    },
    
    addCustomFont: (state, action: PayloadAction<string>) => {
      if (!state.theme.fonts.custom.includes(action.payload)) {
        state.theme.fonts.custom.push(action.payload)
      }
    },
    
    removeCustomFont: (state, action: PayloadAction<string>) => {
      state.theme.fonts.custom = state.theme.fonts.custom.filter(font => font !== action.payload)
    },
    
    updateSpacingScale: (state, action: PayloadAction<number[]>) => {
      state.theme.spacing.scale = action.payload
    },
    
    setSpacingBase: (state, action: PayloadAction<number>) => {
      state.theme.spacing.current = action.payload
    },
    
    updateAnimationSettings: (state, action: PayloadAction<Partial<ThemeState['animations']>>) => {
      state.theme.animations = { ...state.theme.animations, ...action.payload }
    },
    
    // Layout actions
    updateBreakpoints: (state, action: PayloadAction<Partial<LayoutState['breakpoints']>>) => {
      state.layout.breakpoints = { ...state.layout.breakpoints, ...action.payload }
    },
    
    updateContainerWidths: (state, action: PayloadAction<Partial<LayoutState['containerWidths']>>) => {
      state.layout.containerWidths = { ...state.layout.containerWidths, ...action.payload }
    },
    
    updateGridSystem: (state, action: PayloadAction<Partial<LayoutState['gridSystem']>>) => {
      state.layout.gridSystem = { ...state.layout.gridSystem, ...action.payload }
    },
    
    setResponsiveSettings: (state, action: PayloadAction<Partial<LayoutState['responsive']>>) => {
      state.layout.responsive = { ...state.layout.responsive, ...action.payload }
    },
    
    setCurrentBreakpoint: (state, action: PayloadAction<string>) => {
      state.layout.responsive.currentBreakpoint = action.payload
    },
    
    setPreviewDevice: (state, action: PayloadAction<'desktop' | 'tablet' | 'mobile'>) => {
      state.layout.responsive.previewDevice = action.payload
    },
    
    // Component actions
    setComponent: (state, action: PayloadAction<{ name: string; component: any }>) => {
      state.components.components[action.payload.name] = action.payload.component
    },
    
    addComponentVariant: (state, action: PayloadAction<{ component: string; variant: any }>) => {
      const { component, variant } = action.payload
      if (!state.components.variants[component]) {
        state.components.variants[component] = []
      }
      state.components.variants[component].push(variant)
    },
    
    removeComponentVariant: (state, action: PayloadAction<{ component: string; variantId: string }>) => {
      const { component, variantId } = action.payload
      if (state.components.variants[component]) {
        state.components.variants[component] = state.components.variants[component].filter(
          (variant: any) => variant.id !== variantId
        )
      }
    },
    
    addCustomComponent: (state, action: PayloadAction<any>) => {
      state.components.customComponents.push(action.payload)
    },
    
    updateCustomComponent: (state, action: PayloadAction<{ id: string; updates: any }>) => {
      const { id, updates } = action.payload
      const index = state.components.customComponents.findIndex(comp => comp.id === id)
      if (index !== -1) {
        state.components.customComponents[index] = { ...state.components.customComponents[index], ...updates }
      }
    },
    
    removeCustomComponent: (state, action: PayloadAction<string>) => {
      state.components.customComponents = state.components.customComponents.filter(comp => comp.id !== action.payload)
    },
    
    setComponentLibraryLoading: (state, action: PayloadAction<boolean>) => {
      state.components.componentLibrary.loading = action.payload
    },
    
    setComponentLibraryError: (state, action: PayloadAction<string | null>) => {
      state.components.componentLibrary.error = action.payload
    },
    
    setComponentLibraryCategories: (state, action: PayloadAction<any[]>) => {
      state.components.componentLibrary.categories = action.payload
    },
    
    setComponentLibraryItems: (state, action: PayloadAction<any[]>) => {
      state.components.componentLibrary.items = action.payload
    },
    
    // Design Tokens actions
    setColorToken: (state, action: PayloadAction<{ name: string; value: string }>) => {
      state.tokens.colors[action.payload.name] = action.payload.value
    },
    
    setTypographyToken: (state, action: PayloadAction<{ name: string; value: any }>) => {
      state.tokens.typography[action.payload.name] = action.payload.value
    },
    
    setSpacingToken: (state, action: PayloadAction<{ name: string; value: string }>) => {
      state.tokens.spacing[action.payload.name] = action.payload.value
    },
    
    setShadowToken: (state, action: PayloadAction<{ name: string; value: string }>) => {
      state.tokens.shadows[action.payload.name] = action.payload.value
    },
    
    setBorderToken: (state, action: PayloadAction<{ name: string; value: string }>) => {
      state.tokens.borders[action.payload.name] = action.payload.value
    },
    
    // Pattern actions
    addLayoutPattern: (state, action: PayloadAction<any>) => {
      state.patterns.layouts.push(action.payload)
    },
    
    addSectionPattern: (state, action: PayloadAction<any>) => {
      state.patterns.sections.push(action.payload)
    },
    
    addElementPattern: (state, action: PayloadAction<any>) => {
      state.patterns.elements.push(action.payload)
    },
    
    removeLayoutPattern: (state, action: PayloadAction<string>) => {
      state.patterns.layouts = state.patterns.layouts.filter(pattern => pattern.id !== action.payload)
    },
    
    removeSectionPattern: (state, action: PayloadAction<string>) => {
      state.patterns.sections = state.patterns.sections.filter(pattern => pattern.id !== action.payload)
    },
    
    removeElementPattern: (state, action: PayloadAction<string>) => {
      state.patterns.elements = state.patterns.elements.filter(pattern => pattern.id !== action.payload)
    },
  },
})

export const {
  setCurrentTheme,
  addCustomTheme,
  updateCustomTheme,
  removeCustomTheme,
  updateColorPalette,
  setCurrentFont,
  addCustomFont,
  removeCustomFont,
  updateSpacingScale,
  setSpacingBase,
  updateAnimationSettings,
  updateBreakpoints,
  updateContainerWidths,
  updateGridSystem,
  setResponsiveSettings,
  setCurrentBreakpoint,
  setPreviewDevice,
  setComponent,
  addComponentVariant,
  removeComponentVariant,
  addCustomComponent,
  updateCustomComponent,
  removeCustomComponent,
  setComponentLibraryLoading,
  setComponentLibraryError,
  setComponentLibraryCategories,
  setComponentLibraryItems,
  setColorToken,
  setTypographyToken,
  setSpacingToken,
  setShadowToken,
  setBorderToken,
  addLayoutPattern,
  addSectionPattern,
  addElementPattern,
  removeLayoutPattern,
  removeSectionPattern,
  removeElementPattern,
} = designSystemSlice.actions

export default designSystemSlice.reducer
