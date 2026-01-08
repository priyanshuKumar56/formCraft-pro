
import React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Palette, MousePointer2, Type, GripVertical, Trash2, Plus,
    AlignLeft, AlignCenter, AlignRight, Layout, LayoutTemplate
} from "lucide-react"
import type { FormElement, FormSection, FormPage } from "@/types/form"

interface ContentTabProps {
    selectedElement: string | null
    formElement: FormElement | null
    onUpdateElement: (id: string, updates: Partial<FormElement>) => void
    formSection: FormSection | null
    onUpdateSection: (sectionId: string, updates: Partial<FormSection>) => void
    currentPage: FormPage
    onUpdatePage: (updates: Partial<FormPage>) => void
    selectionContext: string
    isBackgroundSelected: boolean
    isButtonsSelected: boolean
}

export function ContentTab({
    selectedElement, formElement, onUpdateElement,
    formSection, onUpdateSection,
    currentPage, onUpdatePage,
    selectionContext, isBackgroundSelected, isButtonsSelected
}: ContentTabProps) {

    // Option Management Helper
    const addOption = () => { if (formElement) onUpdateElement(formElement.id, { options: [...(formElement.options || []), `Option ${(formElement.options?.length || 0) + 1}`] }) }
    const updateOption = (i: number, v: string) => { if (formElement) { const o = [...(formElement.options || [])]; o[i] = v; onUpdateElement(formElement.id, { options: o }) } }
    const removeOption = (i: number) => { if (formElement) onUpdateElement(formElement.id, { options: formElement.options?.filter((_, idx) => idx !== i) || [] }) }

    const updateSectionLayout = (updates: any) => {
        if (!formSection) return
        onUpdateSection(formSection.id, { layout: { ...formSection.layout, ...updates } })
    }

    return (
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
    )
}
