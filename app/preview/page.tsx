"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, ArrowLeft, Check, ImageIcon, Home, ArrowUp } from "lucide-react"
import type { FormData, FormElement, FormSection } from "@/types/form"
import { cn } from "@/lib/utils"
import { getSectionStyles, getCanvasStyles, getCardStyles } from "@/lib/styling"

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
    window.location.href = "/builder"
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

  const canvasStyles = getCanvasStyles(currentPage.layout)
  const cardStyles = getCardStyles(currentPage.layout)

  if (isSubmitted) return <SubmittedState onBack={goBackToBuilder} onReset={() => {
    setCurrentPageIndex(0)
    setResponses({})
    setIsSubmitted(false)
  }} />

  return (
    <div className="min-h-screen transition-all duration-500 overflow-x-hidden" style={canvasStyles}>
      {/* Dynamic Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/40 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button onClick={goBackToBuilder} variant="ghost" size="sm" className="font-bold text-slate-900/60 hover:text-slate-900 hover:bg-white/50 rounded-xl">
            <Home className="h-4 w-4 mr-2" /> Workspace
          </Button>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 opactiy-60">Completion</span>
              <span className="text-sm font-black text-slate-900">{Math.round(progress)}%</span>
            </div>
            <div className="w-24 h-2 bg-slate-200/50 rounded-full overflow-hidden border border-white/20 shadow-inner">
              <div className="h-full bg-violet-600 transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(139,92,246,0.5)]" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="pt-32 pb-40 px-6 flex justify-center items-start">
        <div
          className={`w-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${isTransitioning ? "opacity-0 scale-95 translate-y-12" : "opacity-100 scale-100 translate-y-0"}`}
          style={cardStyles}
        >
          {/* Integrated Header */}
          <div className="text-center mb-16 px-4">
            <span className="inline-block px-4 py-1.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-6 shadow-2xl">
              {currentPage.type.replace('-', ' ')}
            </span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4" style={{ color: currentPage.layout.textColor }}>
              {currentPage.title}
            </h1>
            <div className="h-1.5 w-16 bg-violet-600 mx-auto rounded-full shadow-[0_0_20px_rgba(139,92,246,0.5)]" />
          </div>

          {/* Form Sections */}
          <div className="flex flex-col gap-0 w-full mb-16">
            {currentPage.sections.map((section) => (
              <div key={section.id} style={getSectionStyles(section)} className="relative group">
                {section.elements.map((element, idx) => (
                  <div key={element.id} className="w-full">
                    {renderPreviewElement(
                      element,
                      idx,
                      responses,
                      updateResponse,
                      handleNext,
                      currentPage.layout.textColor,
                      currentPage.layout.buttonColor,
                      currentPage.layout.buttonTextColor
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Integrated Navigation - Now part of the card design! */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-12 border-t border-slate-100/50">
            <Button
              variant="ghost"
              onClick={handlePrevious}
              disabled={currentPageIndex === 0}
              className="font-black text-slate-400 hover:text-slate-900 h-14 px-8 rounded-2xl hover:bg-slate-50 disabled:opacity-30 uppercase tracking-widest text-[11px]"
            >
              <ArrowLeft className="mr-3 h-4 w-4" /> Previous Step
            </Button>

            <Button
              onClick={handleNext}
              style={{ backgroundColor: currentPage.layout.buttonColor, color: currentPage.layout.buttonTextColor }}
              className="hover:opacity-90 font-black h-16 px-12 rounded-[2rem] shadow-2xl transition-all transform hover:scale-105 active:scale-95 group w-full sm:w-auto text-lg border-none"
            >
              {currentPageIndex === formData.pages.length - 1 ? "Submit Form" : "Continue"}
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function renderPreviewElement(
  element: FormElement,
  index: number,
  responses: any,
  updateResponse: any,
  onNext: any,
  globalTextColor?: string,
  buttonColor?: string,
  buttonTextColor?: string
) {
  const commonLabel = (
    <div className="flex items-baseline gap-4 mb-6">
      <div className="flex-shrink-0 w-10 h-10 bg-slate-900 text-white rounded-2xl flex items-center justify-center text-sm font-black shadow-xl shadow-slate-200">
        {index + 1}
      </div>
      <Label className="text-2xl font-black tracking-tight leading-tight flex-1" style={{ color: globalTextColor }}>
        {element.label}
        {element.required && <span className="text-red-500 ml-2 animate-pulse">*</span>}
      </Label>
    </div>
  )

  switch (element.type) {
    case "heading": return <h2 className="text-3xl font-black tracking-tight py-6" style={{ color: globalTextColor }}>{element.label}</h2>
    case "paragraph": return <p className="leading-relaxed text-lg mb-6 opacity-80" style={{ color: globalTextColor }}>{element.label}</p>
    case "image": return (
      <div className={cn("flex w-full mb-8", element.imagePosition === "left" ? "justify-start" : element.imagePosition === "right" ? "justify-end" : "justify-center")}>
        <div className="p-16 bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-[2.5rem] text-slate-400 group-hover:border-violet-300 transition-colors">
          <ImageIcon className="h-16 w-16 mx-auto mb-4 opacity-40" />
          <p className="text-[10px] font-black uppercase tracking-widest">Image Placement</p>
        </div>
      </div>
    )
    case "start-button":
    case "submit-button": return (
      <Button
        onClick={onNext}
        style={{ backgroundColor: buttonColor, color: buttonTextColor }}
        className="h-16 px-12 text-xl font-black rounded-2xl shadow-2xl transition-all hover:scale-105 active:scale-95 mt-8 w-full md:w-auto hover:opacity-90 border-none"
      >
        {element.label} <ArrowRight className="ml-3 h-6 w-6" />
      </Button>
    )
    case "text":
    case "email":
    case "number": return (
      <div className="space-y-4 w-full mb-8">
        {commonLabel}
        <Input
          type={element.type}
          placeholder={element.placeholder || "Enter your response..."}
          value={responses[element.id] || ""}
          onChange={(e) => updateResponse(element.id, e.target.value)}
          className="h-16 text-xl border-2 border-slate-100 bg-slate-50/30 rounded-2xl focus:border-violet-500 focus:bg-white transition-all shadow-none px-6"
        />
      </div>
    )
    case "textarea": return (
      <div className="space-y-4 w-full mb-8">
        {commonLabel}
        <Textarea
          placeholder={element.placeholder || "Type your message here..."}
          value={responses[element.id] || ""}
          onChange={(e) => updateResponse(element.id, e.target.value)}
          className="min-h-[180px] text-xl border-2 border-slate-100 bg-slate-50/30 rounded-2xl focus:border-violet-500 focus:bg-white transition-all shadow-none py-6 px-6"
        />
      </div>
    )
    case "radio": return (
      <div className="space-y-6 w-full mb-8">
        {commonLabel}
        <RadioGroup value={responses[element.id] || ""} onValueChange={(v) => updateResponse(element.id, v)} className="grid gap-4">
          {element.options?.map((opt, i) => (
            <div key={i} className={cn("flex items-center space-x-5 p-6 rounded-[1.5rem] border-2 transition-all cursor-pointer group/opt", responses[element.id] === opt ? "bg-violet-600 border-violet-600 shadow-xl" : "bg-white border-slate-100 hover:border-violet-200")}>
              <RadioGroupItem value={opt} id={`${element.id}-${i}`} className={responses[element.id] === opt ? "border-white bg-white" : ""} />
              <Label
                htmlFor={`${element.id}-${i}`}
                className={cn("text-lg font-black flex-1 cursor-pointer transition-colors", responses[element.id] === opt ? "text-white" : "text-slate-700")}
              >
                {opt}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    )
    default: return <div className="p-4 bg-amber-50 rounded-xl text-amber-800 text-xs text-center font-bold">Unsupported element: {element.type}</div>
  }
}

function LoadingState() {
  return <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="text-center animate-pulse">
      <div className="h-12 w-12 bg-slate-200 rounded-full mx-auto mb-4" />
      <p className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Preparing Preview</p>
    </div>
  </div>
}

function NotFoundState({ onBack }: { onBack: () => void }) {
  return <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
    <div className="bg-white rounded-[2.5rem] p-12 shadow-2xl max-w-lg text-center border border-slate-100">
      <h1 className="text-4xl font-black text-slate-900 mb-4">Oops!</h1>
      <p className="text-slate-500 mb-8 font-medium">We couldn't find your form preview data. Please go back and try again.</p>
      <Button onClick={onBack} variant="outline" className="h-12 px-8 rounded-xl font-bold border-2"><Home className="mr-2 h-4 w-4" /> Builder</Button>
    </div>
  </div>
}

function SubmittedState({ onBack, onReset }: { onBack: () => void, onReset: () => void }) {
  return <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 text-white text-center">
    <div className="max-w-md animate-in fade-in zoom-in duration-500">
      <div className="w-24 h-24 bg-violet-600 rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-violet-500/50">
        <Check className="h-12 w-12 text-white" />
      </div>
      <h1 className="text-5xl font-black mb-6 tracking-tight">Sent!</h1>
      <p className="text-slate-400 text-xl mb-12 font-medium">Your response has been recorded accurately. Thank you for your time.</p>
      <div className="flex flex-col gap-4">
        <Button onClick={onBack} className="bg-white text-slate-900 hover:bg-violet-600 hover:text-white h-14 rounded-2xl text-lg font-black transition-all">Back to Workspace</Button>
        <Button onClick={onReset} variant="ghost" className="text-slate-500 font-bold hover:text-white">Submit another response</Button>
      </div>
    </div>
  </div>
}
