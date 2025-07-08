"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, ArrowLeft, Check, Sparkles } from "lucide-react"
import type { FormData } from "@/types/form"

// Mock form data - in a real app, this would be fetched based on the ID
const mockFormData: FormData = {
  id: "sample-form",
  title: "Customer Feedback Survey",
  description: "Help us improve our services",
  pages: [
    {
      id: "welcome",
      title: "Welcome",
      type: "welcome",
      elements: [
        {
          id: "heading-1",
          type: "heading",
          label: "Welcome to our Customer Feedback Survey",
          required: false,
        },
        {
          id: "paragraph-1",
          type: "paragraph",
          label:
            "Your feedback is valuable to us and will help improve our services. This survey will take approximately 3-5 minutes to complete.",
          required: false,
        },
        {
          id: "start-button-1",
          type: "start-button",
          label: "Get Started",
          required: false,
        },
      ],
    },
    {
      id: "personal-info",
      title: "Personal Information",
      type: "form",
      elements: [
        {
          id: "name",
          type: "text",
          label: "What's your name?",
          placeholder: "Enter your full name",
          required: true,
        },
        {
          id: "email",
          type: "email",
          label: "What's your email address?",
          placeholder: "name@example.com",
          required: true,
        },
      ],
    },
    {
      id: "feedback",
      title: "Your Feedback",
      type: "form",
      elements: [
        {
          id: "rating",
          type: "radio",
          label: "How would you rate our service?",
          required: true,
          options: ["Excellent", "Good", "Average", "Poor", "Very Poor"],
        },
        {
          id: "feedback-text",
          type: "textarea",
          label: "Please share your detailed feedback",
          placeholder: "Tell us about your experience...",
          required: false,
        },
      ],
    },
  ],
  settings: {
    theme: "modern",
    headerStyle: "gradient",
    showLogo: true,
    backgroundColor: "#ffffff",
    textColor: "#1f2937",
  },
}

export default function PublicFormPage({ params }: { params: { id: string } }) {
  const [formData, setFormData] = useState<FormData | null>(null)
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [responses, setResponses] = useState<Record<string, any>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    // Simulate loading form data based on ID
    const loadFormData = async () => {
      try {
        // In a real app, you would fetch the form data from your API
        // const response = await fetch(`/api/forms/${params.id}`)
        // const data = await response.json()

        // For now, we'll use mock data
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate loading
        setFormData(mockFormData)
      } catch (error) {
        console.error("Error loading form:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadFormData()
  }, [params.id])

  const handleNext = useCallback(() => {
    if (!formData?.pages) return

    setIsTransitioning(true)
    setTimeout(() => {
      if (currentPageIndex < formData.pages.length - 1) {
        setCurrentPageIndex(currentPageIndex + 1)
      } else {
        // Submit form data
        submitFormData()
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

  const submitFormData = async () => {
    try {
      // In a real app, you would submit the data to your API
      // await fetch(`/api/forms/${params.id}/submit`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ responses, formId: params.id })
      // })

      console.log("Submitting form data:", { responses, formId: params.id })
      setIsSubmitted(true)
    } catch (error) {
      console.error("Error submitting form:", error)
    }
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Sparkles className="h-8 w-8 text-white animate-pulse" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Form</h2>
          <p className="text-gray-600">Please wait while we prepare your form...</p>
        </div>
      </div>
    )
  }

  if (!formData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Form Not Found</h1>
          <p className="text-gray-600 mb-6">The form you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => (window.location.href = "/")} variant="outline">
            Go to Homepage
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
        <div className="text-center max-w-md mx-auto p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Check className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank you!</h1>
          <p className="text-lg text-gray-600 mb-8">
            Your response has been submitted successfully. We appreciate your feedback!
          </p>
          <Button onClick={() => (window.location.href = "/")} className="bg-blue-600 hover:bg-blue-700">
            Visit Our Website
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-gray-900">{formData.title}</h1>
                <p className="text-sm text-gray-600">{formData.description}</p>
              </div>
            </div>

            {formData.pages.length > 1 && (
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-500">
                  {currentPageIndex + 1} of {formData.pages.length}
                </div>
                <div className="w-32">
                  <Progress value={progress} className="h-2" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-6 py-8">
        <div className="w-full max-w-2xl mx-auto">
          <div
            className={`transition-all duration-300 ease-in-out ${isTransitioning ? "opacity-0 transform translate-y-4" : "opacity-100 transform translate-y-0"}`}
          >
            {currentPage.type === "welcome" ? (
              <div className="text-center space-y-8 py-16 bg-white/60 backdrop-blur-lg rounded-3xl border border-white/30 shadow-2xl">
                {currentPage.elements.map((element, index) => (
                  <div key={element.id} className="animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                    {element.type === "heading" && (
                      <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                        {element.label}
                      </h1>
                    )}
                    {element.type === "paragraph" && (
                      <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8">{element.label}</p>
                    )}
                    {element.type === "start-button" && (
                      <div className="pt-8">
                        <Button
                          onClick={handleNext}
                          size="lg"
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-12 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg"
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
              <div className="space-y-12 py-8 bg-white/60 backdrop-blur-lg rounded-3xl border border-white/30 shadow-2xl p-8">
                {currentPage.elements.map((element, index) => (
                  <div key={element.id} className="animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
                    {(element.type === "text" || element.type === "email" || element.type === "number") && (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-lg font-medium text-blue-600 bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center text-sm">
                            {index + 1}
                          </span>
                          <h3 className="text-xl font-semibold text-gray-900">
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
                    )}

                    {element.type === "textarea" && (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-lg font-medium text-blue-600 bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center text-sm">
                            {index + 1}
                          </span>
                          <h3 className="text-xl font-semibold text-gray-900">
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
                    )}

                    {element.type === "radio" && (
                      <div className="space-y-6">
                        <div className="flex items-center space-x-3">
                          <span className="text-lg font-medium text-blue-600 bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center text-sm">
                            {index + 1}
                          </span>
                          <h3 className="text-xl font-semibold text-gray-900">
                            {element.label}
                            {element.required && <span className="text-red-500 ml-2">*</span>}
                          </h3>
                        </div>
                        <div className="ml-11">
                          <RadioGroup
                            value={responses[element.id] || ""}
                            onValueChange={(value) => updateResponse(element.id, value)}
                            className="space-y-3"
                          >
                            {element.options?.map((option, idx) => (
                              <div
                                key={idx}
                                className="flex items-center space-x-4 p-4 rounded-lg hover:bg-blue-50/50 transition-colors cursor-pointer border border-gray-200/50"
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
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      {currentPage.type !== "welcome" && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-gray-200/50">
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

              <div className="text-sm text-gray-500">
                Press <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Enter</kbd> to continue
              </div>

              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-2"
              >
                {currentPageIndex === formData.pages.length - 1 ? "Submit" : "Next"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

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
