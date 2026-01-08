"use client"

import React, { useCallback } from "react"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import {
    addElement,
    updateElement,
    deleteElement,
    reorderElements,
    addPage,
    updatePage,
    deletePage,
    movePageUp,
    movePageDown,
    setFormData,
    updateFormSettings,
    addSection,
    updateSection,
    deleteSection,
    moveSection,
} from "@/store/slices/formSlice"
import {
    setCurrentPageIndex,
    setSelectedElementId,
    setSettingsSidebarOpen,
    setActiveTab,
    setLeftPanelOpen,
    setLeftPanelTab,
} from "@/store/slices/uiSlice"
import {
    startDrag,
    endDrag,
    setDropTarget,
    saveToHistory,
    undo,
    redo,
    setDirty,
    updateBuilderSettings,
    togglePreviewMode,
    setDevice,
    setZoom,
} from "@/store/slices/builderSlice"
import {
    copyElement,
    copySection,
    copyPage,
    clearClipboard,
} from "@/store/slices/elementSlice"
import { ModernHeader } from "./header"
import { ToolboxPanel } from "./toolbox-panel"
import { PropertiesPanel } from "./properties-panel"
import { FormCanvas } from "./canvas"
import { PageNavigator } from "./page-navigator"
import { WorkflowCanvas } from "../workflow-canvas"
import { ResultsView } from "../results-view"
import { ConnectView } from "../connect-view"
import type { FormSection } from "@/types/form"
import { generateId } from "@/lib/utils"

