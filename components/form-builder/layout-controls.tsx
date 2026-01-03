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
import { Palette, Layout, Square, AlignLeft, AlignCenter, AlignRight } from "lucide-react"

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

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Layout Controls</h3>
        <p className="text-sm text-gray-600">
          {selectedSection ? `Editing: ${selectedSection.title || selectedSection.type}` : "Page Layout"}
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid-cols-2">
          <TabsTrigger value="page">Page</TabsTrigger>
          <TabsTrigger value="section" disabled={!selectedSection}>
            Section
          </TabsTrigger>
        </TabsList>

        <TabsContent value="page" className="mt-4 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center">
                <Layout className="h-4 w-4 mr-2" />
                Page Layout
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="section" className="mt-4 space-y-4">
          {selectedSection && selectedSection.type === "container" && (
            <>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center">
                    <Square className="h-4 w-4 mr-2" />
                    Container Style
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="text-xs">Width</Label>
                    <Select
                      value={selectedSection.layout.width || "full"}
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
            </>
          )}
          
          {selectedSection && selectedSection.type === "input-zone" && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center">
                  <Square className="h-4 w-4 mr-2" />
                  Input Zone (Fixed Layout)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Input zones have fixed layout</strong>
                  </p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• Layout: Column (fixed)</li>
                    <li>• Spacing: 16px gap (fixed)</li>
                    <li>• Field design: System controlled</li>
                    <li>• Only fields can be added/removed</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
