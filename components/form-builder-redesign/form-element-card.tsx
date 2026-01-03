"use client"

import { useRef } from "react"
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd"
import type { FormElement } from "@/types/form"
import {
    GripVertical,
    Trash2,
    Copy,
    Type,
    Mail,
    Hash,
    MessageSquare,
    Circle,
    CheckSquare,
    Calendar,
    Upload,
    Heading1,
    AlignLeft,
    ImageIcon,
    Play,
    Star,
    Phone,
    Link as LinkIcon,
    ToggleLeft,
    List,
    FileText,
} from "lucide-react"
import { Input } from "@/components/ui/input"

interface FormElementCardProps {
    element: FormElement
    index: number
    isSelected: boolean
    onSelect: () => void
    onUpdate: (updates: Partial<FormElement>) => void
    onDelete: () => void
    onMoveElement: (dragIndex: number, hoverIndex: number) => void
    isFixed: boolean
}

const elementIcons: Record<string, React.ElementType> = {
    heading: Heading1,
    paragraph: AlignLeft,
    image: ImageIcon,
    text: Type,
    textarea: MessageSquare,
    email: Mail,
    number: Hash,
    phone: Phone,
    url: LinkIcon,
    select: List,
    radio: Circle,
    checkbox: CheckSquare,
    rating: Star,
    date: Calendar,
    file: Upload,
    toggle: ToggleLeft,
    "start-button": Play,
    "submit-button": FileText,
}

const elementColors: Record<string, string> = {
    heading: "bg-emerald-500",
    paragraph: "bg-slate-500",
    image: "bg-pink-500",
    text: "bg-violet-500",
    textarea: "bg-indigo-500",
    email: "bg-orange-500",
    number: "bg-cyan-500",
    phone: "bg-teal-500",
    url: "bg-blue-500",
    select: "bg-fuchsia-500",
    radio: "bg-rose-500",
    checkbox: "bg-amber-500",
    rating: "bg-yellow-500",
    date: "bg-red-500",
    file: "bg-lime-500",
    toggle: "bg-sky-500",
    "start-button": "bg-green-500",
    "submit-button": "bg-violet-600",
}

interface DragItem {
    type: string
    index: number
    id: string
}

