"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import type { FormElement, FormPage, FormData, FormSection, ButtonStyle } from "@/types/form"
import {
    Settings2, Layout, Plus, Trash2, GripVertical, ChevronLeft, ChevronRight, LayoutTemplate,
    Type, Layers, Columns, Square, Paintbrush, Box, MousePointer2, Sparkles, Palette,
    AlignLeft, AlignCenter, AlignRight, Move, Image as ImageIcon, Monitor, Smartphone,
    CheckCircle2
} from "lucide-react"

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

const defaultButtonStyle: ButtonStyle = {
    paddingX: 24, paddingY: 12, fontSize: 14, fontWeight: "semibold",
    backgroundColor: "#0f172a", textColor: "#ffffff", borderColor: "#0f172a",
    borderWidth: 0, borderRadius: 8,
    shadow: { enabled: true, x: 0, y: 2, blur: 8, spread: 0, color: "rgba(0,0,0,0.12)" },
    preset: "default"
}

const buttonPresets: { name: string; id: ButtonStyle['preset']; style: Partial<ButtonStyle> }[] = [
    { name: "Default", id: "default", style: { backgroundColor: "#0f172a", textColor: "#fff", borderRadius: 8, borderWidth: 0, fontWeight: "semibold", shadow: { enabled: true, x: 0, y: 2, blur: 8, spread: 0, color: "rgba(0,0,0,0.12)" } } },
    { name: "Rounded", id: "rounded", style: { backgroundColor: "#6366f1", textColor: "#fff", borderRadius: 12, borderWidth: 0, fontWeight: "medium", shadow: { enabled: true, x: 0, y: 3, blur: 12, spread: 0, color: "rgba(99,102,241,0.3)" } } },
    { name: "Pill", id: "pill", style: { backgroundColor: "#ec4899", textColor: "#fff", borderRadius: 999, borderWidth: 0, fontWeight: "semibold", shadow: { enabled: true, x: 0, y: 3, blur: 12, spread: 0, color: "rgba(236,72,153,0.3)" } } },
    { name: "Outline", id: "outline", style: { backgroundColor: "transparent", textColor: "#0f172a", borderRadius: 8, borderWidth: 2, borderColor: "#0f172a", fontWeight: "medium", shadow: { enabled: false, x: 0, y: 0, blur: 0, spread: 0, color: "transparent" } } },
    { name: "Gradient", id: "gradient", style: { backgroundColor: "#8b5cf6", textColor: "#fff", borderRadius: 10, borderWidth: 0, fontWeight: "semibold", shadow: { enabled: true, x: 0, y: 4, blur: 16, spread: 0, color: "rgba(139,92,246,0.4)" } } },
    { name: "Minimal", id: "minimal", style: { backgroundColor: "#f1f5f9", textColor: "#0f172a", borderRadius: 6, borderWidth: 0, fontWeight: "medium", shadow: { enabled: false, x: 0, y: 0, blur: 0, spread: 0, color: "transparent" } } },
]

// Background color presets
const colorPresets = [
    "#ffffff", "#f8fafc", "#f1f5f9", "#fafaf9",
    "#fff1f2", "#fdf2f8", "#fdf4ff", "#faf5ff", "#f5f3ff", "#eef2ff",
    "#eff6ff", "#ecfeff", "#f0fdfa", "#ecfdf5", "#f0fdf4", "#f7fee7",
    "#fefce8", "#fffbeb", "#fff7ed", "#fef2f2",
    "#0f172a", "#1f2937", "#1e3a5f", "#2e1065",
]

// Gradient Presets
const gradientPresets = [
    { name: "Sunset", colors: ["#ff7e5f", "#feb47b"], angle: 135 },
    { name: "Ocean", colors: ["#2193b0", "#6dd5ed"], angle: 135 },
    { name: "Purple", colors: ["#8e2de2", "#4a00e0"], angle: 135 },
    { name: "Pink", colors: ["#ee9ca7", "#ffdde1"], angle: 135 },
    { name: "Forest", colors: ["#11998e", "#38ef7d"], angle: 135 },
    { name: "Midnight", colors: ["#232526", "#414345"], angle: 180 },
    { name: "Sky", colors: ["#89f7fe", "#66a6ff"], angle: 135 },
    { name: "Peachy", colors: ["#ffecd2", "#fcb69f"], angle: 135 },
    { name: "Lavender", colors: ["#e0c3fc", "#8ec5fc"], angle: 135 },
]

