"use client"

import { useRef, useCallback } from "react"
import { useDrop } from "react-dnd"
import type { FormSection, FormElement } from "@/types/form"
import { FormElementCard } from "./form-element-card"
import { Settings2, Trash2, GripVertical, Plus, Box, Layout } from "lucide-react"
import { getSectionStyles as getSharedStyles } from "@/lib/styling"

interface EditableSectionProps {
    section: FormSection
    index: number
    selectedElement: string | null
    onSelectElement: (id: string | null) => void
    onUpdateElement: (id: string, updates: Record<string, unknown>) => void
    onDeleteElement: (id: string) => void
    onAddElement: (type: string, position?: number, sectionId?: string) => void
    onMoveElement: (dragIndex: number, hoverIndex: number, sectionId?: string) => void
    onUpdateSection: (sectionId: string, updates: Partial<FormSection>) => void
    onDeleteSection: (sectionId: string) => void
    onMoveSection: (dragIndex: number, hoverIndex: number) => void
    isEditable: boolean
}

export function EditableSection({
    section,
    index,
    selectedElement,
    onSelectElement,
    onUpdateElement,
    onDeleteElement,
    onAddElement,
    onMoveElement,
    onUpdateSection,
    onDeleteSection,
    onMoveSection,
    isEditable,
}: EditableSectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null)

    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: section.type === "input-zone" ? "form-element" : "container",
        drop: (item: { elementType: string }, monitor) => {
            if (monitor.didDrop()) return
            if (section.type === "input-zone" && item.elementType) {
                onAddElement(item.elementType, undefined, section.id)
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver({ shallow: true }),
            canDrop: monitor.canDrop(),
        }),
    }))

    const moveElement = useCallback(
        (dragIndex: number, hoverIndex: number) => {
            onMoveElement(dragIndex, hoverIndex, section.id)
        },
        [onMoveElement, section.id],
    )

    drop(sectionRef)

    const isInputZone = section.type === "input-zone"

    // Section styles based on type
    const getSectionStyles = () => {
        let styles = getSharedStyles(section);

        // Apply drag-and-drop specific styles for input zones
        if (isInputZone) {
            styles.borderStyle = "dashed";
            if (isOver && canDrop) {
                styles.borderColor = "#8b5cf6"; // Violet-500
                styles.backgroundColor = "#faf5ff"; // Violet-50/50
            }
        }

        return styles
    }

    return (
        <div
            ref={sectionRef}
            onClick={(e) => { e.stopPropagation(); onSelectElement(section.id) }}
            className={`relative group transition-all duration-300 cursor-pointer ${selectedElement === section.id ? "ring-2 ring-violet-500 ring-offset-2 scale-[1.01] shadow-2xl z-20" : ""
                }`}
            style={getSectionStyles()}
        >
            {/* Figma-Style Tag Indicator */}
            <div className={`absolute -top-3 left-6 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border shadow-sm transition-all group-hover:scale-105 ${isInputZone
                ? "bg-violet-600 border-violet-700 text-white"
                : "bg-emerald-600 border-emerald-700 text-white"
                }`}>
                <div className="flex items-center gap-1.5">
                    {isInputZone ? <Box className="h-3 w-3" /> : <Layout className="h-3 w-3" />}
                    {isInputZone ? "Input Zone" : "Container"}
                </div>
            </div>

            {/* Modern Control Bar */}
            <div className="absolute -top-4 right-6 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto">
                <button
                    onClick={(e) => { e.stopPropagation(); onSelectElement(section.id) }}
                    className="p-1.5 bg-white text-slate-500 rounded-lg shadow-lg border border-slate-200 hover:text-violet-600 hover:border-violet-300 transition-all"
                    title="Section Settings"
                >
                    <Settings2 className="h-3.5 w-3.5" />
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); onDeleteSection(section.id) }}
                    className="p-1.5 bg-white text-slate-500 rounded-lg shadow-lg border border-slate-200 hover:text-red-500 hover:border-red-300 transition-all"
                    title="Delete Section"
                >
                    <Trash2 className="h-3.5 w-3.5" />
                </button>
                <div className="p-1.5 bg-white text-slate-400 rounded-lg shadow-lg border border-slate-200 cursor-grab active:cursor-grabbing hover:text-slate-600 transition-all">
                    <GripVertical className="h-3.5 w-3.5" />
                </div>
            </div>

            {/* Figma-Style Tag Indicator - More premium now */}
            <div className={`absolute -top-3 left-6 px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] rounded-full border shadow-2xl transition-all group-hover:scale-110 z-30 ${isInputZone
                ? "bg-violet-600 border-violet-700 text-white"
                : "bg-slate-900 border-slate-800 text-white"
                }`}>
                <div className="flex items-center gap-2">
                    {isInputZone ? <Box className="h-3 w-3 text-violet-300" /> : <Layout className="h-3 w-3 text-emerald-400" />}
                    {isInputZone ? "Interactive Fields" : "Design Container"}
                </div>
            </div>

            {/* Section Content Header */}
            {section.title && (
                <div className="mb-6">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">{section.title}</h3>
                    <div className="h-1 w-8 bg-slate-100 rounded-full mt-2" />
                </div>
            )}

            {/* Elements Rendering Area */}
            <div className="space-y-4">
                {section.elements.length === 0 ? (
                    <div className={`py-8 text-center rounded-2xl border transition-all duration-300 ${isOver
                        ? "border-dashed border-violet-400 bg-violet-50/30 scale-[0.99] rotate-0"
                        : "border-dashed border-slate-200 bg-slate-50/30"
                        }`}>
                        <div className={`w-8 h-8 rounded-lg mx-auto mb-2 flex items-center justify-center transition-all duration-300 ${isOver ? "bg-violet-500 text-white shadow-md scale-105" : "bg-slate-100 text-slate-400"}`}>
                            <Plus className={`h-4 w-4 transition-transform duration-300 ${isOver ? "rotate-90" : ""}`} />
                        </div>
                        <p className={`text-[10px] font-bold uppercase tracking-wider ${isOver ? "text-violet-600" : "text-slate-400"}`}>
                            {isOver ? "Drop" : "Drag elements"}
                        </p>
                    </div>
                ) : (
                    section.elements.map((element, elementIndex) => (
                        <FormElementCard
                            key={element.id}
                            element={element}
                            index={elementIndex}
                            isSelected={selectedElement === element.id}
                            onSelect={() => onSelectElement(element.id)}
                            onUpdate={(updates: Partial<FormElement>) => onUpdateElement(element.id, updates)}
                            onDelete={() => onDeleteElement(element.id)}
                            onMoveElement={moveElement}
                            isFixed={isInputZone}
                        />
                    ))
                )}
            </div>
        </div>
    )
}
