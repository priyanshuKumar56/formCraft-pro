"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Palette, MousePointer2, Layout, Square } from "lucide-react"
import type { FormElement, FormPage, FormData, FormSection } from "@/types/form"
import { ContentTab } from "./properties/content-tab"
import { StyleTab } from "./properties/style-tab"
import { SettingsTab } from "./properties/settings-tab"

interface PropertiesPanelProps {
    isOpen: boolean
    onToggle: () => void
    selectedElement: string | null
    formElement: FormElement | null
    onUpdateElement: (id: string, updates: Partial<FormElement>) => void
    currentPage: FormPage
    onUpdatePage: (updates: Partial<FormPage>) => void
    formSection: FormSection | null
    onUpdateSection: (sectionId: string, updates: Partial<FormSection>) => void
    formData: FormData
    onUpdateForm: (formData: FormData) => void
    onUpdateFormSettings: (updates: Partial<FormData["settings"]>) => void
}

export function PropertiesPanel({
    isOpen, onToggle, selectedElement, formElement, onUpdateElement,
    currentPage, onUpdatePage, formSection, onUpdateSection, formData, onUpdateForm, onUpdateFormSettings,
}: PropertiesPanelProps) {
    const [activeSection, setActiveSection] = useState<"content" | "style" | "settings">("content")

    const isButtonsSelected = selectedElement === "__buttons__"
    const isBackgroundSelected = selectedElement === "__background__"

    // Selection Logic
    const getSelectionContext = () => {
        if (isBackgroundSelected) return 'background'
        if (isButtonsSelected) return 'buttons'
        if (formElement) return 'element'
        if (formSection) return 'section'
        return 'formcard'
    }
    const selectionContext = getSelectionContext()

    const getSelectionName = () => {
        if (isBackgroundSelected) return 'Background'
        if (isButtonsSelected) return 'Buttons'
        if (formElement) return formElement.type.charAt(0).toUpperCase() + formElement.type.slice(1)
        if (formSection) return formSection.type === 'input-zone' ? 'Section' : 'Container'
        return 'Form Card'
    }

    const getSelectionIcon = () => {
        if (isBackgroundSelected) return <Palette className="h-3 w-3 text-pink-600" />
        if (isButtonsSelected) return <MousePointer2 className="h-3 w-3 text-violet-600" />
        if (formSection) return <Layout className="h-3 w-3 text-emerald-600" />
        return <Square className="h-3 w-3 text-emerald-600" />
    }

    const getSelectionBgColor = () => {
        if (isBackgroundSelected) return 'bg-pink-100'
        if (isButtonsSelected) return 'bg-violet-100'
        return 'bg-emerald-100'
    }

    return (
        <>
            {!isOpen && (
                <button onClick={onToggle} className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-5 h-12 bg-white border border-r-0 border-slate-200 rounded-l-md shadow-sm flex items-center justify-center hover:bg-slate-50">
                    <ChevronLeft className="h-3 w-3 text-slate-400" />
                </button>
            )}

            <div className={`bg-white border-l border-slate-200 flex-shrink-0 flex flex-col transition-all duration-200 ${isOpen ? "w-72" : "w-0 overflow-hidden"}`}>
                {/* Header */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100">
                    <div className="flex items-center gap-1.5">
                        <div className={`p-1 rounded ${getSelectionBgColor()}`}>{getSelectionIcon()}</div>
                        <span className="text-xs font-semibold text-slate-800">{getSelectionName()}</span>
                    </div>
                    <button onClick={onToggle} className="p-0.5 rounded hover:bg-slate-100 text-slate-400"><ChevronRight className="h-3 w-3" /></button>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-0.5 p-1.5 border-b border-slate-100">
                    {(["content", "style", "settings"] as const).map((s) => (
                        <button key={s} onClick={() => setActiveSection(s)}
                            className={`flex-1 px-2 py-1 text-[10px] font-medium rounded transition-all ${activeSection === s ? "bg-slate-800 text-white" : "text-slate-500 hover:bg-slate-100"}`}>
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-3 space-y-4 custom-scrollbar">
                    {activeSection === "content" && (
                        <ContentTab
                            selectedElement={selectedElement}
                            formElement={formElement}
                            onUpdateElement={onUpdateElement}
                            formSection={formSection}
                            onUpdateSection={onUpdateSection}
                            currentPage={currentPage}
                            onUpdatePage={onUpdatePage}
                            selectionContext={selectionContext}
                            isBackgroundSelected={isBackgroundSelected}
                            isButtonsSelected={isButtonsSelected}
                        />
                    )}

                    {activeSection === "style" && (
                        <StyleTab
                            currentPage={currentPage}
                            onUpdatePage={onUpdatePage}
                            selectionContext={selectionContext}
                            selectedElement={selectedElement}
                            formSection={formSection}
                            onUpdateSection={onUpdateSection}
                        />
                    )}

                    {activeSection === "settings" && (
                        <SettingsTab />
                    )}
                </div>
            </div>
        </>
    )
}
