"use client"

import { useState } from "react"
import { useDrag } from "react-dnd"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResizableSidebar } from "./resizable-sidebar"
import {
  Type,
  Mail,
  Hash,
  MessageSquare,
  Circle,
  CheckSquare,
  Calendar,
  Upload,
  Plus,
  Layers,
  X,
  GripVertical,
  ChevronUp,
  ChevronDown,
  Search,
  Heading1,
  AlignLeft,
  ImageIcon,
  Play,
  DropletsIcon as DropdownIcon,
} from "lucide-react"
import type { FormPage } from "@/types/form"

interface ElementsSidebarProps {
  pages: FormPage[]
  currentPageIndex: number
  onPageChange: (index: number) => void
  onAddPage: () => void
  onUpdatePage: (pageIndex: number, updates: Partial<FormPage>) => void
  onDeletePage: (index: number) => void
  onMovePageUp: (index: number) => void
  onMovePageDown: (index: number) => void
  onAddElement: (type: string) => void
}

// All available form elements
const formElements = [
  { type: "heading", label: "Heading", icon: Heading1, color: "bg-emerald-500", category: "Content" },
  { type: "paragraph", label: "Paragraph", icon: AlignLeft, color: "bg-blue-500", category: "Content" },
  { type: "image", label: "Image", icon: ImageIcon, color: "bg-purple-500", category: "Media" },
  { type: "start-button", label: "Start Button", icon: Play, color: "bg-green-500", category: "Action" },
  { type: "text", label: "Short answer", icon: Type, color: "bg-purple-500", category: "Input" },
  { type: "textarea", label: "Long answer", icon: MessageSquare, color: "bg-indigo-500", category: "Input" },
  { type: "email", label: "Email", icon: Mail, color: "bg-orange-500", category: "Input" },
  { type: "number", label: "Number", icon: Hash, color: "bg-gray-500", category: "Input" },
  { type: "select", label: "Dropdown", icon: DropdownIcon, color: "bg-pink-500", category: "Choice" },
  { type: "radio", label: "Multiple choice", icon: Circle, color: "bg-cyan-500", category: "Choice" },
  { type: "checkbox", label: "Checkboxes", icon: CheckSquare, color: "bg-green-500", category: "Choice" },
  { type: "date", label: "Date", icon: Calendar, color: "bg-red-500", category: "Input" },
  { type: "file", label: "File upload", icon: Upload, color: "bg-yellow-500", category: "Input" },
]

