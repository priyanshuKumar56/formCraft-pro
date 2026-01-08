"use client"

import { useRef, useCallback } from "react"
import { useDrop } from "react-dnd"
import type { FormPage, FormSection, ButtonStyle } from "@/types/form"
import { EditableSection } from "./editable-section"
import { Plus, Layout, MousePointer, Sparkles, ArrowLeft, ArrowRight, Move } from "lucide-react"

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

const defaultButtonStyle: ButtonStyle = {
    paddingX: 24, paddingY: 12, fontSize: 14, fontWeight: "semibold",
    backgroundColor: "#0f172a", textColor: "#ffffff", borderColor: "#0f172a",
    borderWidth: 0, borderRadius: 8,
    shadow: { enabled: true, x: 0, y: 2, blur: 8, spread: 0, color: "rgba(0,0,0,0.12)" },
    preset: "default"
}

export function FormCanvas({
    currentPage, selectedElement, onSelectElement, onUpdateElement, onDeleteElement,
    onAddElement, onMoveElement, onAddSection, onUpdateSection, onDeleteSection, onMoveSection,
}: FormCanvasProps) {
    const canvasRef = useRef<HTMLDivElement>(null)
    const formCardRef = useRef<HTMLDivElement>(null)

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
        collect: (monitor) => ({ isOver: monitor.isOver({ shallow: true }), canDrop: monitor.canDrop() }),
    }))

    const handleBackgroundClick = useCallback((e: React.MouseEvent) => {
        const target = e.target as HTMLElement
        // Allow selection only if clicking the background area itself, not children
        if (target.closest('.form-card')) return
        e.stopPropagation()
        onSelectElement("__background__")
    }, [onSelectElement])

    const handleFormCardClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        onSelectElement(null)
    }

    const handleButtonsClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        onSelectElement("__buttons__")
    }

    drop(canvasRef)

    const splitLayout = currentPage.layout.splitLayout
    const isSplitEnabled = splitLayout?.enabled === true
    const isBackgroundSelected = selectedElement === "__background__"
    const isButtonsSelected = selectedElement === "__buttons__"

    const buttonStyle: ButtonStyle = {
        ...defaultButtonStyle, ...(currentPage.layout.buttonStyle || {}),
        backgroundColor: currentPage.layout.buttonStyle?.backgroundColor || currentPage.layout.buttonColor || defaultButtonStyle.backgroundColor,
        textColor: currentPage.layout.buttonStyle?.textColor || currentPage.layout.buttonTextColor || defaultButtonStyle.textColor,
    }

    const getButtonCSS = (): React.CSSProperties => {
        let style: React.CSSProperties = {
            backgroundColor: buttonStyle.backgroundColor, color: buttonStyle.textColor,
            padding: `${buttonStyle.paddingY}px ${buttonStyle.paddingX}px`, fontSize: `${buttonStyle.fontSize}px`,
            fontWeight: buttonStyle.fontWeight === 'black' ? 900 : buttonStyle.fontWeight === 'bold' ? 700 : buttonStyle.fontWeight === 'semibold' ? 600 : buttonStyle.fontWeight === 'medium' ? 500 : 400,
            borderRadius: `${buttonStyle.borderRadius}px`, borderWidth: `${buttonStyle.borderWidth}px`, borderColor: buttonStyle.borderColor, borderStyle: 'solid',
            transition: 'all 0.15s ease',
        }
        if (buttonStyle.shadow?.enabled) {
            const { x, y, blur, spread, color } = buttonStyle.shadow
            style.boxShadow = `${x}px ${y}px ${blur}px ${spread}px ${color}`
        }
        return style
    }

    // EXCLUSIVE GRADIENT LOGIC
    const getMeshGradient = (baseColor: string) => {
        // Map base colors to specific premium gradients
        switch (baseColor) {
            case "#fdf2f8": // Candy (Pink/Rose)
                return `background-color: #fdf2f8; background-image: radial-gradient(at 40% 20%, hsla(330,100%,70%,0.4) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(280,100%,76%,0.4) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(340,100%,76%,0.4) 0px, transparent 50%), radial-gradient(at 80% 50%, hsla(350,100%,77%,0.4) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(270,100%,77%,0.4) 0px, transparent 50%), radial-gradient(at 80% 100%, hsla(310,100%,70%,0.4) 0px, transparent 50%), radial-gradient(at 0% 0%, hsla(343,100%,76%,0.4) 0px, transparent 50%);`
            case "#ecfeff": // Ocean (Cyan/Blue)
                return `background-color: #ecfeff; background-image: radial-gradient(at 40% 20%, hsla(190,100%,70%,0.4) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(220,100%,76%,0.4) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(180,100%,76%,0.4) 0px, transparent 50%), radial-gradient(at 80% 50%, hsla(210,100%,77%,0.4) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(200,100%,77%,0.4) 0px, transparent 50%);`
            case "#fff7ed": // Sunset (Orange/Red)
                return `background-color: #fff7ed; background-image: radial-gradient(at 40% 20%, hsla(28,100%,74%,0.4) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(350,100%,76%,0.4) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(50,100%,76%,0.4) 0px, transparent 50%), radial-gradient(at 80% 50%, hsla(20,100%,77%,0.4) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(30,100%,77%,0.4) 0px, transparent 50%);`
            case "#f0fdf4": // Forest (Green/Emerald)
                return `background-color: #f0fdf4; background-image: radial-gradient(at 40% 20%, hsla(120,100%,70%,0.4) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(150,100%,76%,0.4) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(100,100%,76%,0.4) 0px, transparent 50%), radial-gradient(at 80% 50%, hsla(140,100%,77%,0.4) 0px, transparent 50%);`
            case "#faf5ff": // Lavender (Purple/Violet)
                return `background-color: #faf5ff; background-image: radial-gradient(at 0% 0%, hsla(253,16%,7%,0) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(225,39%,30%,0) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(339,49%,30%,0) 0, transparent 50%); background-image: radial-gradient(at 40% 20%, hsla(260,100%,70%,0.3) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(290,100%,76%,0.3) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(240,100%,76%,0.3) 0px, transparent 50%);`
            case "#fef2f2": // Fire (Red/Orange)
                return `background-color: #fef2f2; background-image: radial-gradient(at 40% 20%, hsla(0,100%,70%,0.3) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(30,100%,76%,0.3) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(350,100%,76%,0.3) 0px, transparent 50%);`
            default:
                // Fallback mesh
                return `background-color: ${baseColor}; background-image: radial-gradient(at 40% 20%, rgba(236, 72, 153, 0.2) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(59, 130, 246, 0.2) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(168, 85, 247, 0.2) 0px, transparent 50%);`
        }
    }

    const getBackgroundStyle = (): any => {
        const bgType = currentPage.layout.backgroundType || 'color'
        const baseColor = currentPage.layout.canvasBackground || '#f8fafc'

        const style: any = {}

        switch (bgType) {
            case 'mesh':
                // Instead of returning an object, we parse the string from getMeshGradient
                const gradientCss = getMeshGradient(baseColor)
                // Rudimentary parsing for inline styles (works better with class names usually but valid here)
                const parts = gradientCss.split(';')
                parts.forEach(part => {
                    const [key, value] = part.split(':')
                    if (key && value) style[key.trim()] = value.trim()
                })
                return { ...style, backgroundColor: baseColor }
            case 'dots':
                return {
                    backgroundColor: baseColor,
                    backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)`,
                    backgroundSize: '24px 24px'
                }
            case 'image':
                return {
                    backgroundImage: currentPage.layout.backgroundImage ? `url(${currentPage.layout.backgroundImage})` : 'none',
                    backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: baseColor
                }
            case 'gradient':
                if (currentPage.layout.canvasGradient?.enabled) {
                    const { type, colors, angle } = currentPage.layout.canvasGradient
                    return { background: type === 'linear' ? `linear-gradient(${angle}deg, ${colors.join(', ')})` : `radial-gradient(circle, ${colors.join(', ')})` }
                }
                return { backgroundColor: baseColor }
            default:
                return { backgroundColor: baseColor }
        }
    }

    const getFormCardStyle = (): React.CSSProperties => {
        const layout = currentPage.layout
        let cardStyle: React.CSSProperties = {
            backgroundColor: layout.backgroundColor || '#ffffff',
            borderRadius: `${layout.borderRadius || 12}px`,
            borderWidth: `${layout.borderWidth || 0}px`,
            borderColor: layout.borderColor || '#e2e8f0', borderStyle: 'solid',
            color: layout.textColor || '#0f172a',
            transition: 'all 0.2s ease',
        }
        if (!isSplitEnabled) {
            cardStyle.padding = `${layout.padding.top}px ${layout.padding.right}px ${layout.padding.bottom}px ${layout.padding.left}px`
        }
        if (layout.shadow?.enabled) {
            const { x, y, blur, spread, color } = layout.shadow
            cardStyle.boxShadow = `${x}px ${y}px ${blur}px ${spread}px ${color}`
        }
        const maxWidthMap: Record<string, string> = { sm: '520px', md: '640px', lg: '800px', xl: '960px', full: '100%' }
        cardStyle.maxWidth = maxWidthMap[layout.maxWidth] || '640px'
        cardStyle.width = '100%'
        return cardStyle
    }

    const getSplitCardStyle = (): React.CSSProperties => {
        const layout = currentPage.layout
        let cardStyle: React.CSSProperties = {
            backgroundColor: layout.backgroundColor || '#ffffff',
            borderRadius: `${layout.borderRadius || 12}px`,
            borderWidth: `${layout.borderWidth || 0}px`,
            borderColor: layout.borderColor || '#e2e8f0', borderStyle: 'solid',
            overflow: 'hidden', display: 'flex',
            flexDirection: splitLayout?.position === 'left' ? 'row-reverse' : 'row',
            transition: 'all 0.2s ease',
        }
        if (layout.shadow?.enabled) {
            const { x, y, blur, spread, color } = layout.shadow
            cardStyle.boxShadow = `${x}px ${y}px ${blur}px ${spread}px ${color}`
        }
        const maxWidthMap: Record<string, string> = { sm: '520px', md: '640px', lg: '800px', xl: '960px', full: '100%' }
        cardStyle.maxWidth = maxWidthMap[layout.maxWidth] || '640px'
        cardStyle.width = '100%'
        return cardStyle
    }

    const renderButtonsSection = () => (
        <div onClick={handleButtonsClick}
            className={`group relative flex items-center justify-between gap-4 pt-5 mt-5 border-t border-slate-100 px-1 cursor-pointer transition-all rounded-lg ${isButtonsSelected ? 'ring-2 ring-violet-500 bg-violet-50/50 -mx-2 px-3 py-2' : 'hover:bg-slate-50/50'}`}>
            <div className={`absolute -top-2 left-3 px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wider z-10 transition-opacity ${isButtonsSelected ? 'opacity-100 bg-violet-600 text-white' : 'opacity-0 group-hover:opacity-100 bg-slate-800 text-white'}`}>
                {isButtonsSelected ? 'Selected' : 'Buttons'}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 opacity-40">
                <ArrowLeft className="h-3 w-3" /> Back
            </div>
            <div className="flex items-center gap-1.5" style={getButtonCSS()}>
                Continue <ArrowRight className="h-3.5 w-3.5" />
            </div>
        </div>
    )

    const renderPageHeader = () => (
        <div onClick={handleFormCardClick}
            className="group relative text-center mb-6 w-full px-4 py-4 rounded-lg hover:bg-slate-50/50 transition-all cursor-pointer border border-transparent hover:border-slate-100">
            <div className="absolute top-1 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[9px] px-1.5 py-0.5 rounded font-semibold uppercase tracking-wider z-10">
                Form Card
            </div>
            <h1 className="text-xl font-bold text-slate-900 mb-1.5 tracking-tight">{currentPage.title}</h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-600 text-[10px] font-semibold uppercase tracking-wider rounded-md">
                <Sparkles className="h-2.5 w-2.5" />{currentPage.type.replace('-', ' ')}
            </span>
        </div>
    )

    const renderEmptyState = () => (
        <div className="py-12 text-center border border-dashed border-slate-200 rounded-xl mb-4 bg-slate-50/30">
            <MousePointer className="h-8 w-8 text-slate-300 mx-auto mb-2" />
            <p className="text-slate-400 font-medium text-xs">Drop elements here</p>
        </div>
    )

    return (
        // CANVAS AREA (Level 1): The outer gray workspace (bg-slate-100)
        // Dense Mode: Reduced padding (p-4 md:p-6)
        <div className="flex-1 overflow-auto bg-slate-100 flex items-start justify-center p-4 md:p-6 scroll-smooth">

            {/* BACKGROUND AREA (Level 2): The "Page" or "Screen" users see */}
            <div
                onClick={handleBackgroundClick}
                className={`background-area relative w-full max-w-[1240px] min-h-[85vh] rounded-2xl shadow-xl transition-all duration-300 cursor-pointer overflow-hidden ring-offset-2 ring-offset-slate-100 ${isBackgroundSelected ? 'ring-2 ring-pink-500 shadow-pink-500/10' : 'hover:shadow-2xl'}`}
                style={getBackgroundStyle()}
            >
                {/* Selection indicator for background */}
                {isBackgroundSelected && (
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 z-50 px-3 py-1 bg-pink-600 text-white text-[9px] font-bold uppercase tracking-wider rounded-full shadow-lg flex items-center gap-1.5">
                        <Sparkles className="h-2.5 w-2.5" /> Background
                    </div>
                )}

                {/* Inner padding container - Content Alignment */}
                <div
                    className="background-inner w-full min-h-full flex flex-col items-center py-8 px-4 md:px-6"
                >
                    {/* FORM CARD (Level 3): The actual form content */}
                    <div
                        ref={canvasRef}
                        onClick={handleFormCardClick}
                        className={`form-card bg-white transition-all duration-300 relative cursor-pointer ${isOver && canDrop ? "ring-2 ring-violet-400 scale-[1.01]" : ""} ${!selectedElement && !isBackgroundSelected ? 'ring-2 ring-emerald-500 shadow-xl' : 'shadow-lg'}`}
                        style={isSplitEnabled ? getSplitCardStyle() : getFormCardStyle()}
                    >
                        {/* Form card selection indicator */}
                        {!selectedElement && !isBackgroundSelected && (
                            <div className="absolute -top-3 left-4 px-2 py-0.5 bg-emerald-600 text-white text-[9px] font-bold uppercase tracking-wider rounded shadow-lg z-10 shadow-emerald-500/20">
                                Form Card
                            </div>
                        )}

                        {isSplitEnabled && splitLayout ? (
                            <>
                                <div className="flex-1 flex flex-col"
                                    style={{ padding: `${currentPage.layout.padding.top}px ${currentPage.layout.padding.right}px ${currentPage.layout.padding.bottom}px ${currentPage.layout.padding.left}px` }}>
                                    {renderPageHeader()}
                                    {currentPage.sections.length === 0 ? renderEmptyState() : (
                                        <div className="flex flex-col gap-0">
                                            {currentPage.sections.map((section, index) => (
                                                <EditableSection key={section.id} section={section} index={index}
                                                    selectedElement={selectedElement} onSelectElement={onSelectElement}
                                                    onUpdateElement={onUpdateElement} onDeleteElement={onDeleteElement}
                                                    onAddElement={onAddElement} onMoveElement={onMoveElement}
                                                    onUpdateSection={onUpdateSection} onDeleteSection={onDeleteSection}
                                                    onMoveSection={onMoveSection} isEditable={section.type === "container"} />
                                            ))}
                                        </div>
                                    )}
                                    {renderButtonsSection()}
                                </div>
                                <div className="w-2/5 min-h-[320px] relative group overflow-hidden"
                                    style={{
                                        backgroundImage: `url(${splitLayout.image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe'})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: `${splitLayout.focalPoint?.x || 50}% ${splitLayout.focalPoint?.y || 50}%`
                                    }}>
                                    {splitLayout.overlay?.enabled && (
                                        <div className="absolute inset-0 transition-opacity duration-300" style={{ backgroundColor: splitLayout.overlay.color || '#000', opacity: splitLayout.overlay.opacity || 0.2 }} />
                                    )}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none backdrop-blur-[1px]">
                                        <div className="w-8 h-8 border-2 border-white/80 rounded-full shadow-lg flex items-center justify-center bg-black/20 backdrop-blur-md"
                                            style={{ position: 'absolute', left: `${splitLayout.focalPoint?.x || 50}%`, top: `${splitLayout.focalPoint?.y || 50}%`, transform: 'translate(-50%, -50%)' }}>
                                            <Move className="h-4 w-4 text-white drop-shadow-md" />
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col">
                                {renderPageHeader()}
                                {currentPage.sections.length === 0 ? renderEmptyState() : (
                                    <div className="flex flex-col gap-0">
                                        {currentPage.sections.map((section, index) => (
                                            <EditableSection key={section.id} section={section} index={index}
                                                selectedElement={selectedElement} onSelectElement={onSelectElement}
                                                onUpdateElement={onUpdateElement} onDeleteElement={onDeleteElement}
                                                onAddElement={onAddElement} onMoveElement={onMoveElement}
                                                onUpdateSection={onUpdateSection} onDeleteSection={onDeleteSection}
                                                onMoveSection={onMoveSection} isEditable={section.type === "container"} />
                                        ))}
                                    </div>
                                )}
                                {renderButtonsSection()}
                            </div>
                        )}
                    </div>

                    {/* Add Section Buttons (Floating below card) */}
                    <div className="flex items-center justify-center gap-2 mt-6 mb-8 transition-all duration-300 bg-white/50 backdrop-blur-sm p-1.5 rounded-lg border border-white/20 shadow-sm hover:shadow-md hover:bg-white/80">
                        <button onClick={() => onAddSection("input-zone")}
                            className="group flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-md shadow-sm hover:shadow-md hover:border-violet-400 hover:-translate-y-0.5 transition-all text-xs">
                            <div className="w-5 h-5 rounded bg-violet-100 flex items-center justify-center text-violet-600 group-hover:bg-violet-600 group-hover:text-white transition-colors">
                                <Plus className="h-2.5 w-2.5" />
                            </div>
                            <span className="font-medium text-slate-700">Input Zone</span>
                        </button>
                        <button onClick={() => onAddSection("container")}
                            className="group flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-md shadow-sm hover:shadow-md hover:border-emerald-400 hover:-translate-y-0.5 transition-all text-xs">
                            <div className="w-5 h-5 rounded bg-emerald-100 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                <Layout className="h-2.5 w-2.5" />
                            </div>
                            <span className="font-medium text-slate-700">Container</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
