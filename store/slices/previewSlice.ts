import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface PreviewState {
  isPreviewMode: boolean
  previewDevice: 'desktop' | 'tablet' | 'mobile'
  zoom: number
  isFullscreen: boolean
  showFormControls: boolean
  formData: any | null
  previewUrl: string | null
  submissionData: any[]
  isSubmitting: boolean
  submitError: string | null
  submitSuccess: boolean
  validationErrors: Record<string, string[]>
  currentPageIndex: number
  totalPages: number
  progress: number
  showProgress: boolean
  theme: {
    primaryColor: string
    backgroundColor: string
    textColor: string
    fontFamily: string
  }
  branding: {
    showLogo: boolean
    logoUrl: string | null
    showTitle: boolean
    customTitle: string | null
    showFooter: boolean
    customFooter: string | null
  }
  behavior: {
    allowSave: boolean
    allowEdit: boolean
    showProgressBar: boolean
    autoSave: boolean
    autoSaveInterval: number
    redirectOnSubmit: boolean
    redirectUrl: string | null
    showThankYouMessage: boolean
    thankYouMessage: string
  }
}

const initialState: PreviewState = {
  isPreviewMode: false,
  previewDevice: 'desktop',
  zoom: 1,
  isFullscreen: false,
  showFormControls: true,
  formData: null,
  previewUrl: null,
  submissionData: [],
  isSubmitting: false,
  submitError: null,
  submitSuccess: false,
  validationErrors: {},
  currentPageIndex: 0,
  totalPages: 1,
  progress: 0,
  showProgress: false,
  theme: {
    primaryColor: '#3b82f6',
    backgroundColor: '#ffffff',
    textColor: '#1f2937',
    fontFamily: 'Inter',
  },
  branding: {
    showLogo: true,
    logoUrl: null,
    showTitle: true,
    customTitle: null,
    showFooter: true,
    customFooter: null,
  },
  behavior: {
    allowSave: true,
    allowEdit: false,
    showProgressBar: false,
    autoSave: false,
    autoSaveInterval: 30000,
    redirectOnSubmit: false,
    redirectUrl: null,
    showThankYouMessage: true,
    thankYouMessage: 'Thank you for your submission!',
  },
}