export function FormBuilderRedesign() {
    const dispatch = useAppDispatch()
    const { formData } = useAppSelector((state) => state.form)
    const {
        currentPageIndex,
        selectedElementId,
        isSettingsSidebarOpen,
        activeTab,
        isLeftPanelOpen,
        leftPanelTab
    } = useAppSelector((state) => state.ui)
    const {
        dragDrop,
        history,
        validation,
        settings,
    } = useAppSelector((state) => state.builder)

    const currentPage = formData.pages[currentPageIndex]

    // Element handlers
    const handleAddElement = useCallback((elementType: string, position?: number, sectionId?: string) => {
        const id = generateId()
        dispatch(addElement({ id, type: elementType, pageIndex: currentPageIndex, position, sectionId }))
        dispatch(setSelectedElementId(id))
        dispatch(setSettingsSidebarOpen(true))
    }, [dispatch, currentPageIndex])

    const handleUpdateElement = useCallback((id: string, updates: Record<string, unknown>) => {
        dispatch(updateElement({ id, pageIndex: currentPageIndex, updates }))
    }, [dispatch, currentPageIndex])

    const handleDeleteElement = useCallback((id: string) => {
        dispatch(deleteElement({ id, pageIndex: currentPageIndex }))
        if (selectedElementId === id) {
            dispatch(setSelectedElementId(null))
        }
    }, [dispatch, currentPageIndex, selectedElementId])

    const handleMoveElement = useCallback((dragIndex: number, hoverIndex: number, sectionId?: string) => {
        dispatch(reorderElements({ dragIndex, hoverIndex, pageIndex: currentPageIndex, sectionId }))
    }, [dispatch, currentPageIndex])

    const handleSelectElement = useCallback((id: string | null) => {
        dispatch(setSelectedElementId(id))
        if (id) {
            dispatch(setSettingsSidebarOpen(true))
        }
    }, [dispatch])

    // Section handlers
    const handleAddSection = useCallback((type: "container" | "input-zone") => {
        dispatch(addSection({ pageIndex: currentPageIndex, type }))
    }, [dispatch, currentPageIndex])

    const handleUpdateSection = useCallback((sectionId: string, updates: Partial<FormSection>) => {
        dispatch(updateSection({ pageIndex: currentPageIndex, sectionId, updates }))
    }, [dispatch, currentPageIndex])

    const handleDeleteSection = useCallback((sectionId: string) => {
        dispatch(deleteSection({ pageIndex: currentPageIndex, sectionId }))
        if (selectedElementId === sectionId) {
            dispatch(setSelectedElementId(null))
        }
    }, [dispatch, currentPageIndex, selectedElementId])

    const handleMoveSection = useCallback((dragIndex: number, hoverIndex: number) => {
        dispatch(moveSection({ pageIndex: currentPageIndex, dragIndex, hoverIndex }))
    }, [dispatch, currentPageIndex])

    // Page handlers
    const handlePageChange = useCallback((index: number) => {
        dispatch(setCurrentPageIndex(index))
        dispatch(setSelectedElementId(null))
    }, [dispatch])

    const handleAddPage = useCallback(() => {
        dispatch(addPage())
        dispatch(setCurrentPageIndex(formData.pages.length))
        dispatch(setSelectedElementId(null))
    }, [dispatch, formData.pages.length])

    const handleUpdatePage = useCallback((pageIndex: number, updates: Record<string, unknown>) => {
        dispatch(updatePage({ pageIndex, updates }))
    }, [dispatch])

    const handleDeletePage = useCallback((pageIndex: number) => {
        dispatch(deletePage(pageIndex))
        if (currentPageIndex >= pageIndex && currentPageIndex > 0) {
            dispatch(setCurrentPageIndex(currentPageIndex - 1))
        }
        dispatch(setSelectedElementId(null))
    }, [dispatch, currentPageIndex])

    // Keyboard shortcuts
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        // Undo/Redo
        if (e.ctrlKey || e.metaKey) {
            if (e.key === 'z' && !e.shiftKey) {
                e.preventDefault()
                dispatch(undo())
            } else if ((e.key === 'z' && e.shiftKey) || e.key === 'y') {
                e.preventDefault()
                dispatch(redo())
            } else if (e.key === 'c' && selectedElementId) {
                e.preventDefault()
                // Copy selected element
                const element = currentPage?.sections.flatMap(s => s.elements).find(el => el.id === selectedElementId)
                if (element) dispatch(copyElement(element))
            } else if (e.key === 'v' && e.shiftKey) {
                e.preventDefault()
                // Paste functionality would go here
            }
        }
        
        // Delete
        if (e.key === 'Delete' && selectedElementId) {
            handleDeleteElement(selectedElementId)
        }
        
        // Preview mode
        if (e.key === 'p' && e.ctrlKey) {
            e.preventDefault()
            dispatch(togglePreviewMode())
        }
        
        // Zoom
        if (e.ctrlKey && e.key === '=') {
            e.preventDefault()
            dispatch(setZoom(Math.min(settings.zoom + 0.1, 2)))
        } else if (e.ctrlKey && e.key === '-') {
            e.preventDefault()
            dispatch(setZoom(Math.max(settings.zoom - 0.1, 0.25)))
        } else if (e.ctrlKey && e.key === '0') {
            e.preventDefault()
            dispatch(setZoom(1))
        }
    }, [dispatch, selectedElementId, currentPage, settings.zoom])
    
    // Add keyboard event listener
    React.useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [handleKeyDown])
    
    // Auto-save functionality
    React.useEffect(() => {
        if (settings.autoSave && validation.isDirty) {
            const timer = setTimeout(() => {
                dispatch(saveToHistory(formData))
                dispatch(setDirty(false))
            }, settings.autoSaveDelay)
            
            return () => clearTimeout(timer)
        }
    }, [formData, settings.autoSave, settings.autoSaveDelay, validation.isDirty, dispatch])
    
    // Form handlers
    const handlePreview = useCallback(() => {
        sessionStorage.setItem("formcraft-preview-data", JSON.stringify(formData))
        window.open("/preview", "_blank")
    }, [formData])

    const handleUpdateForm = useCallback((newFormData: typeof formData) => {
        dispatch(setFormData(newFormData))
    }, [dispatch])

    const handleUpdateFormSettings = useCallback((updates: Record<string, unknown>) => {
        dispatch(updateFormSettings(updates))
    }, [dispatch])

    const renderMainContent = () => {
        switch (activeTab) {
            case "create":
                return (
                    <div className="flex-1 flex overflow-hidden">
                        {/* Left Panel - Toolbox/Pages */}
                        <ToolboxPanel
                            isOpen={isLeftPanelOpen}
                            onToggle={() => dispatch(setLeftPanelOpen(!isLeftPanelOpen))}
                            activeTab={leftPanelTab}
                            onTabChange={(tab: "elements" | "pages") => dispatch(setLeftPanelTab(tab))}
                            pages={formData.pages}
                            currentPageIndex={currentPageIndex}
                            onPageChange={handlePageChange}
                            onAddPage={handleAddPage}
                            onUpdatePage={handleUpdatePage}
                            onDeletePage={handleDeletePage}
                            onMovePageUp={(idx: number) => {
                                dispatch(movePageUp(idx))
                                if (currentPageIndex === idx) dispatch(setCurrentPageIndex(idx - 1))
                                else if (currentPageIndex === idx - 1) dispatch(setCurrentPageIndex(idx))
                            }}
                            onMovePageDown={(idx: number) => {
                                dispatch(movePageDown(idx))
                                if (currentPageIndex === idx) dispatch(setCurrentPageIndex(idx + 1))
                                else if (currentPageIndex === idx + 1) dispatch(setCurrentPageIndex(idx))
                            }}
                            onAddElement={handleAddElement}
                            currentPageTitle={currentPage?.title || ""}
                        />

                        {/* Main Canvas Area */}
                        <div className="flex-1 flex flex-col overflow-hidden relative">
                            {/* Page Navigator Pills */}
                            <PageNavigator
                                pages={formData.pages}
                                currentPageIndex={currentPageIndex}
                                onPageChange={handlePageChange}
                                onAddPage={handleAddPage}
                                onDeletePage={handleDeletePage}
                            />

                            {/* Canvas */}
                            <FormCanvas
                                currentPage={currentPage}
                                selectedElement={selectedElementId}
                                onSelectElement={handleSelectElement}
                                onUpdateElement={handleUpdateElement}
                                onDeleteElement={handleDeleteElement}
                                onAddElement={handleAddElement}
                                onMoveElement={handleMoveElement}
                                onAddSection={handleAddSection}
                                onUpdateSection={handleUpdateSection}
                                onDeleteSection={handleDeleteSection}
                                onMoveSection={handleMoveSection}
                            />
                        </div>

                        {/* Right Panel - Properties */}
                        <PropertiesPanel
                            isOpen={isSettingsSidebarOpen}
                            onToggle={() => dispatch(setSettingsSidebarOpen(!isSettingsSidebarOpen))}
                            selectedElement={selectedElementId}
                            formElement={selectedElementId ? currentPage?.sections.flatMap((s) => s.elements).find((el) => el.id === selectedElementId) ?? null : null}
                            formSection={selectedElementId ? currentPage?.sections.find((s) => s.id === selectedElementId) ?? null : null}
                            onUpdateElement={handleUpdateElement}
                            onUpdateSection={handleUpdateSection}
                            currentPage={currentPage}
                            onUpdatePage={(updates) => handleUpdatePage(currentPageIndex, updates)}
                            formData={formData}
                            onUpdateForm={handleUpdateForm}
                            onUpdateFormSettings={handleUpdateFormSettings}
                        />
                    </div>
                )
            case "workflow":
                return <WorkflowCanvas formData={formData} onUpdateForm={handleUpdateForm} />
            case "connect":
                return <ConnectView />
            case "results":
                return <ResultsView formData={formData} />
            default:
                return null
        }
    }

    return (
        <div className="h-screen w-screen flex flex-col bg-slate-50 overflow-hidden">
            <ModernHeader
                formData={formData}
                onUpdateForm={handleUpdateForm}
                onPreview={handlePreview}
                activeTab={activeTab}
                onTabChange={(tab) => dispatch(setActiveTab(tab))}
            />
            {renderMainContent()}
        </div>
    )
}
