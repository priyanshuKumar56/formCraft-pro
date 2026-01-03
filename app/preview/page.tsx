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
import { getSectionStyles } from "@/lib/styling"

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
    }, 300)
  }, [currentPageIndex, formData])

  const handlePrevious = useCallback(() => {
    setIsTransitioning(true)
    setTimeout(() => {
      if (currentPageIndex > 0) {
        setCurrentPageIndex(currentPageIndex - 1)
      }
      setIsTransitioning(false)
    }, 300)
  }, [currentPageIndex])

  const updateResponse = (elementId: string, value: any) => {
    setResponses((prev) => ({ ...prev, [elementId]: value }))
  }

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !isTransitioning) {
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

  if (isSubmitted) return <SubmittedState onBack={goBackToBuilder} onReset={() => {
    setCurrentPageIndex(0)
    setResponses({})
    setIsSubmitted(false)
  }} />

  return (
    <div className="min-h-screen transition-colors duration-500" style={{ backgroundColor: formData.settings.backgroundColor }}>
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button onClick={goBackToBuilder} variant="ghost" size="sm" className="font-medium text-slate-600 hover:text-slate-900">
            <Home className="h-4 w-4 mr-2" /> Back to Builder
          </Button>
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-slate-500">{currentPageIndex + 1} / {formData.pages.length}</span>
            <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-violet-600 transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-32 pb-40 px-6">
        <div className={`max-w-4xl mx-auto transition-all duration-500 ease-in-out ${isTransitioning ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"}`}>

          {/* Page Heading (if present) */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">{currentPage.title}</h1>
            <div className="h-1 w-12 bg-violet-600 mx-auto rounded-full" />
          </div>

          <div className="space-y-10">
            {currentPage.sections.map((section) => (
              <div key={section.id} style={getSectionStyles(section)} className="shadow-sm">
                {section.elements.map((element, idx) => (
                  <div key={element.id} className="w-full">
                    {renderPreviewElement(element, idx, responses, updateResponse, handleNext)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-200/60 p-6 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button variant="ghost" onClick={handlePrevious} disabled={currentPageIndex === 0} className="font-bold text-slate-600">
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <Button onClick={handleNext} className="bg-slate-900 hover:bg-violet-600 text-white font-bold h-12 px-8 rounded-xl shadow-lg transition-all transform hover:scale-105">
            {currentPageIndex === formData.pages.length - 1 ? "Submit Form" : "Next Step"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function renderPreviewElement(element: FormElement, index: number, responses: any, updateResponse: any, onNext: any) {
  const commonLabel = (
    <div className="flex items-baseline gap-3 mb-4">
      <span className="text-[10px] font-black uppercase tracking-widest text-violet-500 opactiy-50">{index + 1}</span>
      <Label className="text-xl font-bold text-slate-900 flex-1">
        {element.label}
        {element.required && <span className="text-red-500 ml-1">*</span>}
      </Label>
    </div>
  )

  switch (element.type) {
    case "heading": return <h2 className="text-3xl font-black text-slate-900 tracking-tight py-4">{element.label}</h2>
    case "paragraph": return <p className="text-slate-600 leading-relaxed text-lg mb-4">{element.label}</p>
    case "image": return (
      <div className={cn("flex w-full mb-6", element.imagePosition === "left" ? "justify-start" : element.imagePosition === "right" ? "justify-end" : "justify-center")}>
        <div className="p-12 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400">
          <ImageIcon className="h-16 w-16 mx-auto mb-2" />
          <p className="text-xs font-bold uppercase">Image Placeholder</p>
        </div>
      </div>
    )
    case "start-button":
    case "submit-button": return (
      <Button onClick={onNext} className="h-14 px-10 text-lg font-black bg-violet-600 hover:bg-violet-700 text-white rounded-2xl shadow-xl transition-all hover:scale-105 mt-6 w-full md:w-auto">
        {element.label} <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    )
    case "text":
    case "email":
    case "number": return (
      <div className="space-y-2 w-full">
        {commonLabel}
        <Input
          type={element.type}
          placeholder={element.placeholder || "Your answer..."}
          value={responses[element.id] || ""}
          onChange={(e) => updateResponse(element.id, e.target.value)}
          className="h-14 text-lg border-2 border-slate-100 bg-slate-50/50 rounded-2xl focus:border-violet-500 focus:bg-white transition-all shadow-none"
        />
      </div>
    )
    case "textarea": return (
      <div className="space-y-2 w-full">
        {commonLabel}
        <Textarea
          placeholder={element.placeholder || "Your detailed answer..."}
          value={responses[element.id] || ""}
          onChange={(e) => updateResponse(element.id, e.target.value)}
          className="min-h-[140px] text-lg border-2 border-slate-100 bg-slate-50/50 rounded-2xl focus:border-violet-500 focus:bg-white transition-all shadow-none py-4"
        />
      </div>
    )
    case "radio": return (
      <div className="space-y-4 w-full">
        {commonLabel}
        <RadioGroup value={responses[element.id] || ""} onValueChange={(v) => updateResponse(element.id, v)} className="grid gap-3">
          {element.options?.map((opt, i) => (
            <div key={i} className={cn("flex items-center space-x-4 p-4 rounded-2xl border-2 transition-all cursor-pointer", responses[element.id] === opt ? "bg-violet-50 border-violet-500 shadow-sm" : "bg-white border-slate-100 hover:border-slate-200")}>
              <RadioGroupItem value={opt} id={`${element.id}-${i}`} />
              <Label htmlFor={`${element.id}-${i}`} className="text-base font-bold text-slate-700 flex-1 cursor-pointer">{opt}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    )
    default: return <div className="p-4 bg-amber-50 rounded-xl text-amber-800 text-xs">Unsupported element type: {element.type}</div>
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
