import { useSelector, useDispatch } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import * as formActions from './slices/formSlice'
import * as uiActions from './slices/uiSlice'
import * as builderActions from './slices/builderSlice'
import * as elementActions from './slices/elementSlice'
import * as designSystemActions from './slices/designSystemSlice'
import * as previewActions from './slices/previewSlice'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// Form-specific hooks
export const useFormState = () => {
  return useAppSelector(state => state.form)
}

export const useFormActions = () => {
  const dispatch = useAppDispatch()
  return {
    // Form actions
    setFormData: (data: any) => dispatch(formActions.setFormData(data)),
    addElement: (payload: any) => dispatch(formActions.addElement(payload)),
    updateElement: (payload: any) => dispatch(formActions.updateElement(payload)),
    deleteElement: (payload: any) => dispatch(formActions.deleteElement(payload)),
    reorderElements: (payload: any) => dispatch(formActions.reorderElements(payload)),
    addPage: () => dispatch(formActions.addPage()),
    updatePage: (payload: any) => dispatch(formActions.updatePage(payload)),
    deletePage: (pageIndex: number) => dispatch(formActions.deletePage(pageIndex)),
    reorderPages: (payload: any) => dispatch(formActions.reorderPages(payload)),
    movePageUp: (pageIndex: number) => dispatch(formActions.movePageUp(pageIndex)),
    movePageDown: (pageIndex: number) => dispatch(formActions.movePageDown(pageIndex)),
    addSection: (payload: any) => dispatch(formActions.addSection(payload)),
    updateSection: (payload: any) => dispatch(formActions.updateSection(payload)),
    deleteSection: (payload: any) => dispatch(formActions.deleteSection(payload)),
    moveSection: (payload: any) => dispatch(formActions.moveSection(payload)),
    updateFormSettings: (payload: any) => dispatch(formActions.updateFormSettings(payload)),
    setFormTitle: (title: string) => dispatch(formActions.setFormTitle(title)),
    setFormDescription: (description: string) => dispatch(formActions.setFormDescription(description)),
  }
}

// UI-specific hooks
export const useUIState = () => {
  return useAppSelector(state => state.ui)
}

export const useUIActions = () => {
  const dispatch = useAppDispatch()
  return {
    setCurrentPageIndex: (index: number) => dispatch(uiActions.setCurrentPageIndex(index)),
    setSelectedElementId: (id: string | null) => dispatch(uiActions.setSelectedElementId(id)),
    setSettingsSidebarOpen: (open: boolean) => dispatch(uiActions.setSettingsSidebarOpen(open)),
    setActiveTab: (tab: any) => dispatch(uiActions.setActiveTab(tab)),
    setLeftPanelOpen: (open: boolean) => dispatch(uiActions.setLeftPanelOpen(open)),
    setLeftPanelTab: (tab: any) => dispatch(uiActions.setLeftPanelTab(tab)),
  }
}

// Builder-specific hooks
export const useBuilderState = () => {
  return useAppSelector(state => state.builder)
}

export const useBuilderActions = () => {
  const dispatch = useAppDispatch()
  return {
    // Drag and Drop
    startDrag: (payload: any) => dispatch(builderActions.startDrag(payload)),
    endDrag: () => dispatch(builderActions.endDrag()),
    setDropTarget: (payload: any) => dispatch(builderActions.setDropTarget(payload)),
    
    // History
    saveToHistory: (data: any) => dispatch(builderActions.saveToHistory(data)),
    undo: () => dispatch(builderActions.undo()),
    redo: () => dispatch(builderActions.redo()),
    
    // Validation
    setValidationErrors: (errors: any) => dispatch(builderActions.setValidationErrors(errors)),
    setDirty: (isDirty: boolean) => dispatch(builderActions.setDirty(isDirty)),
    
    // Settings
    updateBuilderSettings: (settings: any) => dispatch(builderActions.updateBuilderSettings(settings)),
    toggleSnapToGrid: () => dispatch(builderActions.toggleSnapToGrid()),
    togglePreviewMode: () => dispatch(builderActions.togglePreviewMode()),
    setDevice: (device: any) => dispatch(builderActions.setDevice(device)),
    setZoom: (zoom: number) => dispatch(builderActions.setZoom(zoom)),
  }
}

