"use client"

import { useState } from "react"
import type { FormElement as FormElementType } from "@/types/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Trash2, Copy, CalendarIcon, Upload, Plus, X, ImageIcon, ArrowRight, AlignLeft, AlignRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface FormElementProps {
  element: FormElementType
  index: number
  isSelected: boolean
  onSelect: () => void
  onUpdate: (updates: Partial<FormElementType>) => void
  onDelete: () => void
  pageType?: string
}

export function FormElement({
  element,
  index,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
  pageType = "form",
}: FormElementProps) {
  const [isEditingLabel, setIsEditingLabel] = useState(false)
  const [tempLabel, setTempLabel] = useState(element.label)

  const handleLabelSave = () => {
    onUpdate({ label: tempLabel })
    setIsEditingLabel(false)
  }

  const addOption = () => {
    const newOptions = [...(element.options || []), `Option ${(element.options?.length || 0) + 1}`]
    onUpdate({ options: newOptions })
  }

  const updateOption = (index: number, value: string) => {
    const newOptions = [...(element.options || [])]
    newOptions[index] = value
    onUpdate({ options: newOptions })
  }

  const removeOption = (index: number) => {
    const newOptions = element.options?.filter((_, i) => i !== index) || []
    onUpdate({ options: newOptions })
  }

  const renderFormField = () => {
    if (pageType === "welcome") {
      switch (element.type) {
        case "heading":
          return (
            <div className="text-center">
              {isEditingLabel ? (
                <Input
                  value={tempLabel}
                  onChange={(e) => setTempLabel(e.target.value)}
                  onBlur={handleLabelSave}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleLabelSave()
                    if (e.key === "Escape") {
                      setTempLabel(element.label)
                      setIsEditingLabel(false)
                    }
                  }}
                  className="text-4xl font-bold text-center border-none shadow-none text-gray-900 bg-transparent"
                  autoFocus
                />
              ) : (
                <h1
                  className="text-4xl font-bold text-gray-900 cursor-pointer hover:bg-gray-50 p-2 rounded"
                  onClick={() => setIsEditingLabel(true)}
                >
                  {element.label}
                </h1>
              )}
            </div>
          )

        case "paragraph":
          return (
            <div className="text-center">
              {isEditingLabel ? (
                <Textarea
                  value={tempLabel}
                  onChange={(e) => setTempLabel(e.target.value)}
                  onBlur={handleLabelSave}
                  className="text-lg text-center border-none shadow-none text-gray-600 bg-transparent resize-none"
                  autoFocus
                />
              ) : (
                <p
                  className="text-lg text-gray-600 cursor-pointer hover:bg-gray-50 p-2 rounded"
                  onClick={() => setIsEditingLabel(true)}
                >
                  {element.label}
                </p>
              )}
            </div>
          )

        case "image":
          return (
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <Button
                  variant={element.imagePosition === "left" ? "default" : "outline"}
                  size="sm"
                  onClick={() => onUpdate({ imagePosition: "left" })}
                  className="text-xs"
                >
                  <AlignLeft className="h-3 w-3 mr-1" />
                  Left
                </Button>
                <Button
                  variant={element.imagePosition === "center" ? "default" : "outline"}
                  size="sm"
                  onClick={() => onUpdate({ imagePosition: "center" })}
                  className="text-xs"
                >
                  Center
                </Button>
                <Button
                  variant={element.imagePosition === "right" ? "default" : "outline"}
                  size="sm"
                  onClick={() => onUpdate({ imagePosition: "right" })}
                  className="text-xs"
                >
                  <AlignRight className="h-3 w-3 mr-1" />
                  Right
                </Button>
              </div>

              <div
                className={cn(
                  "flex",
                  element.imagePosition === "left" && "justify-start",
                  element.imagePosition === "center" && "justify-center",
                  element.imagePosition === "right" && "justify-end",
                )}
              >
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors max-w-sm">
                  <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-600 mb-2">
                    {"Drop image here or "}
                    <span className="text-blue-600 underline cursor-pointer">browse</span>
                  </p>
                  <p className="text-xs text-gray-400">Supports: JPG, PNG, GIF (max 5MB)</p>
                </div>
              </div>
            </div>
          )

        case "start-button":
          return (
            <div className="text-center pt-8">
              {isEditingLabel ? (
                <Input
                  value={tempLabel}
                  onChange={(e) => setTempLabel(e.target.value)}
                  onBlur={handleLabelSave}
                  className="text-center border-none shadow-none bg-transparent max-w-xs mx-auto"
                  autoFocus
                />
              ) : (
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg cursor-pointer"
                  onClick={() => setIsEditingLabel(true)}
                >
                  {element.label}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              )}
            </div>
          )
      }
    }

    // Form page elements with improved UI
    switch (element.type) {
      case "heading":
        return (
          <Card className="border-l-4 border-l-blue-500 bg-blue-50/50">
            <CardContent className="p-4">
              {isEditingLabel ? (
                <Input
                  value={tempLabel}
                  onChange={(e) => setTempLabel(e.target.value)}
                  onBlur={handleLabelSave}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleLabelSave()
                    if (e.key === "Escape") {
                      setTempLabel(element.label)
                      setIsEditingLabel(false)
                    }
                  }}
                  className="text-xl font-bold border-none shadow-none text-gray-900 bg-transparent"
                  autoFocus
                />
              ) : (
                <h2
                  className="text-xl font-bold text-gray-900 cursor-pointer hover:bg-blue-100/50 p-2 rounded"
                  onClick={() => setIsEditingLabel(true)}
                >
                  {element.label}
                </h2>
              )}
            </CardContent>
          </Card>
        )

      case "paragraph":
        return (
          <Card className="border-l-4 border-l-gray-400 bg-gray-50/50">
            <CardContent className="p-4">
              {isEditingLabel ? (
                <Textarea
                  value={tempLabel}
                  onChange={(e) => setTempLabel(e.target.value)}
                  onBlur={handleLabelSave}
                  className="text-gray-600 border-none shadow-none bg-transparent resize-none"
                  autoFocus
                />
              ) : (
                <p
                  className="text-gray-600 leading-relaxed cursor-pointer hover:bg-gray-100/50 p-2 rounded"
                  onClick={() => setIsEditingLabel(true)}
                >
                  {element.label}
                </p>
              )}
            </CardContent>
          </Card>
        )

      case "text":
      case "email":
      case "number":
        return (
          <Card className="border-l-4 border-l-purple-500 bg-purple-50/30">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-purple-600 bg-purple-100 rounded-full w-6 h-6 flex items-center justify-center">
                  {index + 1}
                </span>
                {isEditingLabel ? (
                  <Input
                    value={tempLabel}
                    onChange={(e) => setTempLabel(e.target.value)}
                    onBlur={handleLabelSave}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleLabelSave()
                      if (e.key === "Escape") {
                        setTempLabel(element.label)
                        setIsEditingLabel(false)
                      }
                    }}
                    className="text-lg font-medium border-none shadow-none bg-transparent flex-1"
                    autoFocus
                  />
                ) : (
                  <h3
                    className="text-lg font-medium text-gray-900 cursor-pointer hover:bg-purple-100/50 p-2 rounded flex-1"
                    onClick={() => setIsEditingLabel(true)}
                  >
                    {element.label}
                    {element.required && <span className="text-red-500 ml-1">*</span>}
                  </h3>
                )}
              </div>
              <Input
                type={element.type}
                placeholder={element.placeholder}
                className="w-full border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-0"
                disabled
              />
            </CardContent>
          </Card>
        )

      case "textarea":
        return (
          <Card className="border-l-4 border-l-indigo-500 bg-indigo-50/30">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-indigo-600 bg-indigo-100 rounded-full w-6 h-6 flex items-center justify-center">
                  {index + 1}
                </span>
                {isEditingLabel ? (
                  <Input
                    value={tempLabel}
                    onChange={(e) => setTempLabel(e.target.value)}
                    onBlur={handleLabelSave}
                    className="text-lg font-medium border-none shadow-none bg-transparent flex-1"
                    autoFocus
                  />
                ) : (
                  <h3
                    className="text-lg font-medium text-gray-900 cursor-pointer hover:bg-indigo-100/50 p-2 rounded flex-1"
                    onClick={() => setIsEditingLabel(true)}
                  >
                    {element.label}
                    {element.required && <span className="text-red-500 ml-1">*</span>}
                  </h3>
                )}
              </div>
              <Textarea
                placeholder={element.placeholder}
                className="w-full min-h-20 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-0"
                disabled
              />
            </CardContent>
          </Card>
        )

      case "select":
      case "radio":
        return (
          <Card className="border-l-4 border-l-cyan-500 bg-cyan-50/30">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-cyan-600 bg-cyan-100 rounded-full w-6 h-6 flex items-center justify-center">
                  {index + 1}
                </span>
                {isEditingLabel ? (
                  <Input
                    value={tempLabel}
                    onChange={(e) => setTempLabel(e.target.value)}
                    onBlur={handleLabelSave}
                    className="text-lg font-medium border-none shadow-none bg-transparent flex-1"
                    autoFocus
                  />
                ) : (
                  <h3
                    className="text-lg font-medium text-gray-900 cursor-pointer hover:bg-cyan-100/50 p-2 rounded flex-1"
                    onClick={() => setIsEditingLabel(true)}
                  >
                    {element.label}
                    {element.required && <span className="text-red-500 ml-1">*</span>}
                  </h3>
                )}
              </div>

              <div className="space-y-2 pl-9">
                {element.options?.map((option, idx) => (
                  <div key={idx} className="flex items-center space-x-3 group bg-white rounded-lg p-2 border">
                    <div className="w-4 h-4 border-2 border-cyan-400 rounded-full flex-shrink-0" />
                    <Input
                      value={option}
                      onChange={(e) => updateOption(idx, e.target.value)}
                      className="border-none shadow-none bg-transparent text-gray-700 hover:bg-gray-50 flex-1"
                      placeholder={`Option ${idx + 1}`}
                    />
                    {element.options && element.options.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeOption(idx)}
                        className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                ))}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={addOption}
                  className="text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50 w-full"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add option
                </Button>
              </div>
            </CardContent>
          </Card>
        )

      case "checkbox":
        return (
          <Card className="border-l-4 border-l-green-500 bg-green-50/30">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-green-600 bg-green-100 rounded-full w-6 h-6 flex items-center justify-center">
                  {index + 1}
                </span>
                {isEditingLabel ? (
                  <Input
                    value={tempLabel}
                    onChange={(e) => setTempLabel(e.target.value)}
                    onBlur={handleLabelSave}
                    className="text-lg font-medium border-none shadow-none bg-transparent flex-1"
                    autoFocus
                  />
                ) : (
                  <h3
                    className="text-lg font-medium text-gray-900 cursor-pointer hover:bg-green-100/50 p-2 rounded flex-1"
                    onClick={() => setIsEditingLabel(true)}
                  >
                    {element.label}
                    {element.required && <span className="text-red-500 ml-1">*</span>}
                  </h3>
                )}
              </div>

              <div className="space-y-2 pl-9">
                {element.options?.map((option, idx) => (
                  <div key={idx} className="flex items-center space-x-3 group bg-white rounded-lg p-2 border">
                    <div className="w-4 h-4 border-2 border-green-400 rounded flex-shrink-0" />
                    <Input
                      value={option}
                      onChange={(e) => updateOption(idx, e.target.value)}
                      className="border-none shadow-none bg-transparent text-gray-700 hover:bg-gray-50 flex-1"
                      placeholder={`Option ${idx + 1}`}
                    />
                    {element.options && element.options.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeOption(idx)}
                        className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                ))}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={addOption}
                  className="text-green-600 hover:text-green-700 hover:bg-green-50 w-full"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add option
                </Button>
              </div>
            </CardContent>
          </Card>
        )

      case "date":
        return (
          <Card className="border-l-4 border-l-red-500 bg-red-50/30">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-red-600 bg-red-100 rounded-full w-6 h-6 flex items-center justify-center">
                  {index + 1}
                </span>
                {isEditingLabel ? (
                  <Input
                    value={tempLabel}
                    onChange={(e) => setTempLabel(e.target.value)}
                    onBlur={handleLabelSave}
                    className="text-lg font-medium border-none shadow-none bg-transparent flex-1"
                    autoFocus
                  />
                ) : (
                  <h3
                    className="text-lg font-medium text-gray-900 cursor-pointer hover:bg-red-100/50 p-2 rounded flex-1"
                    onClick={() => setIsEditingLabel(true)}
                  >
                    {element.label}
                    {element.required && <span className="text-red-500 ml-1">*</span>}
                  </h3>
                )}
              </div>
              <div className="flex items-center space-x-3">
                <CalendarIcon className="h-5 w-5 text-red-500" />
                <Input
                  type="date"
                  className="border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-0"
                  disabled
                />
              </div>
            </CardContent>
          </Card>
        )

      case "file":
        return (
          <Card className="border-l-4 border-l-yellow-500 bg-yellow-50/30">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-yellow-600 bg-yellow-100 rounded-full w-6 h-6 flex items-center justify-center">
                  {index + 1}
                </span>
                {isEditingLabel ? (
                  <Input
                    value={tempLabel}
                    onChange={(e) => setTempLabel(e.target.value)}
                    onBlur={handleLabelSave}
                    className="text-lg font-medium border-none shadow-none bg-transparent flex-1"
                    autoFocus
                  />
                ) : (
                  <h3
                    className="text-lg font-medium text-gray-900 cursor-pointer hover:bg-yellow-100/50 p-2 rounded flex-1"
                    onClick={() => setIsEditingLabel(true)}
                  >
                    {element.label}
                    {element.required && <span className="text-red-500 ml-1">*</span>}
                  </h3>
                )}
              </div>
              <div className="border-2 border-dashed border-yellow-300 rounded-lg p-6 text-center hover:border-yellow-400 transition-colors bg-white">
                <Upload className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-1">
                  {"Drop files here or "}
                  <span className="text-yellow-600 underline cursor-pointer">browse</span>
                </p>
                <p className="text-xs text-gray-400">Supports: JPG, PNG, PDF (max 10MB)</p>
              </div>
            </CardContent>
          </Card>
        )

      default:
        return <div>Unknown element type</div>
    }
  }

  return (
    <div
      className={cn(
        "group relative transition-all duration-200 cursor-pointer py-4",
        isSelected && "ring-2 ring-blue-500 ring-offset-2 rounded-lg",
      )}
      onClick={onSelect}
    >
      {renderFormField()}

      {isSelected && (
        <div className="absolute top-2 right-2 flex items-center space-x-1 bg-white border border-gray-200 rounded-lg shadow-lg p-1">
          <Button
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0"
            onClick={(e) => {
              e.stopPropagation()
              // Copy functionality
            }}
          >
            <Copy className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
            onClick={(e) => {
              e.stopPropagation()
              onDelete()
            }}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      )}
    </div>
  )
}
