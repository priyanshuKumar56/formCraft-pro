"use client"

import { useState } from "react"
import { useDrag } from "react-dnd"
import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Type,
  Mail,
  Hash,
  MessageSquare,
  ChevronDown,
  Circle,
  CheckSquare,
  Calendar,
  Upload,
  Heading1,
  AlignLeft,
  Palette,
  Settings,
  Sparkles,
} from "lucide-react"
import type { FormElement, FormData } from "@/types/form"

interface FormSidebarProps {
  onAddElement: (type: string) => void
  selectedElement: string | null
  formElement: FormElement | null
  onUpdateElement: (id: string, updates: Partial<FormElement>) => void
  formSettings: FormData["settings"]
  onUpdateFormSettings: (updates: Partial<FormData["settings"]>) => void
}

const formElements = [
  { type: "heading", label: "Heading", icon: Heading1, color: "bg-emerald-500" },
  { type: "paragraph", label: "Paragraph", icon: AlignLeft, color: "bg-blue-500" },
  { type: "text", label: "Text Input", icon: Type, color: "bg-purple-500" },
  { type: "email", label: "Email", icon: Mail, color: "bg-orange-500" },
  { type: "number", label: "Number", icon: Hash, color: "bg-gray-500" },
  { type: "textarea", label: "Text Area", icon: MessageSquare, color: "bg-indigo-500" },
  { type: "select", label: "Dropdown", icon: ChevronDown, color: "bg-pink-500" },
  { type: "radio", label: "Radio Button", icon: Circle, color: "bg-cyan-500" },
  { type: "checkbox", label: "Checkbox", icon: CheckSquare, color: "bg-green-500" },
  { type: "date", label: "Date Picker", icon: Calendar, color: "bg-red-500" },
  { type: "file", label: "File Upload", icon: Upload, color: "bg-yellow-500" },
]

function DraggableElement({
  element,
  onAddElement,
}: {
  element: (typeof formElements)[0]
  onAddElement: (type: string) => void
}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "form-element",
    item: { type: element.type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  return (
    <div
      ref={drag}
      className={`group cursor-move transition-all duration-200 ${
        isDragging ? "opacity-50 scale-95" : "hover:scale-105"
      }`}
      onClick={() => onAddElement(element.type)}
    >
      <Card className="border-2 border-dashed border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-200">
        <CardContent className="p-4 flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${element.color} text-white group-hover:scale-110 transition-transform`}>
            <element.icon className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm text-gray-900">{element.label}</p>
          </div>
          <Badge variant="secondary" className="text-xs">
            <Sparkles className="h-3 w-3 mr-1" />
            Drag
          </Badge>
        </CardContent>
      </Card>
    </div>
  )
}

export function FormSidebar({
  onAddElement,
  selectedElement,
  formElement,
  onUpdateElement,
  formSettings,
  onUpdateFormSettings,
}: FormSidebarProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredElements = formElements.filter((element) =>
    element.label.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Sidebar className="w-80 border-r border-white/20 bg-white/95 backdrop-blur-sm">
      <SidebarHeader className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                FormCraft Pro
              </h2>
              <p className="text-xs text-gray-500">Next-gen form builder</p>
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <Tabs defaultValue="elements" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="elements" className="text-xs">
              Elements
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-xs">
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="elements" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="search" className="text-sm font-medium text-gray-700">
                  Search Elements
                </Label>
                <Input
                  id="search"
                  placeholder="Search form elements..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 flex items-center">
                  <Palette className="h-4 w-4 mr-2" />
                  Form Elements
                </Label>
                <div className="grid gap-2 max-h-96 overflow-y-auto">
                  {filteredElements.map((element) => (
                    <DraggableElement key={element.type} element={element} onAddElement={onAddElement} />
                  ))}
                </div>
              </div>
            </div>

            {selectedElement && formElement && (
              <>
                <Separator />
                <div className="space-y-4">
                  <Label className="text-sm font-medium text-gray-700 flex items-center">
                    <Settings className="h-4 w-4 mr-2" />
                    Element Properties
                  </Label>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Edit {formElement.type}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label htmlFor="label" className="text-xs">
                          Label
                        </Label>
                        <Input
                          id="label"
                          value={formElement.label}
                          onChange={(e) => onUpdateElement(formElement.id, { label: e.target.value })}
                          className="mt-1"
                        />
                      </div>

                      {formElement.type !== "heading" && formElement.type !== "paragraph" && (
                        <>
                          <div>
                            <Label htmlFor="placeholder" className="text-xs">
                              Placeholder
                            </Label>
                            <Input
                              id="placeholder"
                              value={formElement.placeholder || ""}
                              onChange={(e) => onUpdateElement(formElement.id, { placeholder: e.target.value })}
                              className="mt-1"
                            />
                          </div>

                          <div className="flex items-center space-x-2">
                            <Switch
                              id="required"
                              checked={formElement.required}
                              onCheckedChange={(checked) => onUpdateElement(formElement.id, { required: checked })}
                            />
                            <Label htmlFor="required" className="text-xs">
                              Required field
                            </Label>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Form Appearance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="showLogo"
                    checked={formSettings.showLogo}
                    onCheckedChange={(checked) => onUpdateFormSettings({ showLogo: checked })}
                  />
                  <Label htmlFor="showLogo" className="text-xs">
                    Show Logo
                  </Label>
                </div>

                <div>
                  <Label className="text-xs">Header Style</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Button
                      variant={formSettings.headerStyle === "gradient" ? "default" : "outline"}
                      size="sm"
                      onClick={() => onUpdateFormSettings({ headerStyle: "gradient" })}
                      className="text-xs"
                    >
                      Gradient
                    </Button>
                    <Button
                      variant={formSettings.headerStyle === "solid" ? "default" : "outline"}
                      size="sm"
                      onClick={() => onUpdateFormSettings({ headerStyle: "solid" })}
                      className="text-xs"
                    >
                      Solid
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </SidebarContent>
    </Sidebar>
  )
}