const previewSlice = createSlice({
  name: "preview",
  initialState,
  reducers: {
    // Preview mode controls
    setPreviewMode: (state, action: PayloadAction<boolean>) => {
      state.isPreviewMode = action.payload
    },
    
    togglePreviewMode: (state) => {
      state.isPreviewMode = !state.isPreviewMode
    },
    
    // Device and display controls
    setPreviewDevice: (state, action: PayloadAction<'desktop' | 'tablet' | 'mobile'>) => {
      state.previewDevice = action.payload
    },
    
    setPreviewZoom: (state, action: PayloadAction<number>) => {
      state.zoom = Math.max(0.25, Math.min(2, action.payload))
    },
    
    setFullscreen: (state, action: PayloadAction<boolean>) => {
      state.isFullscreen = action.payload
    },
    
    toggleFullscreen: (state) => {
      state.isFullscreen = !state.isFullscreen
    },
    
    // Form controls
    setShowFormControls: (state, action: PayloadAction<boolean>) => {
      state.showFormControls = action.payload
    },
    
    // Form data management
    setPreviewFormData: (state, action: PayloadAction<any>) => {
      state.formData = action.payload
      if (action.payload?.pages) {
        state.totalPages = action.payload.pages.length
      }
    },
    
    clearPreviewFormData: (state) => {
      state.formData = null
      state.submissionData = []
      state.currentPageIndex = 0
      state.validationErrors = {}
    },
    
    // Submission handling
    startSubmission: (state) => {
      state.isSubmitting = true
      state.submitError = null
      state.submitSuccess = false
    },
    
    submitSuccess: (state, action: PayloadAction<any>) => {
      state.isSubmitting = false
      state.submitSuccess = true
      state.submissionData.push(action.payload)
    },
    
    submitError: (state, action: PayloadAction<string>) => {
      state.isSubmitting = false
      state.submitError = action.payload
      state.submitSuccess = false
    },
    
    resetSubmission: (state) => {
      state.isSubmitting = false
      state.submitError = null
      state.submitSuccess = false
    },
    
    // Validation
    setValidationErrors: (state, action: PayloadAction<Record<string, string[]>>) => {
      state.validationErrors = action.payload
    },
    
    addValidationError: (state, action: PayloadAction<{ field: string; error: string }>) => {
      const { field, error } = action.payload
      if (!state.validationErrors[field]) {
        state.validationErrors[field] = []
      }
      state.validationErrors[field].push(error)
    },
    
    removeValidationError: (state, action: PayloadAction<{ field: string; error?: string }>) => {
      const { field, error } = action.payload
      if (state.validationErrors[field]) {
        if (error) {
          state.validationErrors[field] = state.validationErrors[field].filter(e => e !== error)
          if (state.validationErrors[field].length === 0) {
            delete state.validationErrors[field]
          }
        } else {
          delete state.validationErrors[field]
        }
      }
    },
    
    clearValidationErrors: (state) => {
      state.validationErrors = {}
    },
    
    // Navigation
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPageIndex = Math.max(0, Math.min(action.payload, state.totalPages - 1))
      state.progress = state.totalPages > 1 ? (state.currentPageIndex / (state.totalPages - 1)) * 100 : 0
    },
    
    nextPage: (state) => {
      if (state.currentPageIndex < state.totalPages - 1) {
        state.currentPageIndex += 1
        state.progress = (state.currentPageIndex / (state.totalPages - 1)) * 100
      }
    },
    
    previousPage: (state) => {
      if (state.currentPageIndex > 0) {
        state.currentPageIndex -= 1
        state.progress = (state.currentPageIndex / (state.totalPages - 1)) * 100
      }
    },
    
    // Progress
    setShowProgress: (state, action: PayloadAction<boolean>) => {
      state.showProgress = action.payload
    },
    
    updateProgress: (state) => {
      state.progress = state.totalPages > 1 ? (state.currentPageIndex / (state.totalPages - 1)) * 100 : 0
    },
    
    // Theme customization
    setPreviewTheme: (state, action: PayloadAction<Partial<PreviewState['theme']>>) => {
      state.theme = { ...state.theme, ...action.payload }
    },
    
    setPrimaryColor: (state, action: PayloadAction<string>) => {
      state.theme.primaryColor = action.payload
    },
    
    setBackgroundColor: (state, action: PayloadAction<string>) => {
      state.theme.backgroundColor = action.payload
    },
    
    setTextColor: (state, action: PayloadAction<string>) => {
      state.theme.textColor = action.payload
    },
    
    setFontFamily: (state, action: PayloadAction<string>) => {
      state.theme.fontFamily = action.payload
    },
    
    // Branding
    setPreviewBranding: (state, action: PayloadAction<Partial<PreviewState['branding']>>) => {
      state.branding = { ...state.branding, ...action.payload }
    },
    
    setLogoUrl: (state, action: PayloadAction<string | null>) => {
      state.branding.logoUrl = action.payload
    },
    
    setCustomTitle: (state, action: PayloadAction<string | null>) => {
      state.branding.customTitle = action.payload
    },
    
    setCustomFooter: (state, action: PayloadAction<string | null>) => {
      state.branding.customFooter = action.payload
    },
    
    // Behavior settings
    setPreviewBehavior: (state, action: PayloadAction<Partial<PreviewState['behavior']>>) => {
      state.behavior = { ...state.behavior, ...action.payload }
    },
    
    setAutoSave: (state, action: PayloadAction<boolean>) => {
      state.behavior.autoSave = action.payload
    },
    
    setRedirectOnSubmit: (state, action: PayloadAction<boolean>) => {
      state.behavior.redirectOnSubmit = action.payload
    },
    
    setRedirectUrl: (state, action: PayloadAction<string | null>) => {
      state.behavior.redirectUrl = action.payload
    },
    
    setThankYouMessage: (state, action: PayloadAction<string>) => {
      state.behavior.thankYouMessage = action.payload
    },
    
    // URL generation
    setPreviewUrl: (state, action: PayloadAction<string>) => {
      state.previewUrl = action.payload
    },
    
    generatePreviewUrl: (state) => {
      // Generate a unique preview URL
      const id = Math.random().toString(36).substr(2, 9)
      state.previewUrl = `/preview/${id}`
    },
    
    // Reset all preview state
    resetPreviewState: (state) => {
      Object.assign(state, initialState)
    },
  },
})

export const {
  setPreviewMode,
  togglePreviewMode,
  setPreviewDevice,
  setPreviewZoom,
  setFullscreen,
  toggleFullscreen,
  setShowFormControls,
  setPreviewFormData,
  clearPreviewFormData,
  startSubmission,
  submitSuccess,
  submitError,
  resetSubmission,
  setValidationErrors,
  addValidationError,
  removeValidationError,
  clearValidationErrors,
  setCurrentPage,
  nextPage,
  previousPage,
  setShowProgress,
  updateProgress,
  setPreviewTheme,
  setPrimaryColor,
  setBackgroundColor,
  setTextColor,
  setFontFamily,
  setPreviewBranding,
  setLogoUrl,
  setCustomTitle,
  setCustomFooter,
  setPreviewBehavior,
  setAutoSave,
  setRedirectOnSubmit,
  setRedirectUrl,
  setThankYouMessage,
  setPreviewUrl,
  generatePreviewUrl,
  resetPreviewState,
} = previewSlice.actions

export default previewSlice.reducer
