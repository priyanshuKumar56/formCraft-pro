"use client"

import { useRef, useCallback } from "react"
import { useDrop } from "react-dnd"
import type { FormPage, FormSection } from "@/types/form"
import { EditableSection } from "./editable-section"
import { Plus, Layout, Box, MousePointer, Sparkles } from "lucide-react"
import { getCanvasStyles, getCardStyles } from "@/lib/styling"

interface FormCanvasProps {
    currentPage: FormPage
    selectedElement: string | null
    onSelectElement: (id: string | null) => void
    onUpdateElement: (id: string, updates: Record<string, unknown>) => void
    onDeleteElement: (id: string) => void
    onAddElement: (type: string, position?: number, sectionId?: string) => void
    onMoveElement: (dragIndex: number, hoverIndex: number, sectionId?: string) => void
    onAddSection: (type: "container" | "input-zone") => void
    onUpdateSection: (sectionId: string, updates: Partial<FormSection>) => void
    onDeleteSection: (sectionId: string) => void
    onMoveSection: (dragIndex: number, hoverIndex: number) => void
}

export function FormCanvas({
    currentPage,
    selectedElement,
    onSelectElement,
    onUpdateElement,
    onDeleteElement,
    onAddElement,
    onMoveElement,
    onAddSection,
    onUpdateSection,
    onDeleteSection,
    onMoveSection,
}: FormCanvasProps) {
    const canvasRef = useRef<HTMLDivElement>(null)

    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: ["form-element", "section"],
        drop: (item: { elementType?: string; sectionType?: "container" | "input-zone" }, monitor) => {
            if (monitor.didDrop()) return
            if (item.elementType) {
                const lastInputZone = [...currentPage.sections].reverse().find((s) => s.type === "input-zone")
                onAddElement(item.elementType, undefined, lastInputZone?.id)
            } else if (item.sectionType) {
                onAddSection(item.sectionType)
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver({ shallow: true }),
            canDrop: monitor.canDrop(),
        }),
    }))

    const handleCanvasClick = useCallback((e: React.MouseEvent) => {
        if (e.target === canvasRef.current || (e.target as HTMLElement).classList.contains('canvas-background')) {
            onSelectElement(null)
        }
    }, [onSelectElement])

    const handleHeaderClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        onSelectElement(null) // Selecting the header selects the page (which shows page settings in properties panel)
    }

    drop(canvasRef)

    // Get styles from shared utility
    const canvasStyles = getCanvasStyles(currentPage.layout)
    const cardStyles = getCardStyles(currentPage.layout)

    return (
        <div
            className="flex-1 overflow-auto canvas-background scroll-smooth"
            onClick={handleCanvasClick}
            style={canvasStyles}
        >
            {/* Dotted Grid Background - Combined with canvas background */}
            <div
                className="min-h-full p-12 flex flex-col items-center"
                style={{
                    backgroundImage: `radial-gradient(circle, #00000010 1px, transparent 1px)`,
                    backgroundSize: '24px 24px',
                }}
            >
                {/* Main Unified Form Card (Paper) */}
                <div
                    ref={canvasRef}
                    className={`w-full bg-white transition-all duration-500 relative flex flex-col ${isOver && canDrop ? "ring-4 ring-violet-500/20 border-violet-500" : ""
                        }`}
                    style={cardStyles}
                >
                    {/* Integrated Page Header - Now inside the card */}
                    <div
                        onClick={handleHeaderClick}
                        className="group relative text-center mb-10 w-full px-6 py-8 rounded-2xl hover:bg-slate-50 transition-all cursor-pointer border border-transparent hover:border-slate-100"
                    >
                        <div className="absolute top-2 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[8px] px-2 py-0.5 rounded font-black uppercase tracking-widest shadow-lg z-10">
                            Page Settings
                        </div>

                        <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">
                            {currentPage.title}
                        </h1>

                        <div className="flex items-center justify-center">
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-slate-800 shadow-xl transform group-hover:scale-105 transition-transform">
                                <Sparkles className="h-3 w-3 text-violet-400" />
                                {currentPage.type.replace('-', ' ')}
                            </span>
                        </div>
                    </div>

                    {/* Section Content Area */}
                    {currentPage.sections.length === 0 ? (
                        <div className="py-24 text-center border-2 border-dashed border-slate-100 rounded-3xl mb-8">
                            <MousePointer className="h-12 w-12 text-slate-200 mx-auto mb-4" />
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Drop sections here to start</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-0">
                            {currentPage.sections.map((section, index) => (
                                <EditableSection
                                    key={section.id}
                                    section={section}
                                    index={index}
                                    selectedElement={selectedElement}
                                    onSelectElement={onSelectElement}
                                    onUpdateElement={onUpdateElement}
                                    onDeleteElement={onDeleteElement}
                                    onAddElement={onAddElement}
                                    onMoveElement={onMoveElement}
                                    onUpdateSection={onUpdateSection}
                                    onDeleteSection={onDeleteSection}
                                    onMoveSection={onMoveSection}
                                    isEditable={section.type === "container"}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Floating Action Buttons - Outside the form card as requested */}
                <div className="flex items-center justify-center gap-6 mt-12 mb-24">
                    <button
                        onClick={() => onAddSection("input-zone")}
                        className="group relative flex items-center gap-3 px-6 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-xl hover:border-violet-500 hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600 group-hover:bg-violet-600 group-hover:text-white transition-colors">
                            <Plus className="h-5 w-5" />
                        </div>
                        <div className="text-left">
                            <span className="block text-sm font-bold text-slate-900">Add Input Zone</span>
                            <span className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">Fields container</span>
                        </div>
                    </button>

                    <button
                        onClick={() => onAddSection("container")}
                        className="group relative flex items-center gap-3 px-6 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-xl hover:border-emerald-500 hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                            <Layout className="h-5 w-5" />
                        </div>
                        <div className="text-left">
                            <span className="block text-sm font-bold text-slate-900">Add Design Box</span>
                            <span className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">Custom layout</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}