// Element-specific hooks
export const useElementState = () => {
  return useAppSelector(state => state.element)
}

export const useElementActions = () => {
  const dispatch = useAppDispatch()
  return {
    // Clipboard
    copyElement: (element: any) => dispatch(elementActions.copyElement(element)),
    copySection: (section: any) => dispatch(elementActions.copySection(section)),
    copyPage: (page: any) => dispatch(elementActions.copyPage(page)),
    clearClipboard: () => dispatch(elementActions.clearClipboard()),
    
    // Custom Elements
    addCustomElement: (element: any) => dispatch(elementActions.addCustomElement(element)),
    updateCustomElement: (payload: any) => dispatch(elementActions.updateCustomElement(payload)),
    removeCustomElement: (id: string) => dispatch(elementActions.removeCustomElement(id)),
    
    // Styles
    addStylePreset: (preset: any) => dispatch(elementActions.addStylePreset(preset)),
    setCustomStyle: (payload: any) => dispatch(elementActions.setCustomStyle(payload)),
  }
}

// Design System-specific hooks
export const useDesignSystemState = () => {
  return useAppSelector(state => state.designSystem)
}

export const useDesignSystemActions = () => {
  const dispatch = useAppDispatch()
  return {
    // Theme
    setCurrentTheme: (theme: string) => dispatch(designSystemActions.setCurrentTheme(theme)),
    addCustomTheme: (theme: any) => dispatch(designSystemActions.addCustomTheme(theme)),
    updateColorPalette: (payload: any) => dispatch(designSystemActions.updateColorPalette(payload)),
    
    // Layout
    setPreviewDevice: (device: any) => dispatch(designSystemActions.setPreviewDevice(device)),
    updateBreakpoints: (breakpoints: any) => dispatch(designSystemActions.updateBreakpoints(breakpoints)),
    
    // Components
    addCustomComponent: (component: any) => dispatch(designSystemActions.addCustomComponent(component)),
    addComponentVariant: (payload: any) => dispatch(designSystemActions.addComponentVariant(payload)),
  }
}

// Preview-specific hooks
export const usePreviewState = () => {
  return useAppSelector(state => state.preview)
}

