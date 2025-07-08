"use client"

import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { FormBuilder } from "@/components/form-builder"

export default function BuilderPage() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen w-screen overflow-hidden">
        <FormBuilder />
      </div>
    </DndProvider>
  )
}
