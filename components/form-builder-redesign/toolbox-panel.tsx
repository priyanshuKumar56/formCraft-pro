"use client"

import { useState } from "react"
import { useDrag } from "react-dnd"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { FormPage } from "@/types/form"
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
    ChevronLeft,
    ChevronRight,
    ToggleLeft,
    Phone,
    Link as LinkIcon,
    Star,
    List,
    FileText,
} from "lucide-react"

interface ToolboxPanelProps {
    isOpen: boolean
    onToggle: () => void
    activeTab: "elements" | "pages"
    onTabChange: (tab: "elements" | "pages") => void
    pages: FormPage[]
    currentPageIndex: number
    onPageChange: (index: number) => void
    onAddPage: () => void
    onUpdatePage: (pageIndex: number, updates: Partial<FormPage>) => void
    onDeletePage: (index: number) => void
    onMovePageUp: (index: number) => void
    onMovePageDown: (index: number) => void
    onAddElement: (type: string) => void
    currentPageTitle: string
}

// Enhanced element categories with more options
const elementCategories = [
    {
        name: "Basic",
        elements: [
            { type: "heading", label: "Heading", icon: Heading1, description: "Title text" },
            { type: "paragraph", label: "Paragraph", icon: AlignLeft, description: "Body text" },
            { type: "image", label: "Image", icon: ImageIcon, description: "Picture or graphic" },
        ],
    },
    {
        name: "Input Fields",
        elements: [
            { type: "text", label: "Short Text", icon: Type, description: "Single line answer" },
            { type: "textarea", label: "Long Text", icon: MessageSquare, description: "Multi-line answer" },
            { type: "email", label: "Email", icon: Mail, description: "Email address" },
            { type: "number", label: "Number", icon: Hash, description: "Numeric value" },
            { type: "phone", label: "Phone", icon: Phone, description: "Phone number" },
            { type: "url", label: "Website", icon: LinkIcon, description: "URL/Link" },
        ],
    },
    {
        name: "Selection",
        elements: [
            { type: "select", label: "Dropdown", icon: List, description: "Select from list" },
            { type: "radio", label: "Multiple Choice", icon: Circle, description: "Single selection" },
            { type: "checkbox", label: "Checkboxes", icon: CheckSquare, description: "Multi selection" },
            { type: "rating", label: "Rating", icon: Star, description: "Star rating" },
        ],
    },
    {
        name: "Advanced",
        elements: [
            { type: "date", label: "Date", icon: Calendar, description: "Date picker" },
            { type: "file", label: "File Upload", icon: Upload, description: "Upload files" },
            { type: "toggle", label: "Toggle", icon: ToggleLeft, description: "Yes/No switch" },
        ],
    },
    {
        name: "Actions",
        elements: [
            { type: "start-button", label: "Start Button", icon: Play, description: "Begin form" },
            { type: "submit-button", label: "Submit", icon: FileText, description: "Submit form" },
        ],
    },
]

function DraggableElementCard({
    element,
    onAddElement,
}: {
    element: { type: string; label: string; icon: React.ElementType; description: string }
    onAddElement: (type: string) => void
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
            ref={drag as any}
            onClick={() => onAddElement(element.type)}
            className={`group flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-all duration-200 ${isDragging
                    ? "opacity-40 scale-95"
                    : "hover:bg-violet-50 hover:shadow-sm active:scale-98"
                }`}
        >
            <div className="w-9 h-9 rounded-lg bg-slate-100 group-hover:bg-violet-100 flex items-center justify-center transition-colors">
                <element.icon className="h-4 w-4 text-slate-600 group-hover:text-violet-600" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900">{element.label}</p>
                <p className="text-xs text-slate-500 truncate">{element.description}</p>
            </div>
        </div>
    )
}

