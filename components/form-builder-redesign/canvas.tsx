"use client"

import { useRef, useCallback } from "react"
import { useDrop } from "react-dnd"
import type { FormPage, FormSection } from "@/types/form"
import { EditableSection } from "./editable-section"
import { Plus, Layout, Box, MousePointer, Sparkles, ArrowLeft, ArrowRight, Settings, Trash2, Move } from "lucide-react"
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
        onSelectElement(null)
    }

    drop(canvasRef)

    // Get styles from shared utility
    const canvasStyles = getCanvasStyles(currentPage.layout)
    const cardStyles = getCardStyles(currentPage.layout)

    // Check for split layout - this splits INSIDE the form card
    const splitLayout = currentPage.layout.splitLayout
    const isSplitEnabled = splitLayout?.enabled === true

    // Background pattern styles based on backgroundType
    const getBackgroundPatternStyle = (): React.CSSProperties => {
        const bgType = currentPage.layout.backgroundType || 'color'

        switch (bgType) {
            case 'mesh':
                return {
                    background: `
                        radial-gradient(at 40% 20%, hsla(28,100%,74%,0.8) 0px, transparent 50%),
                        radial-gradient(at 80% 0%, hsla(189,100%,56%,0.6) 0px, transparent 50%),
                        radial-gradient(at 0% 50%, hsla(355,100%,93%,0.7) 0px, transparent 50%),
                        radial-gradient(at 80% 50%, hsla(340,100%,76%,0.5) 0px, transparent 50%),
                        radial-gradient(at 0% 100%, hsla(22,100%,77%,0.6) 0px, transparent 50%),
                        radial-gradient(at 80% 100%, hsla(242,100%,70%,0.4) 0px, transparent 50%),
                        radial-gradient(at 0% 0%, hsla(343,100%,76%,0.5) 0px, transparent 50%)
                    `,
                    backgroundColor: currentPage.layout.canvasBackground
                }
            case 'dots':
                return {
                    backgroundColor: currentPage.layout.canvasBackground,
                    backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                }
            case 'image':
                return {
                    backgroundImage: currentPage.layout.backgroundImage ? `url(${currentPage.layout.backgroundImage})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundColor: currentPage.layout.canvasBackground
                }
            case 'gradient':
                return canvasStyles
            default:
                return canvasStyles
        }
    }

    // Modified card styles for split layout - remove padding on image side
    const getSplitCardStyles = (): React.CSSProperties => {
        if (!isSplitEnabled) return cardStyles

        return {
            ...cardStyles,
            padding: 0, // Remove padding, we'll add it to the content side only
            overflow: 'hidden',
            display: 'flex',
            flexDirection: splitLayout.position === 'left' ? 'row-reverse' : 'row',
        }
    }

    return (
        <div
            className="flex-1 overflow-auto canvas-background scroll-smooth"
            onClick={handleCanvasClick}
            style={getBackgroundPatternStyle()}
        >
            {/* Dotted Grid Background */}
            <div
                className="min-h-full pt-32 pb-40 px-12 flex flex-col items-center"
                style={{
                    backgroundImage: `radial-gradient(circle, #00000010 1px, transparent 1px)`,
                    backgroundSize: '24px 24px',
                }}
            >
                {/* Main Unified Form Card (Paper) - Split happens INSIDE this */}
                <div
                    ref={canvasRef}
                    className={`w-full bg-white transition-all duration-500 relative ${isOver && canDrop ? "ring-4 ring-violet-500/20 border-violet-500" : ""}`}
                    style={getSplitCardStyles()}
                >
                    {isSplitEnabled ? (
                        /* SPLIT LAYOUT - Image + Form side by side INSIDE the card */
                        <>
                            {/* Form Content Side */}
                            <div
                                className="flex-1 flex flex-col"
                                style={{
                                    padding: `${currentPage.layout.padding.top}px ${currentPage.layout.padding.right}px ${currentPage.layout.padding.bottom}px ${currentPage.layout.padding.left}px`,
                                }}
                            >
                                {/* Page Header */}
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

                                {/* Section Content */}
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

                                {/* Navigation Buttons */}
                                <div className="flex items-center justify-between gap-6 pt-12 mt-8 border-t border-slate-100/50 px-2 opacity-50 select-none grayscale cursor-not-allowed">
                                    <div className="flex items-center gap-3 px-6 py-4 rounded-xl font-black text-slate-400 uppercase tracking-widest text-[10px]">
                                        <ArrowLeft className="h-4 w-4" /> Previous
                                    </div>
                                    <div
                                        style={{ backgroundColor: currentPage.layout.buttonColor, color: currentPage.layout.buttonTextColor }}
                                        className="flex items-center gap-3 px-10 py-5 rounded-[2rem] font-black text-lg shadow-xl"
                                    >
                                        Continue <ArrowRight className="h-5 w-5" />
                                    </div>
                                </div>
                            </div>

                            {/* Image Side - INSIDE the card */}
                            <div
                                className="w-1/2 min-h-[500px] relative group"
                                style={{
                                    backgroundImage: `url(${splitLayout.image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop'})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: `${splitLayout.focalPoint?.x || 50}% ${splitLayout.focalPoint?.y || 50}%`
                                }}
                            >
                                {/* Overlay */}
                                {splitLayout.overlay?.enabled && (
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            backgroundColor: splitLayout.overlay.color || '#000000',
                                            opacity: splitLayout.overlay.opacity || 0.2
                                        }}
                                    />
                                )}

                                {/* Focal Point Indicator (Editor Only) */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    <div
                                        className="w-8 h-8 border-2 border-white rounded-full shadow-lg flex items-center justify-center bg-white/20 backdrop-blur-sm"
                                        style={{
                                            position: 'absolute',
                                            left: `${splitLayout.focalPoint?.x || 50}%`,
                                            top: `${splitLayout.focalPoint?.y || 50}%`,
                                            transform: 'translate(-50%, -50%)'
                                        }}
                                    >
                                        <Move className="h-4 w-4 text-white" />
                                    </div>
                                </div>

                                {/* Edit Hint */}
                                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="px-3 py-1.5 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                                        Edit in Style Panel
                                    </span>
                                </div>
                            </div>
                        </>
                    ) : (
                        /* STANDARD LAYOUT - Original structure */
                        <div className="flex flex-col">
                            {/* Integrated Page Header */}
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

                            {/* Visual Navigation Buttons */}
                            <div className="flex items-center justify-between gap-6 pt-12 mt-8 border-t border-slate-100/50 px-2 opacity-50 select-none grayscale cursor-not-allowed">
                                <div className="flex items-center gap-3 px-6 py-4 rounded-xl font-black text-slate-400 uppercase tracking-widest text-[10px]">
                                    <ArrowLeft className="h-4 w-4" /> Previous Step
                                </div>
                                <div
                                    style={{ backgroundColor: currentPage.layout.buttonColor, color: currentPage.layout.buttonTextColor }}
                                    className="flex items-center gap-3 px-10 py-5 rounded-[2rem] font-black text-lg shadow-xl"
                                >
                                    Continue <ArrowRight className="h-5 w-5" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Floating Action Buttons - Outside the form card */}
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
