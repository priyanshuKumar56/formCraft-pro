"use client"

import { useRef } from "react"
import { useDrag, useDrop } from "react-dnd"
import { FormElement } from "./form-element"
import type { FormElement as FormElementType } from "@/types/form"
import { GripVertical } from "lucide-react"

interface DraggableFormElementProps {
  element: FormElementType
  index: number
  isSelected: boolean
  onSelect: () => void
  onUpdate: (updates: Partial<FormElementType>) => void
  onDelete: () => void
  onMoveElement: (dragIndex: number, hoverIndex: number) => void
  pageType?: string
}

interface DragItem {
  type: string
  index: number
  id: string
}

export function DraggableFormElement({
  element,
  index,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
  onMoveElement,
  pageType = "form",
}: DraggableFormElementProps) {
  const ref = useRef<HTMLDivElement>(null)

  const [{ handlerId }, drop] = useDrop({
    accept: "form-element-reorder",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      onMoveElement(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag, preview] = useDrag({
    type: "form-element-reorder",
    item: () => {
      return { id: element.id, index, type: "form-element-reorder" }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0.4 : 1
  drag(drop(ref))

  return (
    <div
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
      className={`group relative transition-all duration-300 ${isDragging ? "scale-105 shadow-2xl z-50" : ""} ${
        isSelected ? "ring-2 ring-blue-500 ring-offset-2 shadow-lg" : "hover:shadow-md"
      }`}
    >
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg" />

      {/* Drag Handle */}
      <div className="absolute left-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <div className="p-1 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200/50 shadow-sm cursor-grab active:cursor-grabbing">
          <GripVertical className="h-4 w-4 text-gray-400" />
        </div>
      </div>

      {/* Element Content */}
      <div className="relative pl-8">
        <FormElement
          element={element}
          index={index}
          isSelected={isSelected}
          onSelect={onSelect}
          onUpdate={onUpdate}
          onDelete={onDelete}
          pageType={pageType}
        />
      </div>

      {/* Glassmorphism Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  )
}
