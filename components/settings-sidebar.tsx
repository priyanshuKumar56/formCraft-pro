"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  X,
  Settings,
  Palette,
  Eye,
  Video,
  Plus,
  Trash2,
  Copy,
  Move,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react"
import type { FormElement, FormPage, FormData } from "@/types/form"

interface SettingsSidebarProps {
  selectedElement: string | null
  formElement: FormElement | null
  onUpdateElement: (id: string, updates: Partial<FormElement>) => void
  currentPage: FormPage
  onUpdatePage: (updates: Partial<FormPage>) => void
  onClose: () => void
  formData: FormData
  onUpdateForm: (formData: FormData) => void
}

export function SettingsSidebar({
  selectedElement,
  formElement,
  onUpdateElement,
  currentPage,
  onUpdatePage,
  onClose,
  formData,
  onUpdateForm,
}: SettingsSidebarProps) {
  const [activeTab, setActiveTab] = useState("content")

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
      settings: {
        ...formData.settings,
        ...updates,
      },
    })
  }

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-200 p-4 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-blue-600 rounded-lg">
              <Settings className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-base text-gray-900">Settings Panel</span>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0 hover:bg-white/50">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/50">
            <TabsTrigger value="content" className="text-xs data-[state=active]:bg-white">
              Content
            </TabsTrigger>
            <TabsTrigger value="design" className="text-xs data-[state=active]:bg-white">
              Design
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <Tabs value={activeTab} className="w-full h-full">
          <TabsContent value="content" className="space-y-4 p-4 mt-0 h-full">
            {selectedElement && formElement ? (
              <div className="space-y-6">
                {/* Element Info */}
                <Card className="border-blue-200 bg-blue-50/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Palette className="h-4 w-4 text-blue-600" />
                        <span>Element Settings</span>
                      </div>
                      <Badge variant="secondary" className="text-xs capitalize">
                        {formElement.type}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Question Text */}
                    <div>
                      <Label htmlFor="question-text" className="text-xs font-semibold text-gray-700 mb-2 block">
                        {formElement.type === "heading"
                          ? "Heading Text"
                          : formElement.type === "paragraph"
                            ? "Paragraph Text"
                            : "Question Text"}
                      </Label>
                      <Textarea
                        id="question-text"
                        value={formElement.label}
                        onChange={(e) => onUpdateElement(formElement.id, { label: e.target.value })}
                        className="min-h-[80px] text-sm resize-none border-gray-300 focus:border-blue-500"
                        placeholder="Enter your question..."
                      />
                    </div>

                    {/* Description/Placeholder */}
                    {formElement.type !== "heading" && formElement.type !== "paragraph" && (
                      <div>
                        <Label htmlFor="description" className="text-xs font-semibold text-gray-700 mb-2 block">
                          Description (optional)
                        </Label>
                        <Textarea
                          id="description"
                          value={formElement.placeholder || ""}
                          onChange={(e) => onUpdateElement(formElement.id, { placeholder: e.target.value })}
                          className="min-h-[60px] text-sm resize-none border-gray-300 focus:border-blue-500"
                          placeholder="Add a description or hint..."
                        />
                      </div>
                    )}

                    {/* Required Toggle */}
                    {formElement.type !== "heading" && formElement.type !== "paragraph" && (
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                        <div>
                          <Label htmlFor="required" className="text-sm font-medium text-gray-700">
                            Required Field
                          </Label>
                          <p className="text-xs text-gray-500">Users must fill this field</p>
                        </div>
                        <Switch
                          id="required"
                          checked={formElement.required}
                          onCheckedChange={(checked) => onUpdateElement(formElement.id, { required: checked })}
                        />
                      </div>
                    )}

                    {/* Image Position for Image Elements */}
                    {formElement.type === "image" && (
                      <div>
                        <Label className="text-xs font-semibold text-gray-700 mb-3 block">Image Position</Label>
                        <div className="grid grid-cols-3 gap-2">
                          <Button
                            variant={formElement.imagePosition === "left" ? "default" : "outline"}
                            size="sm"
                            onClick={() => onUpdateElement(formElement.id, { imagePosition: "left" })}
                            className="text-xs h-8"
                          >
                            <AlignLeft className="h-3 w-3 mr-1" />
                            Left
                          </Button>
                          <Button
                            variant={formElement.imagePosition === "center" ? "default" : "outline"}
                            size="sm"
                            onClick={() => onUpdateElement(formElement.id, { imagePosition: "center" })}
                            className="text-xs h-8"
                          >
                            <AlignCenter className="h-3 w-3 mr-1" />
                            Center
                          </Button>
                          <Button
                            variant={formElement.imagePosition === "right" ? "default" : "outline"}
                            size="sm"
                            onClick={() => onUpdateElement(formElement.id, { imagePosition: "right" })}
                            className="text-xs h-8"
                          >
                            <AlignRight className="h-3 w-3 mr-1" />
                            Right
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Options for Choice Elements */}
                    {(formElement.type === "select" ||
                      formElement.type === "radio" ||
                      formElement.type === "checkbox") && (
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <Label className="text-xs font-semibold text-gray-700">Answer Choices</Label>
                          <Badge variant="outline" className="text-xs">
                            {formElement.options?.length || 0} options
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          {formElement.options?.map((option, index) => (
                            <div key={index} className="flex items-center space-x-2 group">
                              <div className="flex-1 relative">
                                <Input
                                  value={option}
                                  onChange={(e) => updateOption(index, e.target.value)}
                                  className="h-8 text-sm pr-8 border-gray-300 focus:border-blue-500"
                                  placeholder={`Option ${index + 1}`}
                                />
                                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeOption(index)}
                                    className="h-5 w-5 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                                    disabled={formElement.options && formElement.options.length <= 1}
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                              <div className="w-6 h-6 flex items-center justify-center text-xs text-gray-400 font-medium">
                                {index + 1}
                              </div>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={addOption}
                            className="w-full h-8 text-xs bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Add Choice
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Validation for Text Input */}
                    {formElement.type === "text" && (
                      <div>
                        <Label className="text-xs font-semibold text-gray-700 mb-3 block">Input Validation</Label>
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label className="text-xs text-gray-600">Min Length</Label>
                              <Input
                                type="number"
                                className="h-8 text-xs border-gray-300 focus:border-blue-500"
                                placeholder="0"
                                min="0"
                              />
                            </div>
                            <div>
                              <Label className="text-xs text-gray-600">Max Length</Label>
                              <Input
                                type="number"
                                className="h-8 text-xs border-gray-300 focus:border-blue-500"
                                placeholder="100"
                                min="1"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* File Upload Settings */}
                    {formElement.type === "file" && (
                      <div>
                        <Label className="text-xs font-semibold text-gray-700 mb-3 block">File Upload Settings</Label>
                        <div className="space-y-3">
                          <div>
                            <Label className="text-xs text-gray-600 mb-1 block">Max File Size (MB)</Label>
                            <Input
                              type="number"
                              className="h-8 text-xs border-gray-300 focus:border-blue-500"
                              placeholder="10"
                              min="1"
                              max="100"
                            />
                          </div>
                          <div>
                            <Label className="text-xs text-gray-600 mb-1 block">Allowed File Types</Label>
                            <Input
                              className="h-8 text-xs border-gray-300 focus:border-blue-500"
                              placeholder="jpg, png, pdf"
                            />
                          </div>
                          <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <Label className="text-xs text-gray-600">Allow Multiple Files</Label>
                            <Switch />
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Element Actions */}
                <Card className="border-gray-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Element Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm" className="text-xs bg-transparent">
                        <Copy className="h-3 w-3 mr-1" />
                        Duplicate
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs bg-transparent">
                        <Move className="h-3 w-3 mr-1" />
                        Move
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Page Settings */}
                <Card className="border-green-200 bg-green-50/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center space-x-2">
                      <Eye className="h-4 w-4 text-green-600" />
                      <span>Page Settings</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="page-title" className="text-xs font-semibold text-gray-700 mb-2 block">
                        Page Title
                      </Label>
                      <Input
                        id="page-title"
                        value={currentPage.title}
                        onChange={(e) => onUpdatePage({ title: e.target.value })}
                        className="h-9 text-sm border-gray-300 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold text-gray-700 mb-2 block">Page Type</Label>
                      <Select
                        value={currentPage.type}
                        onValueChange={(value: "welcome" | "form" | "ending") => onUpdatePage({ type: value })}
                      >
                        <SelectTrigger className="h-9 text-sm border-gray-300 focus:border-green-500">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="welcome">Welcome Page</SelectItem>
                          <SelectItem value="form">Form Page</SelectItem>
                          <SelectItem value="ending">Ending Page</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Form Behavior */}
                <Card className="border-gray-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Form Behavior</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Show Progress Bar</Label>
                        <p className="text-xs text-gray-500">Display completion progress</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Question Numbers</Label>
                        <p className="text-xs text-gray-500">Show question numbering</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Allow Going Back</Label>
                        <p className="text-xs text-gray-500">Let users navigate backwards</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="design" className="space-y-4 p-4 mt-0 h-full">
            {/* Theme Settings */}
            <Card className="border-purple-200 bg-purple-50/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center space-x-2">
                  <Palette className="h-4 w-4 text-purple-600" />
                  <span>Theme & Colors</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-xs font-semibold text-gray-700 mb-3 block">Primary Color</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { color: "bg-blue-500", name: "Blue", value: "blue" },
                      { color: "bg-purple-500", name: "Purple", value: "purple" },
                      { color: "bg-green-500", name: "Green", value: "green" },
                      { color: "bg-red-500", name: "Red", value: "red" },
                      { color: "bg-orange-500", name: "Orange", value: "orange" },
                      { color: "bg-pink-500", name: "Pink", value: "pink" },
                      { color: "bg-indigo-500", name: "Indigo", value: "indigo" },
                      { color: "bg-gray-500", name: "Gray", value: "gray" },
                    ].map((theme) => (
                      <button
                        key={theme.value}
                        className={`h-10 ${theme.color} rounded-lg border-2 transition-all hover:scale-105 ${
                          formData.settings.theme === theme.value
                            ? "border-gray-800 ring-2 ring-gray-300"
                            : "border-transparent"
                        }`}
                        onClick={() => updateFormSettings({ theme: theme.value })}
                        title={theme.name}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-semibold text-gray-700 mb-3 block">Header Style</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={formData.settings.headerStyle === "gradient" ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateFormSettings({ headerStyle: "gradient" })}
                      className="text-xs h-9"
                    >
                      Gradient
                    </Button>
                    <Button
                      variant={formData.settings.headerStyle === "solid" ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateFormSettings({ headerStyle: "solid" })}
                      className="text-xs h-9"
                    >
                      Solid
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Show Logo</Label>
                    <p className="text-xs text-gray-500">Display your brand logo</p>
                  </div>
                  <Switch
                    checked={formData.settings.showLogo}
                    onCheckedChange={(checked) => updateFormSettings({ showLogo: checked })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs font-semibold text-gray-700 mb-2 block">Background</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="color"
                        value={formData.settings.backgroundColor}
                        onChange={(e) => updateFormSettings({ backgroundColor: e.target.value })}
                        className="h-9 w-12 p-1 border-gray-300"
                      />
                      <Input
                        type="text"
                        value={formData.settings.backgroundColor}
                        onChange={(e) => updateFormSettings({ backgroundColor: e.target.value })}
                        className="h-9 text-xs flex-1 border-gray-300 focus:border-purple-500"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-gray-700 mb-2 block">Text Color</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="color"
                        value={formData.settings.textColor}
                        onChange={(e) => updateFormSettings({ textColor: e.target.value })}
                        className="h-9 w-12 p-1 border-gray-300"
                      />
                      <Input
                        type="text"
                        value={formData.settings.textColor}
                        onChange={(e) => updateFormSettings({ textColor: e.target.value })}
                        className="h-9 text-xs flex-1 border-gray-300 focus:border-purple-500"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Typography */}
            <Card className="border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center space-x-2">
                  <Video className="h-4 w-4 text-gray-600" />
                  <span>Typography & Layout</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-xs font-semibold text-gray-700 mb-2 block">Font Family</Label>
                  <Select defaultValue="inter">
                    <SelectTrigger className="h-9 text-sm border-gray-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inter">Inter</SelectItem>
                      <SelectItem value="roboto">Roboto</SelectItem>
                      <SelectItem value="poppins">Poppins</SelectItem>
                      <SelectItem value="opensans">Open Sans</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs font-semibold text-gray-700 mb-2 block">Form Width</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger className="h-9 text-sm border-gray-300">
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
              </CardContent>
            </Card>

            {/* Custom CSS */}
            <Card className="border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Advanced Styling</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" size="sm" className="w-full text-xs bg-transparent">
                  <Plus className="h-3 w-3 mr-1" />
                  Add Background Image
                </Button>
                <Button variant="outline" size="sm" className="w-full text-xs bg-transparent">
                  <Plus className="h-3 w-3 mr-1" />
                  Custom CSS
                </Button>
                <Button variant="outline" size="sm" className="w-full text-xs bg-transparent">
                  <Plus className="h-3 w-3 mr-1" />
                  Upload Fonts
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
