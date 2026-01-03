"use client"

import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { FormBuilderRedesign } from "@/components/form-builder-redesign"

export default function BuilderPage() {
  return (
    <DndProvider backend={HTML5Backend}>
      <FormBuilderRedesign />
    </DndProvider>
  )
}
