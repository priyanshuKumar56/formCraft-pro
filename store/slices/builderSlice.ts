import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface DragDropState {
  isDragging: boolean
  draggedItemType: 'element' | 'section' | null
  draggedElementType?: string
  draggedSectionType?: 'container' | 'input-zone' | null
  dropTargetId: string | null
  dropTargetType: 'canvas' | 'section' | null
  dragOverSectionId: string | null
  previewPosition: { x: number; y: number } | null
}

interface HistoryState {
  past: any[]
  present: any
  future: any[]
  maxHistorySize: number
}

interface ValidationState {
  errors: Record<string, string[]>
  warnings: Record<string, string[]>
  isValid: boolean
  isDirty: boolean
}

interface BuilderState {
  // Drag and Drop
  dragDrop: DragDropState
  
  // History/Undo-Redo
  history: HistoryState
  
  // Validation
  validation: ValidationState
  
  // Builder Settings
  settings: {
    snapToGrid: boolean
    gridSize: number
    showRulers: boolean
    showGuides: boolean
    autoSave: boolean
    autoSaveDelay: number
    previewMode: boolean
    device: 'desktop' | 'tablet' | 'mobile'
    zoom: number
  }
  
  // Element Templates
  templates: {
    recent: string[]
    favorites: string[]
    custom: any[]
  }
  
  // Performance
  performance: {
    renderCount: number
    lastRenderTime: number
    isOptimized: boolean
  }
}

const initialState: BuilderState = {
  dragDrop: {
    isDragging: false,
    draggedItemType: null,
    draggedElementType: undefined,
    draggedSectionType: null,
    dropTargetId: null,
    dropTargetType: null,
    dragOverSectionId: null,
    previewPosition: null,
  },
  
  history: {
    past: [],
    present: null,
    future: [],
    maxHistorySize: 50,
  },
  
  validation: {
    errors: {},
    warnings: {},
    isValid: true,
    isDirty: false,
  },
  
  settings: {
    snapToGrid: false,
    gridSize: 8,
    showRulers: false,
    showGuides: true,
    autoSave: true,
    autoSaveDelay: 2000,
    previewMode: false,
    device: 'desktop',
    zoom: 1,
  },
  
  templates: {
    recent: [],
    favorites: [],
    custom: [],
  },
  
  performance: {
    renderCount: 0,
    lastRenderTime: 0,
    isOptimized: true,
  },
}