export function ToolboxPanel({
    isOpen,
    onToggle,
    activeTab,
    onTabChange,
    pages,
    currentPageIndex,
    onPageChange,
    onAddPage,
    onUpdatePage,
    onDeletePage,
    onMovePageUp,
    onMovePageDown,
    onAddElement,
    currentPageTitle,
}: ToolboxPanelProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [editingPageIndex, setEditingPageIndex] = useState<number | null>(null)
    const [tempPageTitle, setTempPageTitle] = useState("")
    const [expandedCategories, setExpandedCategories] = useState<string[]>(elementCategories.map((c) => c.name))

    const filteredCategories = elementCategories.map((category) => ({
        ...category,
        elements: category.elements.filter(
            (el) =>
                el.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                el.description.toLowerCase().includes(searchTerm.toLowerCase())
        ),
    })).filter((category) => category.elements.length > 0)

    const toggleCategory = (name: string) => {
        setExpandedCategories((prev) =>
            prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
        )
    }

    const handleSavePageTitle = () => {
        if (editingPageIndex !== null && tempPageTitle.trim()) {
            onUpdatePage(editingPageIndex, { title: tempPageTitle })
            setEditingPageIndex(null)
        }
    }

    return (
        <>
            {/* Collapsed State Toggle */}
            {!isOpen && (
                <button
                    onClick={onToggle}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-6 h-16 bg-white border border-l-0 border-slate-200 rounded-r-lg shadow-sm flex items-center justify-center hover:bg-slate-50 transition-colors"
                >
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                </button>
            )}

            {/* Panel */}
            <div
                className={`bg-white border-r border-slate-200 flex-shrink-0 flex flex-col transition-all duration-300 ${isOpen ? "w-72" : "w-0 overflow-hidden"
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                    <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
                        <button
                            onClick={() => onTabChange("elements")}
                            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${activeTab === "elements"
                                    ? "bg-white text-slate-900 shadow-sm"
                                    : "text-slate-600 hover:text-slate-900"
                                }`}
                        >
                            Elements
                        </button>
                        <button
                            onClick={() => onTabChange("pages")}
                            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${activeTab === "pages"
                                    ? "bg-white text-slate-900 shadow-sm"
                                    : "text-slate-600 hover:text-slate-900"
                                }`}
                        >
                            Pages
                        </button>
                    </div>
                    <button
                        onClick={onToggle}
                        className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                    {activeTab === "elements" ? (
                        <div className="p-3">
                            {/* Search */}
                            <div className="relative mb-4">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input
                                    placeholder="Search elements..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-9 h-9 text-sm bg-slate-50 border-slate-200 focus:bg-white"
                                />
                            </div>

                            {/* Categories */}
                            <div className="space-y-4">
                                {filteredCategories.map((category) => (
                                    <div key={category.name}>
                                        <button
                                            onClick={() => toggleCategory(category.name)}
                                            className="flex items-center justify-between w-full px-2 py-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider hover:text-slate-700"
                                        >
                                            {category.name}
                                            <ChevronDown
                                                className={`h-3.5 w-3.5 transition-transform ${expandedCategories.includes(category.name) ? "" : "-rotate-90"
                                                    }`}
                                            />
                                        </button>
                                        {expandedCategories.includes(category.name) && (
                                            <div className="mt-1 space-y-0.5">
                                                {category.elements.map((element) => (
                                                    <DraggableElementCard
                                                        key={element.type}
                                                        element={element}
                                                        onAddElement={onAddElement}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="p-3">
                            {/* Add Page Button */}
                            <Button
                                onClick={onAddPage}
                                variant="outline"
                                size="sm"
                                className="w-full mb-4 h-9 text-sm border-dashed border-slate-300 text-slate-600 hover:text-violet-600 hover:border-violet-400 hover:bg-violet-50"
                            >
                                <Plus className="h-4 w-4 mr-1.5" />
                                Add New Page
                            </Button>

                            {/* Pages List */}
                            <div className="space-y-2">
                                {pages.map((page, index) => (
                                    <div
                                        key={page.id}
                                        onClick={() => onPageChange(index)}
                                        className={`group relative p-3 rounded-lg cursor-pointer transition-all ${index === currentPageIndex
                                                ? "bg-violet-50 border border-violet-200 shadow-sm"
                                                : "bg-slate-50 border border-transparent hover:border-slate-200 hover:bg-white"
                                            }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-medium ${index === currentPageIndex
                                                    ? "bg-violet-600 text-white"
                                                    : "bg-slate-200 text-slate-600"
                                                }`}>
                                                {index + 1}
                                            </div>
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
                                                        className="h-6 text-sm px-1"
                                                        autoFocus
                                                        onClick={(e) => e.stopPropagation()}
                                                    />
                                                ) : (
                                                    <p
                                                        className="text-sm font-medium text-slate-900 truncate"
                                                        onDoubleClick={(e) => {
                                                            e.stopPropagation()
                                                            setEditingPageIndex(index)
                                                            setTempPageTitle(page.title)
                                                        }}
                                                    >
                                                        {page.title}
                                                    </p>
                                                )}
                                                <div className="flex items-center gap-1.5 mt-0.5">
                                                    <span className={`text-xs capitalize ${page.type === "welcome" ? "text-emerald-600" :
                                                            page.type === "ending" ? "text-violet-600" : "text-slate-500"
                                                        }`}>
                                                        {page.type}
                                                    </span>
                                                    <span className="text-slate-300">•</span>
                                                    <span className="text-xs text-slate-400">
                                                        {page.sections.reduce((acc, s) => acc + s.elements.length, 0)} fields
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Page Actions */}
                                        <div className="absolute top-2 right-2 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); onMovePageUp(index) }}
                                                className="p-1 rounded hover:bg-slate-200 disabled:opacity-30"
                                                disabled={index === 0}
                                            >
                                                <ChevronUp className="h-3 w-3 text-slate-500" />
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); onMovePageDown(index) }}
                                                className="p-1 rounded hover:bg-slate-200 disabled:opacity-30"
                                                disabled={index === pages.length - 1}
                                            >
                                                <ChevronDown className="h-3 w-3 text-slate-500" />
                                            </button>
                                            {pages.length > 1 && (
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); onDeletePage(index) }}
                                                    className="p-1 rounded hover:bg-red-100 text-slate-400 hover:text-red-600"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