function DraggableElement({
  element,
  onAddElement,
  currentPageTitle,
}: {
  element: (typeof formElements)[0]
  onAddElement: (type: string) => void
  currentPageTitle: string
}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "form-element",
    item: { elementType: element.type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  return (
    <div
      ref={drag}
      className={`cursor-pointer transition-all duration-200 ${
        isDragging ? "opacity-50 scale-95" : "hover:scale-105 hover:shadow-md"
      }`}
      onClick={() => onAddElement(element.type)}
      title={`Add ${element.label} to ${currentPageTitle}`}
    >
      <div className="bg-white border border-gray-200 rounded-lg p-3 hover:border-blue-400 hover:bg-blue-50 transition-all">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${element.color} text-white flex-shrink-0`}>
            <element.icon className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{element.label}</p>
            <p className="text-xs text-gray-500">{element.category}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ElementsSidebar({
  pages,
  currentPageIndex,
  onPageChange,
  onAddPage,
  onUpdatePage,
  onDeletePage,
  onMovePageUp,
  onMovePageDown,
  onAddElement,
}: ElementsSidebarProps) {
  const [editingPageIndex, setEditingPageIndex] = useState<number | null>(null)
  const [tempPageTitle, setTempPageTitle] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const currentPage = pages[currentPageIndex]

  const handleEditPage = (index: number, title: string) => {
    setEditingPageIndex(index)
    setTempPageTitle(title)
  }

  const handleSavePageTitle = () => {
    if (editingPageIndex !== null) {
      onUpdatePage(editingPageIndex, { title: tempPageTitle })
      setEditingPageIndex(null)
    }
  }

  const filteredElements = formElements.filter((element) =>
    element.label.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const groupedElements = filteredElements.reduce(
    (acc, element) => {
      if (!acc[element.category]) {
        acc[element.category] = []
      }
      acc[element.category].push(element)
      return acc
    },
    {} as Record<string, typeof formElements>,
  )

  return (
    <ResizableSidebar defaultWidth={320} minWidth={280} maxWidth={450} side="left">
      <div className="h-full border-r border-gray-200 bg-gray-50 flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 p-4 bg-white">
          <div className="flex items-center space-x-2 mb-4">
            <Layers className="h-5 w-5 text-blue-600" />
            <span className="font-semibold text-base text-gray-900">Build Form</span>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search elements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-9 text-sm bg-gray-50 border-gray-200"
            />
          </div>
        </div>

        {/* Current Page Indicator */}
        <div className="bg-blue-50 border-b border-blue-200 p-3">
          <div className="text-sm">
            <span className="text-blue-600 font-medium">Current: </span>
            <span className="text-blue-800 font-semibold">{currentPage.title}</span>
            <span className="text-blue-600 ml-2">({currentPage.elements.length} elements)</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="elements" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-2 m-4 mb-0">
              <TabsTrigger value="pages" className="text-sm">
                Pages ({pages.length})
              </TabsTrigger>
              <TabsTrigger value="elements" className="text-sm">
                Elements
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pages" className="flex-1 overflow-y-auto p-4 pt-2 mt-0">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Form Pages</span>
                  <Button variant="outline" size="sm" onClick={onAddPage} className="h-7 w-7 p-0 bg-transparent">
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>

                <div className="space-y-2">
                  {pages.map((page, index) => (
                    <div
                      key={page.id}
                      className={`group relative bg-white border rounded-lg p-3 cursor-pointer transition-all ${
                        index === currentPageIndex
                          ? "border-blue-500 bg-blue-50 shadow-sm ring-2 ring-blue-200"
                          : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                      }`}
                      onClick={() => onPageChange(index)}
                    >
                      <div className="flex items-center space-x-3">
                        <GripVertical className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          {editingPageIndex === index ? (
                            <Input
                              value={tempPageTitle}
                              onChange={(e) => setTempPageTitle(e.target.value)}
                              onBlur={handleSavePageTitle}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") handleSavePageTitle()
                                if (e.key === "Escape") setEditingPageIndex(null)
                              }}
                              className="h-6 text-sm"
                              autoFocus
                              onClick={(e) => e.stopPropagation()}
                            />
                          ) : (
                            <div onDoubleClick={() => handleEditPage(index, page.title)}>
                              <p className="text-sm font-medium text-gray-900 truncate">{page.title}</p>
                              <div className="flex items-center space-x-2">
                                <p className="text-xs text-gray-500 capitalize">{page.type} page</p>
                                <span className="text-xs text-gray-400">•</span>
                                <p className="text-xs text-gray-500">{page.elements.length} elements</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="absolute top-2 right-2 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            onMovePageUp(index)
                          }}
                          className="h-6 w-6 p-0"
                          disabled={index === 0}
                        >
                          <ChevronUp className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            onMovePageDown(index)
                          }}
                          className="h-6 w-6 p-0"
                          disabled={index === pages.length - 1}
                        >
                          <ChevronDown className="h-3 w-3" />
                        </Button>
                        {pages.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              onDeletePage(index)
                            }}
                            className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="elements" className="flex-1 overflow-y-auto p-4 pt-2 mt-0">
              <div className="space-y-4">
                {Object.entries(groupedElements).map(([category, elements]) => (
                  <div key={category}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-700">{category}</span>
                      <Badge variant="secondary" className="text-xs">
                        {elements.length}
                      </Badge>
                    </div>
                    <div className="grid gap-3">
                      {elements.map((element) => (
                        <DraggableElement
                          key={element.type}
                          element={element}
                          onAddElement={onAddElement}
                          currentPageTitle={currentPage.title}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ResizableSidebar>
  )
}