export const usePreviewActions = () => {
  const dispatch = useAppDispatch()
  return {
    // Preview mode controls
    setPreviewMode: (enabled: boolean) => dispatch(previewActions.setPreviewMode(enabled)),
    togglePreviewMode: () => dispatch(previewActions.togglePreviewMode()),
    
    // Device and display controls
    setPreviewDevice: (device: 'mobile' | 'tablet' | 'desktop') => dispatch(previewActions.setPreviewDevice(device)),
    setPreviewZoom: (zoom: number) => dispatch(previewActions.setPreviewZoom(zoom)),
    setFullscreen: (enabled: boolean) => dispatch(previewActions.setFullscreen(enabled)),
    toggleFullscreen: () => dispatch(previewActions.toggleFullscreen()),
    setShowFormControls: (show: boolean) => dispatch(previewActions.setShowFormControls(show)),
    
    // Form data management
    setPreviewFormData: (data: any) => dispatch(previewActions.setPreviewFormData(data)),
    clearPreviewFormData: () => dispatch(previewActions.clearPreviewFormData()),
    
    // Submission handling
    startSubmission: () => dispatch(previewActions.startSubmission()),
    submitSuccess: (data: any) => dispatch(previewActions.submitSuccess(data)),
    submitError: (error: string) => dispatch(previewActions.submitError(error)),
    resetSubmission: () => dispatch(previewActions.resetSubmission()),
    
    // Validation
    setValidationErrors: (errors: Record<string, string[]>) => dispatch(previewActions.setValidationErrors(errors)),
    addValidationError: (payload: { field: string; error: string }) => dispatch(previewActions.addValidationError(payload)),
    removeValidationError: (payload: { field: string; error?: string }) => dispatch(previewActions.removeValidationError(payload)),
    clearValidationErrors: () => dispatch(previewActions.clearValidationErrors()),
    
    // Navigation
    setCurrentPage: (index: number) => dispatch(previewActions.setCurrentPage(index)),
    nextPage: () => dispatch(previewActions.nextPage()),
    previousPage: () => dispatch(previewActions.previousPage()),
    
    // Progress
    setShowProgress: (show: boolean) => dispatch(previewActions.setShowProgress(show)),
    updateProgress: () => dispatch(previewActions.updateProgress()),
    
    // Theme customization
    setPreviewTheme: (theme: any) => dispatch(previewActions.setPreviewTheme(theme)),
    setPrimaryColor: (color: string) => dispatch(previewActions.setPrimaryColor(color)),
    setBackgroundColor: (color: string) => dispatch(previewActions.setBackgroundColor(color)),
    setTextColor: (color: string) => dispatch(previewActions.setTextColor(color)),
    setFontFamily: (font: string) => dispatch(previewActions.setFontFamily(font)),
    
    // Branding
    setPreviewBranding: (branding: any) => dispatch(previewActions.setPreviewBranding(branding)),
    setLogoUrl: (url: string | null) => dispatch(previewActions.setLogoUrl(url)),
    setCustomTitle: (title: string | null) => dispatch(previewActions.setCustomTitle(title)),
    setCustomFooter: (footer: string | null) => dispatch(previewActions.setCustomFooter(footer)),
    
    // Behavior settings
    setPreviewBehavior: (behavior: any) => dispatch(previewActions.setPreviewBehavior(behavior)),
    setAutoSave: (enabled: boolean) => dispatch(previewActions.setAutoSave(enabled)),
    setRedirectOnSubmit: (enabled: boolean) => dispatch(previewActions.setRedirectOnSubmit(enabled)),
    setRedirectUrl: (url: string | null) => dispatch(previewActions.setRedirectUrl(url)),
    setThankYouMessage: (message: string) => dispatch(previewActions.setThankYouMessage(message)),
    
    // URL generation
    setPreviewUrl: (url: string) => dispatch(previewActions.setPreviewUrl(url)),
    generatePreviewUrl: () => dispatch(previewActions.generatePreviewUrl()),
    
    // Reset all preview state
    resetPreviewState: () => dispatch(previewActions.resetPreviewState()),
  }
}

// Combined hooks for common use cases
export const useFormBuilder = () => {
  const formState = useFormState()
  const uiState = useUIState()
  const builderState = useBuilderState()
  
  const formActions = useFormActions()
  const uiActions = useUIActions()
  const builderActions = useBuilderActions()
  
  return {
    // State
    form: formState,
    ui: uiState,
    builder: builderState,
    
    // Actions
    ...formActions,
    ...uiActions,
    ...builderActions,
    
    // Computed values
    currentPage: formState.formData.pages[uiState.currentPageIndex],
    selectedElement: uiState.selectedElementId,
    isPreviewMode: builderState.settings.previewMode,
    canUndo: builderState.history.past.length > 0,
    canRedo: builderState.history.future.length > 0,
  }
}

export const useFormElement = (elementId?: string) => {
  const formState = useFormState()
  const uiState = useUIState()
  
  const currentPage = formState.formData.pages[uiState.currentPageIndex]
  const element = elementId 
    ? currentPage?.sections.flatMap(s => s.elements).find(el => el.id === elementId)
    : null
  
  return {
    element,
    currentPage,
    isSelected: uiState.selectedElementId === elementId,
  }
}

export const useFormValidation = () => {
  const builderState = useBuilderState()
  const formState = useFormState()
  
  return {
    errors: builderState.validation.errors,
    warnings: builderState.validation.warnings,
    isValid: builderState.validation.isValid,
    isDirty: builderState.validation.isDirty,
    
    // Validation helpers
    hasErrors: Object.keys(builderState.validation.errors).length > 0,
    hasWarnings: Object.keys(builderState.validation.warnings).length > 0,
    errorCount: Object.values(builderState.validation.errors).reduce((acc, errors) => acc + errors.length, 0),
    warningCount: Object.values(builderState.validation.warnings).reduce((acc, warnings) => acc + warnings.length, 0),
  }
}