const builderSlice = createSlice({
  name: "builder",
  initialState,
  reducers: {
    // Drag and Drop actions
    setDragging: (state, action: PayloadAction<Partial<DragDropState>>) => {
      state.dragDrop = { ...state.dragDrop, ...action.payload }
    },
    
    startDrag: (state, action: PayloadAction<{
      itemType: 'element' | 'section'
      elementType?: string
      sectionType?: 'container' | 'input-zone'
    }>) => {
      state.dragDrop.isDragging = true
      state.dragDrop.draggedItemType = action.payload.itemType
      state.dragDrop.draggedElementType = action.payload.elementType
      state.dragDrop.draggedSectionType = action.payload.sectionType
    },
    
    endDrag: (state) => {
      state.dragDrop.isDragging = false
      state.dragDrop.draggedItemType = null
      state.dragDrop.draggedElementType = undefined
      state.dragDrop.draggedSectionType = null
      state.dragDrop.dropTargetId = null
      state.dragDrop.dropTargetType = null
      state.dragDrop.dragOverSectionId = null
      state.dragDrop.previewPosition = null
    },
    
    setDropTarget: (state, action: PayloadAction<{
      targetId: string | null
      targetType: 'canvas' | 'section' | null
      sectionId?: string | null
      position?: { x: number; y: number } | null
    }>) => {
      state.dragDrop.dropTargetId = action.payload.targetId
      state.dragDrop.dropTargetType = action.payload.targetType
      state.dragDrop.dragOverSectionId = action.payload.sectionId || null
      state.dragDrop.previewPosition = action.payload.position || null
    },
    
    // History actions
    saveToHistory: (state, action: PayloadAction<any>) => {
      const currentState = action.payload
      
      // Add current state to past
      if (state.history.present) {
        state.history.past.push(state.history.present)
      }
      
      // Set new present
      state.history.present = currentState
      
      // Clear future
      state.history.future = []
      
      // Limit history size
      if (state.history.past.length > state.history.maxHistorySize) {
        state.history.past.shift()
      }
    },
    
    undo: (state) => {
      if (state.history.past.length === 0) return
      
      const previous = state.history.past[state.history.past.length - 1]
      const newPast = state.history.past.slice(0, state.history.past.length - 1)
      
      state.history.past = newPast
      state.history.future.unshift(state.history.present)
      state.history.present = previous
    },
    
    redo: (state) => {
      if (state.history.future.length === 0) return
      
      const next = state.history.future[0]
      const newFuture = state.history.future.slice(1)
      
      state.history.past.push(state.history.present)
      state.history.future = newFuture
      state.history.present = next
    },
    
    clearHistory: (state) => {
      state.history.past = []
      state.history.future = []
    },
    
    // Validation actions
    setValidationErrors: (state, action: PayloadAction<Record<string, string[]>>) => {
      state.validation.errors = action.payload
      state.validation.isValid = Object.keys(action.payload).length === 0
    },
    
    setValidationWarnings: (state, action: PayloadAction<Record<string, string[]>>) => {
      state.validation.warnings = action.payload
    },
    
    addValidationError: (state, action: PayloadAction<{ id: string; error: string }>) => {
      const { id, error } = action.payload
      if (!state.validation.errors[id]) {
        state.validation.errors[id] = []
      }
      state.validation.errors[id].push(error)
      state.validation.isValid = false
    },
    
    removeValidationError: (state, action: PayloadAction<{ id: string; error?: string }>) => {
      const { id, error } = action.payload
      if (state.validation.errors[id]) {
        if (error) {
          state.validation.errors[id] = state.validation.errors[id].filter(e => e !== error)
          if (state.validation.errors[id].length === 0) {
            delete state.validation.errors[id]
          }
        } else {
          delete state.validation.errors[id]
        }
      }
      state.validation.isValid = Object.keys(state.validation.errors).length === 0
    },
    
    setDirty: (state, action: PayloadAction<boolean>) => {
      state.validation.isDirty = action.payload
    },
    
    clearValidation: (state) => {
      state.validation.errors = {}
      state.validation.warnings = {}
      state.validation.isValid = true
    },
    
    // Builder Settings actions
    updateBuilderSettings: (state, action: PayloadAction<Partial<BuilderState['settings']>>) => {
      state.settings = { ...state.settings, ...action.payload }
    },
    
    toggleSnapToGrid: (state) => {
      state.settings.snapToGrid = !state.settings.snapToGrid
    },
    
    togglePreviewMode: (state) => {
      state.settings.previewMode = !state.settings.previewMode
    },
    
    setDevice: (state, action: PayloadAction<'desktop' | 'tablet' | 'mobile'>) => {
      state.settings.device = action.payload
    },
    
    setZoom: (state, action: PayloadAction<number>) => {
      state.settings.zoom = Math.max(0.25, Math.min(2, action.payload))
    },
    
    // Templates actions
    addToRecentTemplates: (state, action: PayloadAction<string>) => {
      const templateId = action.payload
      state.templates.recent = state.templates.recent.filter(id => id !== templateId)
      state.templates.recent.unshift(templateId)
      if (state.templates.recent.length > 10) {
        state.templates.recent.pop()
      }
    },
    
    toggleFavoriteTemplate: (state, action: PayloadAction<string>) => {
      const templateId = action.payload
      if (state.templates.favorites.includes(templateId)) {
        state.templates.favorites = state.templates.favorites.filter(id => id !== templateId)
      } else {
        state.templates.favorites.push(templateId)
      }
    },
    
    addCustomTemplate: (state, action: PayloadAction<any>) => {
      state.templates.custom.push(action.payload)
    },
    
    removeCustomTemplate: (state, action: PayloadAction<string>) => {
      state.templates.custom = state.templates.custom.filter(template => template.id !== action.payload)
    },
    
    // Performance actions
    incrementRenderCount: (state) => {
      state.performance.renderCount += 1
    },
    
    setRenderTime: (state, action: PayloadAction<number>) => {
      state.performance.lastRenderTime = action.payload
    },
    
    setOptimized: (state, action: PayloadAction<boolean>) => {
      state.performance.isOptimized = action.payload
    },
    
    resetPerformance: (state) => {
      state.performance.renderCount = 0
      state.performance.lastRenderTime = 0
    },
  },
})

export const {
  setDragging,
  startDrag,
  endDrag,
  setDropTarget,
  saveToHistory,
  undo,
  redo,
  clearHistory,
  setValidationErrors,
  setValidationWarnings,
  addValidationError,
  removeValidationError,
  setDirty,
  clearValidation,
  updateBuilderSettings,
  toggleSnapToGrid,
  togglePreviewMode,
  setDevice,
  setZoom,
  addToRecentTemplates,
  toggleFavoriteTemplate,
  addCustomTemplate,
  removeCustomTemplate,
  incrementRenderCount,
  setRenderTime,
  setOptimized,
  resetPerformance,
} = builderSlice.actions

export default builderSlice.reducer
