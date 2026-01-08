
import React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Palette, Move, Columns, Sparkles } from "lucide-react"
import type { FormPage, FormSection, ButtonStyle } from "@/types/form"
import { buttonPresets, colorPresets, gradientPresets, meshPresets, defaultButtonStyle } from "./helper"

interface StyleTabProps {
    currentPage: FormPage
    onUpdatePage: (updates: Partial<FormPage>) => void
    selectionContext: string
    selectedElement: string | null
    formSection: FormSection | null
    onUpdateSection: (sectionId: string, updates: Partial<FormSection>) => void
}

export function StyleTab({
    currentPage, onUpdatePage,
    selectionContext, selectedElement,
    formSection, onUpdateSection
}: StyleTabProps) {

    // Helper functions
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

    // Combined Background Styled Components
    const renderBackgroundSettings = () => (
        <div className="space-y-6">
            <div className="space-y-4">
                <div className="flex items-center gap-2 mb-1 p-1 bg-pink-50 rounded-md border border-pink-100">
                    <Palette className="h-3.5 w-3.5 text-pink-600" />
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-pink-700">Page Background</Label>
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
                    <div className="space-y-4 p-2 bg-slate-50 rounded border border-slate-100">
                        <div className="space-y-2">
                            <Label className="text-[10px] text-slate-500 uppercase tracking-wide">Image URL</Label>
                            <Input value={currentPage.layout.backgroundImage || ''} onChange={(e) => onUpdatePage({ layout: { ...currentPage.layout, backgroundImage: e.target.value } })}
                                className="h-7 text-[10px]" placeholder="https://example.com/image.jpg" />
                        </div>

                        {currentPage.layout.backgroundImage && (
                            <div className="space-y-3">
                                <div className="aspect-video w-full rounded border border-slate-200 overflow-hidden bg-white relative">
                                    <img src={currentPage.layout.backgroundImage} alt="Preview" className="w-full h-full object-cover" />
                                </div>

                                {/* Blur Control */}
                                <div className="space-y-1">
                                    <div className="flex justify-between items-center">
                                        <Label className="text-[9px] text-slate-500">Blur Amount</Label>
                                        <span className="text-[9px] text-slate-400">{currentPage.layout.backgroundImageBlur || 0}px</span>
                                    </div>
                                    <Slider className="scale-90 origin-left w-[110%]" value={[currentPage.layout.backgroundImageBlur || 0]} min={0} max={20} step={1}
                                        onValueChange={([v]) => onUpdatePage({ layout: { ...currentPage.layout, backgroundImageBlur: v } })} />
                                </div>

                                {/* Overlay Control */}
                                <div className="space-y-2 pt-2 border-t border-slate-100">
                                    <div className="flex justify-between items-center">
                                        <Label className="text-[9px] text-slate-500">Color Overlay</Label>
                                        <Switch className="scale-75 origin-right" checked={currentPage.layout.backgroundOverlay?.enabled}
                                            onCheckedChange={(v) => onUpdatePage({ layout: { ...currentPage.layout, backgroundOverlay: { ...currentPage.layout.backgroundOverlay || { color: '#000000', opacity: 0.5 }, enabled: v } } })} />
                                    </div>
                                    {currentPage.layout.backgroundOverlay?.enabled && (
                                        <div className="flex items-center gap-2 bg-white p-1 rounded border border-slate-100">
                                            <input type="color" value={currentPage.layout.backgroundOverlay.color}
                                                onChange={(e) => onUpdatePage({ layout: { ...currentPage.layout, backgroundOverlay: { ...currentPage.layout.backgroundOverlay!, color: e.target.value } } })}
                                                className="w-5 h-5 rounded border p-0 cursor-pointer" />
                                            <div className="flex-1">
                                                <Slider className="scale-90 origin-left w-[110%]" value={[(currentPage.layout.backgroundOverlay.opacity) * 100]} max={100}
                                                    onValueChange={([v]) => onUpdatePage({ layout: { ...currentPage.layout, backgroundOverlay: { ...currentPage.layout.backgroundOverlay!, opacity: v / 100 } } })} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

        </div>
    )

    const renderButtonsSettings = () => (
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
    )

    const renderSectionSettings = () => (
        formSection && (
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
        )
    )

    const renderFormCardSettings = () => (
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
                    <div className="space-y-1"><Label className="text-[9px] text-slate-500">Radius ({currentPage.layout.borderRadius}px)</Label><Slider className="scale-90 origin-left w-[110%]" value={[currentPage.layout.borderRadius]} min={0} max={64} step={1} onValueChange={([v]) => onUpdatePage({ layout: { ...currentPage.layout, borderRadius: v } })} /></div>
                    <div className="space-y-1">
                        <div className="flex justify-between items-center"><Label className="text-[9px] text-slate-500">Shadow</Label><Switch checked={currentPage.layout.shadow?.enabled} className="h-3 w-5 scale-75" onCheckedChange={(v) => onUpdatePage({ layout: { ...currentPage.layout, shadow: { ...(currentPage.layout.shadow || { x: 0, y: 20, blur: 50, spread: -10, color: "rgba(0,0,0,0.1)" }), enabled: v } } })} /></div>
                        {currentPage.layout.shadow?.enabled && <Slider className="scale-90 origin-left w-[110%]" value={[currentPage.layout.shadow?.blur || 0]} min={0} max={100} onValueChange={([v]) => onUpdatePage({ layout: { ...currentPage.layout, shadow: { ...currentPage.layout.shadow!, blur: v } } })} />}
                    </div>
                </div>
            </div>

            {/* Glassmorphism System */}
            <div className="space-y-2 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                        <Sparkles className="h-3 w-3 text-indigo-500" />
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-800">Glass Effect</Label>
                    </div>
                    <Switch className="scale-75 origin-right" checked={currentPage.layout.glassmorphism?.enabled}
                        onCheckedChange={(v) => onUpdatePage({ layout: { ...currentPage.layout, glassmorphism: { ...currentPage.layout.glassmorphism || { blur: 12, opacity: 0.9, borderOpacity: 0.2 }, enabled: v } } })} />
                </div>
                {currentPage.layout.glassmorphism?.enabled && (
                    <div className="space-y-3 pl-2 border-l-2 border-indigo-100">
                        <div className="space-y-1">
                            <Label className="text-[9px] text-slate-500">Backdrop Blur ({currentPage.layout.glassmorphism.blur}px)</Label>
                            <Slider className="scale-90 origin-left w-[110%]" value={[currentPage.layout.glassmorphism.blur]} min={0} max={40}
                                onValueChange={([v]) => onUpdatePage({ layout: { ...currentPage.layout, glassmorphism: { ...currentPage.layout.glassmorphism!, blur: v } } })} />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-[9px] text-slate-500">Card Opacity ({Math.round(currentPage.layout.glassmorphism.opacity * 100)}%)</Label>
                            <Slider className="scale-90 origin-left w-[110%]" value={[currentPage.layout.glassmorphism.opacity * 100]} max={100}
                                onValueChange={([v]) => onUpdatePage({ layout: { ...currentPage.layout, glassmorphism: { ...currentPage.layout.glassmorphism!, opacity: v / 100 } } })} />
                        </div>
                    </div>
                )}
            </div>

            {/* SPLIT LAYOUT - Affects how the form card is structured */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                        <Columns className="h-3 w-3 text-emerald-500" />
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-800">Split Screen Layout</Label>
                    </div>
                    <Switch className="scale-75 origin-right" checked={currentPage.layout.splitLayout?.enabled || false} onCheckedChange={(v) => onUpdatePage({ layout: { ...currentPage.layout, splitLayout: { enabled: v, image: currentPage.layout.splitLayout?.image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564', position: 'right', focalPoint: { x: 50, y: 50 }, overlay: { enabled: true, color: '#000', opacity: 0.2 } } } })} />
                </div>

                {currentPage.layout.splitLayout?.enabled && (
                    <div className="space-y-3 pl-2 border-l-2 border-emerald-100">
                        <div className="space-y-1.5">
                            <Label className="text-[9px] text-slate-500">Side Image URL</Label>
                            <Input value={currentPage.layout.splitLayout.image} onChange={(e) => onUpdatePage({ layout: { ...currentPage.layout, splitLayout: { ...currentPage.layout.splitLayout!, image: e.target.value } } })} className="h-7 text-[10px]" placeholder="https://..." />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-[9px] text-slate-500">Position</Label>
                            <div className="flex gap-1 p-0.5 bg-slate-100 rounded-md">
                                {['left', 'right'].map(pos => (
                                    <button key={pos} onClick={() => onUpdatePage({ layout: { ...currentPage.layout, splitLayout: { ...currentPage.layout.splitLayout!, position: pos as 'left' | 'right' } } })}
                                        className={`flex-1 py-1 text-[9px] font-bold uppercase tracking-wider rounded transition-all ${currentPage.layout.splitLayout!.position === pos ? 'bg-white shadow-sm text-slate-900 border border-slate-200' : 'text-slate-400'}`}>{pos}</button>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[9px] text-slate-500 flex gap-1 items-center"><Move className="h-2.5 w-2.5" /> Focal Point ({currentPage.layout.splitLayout.focalPoint?.x}%, {currentPage.layout.splitLayout.focalPoint?.y}%)</Label>
                            <div className="grid grid-cols-2 gap-2">
                                <Slider className="scale-90 origin-left w-[110%]" value={[currentPage.layout.splitLayout.focalPoint?.x || 50]} min={0} max={100} onValueChange={([x]) => onUpdatePage({ layout: { ...currentPage.layout, splitLayout: { ...currentPage.layout.splitLayout!, focalPoint: { ...currentPage.layout.splitLayout!.focalPoint, x } } } })} />
                                <Slider className="scale-90 origin-left w-[110%]" value={[currentPage.layout.splitLayout.focalPoint?.y || 50]} min={0} max={100} onValueChange={([y]) => onUpdatePage({ layout: { ...currentPage.layout, splitLayout: { ...currentPage.layout.splitLayout!, focalPoint: { ...currentPage.layout.splitLayout!.focalPoint, y } } } })} />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <Label className="text-[9px] text-slate-500 flex justify-between"><span>Image Overlay</span><span>{Math.round((currentPage.layout.splitLayout.overlay?.opacity || 0) * 100)}%</span></Label>
                            <Slider className="scale-90 origin-left w-[110%]" value={[(currentPage.layout.splitLayout.overlay?.opacity || 0) * 100]} max={100} onValueChange={([v]) => onUpdatePage({ layout: { ...currentPage.layout, splitLayout: { ...currentPage.layout.splitLayout!, overlay: { ...currentPage.layout.splitLayout!.overlay, opacity: v / 100 } } } })} />
                        </div>
                    </div>
                )}
            </div>

            {/* GLOBAL TYPOGRAPHY & WIDTH */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Card Settings</Label>
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
    )

    return (
        <>
            {(selectionContext === 'background' || (!selectedElement && !selectionContext)) && renderBackgroundSettings()}
            {selectionContext === 'buttons' && renderButtonsSettings()}
            {selectionContext === 'section' && renderSectionSettings()}
            {selectionContext === 'formcard' && renderFormCardSettings()}
        </>
    )
}
