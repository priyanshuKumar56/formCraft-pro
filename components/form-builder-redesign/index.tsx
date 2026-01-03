"use client"

import { useState, useCallback } from "react"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import {
    setCurrentPageIndex,
    setSelectedElement,
    setSettingsSidebarOpen,
    setActiveTab,
    addElement,
    updateElement,
    deleteElement,
    moveElement,
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
import { ModernHeader } from "./header"
import { ToolboxPanel } from "./toolbox-panel"
import { PropertiesPanel } from "./properties-panel"
import { FormCanvas } from "./canvas"
import { PageNavigator } from "./page-navigator"
import { WorkflowCanvas } from "../workflow-canvas"
import { ResultsView } from "../results-view"
import { ConnectView } from "../connect-view"
import type { FormSection } from "@/types/form"

export function FormBuilderRedesign() {
    const dispatch = useAppDispatch()
    const { formData, currentPageIndex, selectedElement, settingsSidebarOpen, activeTab } = useAppSelector(
        (state) => state.form,
    )
    const [leftPanelOpen, setLeftPanelOpen] = useState(true)
    const [leftPanelTab, setLeftPanelTab] = useState<"elements" | "pages">("elements")

    const currentPage = formData.pages[currentPageIndex]

    // Element handlers
    const handleAddElement = useCallback((elementType: string, position?: number, sectionId?: string) => {
        dispatch(addElement({ type: elementType, position, sectionId }))
    }, [dispatch])

    const handleUpdateElement = useCallback((id: string, updates: Record<string, unknown>) => {
        dispatch(updateElement({ id, updates }))
    }, [dispatch])

    const handleDeleteElement = useCallback((id: string) => {
        dispatch(deleteElement(id))
    }, [dispatch])

    const handleMoveElement = useCallback((dragIndex: number, hoverIndex: number, sectionId?: string) => {
        dispatch(moveElement({ dragIndex, hoverIndex, sectionId }))
    }, [dispatch])

    const handleSelectElement = useCallback((id: string | null) => {
        dispatch(setSelectedElement(id))
        dispatch(setSettingsSidebarOpen(true))
    }, [dispatch])

    // Section handlers
    const handleAddSection = useCallback((type: "container" | "input-zone") => {
        dispatch(addSection({ type }))
    }, [dispatch])

    const handleUpdateSection = useCallback((sectionId: string, updates: Partial<FormSection>) => {
        dispatch(updateSection({ sectionId, updates }))
    }, [dispatch])

    const handleDeleteSection = useCallback((sectionId: string) => {
        dispatch(deleteSection(sectionId))
    }, [dispatch])

    const handleMoveSection = useCallback((dragIndex: number, hoverIndex: number) => {
        dispatch(moveSection({ dragIndex, hoverIndex }))
    }, [dispatch])

    // Page handlers
    const handlePageChange = useCallback((index: number) => {
        dispatch(setCurrentPageIndex(index))
    }, [dispatch])

    const handleAddPage = useCallback(() => {
        dispatch(addPage())
    }, [dispatch])

    const handleUpdatePage = useCallback((pageIndex: number, updates: Record<string, unknown>) => {
        dispatch(updatePage({ pageIndex, updates }))
    }, [dispatch])

    const handleDeletePage = useCallback((pageIndex: number) => {
        dispatch(deletePage(pageIndex))
    }, [dispatch])

    const handleMovePageUp = useCallback((pageIndex: number) => {
        dispatch(movePageUp(pageIndex))
    }, [dispatch])

    const handleMovePageDown = useCallback((pageIndex: number) => {
        dispatch(movePageDown(pageIndex))
    }, [dispatch])

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
                            isOpen={leftPanelOpen}
                            onToggle={() => setLeftPanelOpen(!leftPanelOpen)}
                            activeTab={leftPanelTab}
                            onTabChange={setLeftPanelTab}
                            pages={formData.pages}
                            currentPageIndex={currentPageIndex}
                            onPageChange={handlePageChange}
                            onAddPage={handleAddPage}
                            onUpdatePage={handleUpdatePage}
                            onDeletePage={handleDeletePage}
                            onMovePageUp={handleMovePageUp}
                            onMovePageDown={handleMovePageDown}
                            onAddElement={handleAddElement}
                            currentPageTitle={currentPage.title}
                        />

                        {/* Main Canvas Area */}
                        <div className="flex-1 flex flex-col overflow-hidden relative">
                            {/* Page Navigator Pills */}
                            <PageNavigator
                                pages={formData.pages}
                                currentPageIndex={currentPageIndex}
                                onPageChange={handlePageChange}
                            />

                            {/* Canvas */}
                            <FormCanvas
                                currentPage={currentPage}
                                selectedElement={selectedElement}
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
                            isOpen={settingsSidebarOpen}
                            onToggle={() => dispatch(setSettingsSidebarOpen(!settingsSidebarOpen))}
                            selectedElement={selectedElement}
                            formElement={selectedElement ? currentPage.sections.flatMap((s) => s.elements).find((el) => el.id === selectedElement) : null}
                            formSection={selectedElement ? currentPage.sections.find((s) => s.id === selectedElement) : null}
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
