"use client"

import { FormHeader } from "./form-header"
import { ElementsSidebar } from "./elements-sidebar"
import { SettingsSidebar } from "./settings-sidebar"
import { FormCanvas } from "./form-canvas"
import { WorkflowCanvas } from "./workflow-canvas"
import { ResultsView } from "./results-view"
import { ConnectView } from "./connect-view"
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
} from "@/store/slices/formSlice"

export function FormBuilder() {
  const dispatch = useAppDispatch()
  const { formData, currentPageIndex, selectedElement, settingsSidebarOpen, activeTab } = useAppSelector(
    (state) => state.form,
  )

  const currentPage = formData.pages[currentPageIndex]

  const handleAddElement = (elementType: string, position?: number) => {
    dispatch(addElement({ elementType, position }))
  }

  const handleUpdateElement = (id: string, updates: any) => {
    dispatch(updateElement({ id, updates }))
  }

  const handleDeleteElement = (id: string) => {
    dispatch(deleteElement(id))
  }

  const handleMoveElement = (dragIndex: number, hoverIndex: number) => {
    dispatch(moveElement({ dragIndex, hoverIndex }))
  }

  const handleSelectElement = (id: string | null) => {
    dispatch(setSelectedElement(id))
  }

  const handlePageChange = (index: number) => {
    dispatch(setCurrentPageIndex(index))
  }

  const handleAddPage = () => {
    dispatch(addPage())
  }

  const handleUpdatePage = (pageIndex: number, updates: any) => {
    dispatch(updatePage({ pageIndex, updates }))
  }

  const handleDeletePage = (pageIndex: number) => {
    dispatch(deletePage(pageIndex))
  }

  const handleMovePageUp = (pageIndex: number) => {
    dispatch(movePageUp(pageIndex))
  }

  const handleMovePageDown = (pageIndex: number) => {
    dispatch(movePageDown(pageIndex))
  }

  const handlePreview = () => {
    sessionStorage.setItem("formcraft-preview-data", JSON.stringify(formData))
    window.location.href = "/preview"
  }

  const handleUpdateForm = (newFormData: any) => {
    dispatch(setFormData(newFormData))
  }

  const handleUpdateFormSettings = (updates: any) => {
    dispatch(updateFormSettings(updates))
  }

  const renderMainContent = () => {
    switch (activeTab) {
      case "create":
        return (
          <FormCanvas
            currentPage={currentPage}
            selectedElement={selectedElement}
            onSelectElement={handleSelectElement}
            onUpdateElement={handleUpdateElement}
            onDeleteElement={handleDeleteElement}
            onAddElement={handleAddElement}
            onMoveElement={handleMoveElement}
          />
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
    <div className="h-screen w-screen flex flex-col bg-white">
      <FormHeader
        formData={formData}
        onUpdateForm={handleUpdateForm}
        onPreview={handlePreview}
        activeTab={activeTab}
        onTabChange={(tab) => dispatch(setActiveTab(tab))}
      />

      <div className="flex-1 flex overflow-hidden">
        {activeTab === "create" && (
          <ElementsSidebar
            pages={formData.pages}
            currentPageIndex={currentPageIndex}
            onPageChange={handlePageChange}
            onAddPage={handleAddPage}
            onUpdatePage={handleUpdatePage}
            onDeletePage={handleDeletePage}
            onMovePageUp={handleMovePageUp}
            onMovePageDown={handleMovePageDown}
            onAddElement={handleAddElement}
          />
        )}

        {renderMainContent()}

        {activeTab === "create" && settingsSidebarOpen && (
          <SettingsSidebar
            selectedElement={selectedElement}
            formElement={selectedElement ? currentPage.elements.find((el) => el.id === selectedElement) : null}
            onUpdateElement={handleUpdateElement}
            currentPage={currentPage}
            onUpdatePage={(updates) => handleUpdatePage(currentPageIndex, updates)}
            onClose={() => dispatch(setSettingsSidebarOpen(false))}
            formData={formData}
            onUpdateForm={handleUpdateForm}
          />
        )}

        {activeTab === "create" && !settingsSidebarOpen && (
          <button
            onClick={() => dispatch(setSettingsSidebarOpen(true))}
            className="fixed right-4 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-l-lg shadow-lg hover:bg-blue-700 transition-colors z-10"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
