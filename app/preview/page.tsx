"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, ArrowLeft, Check, ImageIcon, Home, Sparkles, Star, Upload } from "lucide-react"
import type { FormData, FormElement, FormSection, ButtonStyle } from "@/types/form"
import { cn } from "@/lib/utils"
import { getSectionStyles } from "@/lib/styling"

const defaultButtonStyle: ButtonStyle = {
  paddingX: 24, paddingY: 12, fontSize: 14, fontWeight: "semibold",
  backgroundColor: "#0f172a", textColor: "#ffffff", borderColor: "#0f172a",
  borderWidth: 0, borderRadius: 8,
  shadow: { enabled: true, x: 0, y: 2, blur: 8, spread: 0, color: "rgba(0,0,0,0.12)" },
  preset: "default"
}

export default function PreviewPage() {
  const [formData, setFormData] = useState<FormData | null>(null)
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [responses, setResponses] = useState<Record<string, any>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const storedData = sessionStorage.getItem("formcraft-preview-data")
    if (storedData) {
      try {
        const data = JSON.parse(storedData)
        setFormData(data)
      } catch (error) {
        console.error("Error parsing form data:", error)
      }
    }
    setIsLoading(false)
  }, [])

  const goBackToBuilder = () => {
    window.close()
  }

  const handleNext = useCallback(() => {
    if (!formData?.pages) return
    setIsTransitioning(true)
    setTimeout(() => {
      if (currentPageIndex < formData.pages.length - 1) {
        setCurrentPageIndex(currentPageIndex + 1)
      } else {
        setIsSubmitted(true)
      }
      setIsTransitioning(false)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 300)
  }, [currentPageIndex, formData])

  const handlePrevious = useCallback(() => {
    setIsTransitioning(true)
    setTimeout(() => {
      if (currentPageIndex > 0) {
        setCurrentPageIndex(currentPageIndex - 1)
      }
      setIsTransitioning(false)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 300)
  }, [currentPageIndex])

  const updateResponse = (elementId: string, value: any) => {
    setResponses((prev) => ({ ...prev, [elementId]: value }))
  }

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !isTransitioning) {
      const activeElement = document.activeElement
      if (activeElement?.tagName === "TEXTAREA") return

      e.preventDefault()
      handleNext()
    }
  }, [handleNext, isTransitioning])

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [handleKeyPress])

  if (isLoading) return <LoadingState />
  if (!formData || !formData.pages?.[currentPageIndex]) return <NotFoundState onBack={goBackToBuilder} />

  const currentPage = formData.pages[currentPageIndex]
  const progress = ((currentPageIndex + 1) / formData.pages.length) * 100
  const splitLayout = currentPage.layout.splitLayout
  const isSplitEnabled = splitLayout?.enabled === true

  // Helper function for glassmorphism
  const hexToRgba = (hex: string, opacity: number) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${opacity})`
      : hex
  }

  // Mesh gradient generator
  const getMeshGradient = (baseColor: string) => {
    switch (baseColor) {
      case "#fdf2f8": return `background-color: #fdf2f8; background-image: radial-gradient(at 40% 20%, hsla(330,100%,70%,0.4) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(280,100%,76%,0.4) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(340,100%,76%,0.4) 0px, transparent 50%), radial-gradient(at 80% 50%, hsla(350,100%,77%,0.4) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(270,100%,77%,0.4) 0px, transparent 50%), radial-gradient(at 80% 100%, hsla(310,100%,70%,0.4) 0px, transparent 50%), radial-gradient(at 0% 0%, hsla(343,100%,76%,0.4) 0px, transparent 50%);`
      case "#ecfeff": return `background-color: #ecfeff; background-image: radial-gradient(at 40% 20%, hsla(190,100%,70%,0.4) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(220,100%,76%,0.4) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(180,100%,76%,0.4) 0px, transparent 50%), radial-gradient(at 80% 50%, hsla(210,100%,77%,0.4) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(200,100%,77%,0.4) 0px, transparent 50%);`
      case "#fff7ed": return `background-color: #fff7ed; background-image: radial-gradient(at 40% 20%, hsla(28,100%,74%,0.4) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(350,100%,76%,0.4) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(50,100%,76%,0.4) 0px, transparent 50%), radial-gradient(at 80% 50%, hsla(20,100%,77%,0.4) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(30,100%,77%,0.4) 0px, transparent 50%);`
      case "#f0fdf4": return `background-color: #f0fdf4; background-image: radial-gradient(at 40% 20%, hsla(120,100%,70%,0.4) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(150,100%,76%,0.4) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(100,100%,76%,0.4) 0px, transparent 50%), radial-gradient(at 80% 50%, hsla(140,100%,77%,0.4) 0px, transparent 50%);`
      case "#faf5ff": return `background-color: #faf5ff; background-image: radial-gradient(at 40% 20%, hsla(260,100%,70%,0.3) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(290,100%,76%,0.3) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(240,100%,76%,0.3) 0px, transparent 50%);`
      case "#fef2f2": return `background-color: #fef2f2; background-image: radial-gradient(at 40% 20%, hsla(0,100%,70%,0.3) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(30,100%,76%,0.3) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(350,100%,76%,0.3) 0px, transparent 50%);`
      default: return `background-color: ${baseColor}; background-image: radial-gradient(at 40% 20%, rgba(236, 72, 153, 0.2) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(59, 130, 246, 0.2) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(168, 85, 247, 0.2) 0px, transparent 50%);`
    }
  }

  // Background styles
  const getBackgroundStyle = (): React.CSSProperties => {
    const bgType = currentPage.layout.backgroundType || 'color'
    const baseColor = currentPage.layout.canvasBackground || '#f8fafc'

    if (bgType === 'image') {
      return { backgroundColor: baseColor, position: 'relative', overflow: 'hidden' }
    }

    const style: React.CSSProperties = { position: 'relative', overflow: 'hidden' }

    switch (bgType) {
      case 'mesh':
        const gradientCss = getMeshGradient(baseColor)
        const parts = gradientCss.split(';')
        parts.forEach(part => {
          const [key, value] = part.split(':')
          if (key && value) (style as any)[key.trim()] = value.trim()
        })
        return { ...style, backgroundColor: baseColor }
      case 'dots':
        return {
          backgroundColor: baseColor,
          backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
          ...style
        }
      case 'gradient':
        if (currentPage.layout.canvasGradient?.enabled) {
          const { type, colors, angle } = currentPage.layout.canvasGradient
          return {
            background: type === 'linear' ? `linear-gradient(${angle}deg, ${colors.join(', ')})` : `radial-gradient(circle, ${colors.join(', ')})`,
            ...style
          }
        }
        return { backgroundColor: baseColor, ...style }
      default:
        return { backgroundColor: baseColor, ...style }
    }
  }

  // Form card styles
  const getFormCardStyle = (): React.CSSProperties => {
    const layout = currentPage.layout
    let cardStyle: React.CSSProperties = {
      backgroundColor: layout.backgroundColor || '#ffffff',
      borderRadius: `${layout.borderRadius || 12}px`,
      borderWidth: `${layout.borderWidth || 0}px`,
      borderColor: layout.borderColor || '#e2e8f0',
      borderStyle: 'solid',
      color: layout.textColor || '#0f172a',
      transition: 'all 0.2s ease',
      position: 'relative',
      zIndex: 10
    }

    if (layout.glassmorphism?.enabled) {
      cardStyle.backdropFilter = `blur(${layout.glassmorphism.blur}px)`
      cardStyle.backgroundColor = hexToRgba(layout.backgroundColor || '#ffffff', layout.glassmorphism.opacity)
      if (layout.glassmorphism.borderOpacity !== undefined) {
        cardStyle.borderColor = hexToRgba(layout.borderColor || '#e2e8f0', layout.glassmorphism.borderOpacity)
      }
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

  // Split card style
  const getSplitCardStyle = (): React.CSSProperties => {
    const layout = currentPage.layout
    let cardStyle: React.CSSProperties = {
      backgroundColor: layout.backgroundColor || '#ffffff',
      borderRadius: `${layout.borderRadius || 12}px`,
      borderWidth: `${layout.borderWidth || 0}px`,
      borderColor: layout.borderColor || '#e2e8f0',
      borderStyle: 'solid',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: splitLayout?.position === 'left' ? 'row-reverse' : 'row',
      transition: 'all 0.2s ease',
      position: 'relative',
      zIndex: 10
    }

    if (layout.glassmorphism?.enabled) {
      cardStyle.backdropFilter = `blur(${layout.glassmorphism.blur}px)`
      cardStyle.backgroundColor = hexToRgba(layout.backgroundColor || '#ffffff', layout.glassmorphism.opacity)
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

  // Button styling
  const buttonStyle: ButtonStyle = {
    ...defaultButtonStyle,
    ...(currentPage.layout.buttonStyle || {}),
    backgroundColor: currentPage.layout.buttonStyle?.backgroundColor || currentPage.layout.buttonColor || defaultButtonStyle.backgroundColor,
    textColor: currentPage.layout.buttonStyle?.textColor || currentPage.layout.buttonTextColor || defaultButtonStyle.textColor,
  }

  const getButtonCSS = (): React.CSSProperties => {
    let style: React.CSSProperties = {
      backgroundColor: buttonStyle.backgroundColor,
      color: buttonStyle.textColor,
      padding: `${buttonStyle.paddingY}px ${buttonStyle.paddingX}px`,
      fontSize: `${buttonStyle.fontSize}px`,
      fontWeight: buttonStyle.fontWeight === 'black' ? 900 : buttonStyle.fontWeight === 'bold' ? 700 : buttonStyle.fontWeight === 'semibold' ? 600 : buttonStyle.fontWeight === 'medium' ? 500 : 400,
      borderRadius: `${buttonStyle.borderRadius}px`,
      borderWidth: `${buttonStyle.borderWidth}px`,
      borderColor: buttonStyle.borderColor,
      borderStyle: 'solid',
      transition: 'all 0.15s ease',
    }
    if (buttonStyle.shadow?.enabled) {
      const { x, y, blur, spread, color } = buttonStyle.shadow
      style.boxShadow = `${x}px ${y}px ${blur}px ${spread}px ${color}`
    }
    return style
  }

  return (
    <div className="min-h-screen flex items-start justify-center p-4 md:p-6 scroll-smooth relative overflow-hidden" style={getBackgroundStyle()}>
      {/* Background layers */}
      {currentPage.layout.backgroundType === 'image' && (
        <>
          <div className="absolute inset-0 z-0 transition-all duration-300"
            style={{
              backgroundImage: currentPage.layout.backgroundImage ? `url(${currentPage.layout.backgroundImage})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: currentPage.layout.backgroundImageBlur ? `blur(${currentPage.layout.backgroundImageBlur}px)` : 'none',
              transform: 'scale(1.02)'
            }}
          />
          {currentPage.layout.backgroundOverlay?.enabled && (
            <div className="absolute inset-0 z-0 transition-all duration-300 pointer-events-none"
              style={{
                backgroundColor: currentPage.layout.backgroundOverlay.color,
                opacity: currentPage.layout.backgroundOverlay.opacity
              }}
            />
          )}
        </>
      )}

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="h-1 bg-violet-600 transition-all duration-1000 ease-out" style={{ width: `${progress}%` }} />
      </div>

      {/* Form Container */}
      <div className="w-full max-w-[1240px] min-h-[85vh] py-8 flex flex-col items-center relative z-10">
        <div
          className={`transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${isTransitioning ? "opacity-0 scale-95 translate-y-12" : "opacity-100 scale-100 translate-y-0"}`}
          style={isSplitEnabled ? getSplitCardStyle() : getFormCardStyle()}
        >
          {isSubmitted ? (
            <div className="w-full h-full flex items-center justify-center p-8">
              <SubmittedState onBack={goBackToBuilder} onReset={() => {
                setCurrentPageIndex(0)
                setResponses({})
                setIsSubmitted(false)
              }} />
            </div>
          ) : (
            isSplitEnabled && splitLayout ? (
              <>
                <div className="flex-1 flex flex-col" style={{ padding: `${currentPage.layout.padding.top}px ${currentPage.layout.padding.right}px ${currentPage.layout.padding.bottom}px ${currentPage.layout.padding.left}px` }}>
                  <PageHeader page={currentPage} />
                  <FormSections sections={currentPage.sections} responses={responses} updateResponse={updateResponse} handleNext={handleNext} textColor={currentPage.layout.textColor} buttonStyle={buttonStyle} />
                  <NavigationButtons
                    currentPageIndex={currentPageIndex}
                    totalPages={formData.pages.length}
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                    buttonStyle={getButtonCSS()}
                  />
                </div>
                <div className="w-2/5 min-h-[320px] relative overflow-hidden"
                  style={{
                    backgroundImage: `url(${splitLayout.image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: `${splitLayout.focalPoint?.x || 50}% ${splitLayout.focalPoint?.y || 50}%`
                  }}>
                  {splitLayout.overlay?.enabled && (
                    <div className="absolute inset-0" style={{ backgroundColor: splitLayout.overlay.color || '#000', opacity: splitLayout.overlay.opacity || 0.2 }} />
                  )}
                </div>
              </>
            ) : (
              <div className="flex flex-col w-full">
                <PageHeader page={currentPage} />
                <FormSections sections={currentPage.sections} responses={responses} updateResponse={updateResponse} handleNext={handleNext} textColor={currentPage.layout.textColor} buttonStyle={buttonStyle} />
                <NavigationButtons
                  currentPageIndex={currentPageIndex}
                  totalPages={formData.pages.length}
                  onPrevious={handlePrevious}
                  onNext={handleNext}
                  buttonStyle={getButtonCSS()}
                />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}

function PageHeader({ page }: { page: any }) {
  return (
    <div className="text-center mb-6 w-full px-4 py-4">
      <h1 className="text-xl font-bold text-slate-900 mb-1.5 tracking-tight">{page.title}</h1>
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-600 text-[10px] font-semibold uppercase tracking-wider rounded-md">
        <Sparkles className="h-2.5 w-2.5" />{page.type.replace('-', ' ')}
      </span>
    </div>
  )
}

function FormSections({ sections, responses, updateResponse, handleNext, textColor, buttonStyle }: any) {
  return (
    <div className="flex flex-col gap-0 w-full mb-4">
      {sections.map((section: FormSection) => (
        <div key={section.id} style={getSectionStyles(section)} className="w-full">
          {section.elements.map((element: FormElement, idx: number) => (
            <div key={element.id} className="w-full">
              {renderPreviewElement(element, idx, responses, updateResponse, handleNext, textColor, buttonStyle)}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

function NavigationButtons({ currentPageIndex, totalPages, onPrevious, onNext, buttonStyle }: any) {
  return (
    <div className="flex items-center justify-between gap-4 pt-5 mt-5 border-t border-slate-100 px-1">
      <button
        onClick={onPrevious}
        disabled={currentPageIndex === 0}
        className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 opacity-40 disabled:opacity-20"
      >
        <ArrowLeft className="h-3 w-3" /> Back
      </button>
      <button onClick={onNext} style={buttonStyle} className="flex items-center gap-1.5 hover:opacity-90 transition-opacity border-none cursor-pointer">
        {currentPageIndex === totalPages - 1 ? 'Submit' : 'Continue'} <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}

function renderPreviewElement(
  element: FormElement,
  index: number,
  responses: any,
  updateResponse: any,
  onNext: any,
  textColor?: string,
  buttonStyle?: any
) {
  const commonLabel = (
    <div className="mb-2">
      <Label className="text-sm font-medium" style={{ color: textColor }}>
        {element.label}
        {element.required && <span className="text-red-500 ml-1">*</span>}
      </Label>
    </div>
  )

  switch (element.type) {
    case "heading": return <h2 className="text-lg font-bold py-2" style={{ color: textColor }}>{element.label}</h2>
    case "paragraph": return <p className="leading-relaxed text-sm mb-4 opacity-80" style={{ color: textColor }}>{element.label}</p>
    case "image": return (
      <div className={cn("flex w-full mb-6", element.imagePosition === "left" ? "justify-start" : element.imagePosition === "right" ? "justify-end" : "justify-center")}>
        <div className="p-8 bg-slate-50 border-2 border-dashed border-slate-200 rounded-lg text-slate-400">
          <ImageIcon className="h-8 w-8 mx-auto mb-2 opacity-40" />
          <p className="text-[10px] font-semibold uppercase tracking-widest">Image Placement</p>
        </div>
      </div>
    )
    case "start-button":
    case "submit-button": return (
      <button onClick={onNext} style={buttonStyle} className="mt-4 mb-2 hover:opacity-90 transition-opacity border-none cursor-pointer">
        {element.label} <ArrowRight className="ml-2 h-4 w-4 inline" />
      </button>
    )
    case "text":
    case "email":
    case "number": return (
      <div className="space-y-1.5 w-full mb-4">
        {commonLabel}
        <Input
          type={element.type}
          placeholder={element.placeholder || "Answer..."}
          value={responses[element.id] || ""}
          onChange={(e) => updateResponse(element.id, e.target.value)}
          className="h-10 text-sm border-slate-200 bg-white shadow-sm focus-visible:ring-violet-500"
        />
      </div>
    )
    case "textarea": return (
      <div className="space-y-1.5 w-full mb-4">
        {commonLabel}
        <Textarea
          placeholder={element.placeholder || "Type here..."}
          value={responses[element.id] || ""}
          onChange={(e) => updateResponse(element.id, e.target.value)}
          className="min-h-[80px] text-sm border-slate-200 bg-white shadow-sm focus-visible:ring-violet-500"
        />
      </div>
    )
    case "select": return (
      <div className="space-y-1.5 w-full mb-4">
        {commonLabel}
        <Select value={responses[element.id] || ""} onValueChange={(v) => updateResponse(element.id, v)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            {element.options?.map((opt, i) => (
              <SelectItem key={i} value={opt}>{opt}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
    case "radio": return (
      <div className="space-y-3 w-full mb-4">
        {commonLabel}
        <RadioGroup value={responses[element.id] || ""} onValueChange={(v) => updateResponse(element.id, v)} className="grid gap-2">
          {element.options?.map((opt, i) => (
            <div key={i} className={cn("flex items-center space-x-3 p-3 rounded-lg border transition-all cursor-pointer", responses[element.id] === opt ? "bg-violet-50 border-violet-500 ring-1 ring-violet-500" : "bg-white border-slate-200 hover:border-slate-300")}>
              <RadioGroupItem value={opt} id={`${element.id}-${i}`} />
              <Label htmlFor={`${element.id}-${i}`} className="text-sm font-medium flex-1 cursor-pointer text-slate-700">
                {opt}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    )
    case "checkbox": return (
      <div className="space-y-3 w-full mb-4">
        {commonLabel}
        <div className="grid gap-2">
          {element.options?.map((opt, i) => {
            const current = (responses[element.id] || []) as string[]
            const isChecked = current.includes(opt)
            return (
              <div key={i} className={cn("flex items-center space-x-3 p-3 rounded-lg border transition-all cursor-pointer", isChecked ? "bg-violet-50 border-violet-500 ring-1 ring-violet-500" : "bg-white border-slate-200 hover:border-slate-300")}
                onClick={() => {
                  const newVal = isChecked ? current.filter(v => v !== opt) : [...current, opt]
                  updateResponse(element.id, newVal)
                }}
              >
                <Checkbox checked={isChecked} />
                <span className="text-sm font-medium text-slate-700">{opt}</span>
              </div>
            )
          })}
        </div>
      </div>
    )
    case "toggle": return (
      <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg bg-white mb-4">
        <Label className="text-sm font-medium text-slate-700" style={{ color: textColor }}>{element.label}</Label>
        <Switch checked={responses[element.id] || false} onCheckedChange={(v) => updateResponse(element.id, v)} />
      </div>
    )
    case "rating": return (
      <div className="space-y-1.5 w-full mb-4">
        {commonLabel}
        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5].map(star => (
            <button key={star} onClick={() => updateResponse(element.id, star)} className="focus:outline-none transition-transform hover:scale-110 active:scale-95">
              <Star className={cn("h-8 w-8", (responses[element.id] || 0) >= star ? "text-yellow-400 fill-yellow-400" : "text-slate-200")} />
            </button>
          ))}
        </div>
      </div>
    )
    case "file": return (
      <div className="space-y-1.5 w-full mb-4">
        {commonLabel}
        <div className="relative group cursor-pointer">
          <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
          <div className="h-20 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center bg-slate-50 group-hover:bg-slate-100 transition-colors">
            <Upload className="h-5 w-5 text-slate-400 mb-1" />
            <span className="text-xs text-slate-500 font-medium">Click to upload file</span>
          </div>
        </div>
      </div>
    )
    default: return <div className="p-3 bg-amber-50 rounded-lg text-amber-800 text-xs text-center font-semibold">Unsupported: {element.type}</div>
  }
}

function LoadingState() {
  return <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="text-center animate-pulse">
      <div className="h-12 w-12 bg-slate-200 rounded-full mx-auto mb-4" />
      <p className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Loading Preview</p>
    </div>
  </div>
}

function NotFoundState({ onBack }: { onBack: () => void }) {
  return <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
    <div className="bg-white rounded-2xl p-12 shadow-xl max-w-lg text-center border border-slate-100">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">No Preview Data</h1>
      <p className="text-slate-500 mb-6 text-sm">Please return to the builder and try again.</p>
      <Button onClick={onBack} variant="outline" className="gap-2"><Home className="h-4 w-4" /> Back to Builder</Button>
    </div>
  </div>
}

function SubmittedState({ onBack, onReset }: { onBack: () => void, onReset: () => void }) {
  return <div className="text-center max-w-md mx-auto animate-in fade-in zoom-in duration-300">
    <div className="w-16 h-16 bg-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-violet-200">
      <Check className="h-8 w-8 text-white" />
    </div>
    <h1 className="text-2xl font-bold text-slate-900 mb-2">Submitted!</h1>
    <p className="text-slate-500 mb-8">Your response has been recorded. Thank you!</p>
    <div className="flex flex-col gap-3">
      <Button onClick={onBack} className="w-full">Back to Workspace</Button>
      <Button onClick={onReset} variant="ghost" className="w-full">Submit another response</Button>
    </div>
  </div>
}
