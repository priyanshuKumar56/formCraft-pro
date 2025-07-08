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
import type { FormData } from "@/types/form"
import { cn } from "@/lib/utils"

export default function PreviewPage() {
  const [formData, setFormData] = useState<FormData | null>(null)
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [responses, setResponses] = useState<Record<string, any>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    // Get form data from sessionStorage
    const storedData = sessionStorage.getItem("formcraft-preview-data")
    if (storedData) {
      try {
        const data = JSON.parse(storedData)
        console.log("Loaded form data:", data)
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

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey && !isTransitioning) {
        e.preventDefault()
        handleNext()
      }
    },
    [handleNext, isTransitioning],
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [handleKeyPress])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading form preview...</p>
        </div>
      </div>
    )
  }

  if (!formData || !formData.pages || formData.pages.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Form Not Found</h1>
          <p className="text-gray-600 mb-6">The form preview data could not be loaded or is invalid.</p>
          <Button onClick={goBackToBuilder} variant="outline">
            <Home className="h-4 w-4 mr-2" />
            Back to Builder
          </Button>
        </div>
      </div>
    )
  }

  const currentPage = formData.pages[currentPageIndex]
  const progress = ((currentPageIndex + 1) / formData.pages.length) * 100

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div
          className={`text-center max-w-md mx-auto p-8 transition-all duration-500 ${isTransitioning ? "opacity-0 transform translate-y-4" : "opacity-100 transform translate-y-0"}`}
        >
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Check className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank you!</h1>
          <p className="text-lg text-gray-600 mb-8">Your response has been submitted successfully.</p>
          <div className="space-y-3">
            <Button onClick={goBackToBuilder} className="w-full bg-blue-600 hover:bg-blue-700">
              <Home className="h-4 w-4 mr-2" />
              Back to Builder
            </Button>
            <Button
              onClick={() => {
                setCurrentPageIndex(0)
                setResponses({})
                setIsSubmitted(false)
              }}
              variant="outline"
              className="w-full"
            >
              Start Over
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (!currentPage) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-gray-600 mb-6">The current page could not be loaded.</p>
          <Button onClick={goBackToBuilder} variant="outline">
            <Home className="h-4 w-4 mr-2" />
            Back to Builder
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button onClick={goBackToBuilder} variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
              <Home className="h-4 w-4 mr-2" />
              Back to Builder
            </Button>

            {formData.pages.length > 1 && (
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-500">
                  {currentPageIndex + 1} of {formData.pages.length}
                </div>
                <div className="w-32">
                  <Progress value={progress} className="h-1" />
                </div>
              </div>
            )}

            <div className="text-sm text-gray-500">
              Press <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Enter</kbd> to continue
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-2xl mx-auto">
          <div
            className={`transition-all duration-300 ease-in-out ${isTransitioning ? "opacity-0 transform translate-y-4" : "opacity-100 transform translate-y-0"}`}
          >
            {currentPage.type === "welcome" ? (
              <div className="text-center space-y-8 py-16">
                {currentPage.elements.map((element, index) => (
                  <div key={element.id} className="animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                    {element.type === "heading" && (
                      <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                        {element.label}
                      </h1>
                    )}
                    {element.type === "paragraph" && (
                      <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8">{element.label}</p>
                    )}
                    {element.type === "image" && (
                      <div
                        className={cn(
                          "flex mb-8",
                          element.imagePosition === "left" && "justify-start",
                          element.imagePosition === "center" && "justify-center",
                          element.imagePosition === "right" && "justify-end",
                        )}
                      >
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 bg-gray-50">
                          <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500">Image placeholder</p>
                        </div>
                      </div>
                    )}
                    {element.type === "start-button" && (
                      <div className="pt-8">
                        <Button
                          onClick={handleNext}
                          size="lg"
                          className="bg-blue-600 hover:bg-blue-700 px-12 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-200"
                        >
                          {element.label}
                          <ArrowRight className="ml-3 h-5 w-5" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-16 py-8">
                {currentPage.elements.map((element, index) => (
                  <div key={element.id} className="animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
                    {element.type === "heading" && (
                      <h2 className="text-4xl font-bold text-gray-900 mb-4">{element.label}</h2>
                    )}

                    {element.type === "paragraph" && (
                      <p className="text-lg text-gray-600 leading-relaxed mb-8">{element.label}</p>
                    )}

                    {(element.type === "text" || element.type === "email" || element.type === "number") && (
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <span className="text-lg font-medium text-blue-600 bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center text-sm">
                              {index + 1}
                            </span>
                            <h3 className="text-2xl font-semibold text-gray-900">
                              {element.label}
                              {element.required && <span className="text-red-500 ml-2">*</span>}
                            </h3>
                          </div>
                          {element.placeholder && <p className="text-gray-600 ml-11">{element.placeholder}</p>}
                          <div className="ml-11">
                            <Input
                              type={element.type}
                              placeholder="Type your answer here..."
                              value={responses[element.id] || ""}
                              onChange={(e) => updateResponse(element.id, e.target.value)}
                              className="text-lg p-4 border-0 border-b-2 border-gray-200 rounded-none focus:border-blue-500 focus:ring-0 bg-transparent"
                              autoFocus={index === 0}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {element.type === "textarea" && (
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <span className="text-lg font-medium text-blue-600 bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center text-sm">
                              {index + 1}
                            </span>
                            <h3 className="text-2xl font-semibold text-gray-900">
                              {element.label}
                              {element.required && <span className="text-red-500 ml-2">*</span>}
                            </h3>
                          </div>
                          {element.placeholder && <p className="text-gray-600 ml-11">{element.placeholder}</p>}
                          <div className="ml-11">
                            <Textarea
                              placeholder="Type your answer here..."
                              value={responses[element.id] || ""}
                              onChange={(e) => updateResponse(element.id, e.target.value)}
                              className="text-lg p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-0 min-h-32 resize-none"
                              autoFocus={index === 0}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {element.type === "radio" && (
                      <div className="space-y-6">
                        <div className="space-y-6">
                          <div className="flex items-center space-x-3">
                            <span className="text-lg font-medium text-blue-600 bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center text-sm">
                              {index + 1}
                            </span>
                            <h3 className="text-2xl font-semibold text-gray-900">
                              {element.label}
                              {element.required && <span className="text-red-500 ml-2">*</span>}
                            </h3>
                          </div>
                          <div className="ml-11">
                            <RadioGroup
                              value={responses[element.id] || ""}
                              onValueChange={(value) => updateResponse(element.id, value)}
                              className="space-y-4"
                            >
                              {element.options?.map((option, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                  <RadioGroupItem value={option} id={`${element.id}-${idx}`} className="w-5 h-5" />
                                  <Label
                                    htmlFor={`${element.id}-${idx}`}
                                    className="text-lg font-normal cursor-pointer flex-1"
                                  >
                                    {option}
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </div>
                        </div>
                      </div>
                    )}

                    {element.type === "checkbox" && (
                      <div className="space-y-6">
                        <div className="space-y-6">
                          <div className="flex items-center space-x-3">
                            <span className="text-lg font-medium text-blue-600 bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center text-sm">
                              {index + 1}
                            </span>
                            <h3 className="text-2xl font-semibold text-gray-900">
                              {element.label}
                              {element.required && <span className="text-red-500 ml-2">*</span>}
                            </h3>
                          </div>
                          <div className="ml-11">
                            <div className="space-y-4">
                              {element.options?.map((option, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                  <Checkbox
                                    id={`${element.id}-${idx}`}
                                    checked={(responses[element.id] || []).includes(option)}
                                    onCheckedChange={(checked) => {
                                      const current = responses[element.id] || []
                                      if (checked) {
                                        updateResponse(element.id, [...current, option])
                                      } else {
                                        updateResponse(
                                          element.id,
                                          current.filter((item: string) => item !== option),
                                        )
                                      }
                                    }}
                                    className="w-5 h-5"
                                  />
                                  <Label
                                    htmlFor={`${element.id}-${idx}`}
                                    className="text-lg font-normal cursor-pointer flex-1"
                                  >
                                    {option}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {element.type === "date" && (
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <span className="text-lg font-medium text-blue-600 bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center text-sm">
                              {index + 1}
                            </span>
                            <h3 className="text-2xl font-semibold text-gray-900">
                              {element.label}
                              {element.required && <span className="text-red-500 ml-2">*</span>}
                            </h3>
                          </div>
                          <div className="ml-11">
                            <Input
                              type="date"
                              value={responses[element.id] || ""}
                              onChange={(e) => updateResponse(element.id, e.target.value)}
                              className="text-lg p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-0 max-w-xs"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {element.type === "file" && (
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <span className="text-lg font-medium text-blue-600 bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center text-sm">
                              {index + 1}
                            </span>
                            <h3 className="text-2xl font-semibold text-gray-900">
                              {element.label}
                              {element.required && <span className="text-red-500 ml-2">*</span>}
                            </h3>
                          </div>
                          <div className="ml-11">
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors bg-gray-50 max-w-md">
                              <div className="text-gray-600">
                                <p className="text-lg mb-2">Drop files here or click to browse</p>
                                <p className="text-sm text-gray-400">Supports: JPG, PNG, PDF (max 10MB)</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fixed Navigation */}
      {currentPage.type !== "welcome" && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <Button
                variant="ghost"
                onClick={handlePrevious}
                disabled={currentPageIndex === 0}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>

              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-500">
                  Press <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Enter</kbd> to continue
                </div>
                <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 px-6 py-2">
                  {currentPageIndex === formData.pages.length - 1 ? "Submit" : "Next"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scroll to top hint */}
      <div className="fixed bottom-20 right-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-white/90 backdrop-blur-sm shadow-lg"
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
        
        kbd {
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
        }
      `}</style>
    </div>
  )
}
