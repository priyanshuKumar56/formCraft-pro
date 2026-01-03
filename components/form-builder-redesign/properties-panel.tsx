"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import type { FormElement, FormPage, FormData, FormSection } from "@/types/form"
import {
    X,
    Settings2,
    Palette,
    Layout,
    Plus,
    Trash2,
    GripVertical,
    AlignLeft,
    AlignCenter,
    AlignRight,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    LayoutTemplate,
    Type,
    Layers,
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

export function PropertiesPanel({
    isOpen,
    onToggle,
    selectedElement,
    formElement,
    onUpdateElement,
    currentPage,
    onUpdatePage,
    formSection,
    onUpdateSection,
    formData,
    onUpdateForm,
    onUpdateFormSettings,
}: PropertiesPanelProps) {
    const [activeSection, setActiveSection] = useState<"content" | "style" | "settings">("content")

    const updateSectionLayout = (updates: any) => {
        if (!formSection) return
        onUpdateSection(formSection.id, {
            layout: { ...formSection.layout, ...updates }
        })
    }

    const addOption = () => {
        if (!formElement) return
        const newOptions = [...(formElement.options || []), `Option ${(formElement.options?.length || 0) + 1}`]
        onUpdateElement(formElement.id, { options: newOptions })
    }

    const updateOption = (index: number, value: string) => {
        if (!formElement) return
        const newOptions = [...(formElement.options || [])]
        newOptions[index] = value
        onUpdateElement(formElement.id, { options: newOptions })
    }

    const removeOption = (index: number) => {
        if (!formElement) return
        const newOptions = formElement.options?.filter((_, i) => i !== index) || []
        onUpdateElement(formElement.id, { options: newOptions })
    }

    const updateFormSettings = (updates: Partial<FormData["settings"]>) => {
        onUpdateForm({
            ...formData,
            settings: { ...formData.settings, ...updates },
        })
    }

    const colorPresets = [
        { name: "Violet", value: "#8b5cf6", gradient: "from-violet-500 to-purple-500" },
        { name: "Blue", value: "#3b82f6", gradient: "from-blue-500 to-cyan-500" },
        { name: "Emerald", value: "#10b981", gradient: "from-emerald-500 to-teal-500" },
        { name: "Orange", value: "#f97316", gradient: "from-orange-500 to-amber-500" },
        { name: "Rose", value: "#f43f5e", gradient: "from-rose-500 to-pink-500" },
        { name: "Slate", value: "#64748b", gradient: "from-slate-500 to-gray-500" },
    ]

    return (
        <>
            {/* Collapsed State Toggle */}
            {!isOpen && (
                <button
                    onClick={onToggle}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-6 h-16 bg-white border border-r-0 border-slate-200 rounded-l-lg shadow-sm flex items-center justify-center hover:bg-slate-50 transition-colors"
                >
                    <ChevronLeft className="h-4 w-4 text-slate-400" />
                </button>
            )}

            {/* Panel */}
            <div
                className={`bg-white border-l border-slate-200 flex-shrink-0 flex flex-col transition-all duration-300 ${isOpen ? "w-80" : "w-0 overflow-hidden"
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-md bg-slate-100">
                            <Settings2 className="h-4 w-4 text-slate-600" />
                        </div>
                        <span className="text-sm font-semibold text-slate-900">
                            {selectedElement ? (formSection ? "Section" : "Element") : "Page"} Properties
                        </span>
                    </div>
                    <button
                        onClick={onToggle}
                        className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>

                {/* Section Tabs */}
                <div className="flex items-center gap-1 p-2 border-b border-slate-100">
                    {(["content", "style", "settings"] as const).map((section) => (
                        <button
                            key={section}
                            onClick={() => setActiveSection(section)}
                            className={`flex-1 px-2 py-1.5 text-xs font-medium rounded-md transition-all ${activeSection === section
                                ? "bg-slate-900 text-white"
                                : "text-slate-600 hover:bg-slate-100"
                                }`}
                        >
                            {section.charAt(0).toUpperCase() + section.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4">
                    {activeSection === "content" && (
                        <div className="space-y-6">
                            {selectedElement && formElement ? (
                                <>
                                    {/* Element Type Badge */}
                                    <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-lg">
                                        <Type className="h-4 w-4 text-slate-500" />
                                        <span className="text-xs font-medium text-slate-600 capitalize">{formElement.type}</span>
                                    </div>

                                    {/* Label/Question */}
                                    <div className="space-y-2">
                                        <Label className="text-xs font-medium text-slate-700">
                                            {formElement.type === "heading" ? "Heading Text" :
                                                formElement.type === "paragraph" ? "Paragraph Text" : "Question"}
                                        </Label>
                                        <Textarea
                                            value={formElement.label}
                                            onChange={(e) => onUpdateElement(formElement.id, { label: e.target.value })}
                                            className="min-h-[80px] text-sm resize-none border-slate-200 focus:border-violet-500 focus:ring-violet-500/20"
                                            placeholder="Enter text..."
                                        />
                                    </div>

                                    {/* Description/Placeholder */}
                                    {!["heading", "paragraph", "image"].includes(formElement.type) && (
                                        <div className="space-y-2">
                                            <Label className="text-xs font-medium text-slate-700">Help Text</Label>
                                            <Input
                                                value={formElement.placeholder || ""}
                                                onChange={(e) => onUpdateElement(formElement.id, { placeholder: e.target.value })}
                                                className="h-9 text-sm border-slate-200 focus:border-violet-500"
                                                placeholder="Add helper text..."
                                            />
                                        </div>
                                    )}

                                    {/* Required Toggle */}
                                    {!["heading", "paragraph", "image", "start-button", "submit-button"].includes(formElement.type) && (
                                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                            <div>
                                                <Label className="text-sm font-medium text-slate-700">Required</Label>
                                                <p className="text-xs text-slate-500">User must answer</p>
                                            </div>
                                            <Switch
                                                checked={formElement.required}
                                                onCheckedChange={(checked) => onUpdateElement(formElement.id, { required: checked })}
                                            />
                                        </div>
                                    )}

                                    {/* Options for Choice Types */}
                                    {["select", "radio", "checkbox"].includes(formElement.type) && (
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <Label className="text-xs font-medium text-slate-700">Choices</Label>
                                                <span className="text-xs text-slate-400">{formElement.options?.length || 0}</span>
                                            </div>
                                            <div className="space-y-2">
                                                {formElement.options?.map((option, index) => (
                                                    <div key={index} className="flex items-center gap-2 group">
                                                        <GripVertical className="h-4 w-4 text-slate-300 opacity-0 group-hover:opacity-100 cursor-grab" />
                                                        <Input
                                                            value={option}
                                                            onChange={(e) => updateOption(index, e.target.value)}
                                                            className="h-8 text-sm flex-1 border-slate-200"
                                                            placeholder={`Option ${index + 1}`}
                                                        />
                                                        <button
                                                            onClick={() => removeOption(index)}
                                                            className="p-1 rounded text-slate-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
                                                            disabled={(formElement.options?.length || 0) <= 1}
                                                        >
                                                            <Trash2 className="h-3.5 w-3.5" />
                                                        </button>
                                                    </div>
                                                ))}
                                                <Button
                                                    onClick={addOption}
                                                    variant="outline"
                                                    size="sm"
                                                    className="w-full h-8 text-xs border-dashed border-slate-300 text-slate-500 hover:text-violet-600 hover:border-violet-400"
                                                >
                                                    <Plus className="h-3.5 w-3.5 mr-1" />
                                                    Add Choice
                                                </Button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Image Position */}
                                    {formElement.type === "image" && (
                                        <div className="space-y-2">
                                            <Label className="text-xs font-medium text-slate-700">Alignment</Label>
                                            <div className="flex gap-1">
                                                {[
                                                    { value: "left", icon: AlignLeft },
                                                    { value: "center", icon: AlignCenter },
                                                    { value: "right", icon: AlignRight },
                                                ].map(({ value, icon: Icon }) => (
                                                    <Button
                                                        key={value}
                                                        variant={formElement.imagePosition === value ? "default" : "outline"}
                                                        size="sm"
                                                        onClick={() => onUpdateElement(formElement.id, { imagePosition: value as "left" | "center" | "right" })}
                                                        className={`flex-1 h-8 ${formElement.imagePosition === value
                                                            ? "bg-slate-900 text-white"
                                                            : "border-slate-200"
                                                            }`}
                                                    >
                                                        <Icon className="h-4 w-4" />
                                                    </Button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : formSection ? (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-2 p-2.5 bg-emerald-50 rounded-lg">
                                        <Layout className="h-4 w-4 text-emerald-600" />
                                        <span className="text-xs font-medium text-emerald-700">Section Properties</span>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-xs font-medium text-slate-700">Section Title</Label>
                                        <Input
                                            value={formSection.title || ""}
                                            onChange={(e) => onUpdateSection(formSection.id, { title: e.target.value })}
                                            className="h-9 text-sm border-slate-200"
                                            placeholder="Enter section title..."
                                        />
                                    </div>

                                    <div className="space-y-4 pt-2 border-t border-slate-100">
                                        <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Layout</Label>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label className="text-xs text-slate-500">Direction</Label>
                                                <Select
                                                    value={formSection.layout.direction}
                                                    onValueChange={(val: any) => updateSectionLayout({ direction: val })}
                                                >
                                                    <SelectTrigger className="h-8 text-xs">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="column">Column</SelectItem>
                                                        <SelectItem value="row">Row</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-xs text-slate-500">Gap (px)</Label>
                                                <Input
                                                    type="number"
                                                    value={formSection.layout.gap}
                                                    onChange={(e) => updateSectionLayout({ gap: parseInt(e.target.value) })}
                                                    className="h-8 text-xs"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {/* Page Settings */}
                                    <div className="flex items-center gap-2 p-2.5 bg-violet-50 rounded-lg">
                                        <LayoutTemplate className="h-4 w-4 text-violet-600" />
                                        <span className="text-xs font-medium text-violet-700">Page Properties</span>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-xs font-medium text-slate-700">Page Title</Label>
                                        <Input
                                            value={currentPage.title}
                                            onChange={(e) => onUpdatePage({ title: e.target.value })}
                                            className="h-9 text-sm border-slate-200 focus:border-violet-500"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-xs font-medium text-slate-700">Page Type</Label>
                                        <Select
                                            value={currentPage.type}
                                            onValueChange={(value: "welcome" | "form" | "ending") => onUpdatePage({ type: value })}
                                        >
                                            <SelectTrigger className="h-9 text-sm border-slate-200">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="welcome">Welcome Screen</SelectItem>
                                                <SelectItem value="form">Form Page</SelectItem>
                                                <SelectItem value="ending">Thank You</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {activeSection === "style" && (
                        <div className="space-y-6">
                            {formSection ? (
                                <div className="space-y-6">
                                    {/* Section Styling (Already existing logic) */}
                                    <div className="space-y-4">
                                        <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Section Appearance</Label>

                                        <div className="space-y-2">
                                            <Label className="text-xs text-slate-600">Background Color</Label>
                                            <div className="flex gap-2">
                                                <input
                                                    type="color"
                                                    value={formSection.layout.backgroundColor}
                                                    onChange={(e) => updateSectionLayout({ backgroundColor: e.target.value })}
                                                    className="w-8 h-8 rounded border border-slate-200"
                                                />
                                                <Input
                                                    value={formSection.layout.backgroundColor}
                                                    onChange={(e) => updateSectionLayout({ backgroundColor: e.target.value })}
                                                    className="h-8 text-xs font-mono"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label className="text-xs text-slate-600">Radius</Label>
                                                <Slider
                                                    value={[formSection.layout.borderRadius]}
                                                    min={0} max={50} step={1}
                                                    onValueChange={([val]) => updateSectionLayout({ borderRadius: val })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-xs text-slate-600">Border</Label>
                                                <Slider
                                                    value={[formSection.layout.borderWidth]}
                                                    min={0} max={10} step={1}
                                                    onValueChange={([val]) => updateSectionLayout({ borderWidth: val })}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Padding Controls */}
                                    <div className="space-y-4 pt-4 border-t border-slate-100">
                                        <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Padding</Label>
                                        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                                            {(['top', 'bottom', 'left', 'right'] as const).map(side => (
                                                <div key={side} className="space-y-1">
                                                    <Label className="text-[10px] text-slate-500 capitalize">{side}</Label>
                                                    <Input
                                                        type="number"
                                                        value={formSection.layout.padding[side]}
                                                        onChange={(e) => updateSectionLayout({
                                                            padding: { ...formSection.layout.padding, [side]: parseInt(e.target.value) }
                                                        })}
                                                        className="h-8 text-xs"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Advanced Effects: Shadow & Glassmorphism */}
                                    <div className="space-y-4 pt-4 border-t border-slate-100">
                                        <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Effects</Label>

                                        <div className="flex items-center justify-between">
                                            <Label className="text-xs text-slate-600">Shadow</Label>
                                            <Switch
                                                checked={formSection.layout.shadow?.enabled}
                                                onCheckedChange={(val) => updateSectionLayout({
                                                    shadow: { ...(formSection.layout.shadow || { x: 0, y: 4, blur: 20, spread: 0, color: "rgba(0,0,0,0.1)" }), enabled: val }
                                                })}
                                            />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <Label className="text-xs text-slate-600">Glassmorphism</Label>
                                            <Switch
                                                checked={formSection.layout.glassmorphism?.enabled}
                                                onCheckedChange={(val) => updateSectionLayout({
                                                    glassmorphism: { ...(formSection.layout.glassmorphism || { blur: 10, opacity: 0.8 }), enabled: val }
                                                })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-8">
                                    {/* CANVAS STYLING */}
                                    <div className="space-y-4">
                                        <Label className="text-[10px] font-bold uppercase tracking-widest text-violet-500">Canvas (Outer Area)</Label>
                                        <div className="space-y-2">
                                            <Label className="text-xs text-slate-600">Background</Label>
                                            <div className="flex gap-2">
                                                <input
                                                    type="color"
                                                    value={currentPage.layout.canvasBackground}
                                                    onChange={(e) => onUpdatePage({ layout: { ...currentPage.layout, canvasBackground: e.target.value } })}
                                                    className="w-10 h-10 rounded-xl border-2 border-slate-100 cursor-pointer"
                                                />
                                                <Input
                                                    value={currentPage.layout.canvasBackground}
                                                    onChange={(e) => onUpdatePage({ layout: { ...currentPage.layout, canvasBackground: e.target.value } })}
                                                    className="flex-1 h-10 text-xs font-mono border-slate-200 rounded-xl"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* FORM CARD STYLING */}
                                    <div className="space-y-4 pt-6 border-t border-slate-100">
                                        <Label className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">Form Card (The Paper)</Label>

                                        <div className="space-y-2">
                                            <Label className="text-xs text-slate-600">Card Background</Label>
                                            <div className="flex gap-2">
                                                <input
                                                    type="color"
                                                    value={currentPage.layout.backgroundColor}
                                                    onChange={(e) => onUpdatePage({ layout: { ...currentPage.layout, backgroundColor: e.target.value } })}
                                                    className="w-10 h-10 rounded-xl border-2 border-slate-100 cursor-pointer"
                                                />
                                                <Input
                                                    value={currentPage.layout.backgroundColor}
                                                    onChange={(e) => onUpdatePage({ layout: { ...currentPage.layout, backgroundColor: e.target.value } })}
                                                    className="flex-1 h-10 text-xs font-mono border-slate-200 rounded-xl"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label className="text-xs text-slate-600">Rounded</Label>
                                                <Slider
                                                    value={[currentPage.layout.borderRadius]}
                                                    min={0} max={64} step={1}
                                                    onValueChange={([val]) => onUpdatePage({ layout: { ...currentPage.layout, borderRadius: val } })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-xs text-slate-600">Shadow</Label>
                                                <Switch
                                                    checked={currentPage.layout.shadow?.enabled}
                                                    onCheckedChange={(val) => onUpdatePage({
                                                        layout: { ...currentPage.layout, shadow: { ...(currentPage.layout.shadow || { x: 0, y: 20, blur: 50, spread: -10, color: "rgba(0,0,0,0.1)" }), enabled: val } }
                                                    })}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-xs text-slate-700">Page Width</Label>
                                            <Select
                                                value={currentPage.layout.maxWidth}
                                                onValueChange={(val: any) => onUpdatePage({ layout: { ...currentPage.layout, maxWidth: val } })}
                                            >
                                                <SelectTrigger className="h-10 text-xs rounded-xl border-slate-200">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="sm">Small (640px)</SelectItem>
                                                    <SelectItem value="md">Medium (768px)</SelectItem>
                                                    <SelectItem value="lg">Large (1024px)</SelectItem>
                                                    <SelectItem value="full">Full width</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeSection === "settings" && (
                        <div className="space-y-6">
                            {/* Form Behavior */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-lg">
                                    <Layers className="h-4 w-4 text-slate-500" />
                                    <span className="text-xs font-medium text-slate-600">Form Behavior</span>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200">
                                        <div>
                                            <Label className="text-sm font-medium text-slate-700">Progress Bar</Label>
                                            <p className="text-xs text-slate-500">Show completion status</p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>

                                    <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200">
                                        <div>
                                            <Label className="text-sm font-medium text-slate-700">Question Numbers</Label>
                                            <p className="text-xs text-slate-500">Display numbering</p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>

                                    <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200">
                                        <div>
                                            <Label className="text-sm font-medium text-slate-700">Allow Back Navigation</Label>
                                            <p className="text-xs text-slate-500">Let users go back</p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>

                                    <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200">
                                        <div>
                                            <Label className="text-sm font-medium text-slate-700">Auto-save Responses</Label>
                                            <p className="text-xs text-slate-500">Save partial submissions</p>
                                        </div>
                                        <Switch />
                                    </div>
                                </div>
                            </div>

                            {/* Notifications */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-lg">
                                    <Layout className="h-4 w-4 text-slate-500" />
                                    <span className="text-xs font-medium text-slate-600">Layout</span>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-xs font-medium text-slate-700">Form Width</Label>
                                    <Select defaultValue="medium">
                                        <SelectTrigger className="h-9 text-sm border-slate-200">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="narrow">Narrow (600px)</SelectItem>
                                            <SelectItem value="medium">Medium (800px)</SelectItem>
                                            <SelectItem value="wide">Wide (1000px)</SelectItem>
                                            <SelectItem value="full">Full Width</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
