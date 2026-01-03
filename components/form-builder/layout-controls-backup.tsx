"use client"

import { useState } from "react"
import type { FormSection, FormPage } from "@/types/form"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Palette, Layout, Borders, AlignLeft, AlignCenter, AlignRight } from "lucide-react"

interface LayoutControlsProps {
  currentPage: FormPage
  selectedSection?: FormSection
  onUpdatePage: (updates: Partial<FormPage>) => void
  onUpdateSection: (sectionId: string, updates: Partial<FormSection>) => void
}

export function LayoutControls({
  currentPage,
  selectedSection,
  onUpdatePage,
  onUpdateSection,
}: LayoutControlsProps) {
  const [activeTab, setActiveTab] = useState("page")

  const updatePageLayout = (key: string, value: any) => {
    onUpdatePage({
      layout: {
        ...currentPage.layout,
        [key]: value,
      },
    })
  }

  const updateSectionLayout = (key: string, value: any) => {
    if (!selectedSection) return
    onUpdateSection(selectedSection.id, {
      layout: {
        ...selectedSection.layout,
        [key]: value,
      },
    })
  }

  const updatePagePadding = (side: string, value: number) => {
    onUpdatePage({
      layout: {
        ...currentPage.layout,
        padding: {
          ...currentPage.layout.padding,
          [side]: value,
        },
      },
    })
  }

  const updateSectionPadding = (side: string, value: number) => {
    if (!selectedSection) return
    onUpdateSection(selectedSection.id, {
      layout: {
        ...selectedSection.layout,
        padding: {
          ...selectedSection.layout.padding,
          [side]: value,
        },
      },
    })
  }

  const updateSectionMargin = (side: string, value: number) => {
    if (!selectedSection) return
    onUpdateSection(selectedSection.id, {
      layout: {
        ...selectedSection.layout,
        margin: {
          ...selectedSection.layout.margin,
          [side]: value,
        },
      },
    })
  }

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-">Layout Controls</h3>
        < className="text-sm text-gray-600">
          {selectedSection ? `Editing: ${selectedSection.title || selectedSection.type}` : "Page Layout"}
        </p>

      <Tabs value={active} onValueChange={setActiveTab} className="w-">
        <TabsList className="w-full grid w-cols-2">
          <TabsTrigger value="page">Page</TabsTrigger>
          <TabsTrigger value="section" disabled={!selectedSection}>
           
          </TabsTrigger>
        </TabsList

        <TabsContent value="page" className="mt-4 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center">
                <Layout className="h-4 w-4 mr-2" />
                Page Layout
              </CardTitle>
            </CardHeader>
 
              < 
                <mar
                <        <|code_suffix|>                  <改变
                  className="space-y-3"
                >
                  <div>
                    <Label className="text-xs">Max Width</Label>
                    <Select
                      value={currentPage.layout.maxWidth}
                      onValueChange={(value) => updatePageLayout("maxWidth", value)}
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sm">Small (640px)</SelectItem>
                        <SelectItem value="md">Medium (768px)</SelectItem>
                        <SelectItem value="lg">Large (1024px)</SelectItem>
                        <SelectItem value="xl">Extra Large (1280px)</SelectItem>
                        <SelectItem value="full">Full Width</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {currentPage.layout.maxWidth === "custom" && (
                    <div>
                      <Label className="text-xs">Custom Width</Label>
                      <Input
                        placeholder="e.g., 900px"
                        value={currentPage.layout.customMaxWidth || ""}
                        onChange={(e) => updatePageLayout("customMaxWidth", e.target.value)}
                        className="h-8"
                      />
                    </div>
                  )}

                  <div>
                    <Label className="text-xs">Alignment</Label>
                    <div className="flex gap-1">
                      <Button
                        variant={currentPage.layout.alignment === "left" ? "default" : "outline"}
                        size="sm"
                        onClick={() => updatePageLayout("alignment", "left")}
                        className="flex-1 h-8"
                      >
                        <AlignLeft className="h-3 w-3" />
                      </Button>
                      <Button
                        variant={currentPage.layout.alignment === "center" ? "default" : "outline"}
                        size="sm"
                        onClick={() => updatePageLayout("alignment", "center")}
                        className="flex-1 h-8"
                      >
                        <AlignCenter className="h-3 w-3" />
                      </Button>
                      <Button
                        variant={currentPage.layout.alignment === "right" ? "default" : "outline"}
                        size="sm"
                        onClick={() => updatePageLayout("alignment", "right")}
                        className="flex-1 h-8"
                      >
                        <AlignRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center">
                  <Palette className="h-4 w-4 mr-2" />
                  Colors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-xs">Background Color</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={currentPage.layout.backgroundColor}
                      onChange={(e) => updatePageLayout("backgroundColor", e.target.value)}
                      className="w-12 h-8 p-1 rounded"
                    />
                    <Input
                      value={currentPage.layout.backgroundColor}
                      onChange={(e) => updatePageLayout("backgroundColor", e.target.value)}
                      className="flex-1 h-8"
                      placeholder="#ffffff"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-xs">Background Image</Label>
                  <Input
                    value={currentPage.layout.backgroundImage || ""}
                    onChange={(e) => updatePageLayout("backgroundImage", e.target.value)}
                    className="h-8"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Spacing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(currentPage.layout.padding).map(([side, value]) => (
                  <div key={side}>
                    <Label className="text-xs capitalize">{side} Padding</Label>
                    <div className="flex items-center gap-2">
                      <Slider
                        value={[value]}
                        onValueChange={([newValue]) => updatePagePadding(side, newValue)}
                        max={100}
                        step={4}
                        className="flex-1"
                      />
                      <Input
                        type="number"
                        value={value}
                        onChange={(e) => updatePagePadding(side, parseInt(e.target.value) || 0)}
                        className="w-16 h-8 text-center"
                        min="0"
                        max="100"
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="section" className="mt-4 space-y-4">
            {selectedSection && (
              <>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center">
                      <Layout className="h-4 w-4 mr-2" />
                      Section Layout
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-xs">Width</Label>
                      <Select
                        value={selectedSection.layout.width}
                        onValueChange={(value) => updateSectionLayout("width", value)}
                      >
                        <SelectTrigger className="h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full">Full Width</SelectItem>
                          <SelectItem value="half">Half Width</SelectItem>
                          <SelectItem value="third">Third Width</SelectItem>
                          <SelectItem value="quarter">Quarter Width</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedSection.layout.width === "custom" && (
                      <div>
                        <Label className="text-xs">Custom Width</Label>
                        <Input
                          placeholder="e.g., 300px"
                          value={selectedSection.layout.customWidth || ""}
                          onChange={(e) => updateSectionLayout("customWidth", e.target.value)}
                          className="h-8"
                        />
                      </div>
                    )}

                    <div>
                      <Label className="text-xs">Direction</Label>
                      <Select
                        value={selectedSection.layout.direction}
                        onValueChange={(value) => updateSectionLayout("direction", value)}
                      >
                        <SelectTrigger className="h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="column">Column</SelectItem>
                          <SelectItem value="row">Row</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-xs">Alignment</Label>
                      <div className="flex gap-1">
                        <Button
                          variant={selectedSection.layout.alignment === "left" ? "default" : "outline"}
                          size="sm"
                          onClick={() => updateSectionLayout("alignment", "left")}
                          className="flex-1 h-8"
                        >
                          <AlignLeft className="h-3 w-3" />
                        </Button>
                        <Button
                          variant={selectedSection.layout.alignment === "center" ? "default" : "outline"}
                          size="sm"
                          onClick={() => updateSectionLayout("alignment", "center")}
                          className="flex-1 h-8"
                        >
                          <AlignCenter className="h-3 w-3" />
                        </Button>
                        <Button
                          variant={selectedSection.layout.alignment === "right" ? "default" : "outline"}
                          size="sm"
                          onClick={() => updateSectionLayout("alignment", "right")}
                          className="flex-1 h-8"
                        >
                          <AlignRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs">Gap</Label>
                      <div className="flex items-center gap-2">
                        <Slider
                          value={[selectedSection.layout.gap]}
                          onValueChange={([newValue]) => updateSectionLayout("gap", newValue)}
                          max={50}
                          step={2}
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          value={selectedSection.layout.gap}
                          onChange={(e) => updateSectionLayout("gap", parseInt(e.target.value) || 0)}
                          className="w-16 h-8 text-center"
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center">
                      <Palette className="h-4 w-4 mr-2" />
                      Colors & Border
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-xs">Background Color</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={selectedSection.layout.backgroundColor}
                          onChange={(e) => updateSectionLayout("backgroundColor", e.target.value)}
                          className="w-12 h-8 p-1 rounded"
                        />
                        <Input
                          value={selectedSection.layout.backgroundColor}
                          onChange={(e) => updateSectionLayout("backgroundColor", e.target.value)}
                          className="flex-1 h-8"
                          placeholder="#ffffff"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs">Border Color</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={selectedSection.layout.borderColor}
                          onChange={(e) => updateSectionLayout("borderColor", e.target.value)}
                          className="w-12 h-8 p-1 rounded"
                        />
                        <Input
                          value={selectedSection.layout.borderColor}
                          onChange={(e) => updateSectionLayout("borderColor", e.target.value)}
                          className="flex-1 h-8"
                          placeholder="#e2e8f0"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs">Border Width</Label>
                      <div className="flex items-center gap-2">
                        <Slider
                          value={[selectedSection.layout.borderWidth]}
                          onValueChange={([newValue]) => updateSectionLayout("borderWidth", newValue)}
                          max={10}
                          step={1}
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          value={selectedSection.layout.borderWidth}
                          onChange={(e) => updateSectionLayout("borderWidth", parseInt(e.target.value) || 0)}
                          className="w-16 h-8 text-center"
                          min="0"
                          max="10"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs">Border Radius</Label>
                      <div className="flex items-center gap-2">
                        <Slider
                          value={[selectedSection.layout.borderRadius]}
                          onValueChange={([newValue]) => updateSectionLayout("borderRadius", newValue)}
                          max={50}
                          step={2}
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          value={selectedSection.layout.borderRadius}
                          onChange={(e) => updateSectionLayout("borderRadius", parseInt(e.target.value) || 0)}
                          className="w-16 h-8 text-center"
                          min="0"
                          max="50"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Spacing</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(selectedSection.layout.padding).map(([side, value]) => (
                        <div key={side}>
                          <Label className="text-xs capitalize">{side} Pad</Label>
                          <Input
                            type="number"
                            value={value}
                            onChange={(e) => updateSectionPadding(side, parseInt(e.target.value) || 0)}
                            className="h-8 text-center"
                            min="0"
                            max="100"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(selectedSection.layout.margin).map(([side, value]) => (
                        <div key={side}>
                          <Label className="text-xs capitalize">{side} Mar</Label>
                          <Input
                            type="number"
                            value={value}
                            onChange={(e) => updateSectionMargin(side, parseInt(e.target.value) || 0)}
                            className="h-8 text-center"
                            min="0"
                            max="100"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