// Mesh gradient presets
const meshPresets = [
    { name: "Candy", baseColor: "#fdf2f8" },
    { name: "Ocean", baseColor: "#ecfeff" },
    { name: "Sunset", baseColor: "#fff7ed" },
    { name: "Forest", baseColor: "#f0fdf4" },
    { name: "Lavender", baseColor: "#faf5ff" },
    { name: "Fire", baseColor: "#fef2f2" },
]

export function PropertiesPanel({
    isOpen, onToggle, selectedElement, formElement, onUpdateElement,
    currentPage, onUpdatePage, formSection, onUpdateSection, formData, onUpdateForm, onUpdateFormSettings,
}: PropertiesPanelProps) {
    const [activeSection, setActiveSection] = useState<"content" | "style" | "settings">("content")

    const isButtonsSelected = selectedElement === "__buttons__"
    const isBackgroundSelected = selectedElement === "__background__"

    // Helpers
    const buttonStyle: ButtonStyle = {
        ...defaultButtonStyle, ...(currentPage.layout.buttonStyle || {}),
        backgroundColor: currentPage.layout.buttonStyle?.backgroundColor || currentPage.layout.buttonColor || defaultButtonStyle.backgroundColor,
        textColor: currentPage.layout.buttonStyle?.textColor || currentPage.layout.buttonTextColor || defaultButtonStyle.textColor,
    }

    const updateButtonStyle = (updates: Partial<ButtonStyle>) => {
        onUpdatePage({
            layout: {
                ...currentPage.layout, buttonStyle: { ...buttonStyle, ...updates },
                buttonColor: updates.backgroundColor || buttonStyle.backgroundColor,
                buttonTextColor: updates.textColor || buttonStyle.textColor,
            }
        })
    }
    const applyPreset = (preset: typeof buttonPresets[0]) => updateButtonStyle({ ...preset.style, preset: preset.id })
    const applyGradientPreset = (preset: typeof gradientPresets[0]) => {
        onUpdatePage({ layout: { ...currentPage.layout, backgroundType: 'gradient', canvasGradient: { enabled: true, type: 'linear', colors: preset.colors, angle: preset.angle } } })
    }
    const updateSectionLayout = (updates: any) => {
        if (!formSection) return
        onUpdateSection(formSection.id, { layout: { ...formSection.layout, ...updates } })
    }

    // Option Management
    const addOption = () => { if (formElement) onUpdateElement(formElement.id, { options: [...(formElement.options || []), `Option ${(formElement.options?.length || 0) + 1}`] }) }
    const updateOption = (i: number, v: string) => { if (formElement) { const o = [...(formElement.options || [])]; o[i] = v; onUpdateElement(formElement.id, { options: o }) } }
    const removeOption = (i: number) => { if (formElement) onUpdateElement(formElement.id, { options: formElement.options?.filter((_, idx) => idx !== i) || [] }) }

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

                    {/* ========== CONTENT TAB ========== */}
                    {activeSection === "content" && (
                        <>
                            {isBackgroundSelected && (
                                <div className="space-y-3">
                                    <div className="p-3 bg-pink-50 rounded-lg border border-pink-100">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Palette className="h-4 w-4 text-pink-600" />
                                            <span className="text-xs font-semibold text-pink-800">Page Background</span>
                                        </div>
                                        <p className="text-[11px] text-pink-700/80 leading-relaxed">
                                            You selected the full-page background. This is what users see behind your form.
                                            <br /><br />
                                            <span className="font-medium">Go to Style tab</span> to choose colors, gradients, mesh effects, or images.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {isButtonsSelected && (
                                <div className="space-y-3">
                                    <div className="p-3 bg-violet-50 rounded-lg border border-violet-100">
                                        <div className="flex items-center gap-2 mb-2">
                                            <MousePointer2 className="h-4 w-4 text-violet-600" />
                                            <span className="text-xs font-semibold text-violet-800">Navigation Buttons</span>
                                        </div>
                                        <p className="text-[11px] text-violet-700/80 leading-relaxed">
                                            These buttons appear at the bottom of your form (Next, Back, Submit).
                                            <br /><br />
                                            <span className="font-medium">Go to Style tab</span> to customize their appearance.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* ELEMENT CONTENT */}
                            {selectedElement && formElement && !isBackgroundSelected && !isButtonsSelected && (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 p-1.5 bg-slate-50 rounded-md border border-slate-100">
                                        <Type className="h-3.5 w-3.5 text-slate-500" />
                                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{formElement.type}</span>
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] font-medium text-slate-500 uppercase tracking-wide">{formElement.type === "heading" ? "Heading Text" : formElement.type === "paragraph" ? "Text Content" : "Question Text"}</Label>
                                        <Textarea value={formElement.label} onChange={(e) => onUpdateElement(formElement.id, { label: e.target.value })}
                                            className="min-h-[60px] text-xs resize-none border-slate-200 focus:border-violet-500 transition-colors p-2" placeholder="Enter text..." />
                                    </div>

                                    {!["heading", "paragraph", "image"].includes(formElement.type) && (
                                        <div className="space-y-1.5">
                                            <Label className="text-[10px] font-medium text-slate-500 uppercase tracking-wide">Help Text / Placeholder</Label>
                                            <Input value={formElement.placeholder || ""} onChange={(e) => onUpdateElement(formElement.id, { placeholder: e.target.value })}
                                                className="h-7 text-xs border-slate-200 focus:border-violet-500" placeholder="Type clarification text..." />
                                        </div>
                                    )}

                                    {!["heading", "paragraph", "image", "start-button", "submit-button"].includes(formElement.type) && (
                                        <div className="flex items-center justify-between p-2 bg-white border border-slate-100 rounded-md shadow-sm">
                                            <div>
                                                <Label className="text-[10px] font-medium text-slate-700">Required Field</Label>
                                                <p className="text-[9px] text-slate-400">User cannot skip this</p>
                                            </div>
                                            <Switch className="scale-75 origin-right" checked={formElement.required} onCheckedChange={(c) => onUpdateElement(formElement.id, { required: c })} />
                                        </div>
                                    )}

                                    {/* Choices Management */}
                                    {["select", "radio", "checkbox"].includes(formElement.type) && (
                                        <div className="space-y-2 pt-2 border-t border-slate-100">
                                            <div className="flex items-center justify-between">
                                                <Label className="text-[10px] font-medium text-slate-500 uppercase tracking-wide">Choices</Label>
                                                <span className="bg-slate-100 text-slate-500 text-[9px] px-1.5 py-0.5 rounded-full">{formElement.options?.length || 0}</span>
                                            </div>
                                            <div className="space-y-1.5">
                                                {formElement.options?.map((opt, i) => (
                                                    <div key={i} className="flex items-center gap-1 group">
                                                        <GripVertical className="h-3 w-3 text-slate-300 opacity-0 group-hover:opacity-100 cursor-grab" />
                                                        <Input value={opt} onChange={(e) => updateOption(i, e.target.value)} className="h-7 text-xs flex-1 border-slate-200" />
                                                        <button onClick={() => removeOption(i)} className="p-1 rounded text-slate-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all" disabled={(formElement.options?.length || 0) <= 1}>
                                                            <Trash2 className="h-3 w-3" />
                                                        </button>
                                                    </div>
                                                ))}
                                                <Button onClick={addOption} variant="outline" size="sm" className="w-full h-7 text-[10px] border-dashed text-slate-500 hover:text-violet-600 hover:border-violet-300 hover:bg-violet-50">
                                                    <Plus className="h-3 w-3 mr-1" /> Add Choice
                                                </Button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Image Position Controls */}
                                    {formElement.type === "image" && (
                                        <div className="space-y-1.5">
                                            <Label className="text-[10px] font-medium text-slate-500 uppercase tracking-wide">Alignment</Label>
                                            <div className="flex bg-slate-100 p-0.5 rounded-md">
                                                {[{ v: 'left', i: AlignLeft }, { v: 'center', i: AlignCenter }, { v: 'right', i: AlignRight }].map(({ v, i: Icon }) => (
                                                    <button key={v} onClick={() => onUpdateElement(formElement.id, { imagePosition: v as any })}
                                                        className={`flex-1 py-1 flex justify-center rounded transition-all ${formElement.imagePosition === v ? 'bg-white shadow-sm text-slate-900 border border-slate-200' : 'text-slate-400 hover:text-slate-600'}`}>
                                                        <Icon className="h-3.5 w-3.5" />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* SECTION CONTENT */}
                            {formSection && !isBackgroundSelected && !isButtonsSelected && (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 p-1.5 bg-emerald-50 rounded-md border border-emerald-100">
                                        <Layout className="h-3.5 w-3.5 text-emerald-600" />
                                        <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">{formSection.type === 'input-zone' ? 'Input Zone' : 'Container'}</span>
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] font-medium text-slate-500 uppercase tracking-wide">Section Title</Label>
                                        <Input value={formSection.title || ""} onChange={(e) => onUpdateSection(formSection.id, { title: e.target.value })} className="h-7 text-xs border-slate-200" placeholder="Optional title..." />
                                    </div>

                                    <div className="space-y-3 pt-2 border-t border-slate-100">
                                        <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Layout</Label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="space-y-1">
                                                <Label className="text-[9px] text-slate-500">Direction</Label>
                                                <Select value={formSection.layout.direction} onValueChange={(val: any) => updateSectionLayout({ direction: val })}>
                                                    <SelectTrigger className="h-7 text-[10px]"><SelectValue /></SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="column">Stack (Column)</SelectItem>
                                                        <SelectItem value="row">Side (Row)</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-1">
                                                <Label className="text-[9px] text-slate-500">Gap (px)</Label>
                                                <Input type="number" value={formSection.layout.gap} onChange={(e) => updateSectionLayout({ gap: parseInt(e.target.value) })} className="h-7 text-xs" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* PAGE CONTENT (Form Card) */}
                            {selectionContext === 'formcard' && (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 p-1.5 bg-emerald-50 rounded-md border border-emerald-100">
                                        <LayoutTemplate className="h-3.5 w-3.5 text-emerald-600" />
                                        <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">Page Settings</span>
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] font-medium text-slate-500 uppercase tracking-wide">Page Title</Label>
                                        <Input value={currentPage.title} onChange={(e) => onUpdatePage({ title: e.target.value })} className="h-7 text-xs border-slate-200" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] font-medium text-slate-500 uppercase tracking-wide">Page Type</Label>
                                        <Select value={currentPage.type} onValueChange={(v: "welcome" | "form" | "ending") => onUpdatePage({ type: v })}>
                                            <SelectTrigger className="h-7 text-[10px]"><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="welcome">Welcome Screen</SelectItem>
                                                <SelectItem value="form">Form Page</SelectItem>
                                                <SelectItem value="ending">Thank You Page</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {/* ========== STYLE TAB ========== */}
                    {activeSection === "style" && (
                        <>
                            {/* BACKGROUND STYLING (My Rich Feature) */}
                            {selectionContext === 'background' && (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Label className="text-[10px] font-bold uppercase tracking-widest text-pink-500">Global Background</Label>
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] text-slate-500 uppercase tracking-wide">Background Type</Label>
                                        <Select value={currentPage.layout.backgroundType || 'color'} onValueChange={(v: any) => onUpdatePage({ layout: { ...currentPage.layout, backgroundType: v } })}>
                                            <SelectTrigger className="h-7 text-[10px]"><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="color">Solid Color</SelectItem>
                                                <SelectItem value="gradient">Gradient</SelectItem>
                                                <SelectItem value="mesh">Mesh Gradient</SelectItem>
                                                <SelectItem value="dots">Dot Pattern</SelectItem>
                                                <SelectItem value="image">Image</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {(!currentPage.layout.backgroundType || currentPage.layout.backgroundType === 'color' || currentPage.layout.backgroundType === 'dots') && (
                                        <div className="space-y-2">
                                            <Label className="text-[10px] text-slate-500 uppercase tracking-wide">Preset Colors</Label>
                                            <div className="grid grid-cols-8 gap-1.5">
                                                {colorPresets.map((color, i) => (
                                                    <button key={i} onClick={() => onUpdatePage({ layout: { ...currentPage.layout, canvasBackground: color } })}
                                                        className={`w-full aspect-square rounded border transition-all hover:scale-110 ${currentPage.layout.canvasBackground === color ? 'border-pink-500 ring-1 ring-pink-200 scale-110' : 'border-slate-200'}`}
                                                        style={{ backgroundColor: color }} />
                                                ))}
                                            </div>
                                            <div className="flex gap-2 items-center pt-1">
                                                <Label className="text-[9px] text-slate-400 w-12">Custom:</Label>
                                                <div className="flex gap-1.5 flex-1 items-center">
                                                    <input type="color" value={currentPage.layout.canvasBackground} onChange={(e) => onUpdatePage({ layout: { ...currentPage.layout, canvasBackground: e.target.value } })}
                                                        className="w-5 h-5 rounded border border-slate-200 cursor-pointer p-0" />
                                                    <Input value={currentPage.layout.canvasBackground} onChange={(e) => onUpdatePage({ layout: { ...currentPage.layout, canvasBackground: e.target.value } })}
                                                        className="h-6 text-[10px] font-mono flex-1 px-1" />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {currentPage.layout.backgroundType === 'gradient' && (
                                        <div className="space-y-2">
                                            <Label className="text-[10px] text-slate-500 uppercase tracking-wide">Gradient Presets</Label>
                                            <div className="grid grid-cols-2 gap-1.5">
                                                {gradientPresets.map((preset, i) => (
                                                    <button key={i} onClick={() => applyGradientPreset(preset)}
                                                        className="w-full h-8 rounded border border-slate-200 hover:border-pink-500 transition-all text-[9px] font-medium text-white shadow-sm flex items-center justify-center opacity-90 hover:opacity-100"
                                                        style={{ background: `linear-gradient(${preset.angle}deg, ${preset.colors.join(', ')})` }}>
                                                        {preset.name}
                                                    </button>
                                                ))}
                                            </div>
                                            <div className="space-y-1 pt-1">
                                                <Label className="text-[9px] text-slate-400">Angle ({currentPage.layout.canvasGradient?.angle || 135}°)</Label>
                                                <Slider className="scale-90 origin-left w-[110%]" value={[currentPage.layout.canvasGradient?.angle || 135]} min={0} max={360} step={15}
                                                    onValueChange={([v]) => onUpdatePage({ layout: { ...currentPage.layout, canvasGradient: { ...(currentPage.layout.canvasGradient || { enabled: true, type: 'linear', colors: ['#ff7e5f', '#feb47b'] }), angle: v } } })} />
                                            </div>
                                        </div>
                                    )}

                                    {currentPage.layout.backgroundType === 'mesh' && (
                                        <div className="space-y-2">
                                            <Label className="text-[10px] text-slate-500 uppercase tracking-wide">Mesh Gradients</Label>
                                            <div className="grid grid-cols-2 gap-1.5">
                                                {meshPresets.map((preset, i) => (
                                                    <button key={i} onClick={() => onUpdatePage({ layout: { ...currentPage.layout, canvasBackground: preset.baseColor } })}
                                                        className="w-full h-8 rounded border border-slate-200 hover:border-pink-500 transition-all text-[9px] font-medium text-slate-700 flex items-center justify-center relative overflow-hidden"
                                                    >
                                                        <div className="absolute inset-0 opacity-50" style={{
                                                            background: `linear-gradient(135deg, ${preset.baseColor} 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(200,200,255,0.5) 0%, transparent 50%)`
                                                        }} />
                                                        <span className="relative z-10 bg-white/60 px-1.5 py-0.5 rounded-full text-[8px]">{preset.name}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {currentPage.layout.backgroundType === 'image' && (
                                        <div className="space-y-2">
                                            <Label className="text-[10px] text-slate-500 uppercase tracking-wide">Background Image</Label>
                                            <Input value={currentPage.layout.backgroundImage || ''} onChange={(e) => onUpdatePage({ layout: { ...currentPage.layout, backgroundImage: e.target.value } })}
                                                className="h-7 text-[10px]" placeholder="https://example.com/image.jpg" />
                                            {currentPage.layout.backgroundImage && (
                                                <div className="aspect-video w-full rounded border border-slate-200 overflow-hidden bg-slate-50 relative">
                                                    <img src={currentPage.layout.backgroundImage} alt="Preview" className="w-full h-full object-cover" />
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* BUTTON STYLING */}
                            {selectionContext === 'buttons' && (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Label className="text-[10px] font-bold uppercase tracking-widest text-violet-500">Button Appearance</Label>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] text-slate-500 uppercase tracking-wide">Style Presets</Label>
                                        <div className="grid grid-cols-3 gap-1.5">
                                            {buttonPresets.map(p => (
                                                <button key={p.id} onClick={() => applyPreset(p)}
                                                    className={`p-1.5 rounded border text-[9px] font-medium transition-all flex flex-col items-center gap-1 ${buttonStyle.preset === p.id ? 'border-violet-500 bg-violet-50 text-violet-700' : 'border-slate-200 hover:border-slate-300'}`}>
                                                    <div className="w-full h-2 rounded opacity-60" style={{ backgroundColor: p.style.backgroundColor || '#0f172a' }} />
                                                    {p.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-3 pt-3 border-t border-slate-100">
                                        <Label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Customization</Label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="space-y-1">
                                                <Label className="text-[9px] text-slate-400">Padding</Label>
                                                <Slider className="scale-90 origin-left w-[110%]" value={[buttonStyle.paddingX]} min={8} max={60} step={2} onValueChange={([v]) => updateButtonStyle({ paddingX: v })} />
                                            </div>
                                            <div className="space-y-1">
                                                <Label className="text-[9px] text-slate-400">Radius</Label>
                                                <Slider className="scale-90 origin-left w-[110%]" value={[buttonStyle.borderRadius]} min={0} max={30} step={1} onValueChange={([v]) => updateButtonStyle({ borderRadius: v })} />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label className="text-[9px] text-slate-400">Colors</Label>
                                            <div className="flex gap-3">
                                                <div className="space-y-0.5 flex-1">
                                                    <span className="text-[8px] text-slate-400 block mb-0.5">Background</span>
                                                    <div className="flex gap-1.5 items-center">
                                                        <input type="color" value={buttonStyle.backgroundColor} onChange={(e) => updateButtonStyle({ backgroundColor: e.target.value })} className="w-5 h-5 rounded border p-0 cursor-pointer" />
                                                        <Input value={buttonStyle.backgroundColor} className="h-6 text-[10px] px-1" />
                                                    </div>
                                                </div>
                                                <div className="space-y-0.5 flex-1">
                                                    <span className="text-[8px] text-slate-400 block mb-0.5">Text</span>
                                                    <div className="flex gap-1.5 items-center">
                                                        <input type="color" value={buttonStyle.textColor} onChange={(e) => updateButtonStyle({ textColor: e.target.value })} className="w-5 h-5 rounded border p-0 cursor-pointer" />
                                                        <Input value={buttonStyle.textColor} className="h-6 text-[10px] px-1" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* SECTION STYLING (User's rich features) */}
                            {selectionContext === 'section' && formSection && (
                                <div className="space-y-4">
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">Visuals</Label>

                                        <div className="space-y-1.5">
                                            <Label className="text-[10px] text-slate-500 uppercase tracking-wide">Background Color</Label>
                                            <div className="flex gap-1.5 items-center">
                                                <input type="color" value={formSection.layout.backgroundColor} onChange={(e) => updateSectionLayout({ backgroundColor: e.target.value })} className="w-6 h-6 rounded border border-slate-200 p-0 cursor-pointer" />
                                                <Input value={formSection.layout.backgroundColor} onChange={(e) => updateSectionLayout({ backgroundColor: e.target.value })} className="flex-1 h-7 text-[10px] font-mono" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="space-y-1"><Label className="text-[9px] text-slate-500">Radius ({formSection.layout.borderRadius}px)</Label><Slider className="scale-90 origin-left w-[110%]" value={[formSection.layout.borderRadius]} min={0} max={32} step={1} onValueChange={([v]) => updateSectionLayout({ borderRadius: v })} /></div>
                                            <div className="space-y-1"><Label className="text-[9px] text-slate-500">Border ({formSection.layout.borderWidth}px)</Label><Slider className="scale-90 origin-left w-[110%]" value={[formSection.layout.borderWidth]} min={0} max={8} step={1} onValueChange={([v]) => updateSectionLayout({ borderWidth: v })} /></div>
                                        </div>
                                    </div>

                                    <div className="space-y-3 pt-3 border-t border-slate-100">
                                        <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Padding</Label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {(['top', 'bottom', 'left', 'right'] as const).map(side => (
                                                <div key={side} className="space-y-0.5">
                                                    <Label className="text-[9px] text-slate-400 capitalize">{side}</Label>
                                                    <Input type="number" value={formSection.layout.padding[side]} onChange={(e) => updateSectionLayout({ padding: { ...formSection.layout.padding, [side]: parseInt(e.target.value) } })} className="h-6 text-[10px]" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2 pt-3 border-t border-slate-100">
                                        <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Effects</Label>
                                        <div className="flex items-center justify-between">
                                            <Label className="text-[10px] text-slate-600">Drop Shadow</Label>
                                            <Switch className="scale-75 origin-right" checked={formSection.layout.shadow?.enabled} onCheckedChange={(val) => updateSectionLayout({ shadow: { ...(formSection.layout.shadow || { x: 0, y: 4, blur: 20, spread: 0, color: "rgba(0,0,0,0.1)" }), enabled: val } })} />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <Label className="text-[10px] text-slate-600">Glassmorphism</Label>
                                            <Switch className="scale-75 origin-right" checked={formSection.layout.glassmorphism?.enabled} onCheckedChange={(val) => updateSectionLayout({ glassmorphism: { ...(formSection.layout.glassmorphism || { blur: 10, opacity: 0.8 }), enabled: val } })} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* FORM CARD STYLING (Merged rich features) */}
                            {selectionContext === 'formcard' && (
                                <div className="space-y-5">
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">Card Design</Label>

                                        <div className="space-y-1.5">
                                            <Label className="text-[10px] text-slate-500 uppercase tracking-wide">Card Background</Label>
                                            <div className="flex gap-1.5 items-center">
                                                <input type="color" value={currentPage.layout.backgroundColor} onChange={(e) => onUpdatePage({ layout: { ...currentPage.layout, backgroundColor: e.target.value } })} className="w-6 h-6 rounded border border-slate-200 p-0 cursor-pointer" />
                                                <Input value={currentPage.layout.backgroundColor} onChange={(e) => onUpdatePage({ layout: { ...currentPage.layout, backgroundColor: e.target.value } })} className="flex-1 h-7 text-[10px] font-mono" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="space-y-1"><Label className="text-[9px] text-slate-500">Rounded ({currentPage.layout.borderRadius}px)</Label><Slider className="scale-90 origin-left w-[110%]" value={[currentPage.layout.borderRadius]} min={0} max={64} step={1} onValueChange={([v]) => onUpdatePage({ layout: { ...currentPage.layout, borderRadius: v } })} /></div>
                                            <div className="space-y-1">
                                                <div className="flex justify-between items-center"><Label className="text-[9px] text-slate-500">Shadow</Label><Switch checked={currentPage.layout.shadow?.enabled} className="h-3 w-5 scale-75" onCheckedChange={(v) => onUpdatePage({ layout: { ...currentPage.layout, shadow: { ...(currentPage.layout.shadow || { x: 0, y: 20, blur: 50, spread: -10, color: "rgba(0,0,0,0.1)" }), enabled: v } } })} /></div>
                                                {currentPage.layout.shadow?.enabled && <Slider className="scale-90 origin-left w-[110%]" value={[currentPage.layout.shadow?.blur || 0]} min={0} max={100} onValueChange={([v]) => onUpdatePage({ layout: { ...currentPage.layout, shadow: { ...currentPage.layout.shadow!, blur: v } } })} />}
                                            </div>
                                        </div>
                                    </div>

                                    {/* SPLIT LAYOUT (User's better version) */}
                                    <div className="space-y-3 pt-3 border-t border-slate-100">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1.5">
                                                <Columns className="h-3 w-3 text-pink-500" />
                                                <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-800">Split Layout</Label>
                                            </div>
                                            <Switch className="scale-75 origin-right" checked={currentPage.layout.splitLayout?.enabled || false} onCheckedChange={(v) => onUpdatePage({ layout: { ...currentPage.layout, splitLayout: { enabled: v, image: currentPage.layout.splitLayout?.image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564', position: 'right', focalPoint: { x: 50, y: 50 }, overlay: { enabled: true, color: '#000', opacity: 0.2 } } } })} />
                                        </div>

                                        {currentPage.layout.splitLayout?.enabled && (
                                            <div className="space-y-3 pl-2 border-l-2 border-pink-100/50">
                                                <div className="space-y-1.5">
                                                    <Label className="text-[9px] text-slate-500">Cover Image</Label>
                                                    <Input value={currentPage.layout.splitLayout.image} onChange={(e) => onUpdatePage({ layout: { ...currentPage.layout, splitLayout: { ...currentPage.layout.splitLayout!, image: e.target.value } } })} className="h-7 text-[10px]" />
                                                </div>
                                                <div className="flex gap-1 p-0.5 bg-slate-100 rounded-md">
                                                    {['left', 'right'].map(pos => (
                                                        <button key={pos} onClick={() => onUpdatePage({ layout: { ...currentPage.layout, splitLayout: { ...currentPage.layout.splitLayout!, position: pos as 'left' | 'right' } } })}
                                                            className={`flex-1 py-1 text-[9px] font-bold uppercase tracking-wider rounded transition-all ${currentPage.layout.splitLayout!.position === pos ? 'bg-white shadow-sm text-slate-900 border border-slate-200' : 'text-slate-400'}`}>{pos}</button>
                                                    ))}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-[9px] text-slate-500 flex gap-1 items-center"><Move className="h-2.5 w-2.5" /> Focal Point ({currentPage.layout.splitLayout.focalPoint?.x}%, {currentPage.layout.splitLayout.focalPoint?.y}%)</Label>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <Slider className="scale-90 origin-left w-[110%]" value={[currentPage.layout.splitLayout.focalPoint?.x || 50]} min={0} max={100} onValueChange={([x]) => onUpdatePage({ layout: { ...currentPage.layout, splitLayout: { ...currentPage.layout.splitLayout!, focalPoint: { ...currentPage.layout.splitLayout!.focalPoint, x } } } })} />
                                                        <Slider className="scale-90 origin-left w-[110%]" value={[currentPage.layout.splitLayout.focalPoint?.y || 50]} min={0} max={100} onValueChange={([y]) => onUpdatePage({ layout: { ...currentPage.layout, splitLayout: { ...currentPage.layout.splitLayout!, focalPoint: { ...currentPage.layout.splitLayout!.focalPoint, y } } } })} />
                                                    </div>
                                                </div>
                                                <div className="space-y-1">
                                                    <Label className="text-[9px] text-slate-500 flex justify-between"><span>Overlay Opacity</span><span>{Math.round((currentPage.layout.splitLayout.overlay?.opacity || 0) * 100)}%</span></Label>
                                                    <Slider className="scale-90 origin-left w-[110%]" value={[(currentPage.layout.splitLayout.overlay?.opacity || 0) * 100]} max={100} onValueChange={([v]) => onUpdatePage({ layout: { ...currentPage.layout, splitLayout: { ...currentPage.layout.splitLayout!, overlay: { ...currentPage.layout.splitLayout!.overlay, opacity: v / 100 } } } })} />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* TYPOGRAPHY & WIDTH */}
                                    <div className="space-y-3 pt-3 border-t border-slate-100">
                                        <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Global Settings</Label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="space-y-1">
                                                <Label className="text-[9px] text-slate-500">Text Color</Label>
                                                <div className="flex gap-1.5 items-center"><input type="color" value={currentPage.layout.textColor} onChange={(e) => onUpdatePage({ layout: { ...currentPage.layout, textColor: e.target.value } })} className="w-5 h-5 rounded border p-0 cursor-pointer" /><Input value={currentPage.layout.textColor} className="h-6 text-[10px] px-1" /></div>
                                            </div>
                                            <div className="space-y-1">
                                                <Label className="text-[9px] text-slate-500">Max Width</Label>
                                                <Select value={currentPage.layout.maxWidth} onValueChange={(val: any) => onUpdatePage({ layout: { ...currentPage.layout, maxWidth: val } })}>
                                                    <SelectTrigger className="h-6 text-[10px]"><SelectValue /></SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="sm">Small (640px)</SelectItem>
                                                        <SelectItem value="md">Medium (768px)</SelectItem>
                                                        <SelectItem value="lg">Large (1024px)</SelectItem>
                                                        <SelectItem value="full">Full Width</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {/* ========== SETTINGS TAB (User's better layout) ========== */}
                    {activeSection === "settings" && (
                        <div className="space-y-4">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 p-1.5 bg-slate-50 rounded-md border border-slate-100">
                                    <Layers className="h-3.5 w-3.5 text-slate-500" />
                                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Form Behavior</span>
                                </div>
                                <div className="space-y-2">
                                    {[
                                        { label: "Progress Bar", desc: "Show completion status", default: true },
                                        { label: "Question Numbers", desc: "Display 1, 2, 3...", default: true },
                                        { label: "Allow Back Navigation", desc: "Let users review answers", default: true },
                                        { label: "Auto-save Responses", desc: "Save progress locally", default: false },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between p-2 rounded-md border border-slate-100 hover:border-slate-200 transition-all">
                                            <div><Label className="text-[10px] font-medium text-slate-700">{item.label}</Label><p className="text-[9px] text-slate-400">{item.desc}</p></div>
                                            <Switch className="scale-75 origin-right" defaultChecked={item.default} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3 pt-2">
                                <div className="flex items-center gap-2 p-1.5 bg-slate-50 rounded-md border border-slate-100">
                                    <Monitor className="h-3.5 w-3.5 text-slate-500" />
                                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Display Settings</span>
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-[10px] font-medium text-slate-700">Responsiveness</Label>
                                    <div className="flex gap-2 text-[10px] text-slate-500 bg-slate-50 p-2 rounded-md border border-slate-100">
                                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                                        Your form automatically adapts to Mobile, Tablet, and Desktop screens.
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
