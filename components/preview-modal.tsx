"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, ArrowLeft, Check, X } from "lucide-react"
import type { FormData } from "@/types/form"

interface PreviewModalProps {
  formData: FormData
  onClose: () => void
}

export function PreviewModal({ formData, onClose }: PreviewModalProps) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [responses, setResponses] = useState<Record<string, any>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const currentPage = formData.pages[currentPageIndex]
  const progress = ((currentPageIndex + 1) / formData.pages.length) * 100

  const handleNext = () => {
    if (currentPageIndex < formData.pages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1)
    } else {
      setIsSubmitted(true)
    }
  }

  const handlePrevious = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1)
    }
  }

  const updateResponse = (elementId: string, value: any) => {
    setResponses((prev) => ({ ...prev, [elementId]: value }))
  }

  if (isSubmitted) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden p-0 border-0">
          <div className="min-h-[600px] bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-8 relative">
            <Button variant="ghost" size="sm" onClick={onClose} className="absolute top-4 right-4 h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank you!</h1>
              <p className="text-lg text-gray-600 mb-8">Your response has been submitted successfully.</p>
              <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700">
                Close Preview
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden p-0 border-0">
        <div className="min-h-[600px] bg-white flex flex-col">
          {/* Close Button */}
          <Button variant="ghost" size="sm" onClick={onClose} className="absolute top-4 right-4 h-8 w-8 p-0 z-10">
            <X className="h-4 w-4" />
          </Button>

          {/* Progress Bar */}
          <div className="p-4 border-b bg-gray-50">
            <Progress value={progress} className="w-full h-2" />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>
                Step {currentPageIndex + 1} of {formData.pages.length}
              </span>
              <span>{Math.round(progress)}% complete</span>
            </div>
          </div>

          {/* Page Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-8">
              {currentPage.type === "welcome" ? (
                <div className="text-center space-y-6 py-12">
                  {currentPage.elements.map((element) => (
                    <div key={element.id}>
                      {element.type === "heading" && (
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">{element.label}</h1>
                      )}
                      {element.type === "paragraph" && (
                        <p className="text-lg text-gray-600 leading-relaxed max-w-lg mx-auto">{element.label}</p>
                      )}
                    </div>
                  ))}
                  <div className="pt-8">
                    <Button onClick={handleNext} size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-8 py-4">
                  {currentPage.elements.map((element, index) => (
                    <div key={element.id} className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <span className="text-sm font-medium text-gray-500 mt-1 bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center">
                          {index + 1}
                        </span>
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900 mb-3">
                            {element.label}
                            {element.required && <span className="text-red-500 ml-1">*</span>}
                          </h3>

                          {element.placeholder && <p className="text-sm text-gray-600 mb-4">{element.placeholder}</p>}

                          {element.type === "text" && (
                            <Input
                              placeholder="Type your answer here..."
                              value={responses[element.id] || ""}
                              onChange={(e) => updateResponse(element.id, e.target.value)}
                              className="max-w-md border-0 border-b border-gray-300 rounded-none focus:border-blue-500 shadow-none"
                            />
                          )}

                          {element.type === "email" && (
                            <Input
                              type="email"
                              placeholder="name@example.com"
                              value={responses[element.id] || ""}
                              onChange={(e) => updateResponse(element.id, e.target.value)}
                              className="max-w-md border-0 border-b border-gray-300 rounded-none focus:border-blue-500 shadow-none"
                            />
                          )}

                          {element.type === "number" && (
                            <Input
                              type="number"
                              placeholder="Enter a number..."
                              value={responses[element.id] || ""}
                              onChange={(e) => updateResponse(element.id, e.target.value)}
                              className="max-w-md border-0 border-b border-gray-300 rounded-none focus:border-blue-500 shadow-none"
                            />
                          )}

                          {element.type === "textarea" && (
                            <Textarea
                              placeholder="Type your answer here..."
                              value={responses[element.id] || ""}
                              onChange={(e) => updateResponse(element.id, e.target.value)}
                              className="max-w-md min-h-24 border border-gray-300 rounded-md"
                            />
                          )}

                          {element.type === "radio" && (
                            <RadioGroup
                              value={responses[element.id] || ""}
                              onValueChange={(value) => updateResponse(element.id, value)}
                              className="space-y-3"
                            >
                              {element.options?.map((option, idx) => (
                                <div key={idx} className="flex items-center space-x-3">
                                  <RadioGroupItem value={option} id={`${element.id}-${idx}`} />
                                  <Label htmlFor={`${element.id}-${idx}`} className="text-sm font-normal">
                                    {option}
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          )}

                          {element.type === "checkbox" && (
                            <div className="space-y-3">
                              {element.options?.map((option, idx) => (
                                <div key={idx} className="flex items-center space-x-3">
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
                                  />
                                  <Label htmlFor={`${element.id}-${idx}`} className="text-sm font-normal">
                                    {option}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          )}

                          {element.type === "date" && (
                            <Input
                              type="date"
                              value={responses[element.id] || ""}
                              onChange={(e) => updateResponse(element.id, e.target.value)}
                              className="max-w-md border border-gray-300 rounded-md"
                            />
                          )}

                          {element.type === "file" && (
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors max-w-md">
                              <div className="text-gray-600">
                                <p className="mb-2">Drop files here or click to browse</p>
                                <p className="text-xs text-gray-400">Supports: JPG, PNG, PDF (max 10MB)</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="border-t p-4 flex justify-between bg-gray-50">
            <Button variant="outline" onClick={handlePrevious} disabled={currentPageIndex === 0} className="bg-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">
              {currentPageIndex === formData.pages.length - 1 ? "Submit" : "Next"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