export function FormElementCard({
    element,
    index,
    isSelected,
    onSelect,
    onUpdate,
    onDelete,
    onMoveElement,
    isFixed,
}: FormElementCardProps) {
    const ref = useRef<HTMLDivElement>(null)

    const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: string | symbol | null }>({
        accept: "form-element-reorder",
        collect(monitor: DropTargetMonitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: DragItem, monitor: DropTargetMonitor) {
            if (!ref.current) return
            const dragIndex = item.index
            const hoverIndex = index

            if (dragIndex === hoverIndex) return

            const hoverBoundingRect = ref.current.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset!.y - hoverBoundingRect.top

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

            onMoveElement(dragIndex, hoverIndex)
            item.index = hoverIndex
        },
    })

    const [{ isDragging }, drag, preview] = useDrag({
        type: "form-element-reorder",
        item: () => ({ id: element.id, index, type: "form-element-reorder" }),
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    drag(drop(ref))

    const Icon = elementIcons[element.type] || Type
    const colorClass = elementColors[element.type] || "bg-slate-500"

    // Render different previews based on element type
    const renderElementPreview = () => {
        switch (element.type) {
            case "heading":
                return (
                    <h3 className="text-lg font-semibold text-slate-900">{element.label}</h3>
                )
            case "paragraph":
                return (
                    <p className="text-sm text-slate-600">{element.label}</p>
                )
            case "image":
                return (
                    <div className={`flex items-center justify-${element.imagePosition || 'center'}`}>
                        <div className="w-full h-32 bg-slate-100 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300">
                            <ImageIcon className="h-8 w-8 text-slate-400" />
                        </div>
                    </div>
                )
            case "start-button":
            case "submit-button":
                return (
                    <button className="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium rounded-lg shadow-sm">
                        {element.label}
                    </button>
                )
            case "rating":
                return (
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">{element.label}</label>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="h-6 w-6 text-slate-300 hover:text-yellow-400 cursor-pointer" />
                            ))}
                        </div>
                    </div>
                )
            case "toggle":
                return (
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-slate-700">{element.label}</label>
                        <div className="w-10 h-6 bg-slate-200 rounded-full relative cursor-pointer">
                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                        </div>
                    </div>
                )
            case "select":
                return (
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">
                            {element.label}
                            {element.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        <div className="h-10 px-3 border border-slate-200 rounded-lg bg-white flex items-center justify-between text-sm text-slate-400">
                            <span>Select an option...</span>
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                )
            case "radio":
                return (
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">
                            {element.label}
                            {element.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        <div className="space-y-2">
                            {(element.options || ["Option 1", "Option 2"]).slice(0, 3).map((option, i) => (
                                <label key={i} className="flex items-center gap-2 cursor-pointer">
                                    <div className="w-4 h-4 rounded-full border-2 border-slate-300" />
                                    <span className="text-sm text-slate-600">{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                )
            case "checkbox":
                return (
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">
                            {element.label}
                            {element.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        <div className="space-y-2">
                            {(element.options || ["Option 1", "Option 2"]).slice(0, 3).map((option, i) => (
                                <label key={i} className="flex items-center gap-2 cursor-pointer">
                                    <div className="w-4 h-4 rounded border-2 border-slate-300" />
                                    <span className="text-sm text-slate-600">{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                )
            case "file":
                return (
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">
                            {element.label}
                            {element.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        <div className="h-20 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center bg-slate-50">
                            <Upload className="h-5 w-5 text-slate-400 mb-1" />
                            <span className="text-xs text-slate-500">Click or drop files</span>
                        </div>
                    </div>
                )
            default:
                return (
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">
                            {element.label}
                            {element.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        <Input
                            type={element.type === "email" ? "email" : element.type === "number" ? "number" : "text"}
                            placeholder={element.placeholder || "Enter your answer..."}
                            className="h-10 text-sm border-slate-200 bg-white"
                            disabled
                        />
                    </div>
                )
        }
    }

    return (
        <div
            ref={ref}
            data-handler-id={handlerId}
            onClick={(e) => {
                e.stopPropagation()
                onSelect()
            }}
            className={`group relative bg-white rounded-xl transition-all duration-200 cursor-pointer ${isDragging
                ? "opacity-50 scale-98 shadow-xl"
                : isSelected
                    ? "ring-2 ring-violet-500 ring-offset-2 shadow-lg"
                    : "hover:shadow-md border border-slate-200 hover:border-slate-300"
                }`}
        >
            {/* Drag Handle */}
            <div className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="p-1 rounded cursor-grab active:cursor-grabbing hover:bg-slate-100">
                    <GripVertical className="h-4 w-4 text-slate-400" />
                </div>
            </div>

            {/* Element Type Badge */}
            <div className={`absolute -top-2 left-10 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium text-white ${colorClass}`}>
                <Icon className="h-2.5 w-2.5" />
                <span className="capitalize">{element.type.replace("-", " ")}</span>
            </div>

            {/* Element Actions */}
            <div className="absolute -top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={(e) => { e.stopPropagation(); /* duplicate logic */ }}
                    className="p-1 bg-white rounded shadow-sm border border-slate-200 hover:bg-slate-50"
                    title="Duplicate"
                >
                    <Copy className="h-3 w-3 text-slate-500" />
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); onDelete() }}
                    className="p-1 bg-white rounded shadow-sm border border-slate-200 hover:bg-red-50 hover:border-red-200"
                    title="Delete"
                >
                    <Trash2 className="h-3 w-3 text-red-500" />
                </button>
            </div>

            {/* Element Content */}
            <div className="pl-10 pr-4 py-4">
                {renderElementPreview()}
            </div>

            {/* Fixed Indicator for Input Zones */}
            {isFixed && (
                <div className="absolute bottom-1 right-2 text-[10px] text-slate-400 font-medium">
                    Fixed Layout
                </div>
            )}
        </div>
    )
}
