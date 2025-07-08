"use client"

import { useRef, useCallback } from "react"
import { useDrop } from "react-dnd"
import type { FormPage } from "@/types/form"
import { DraggableFormElement } from "./draggable-form-element"
import { Plus, MousePointer, Sparkles } from "lucide-react"

interface FormCanvasProps {
  currentPage: FormPage
  selectedElement: string | null
  onSelectElement: (id: string | null) => void
  onUpdateElement: (id: string, updates: Partial<any>) => void
  onDeleteElement: (id: string) => void
  onAddElement: (type: string, position?: number) => void
  onMoveElement: (dragIndex: number, hoverIndex: number) => void
}

export function FormCanvas({
  currentPage,
  selectedElement,
  onSelectElement,
  onUpdateElement,
  onDeleteElement,
  onAddElement,
  onMoveElement,
}: FormCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null)

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "form-element",
    drop: (item: { elementType: string }, monitor) => {
      if (monitor.didDrop()) return // Prevent double handling

      console.log("Dropping element:", item.elementType, "on page:", currentPage.title)
      onAddElement(item.elementType)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
    }),
  }))

  const moveElement = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      onMoveElement(dragIndex, hoverIndex)
    },
    [onMoveElement],
  )

  drop(canvasRef)

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 overflow-y-auto relative">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto py-8 px-6 min-h-full">
        {/* Page Header with Glassmorphism */}
        <div className="mb-8 p-6 bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentPage.title}</h2>
              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 bg-blue-100/80 text-blue-800 text-sm font-medium rounded-full capitalize">
                  {currentPage.type} page
                </span>
                <span className="text-sm text-gray-600">
                  {currentPage.elements.length} element{currentPage.elements.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div
          ref={canvasRef}
          className={`min-h-[600px] space-y-6 transition-all duration-300 ${
            isOver && canDrop
              ? "bg-blue-100/50 border-2 border-dashed border-blue-400 rounded-2xl p-6 backdrop-blur-sm"
              : canDrop
                ? "border-2 border-dashed border-gray-300/50 rounded-2xl p-6"
                : ""
          }`}
        >
          {currentPage.elements.length === 0 ? (
            <div className="text-center py-20">
              <div className="relative">
                {/* Glassmorphism Empty State */}
                <div className="p-8 bg-white/60 backdrop-blur-lg rounded-3xl border border-white/30 shadow-2xl max-w-md mx-auto">
                  <div className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                    {isOver ? (
                      <Plus className="h-12 w-12 text-blue-500 animate-pulse" />
                    ) : (
                      <MousePointer className="h-12 w-12 text-gray-400" />
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {currentPage.type === "welcome" ? "Create your welcome screen" : "Start building your form"}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {currentPage.type === "welcome"
                      ? "Welcome screens help you introduce your form and set expectations for your users."
                      : "Drag elements from the sidebar or click on any element type to add it to your form."}
                  </p>
                  {isOver && (
                    <div className="bg-blue-100/80 backdrop-blur-sm border border-blue-300/50 rounded-xl p-4">
                      <p className="text-blue-800 font-medium">Drop here to add element to {currentPage.title}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {currentPage.elements.map((element, index) => (
                <DraggableFormElement
                  key={element.id}
                  element={element}
                  index={index}
                  isSelected={selectedElement === element.id}
                  onSelect={() => onSelectElement(element.id)}
                  onUpdate={(updates) => onUpdateElement(element.id, updates)}
                  onDelete={() => onDeleteElement(element.id)}
                  onMoveElement={moveElement}
                  pageType={currentPage.type}
                />
              ))}

              {/* Drop zone at the end with glassmorphism */}
              <div
                className={`h-16 border-2 border-dashed rounded-xl flex items-center justify-center transition-all backdrop-blur-sm ${
                  isOver
                    ? "border-blue-400 bg-blue-100/50"
                    : "border-gray-300/50 hover:border-gray-400/50 hover:bg-white/30"
                }`}
              >
                <p className="text-sm text-gray-500 font-medium">
                  {isOver ? `Drop element here to add to ${currentPage.title}` : "Drag elements here to add them"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
