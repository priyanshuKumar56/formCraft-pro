import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { FormData, FormElement, FormPage, FormSection } from "@/types/form"
import { generateId } from "@/lib/utils"

interface FormState {
  formData: FormData
}

const initialState: FormState = {
  formData: {
    id: generateId(),
    title: "Lead Generation Form",
    description: "Welcome to our form",
    pages: [
      {
        id: generateId(),
        title: "Welcome",
        type: "welcome",
        layout: {
          canvasBackground: "#f8fafc",
          canvasGradient: { enabled: false, type: "linear", colors: ["#f8fafc", "#e2e8f0"], angle: 180 },
          maxWidth: "md",
          backgroundColor: "#ffffff",
          backgroundGradient: { enabled: false, type: "linear", colors: ["#ffffff", "#f8fafc"], angle: 180 },
          borderColor: "#e2e8f0",
          borderWidth: 1,
          borderRadius: 24,
          shadow: { enabled: true, x: 0, y: 20, blur: 50, spread: -10, color: "rgba(0,0,0,0.08)" },
          padding: { top: 40, right: 32, bottom: 40, left: 32 },
          textColor: "#0f172a",
          buttonColor: "#0f172a",
          buttonTextColor: "#ffffff",
          alignment: "center",
        },
        sections: [
          {
            id: generateId(),
            type: "container",
            title: "Welcome Content",
            layout: {
              width: "full",
              padding: { top: 24, right: 24, bottom: 24, left: 24 },
              margin: { top: 0, right: 0, bottom: 16, left: 0 },
              backgroundColor: "#f8fafc",
              backgroundGradient: { enabled: false, type: "linear", colors: ["#ffffff", "#f1f5f9"], angle: 180 },
              glassmorphism: { enabled: false, blur: 10, opacity: 0.8 },
              borderColor: "#e2e8f0",
              borderWidth: 1,
              borderRadius: 16,
              shadow: { enabled: false, x: 0, y: 4, blur: 20, spread: 0, color: "rgba(0,0,0,0.05)" },
              alignment: "center",
              direction: "column",
              gap: 16,
            },
            elements: [
              {
                id: generateId(),
                type: "heading",
                label: "Welcome! Let's get started",
                required: false,
              },
              {
                id: generateId(),
                type: "paragraph",
                label: "This will only take a few minutes to complete.",
                required: false,
              },
            ],
            children: [],
          },
        ],
      },
      {
        id: generateId(),
        title: "Personal Info",
        type: "form",
        layout: {
          canvasBackground: "#f8fafc",
          canvasGradient: { enabled: false, type: "linear", colors: ["#f8fafc", "#e2e8f0"], angle: 180 },
          maxWidth: "md",
          backgroundColor: "#ffffff",
          backgroundGradient: { enabled: false, type: "linear", colors: ["#ffffff", "#f8fafc"], angle: 180 },
          borderColor: "#e2e8f0",
          borderWidth: 1,
          borderRadius: 24,
          shadow: { enabled: true, x: 0, y: 20, blur: 50, spread: -10, color: "rgba(0,0,0,0.08)" },
          padding: { top: 40, right: 32, bottom: 40, left: 32 },
          textColor: "#0f172a",
          buttonColor: "#0f172a",
          buttonTextColor: "#ffffff",
          alignment: "center",
        },
        sections: [
          {
            id: generateId(),
            type: "input-zone",
            title: "Personal Information",
            layout: {
              width: "full",
              padding: { top: 24, right: 24, bottom: 24, left: 24 },
              margin: { top: 0, right: 0, bottom: 16, left: 0 },
              backgroundColor: "#ffffff",
              backgroundGradient: { enabled: false, type: "linear", colors: ["#ffffff", "#f8fafc"], angle: 180 },
              glassmorphism: { enabled: false, blur: 10, opacity: 0.8 },
              borderColor: "#e2e8f0",
              borderWidth: 1,
              borderRadius: 16,
              shadow: { enabled: true, x: 0, y: 10, blur: 30, spread: -5, color: "rgba(0,0,0,0.03)" },
              alignment: "left",
              direction: "column",
              gap: 20,
            },
            elements: [
              {
                id: generateId(),
                type: "text",
                label: "What's your name?",
                placeholder: "Enter your full name",
                required: true,
              },
              {
                id: generateId(),
                type: "email",
                label: "What's your email address?",
                placeholder: "name@example.com",
                required: true,
              },
            ],
            children: [],
          },
        ],
      },
    ],
    settings: {
      theme: "default",
      headerStyle: "gradient",
      showLogo: true,
      backgroundColor: "#ffffff",
      textColor: "#000000",
    },
  },
}

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<FormData>) => {
      state.formData = action.payload
    },

    // Element actions
    addElement: (state, action: PayloadAction<{ id: string; type: string; pageIndex: number; position?: number; sectionId?: string }>) => {
      const { id, type, pageIndex, position, sectionId } = action.payload
      const newElement: FormElement = {
        id,
        type,
        label: getDefaultLabel(type, state.formData.pages[pageIndex]?.type === "welcome"),
        placeholder: getDefaultPlaceholder(type),
        required: false,
      }
      
      const currentPage = state.formData.pages[pageIndex]
      if (!currentPage) return

      const targetSection = sectionId 
        ? currentPage.sections.find(s => s.id === sectionId)
        : currentPage.sections.find(s => s.type === "input-zone") || currentPage.sections[0]
      
      if (targetSection) {
        if (position !== undefined) {
          targetSection.elements.splice(position, 0, newElement)
        } else {
          targetSection.elements.push(newElement)
        }
      }
    },

    updateElement: (state, action: PayloadAction<{ id: string; pageIndex: number; updates: Partial<FormElement> }>) => {
      const { id, pageIndex, updates } = action.payload
      const currentPage = state.formData.pages[pageIndex]
      if (!currentPage) return
      
      for (const section of currentPage.sections) {
        const elementIndex = section.elements.findIndex((el) => el.id === id)
        if (elementIndex !== -1) {
          section.elements[elementIndex] = { ...section.elements[elementIndex], ...updates }
          break
        }
      }
    },

    deleteElement: (state, action: PayloadAction<{ id: string; pageIndex: number }>) => {
      const { id, pageIndex } = action.payload
      const currentPage = state.formData.pages[pageIndex]
      if (!currentPage) return
      
      for (const section of currentPage.sections) {
        section.elements = section.elements.filter((el) => el.id !== id)
      }
    },

    reorderElements: (state, action: PayloadAction<{ dragIndex: number; hoverIndex: number; pageIndex: number; sectionId?: string }>) => {
      const { dragIndex, hoverIndex, pageIndex, sectionId } = action.payload
      const currentPage = state.formData.pages[pageIndex]
      if (!currentPage) return

      const targetSection = sectionId 
        ? currentPage.sections.find(s => s.id === sectionId)
        : currentPage.sections.find(s => s.type === "input-zone") || currentPage.sections[0]
      
      if (targetSection) {
        const draggedElement = targetSection.elements[dragIndex]
        targetSection.elements.splice(dragIndex, 1)
        targetSection.elements.splice(hoverIndex, 0, draggedElement)
      }
    },

    addPage: (state) => {
      const newPage: FormPage = {
        id: generateId(),
        title: `Page ${state.formData.pages.length + 1}`,
        type: "form",
        layout: {
          canvasBackground: "#f8fafc",
          canvasGradient: { enabled: false, type: "linear", colors: ["#f8fafc", "#e2e8f0"], angle: 180 },
          maxWidth: "md",
          backgroundColor: "#ffffff",
          backgroundGradient: { enabled: false, type: "linear", colors: ["#ffffff", "#f8fafc"], angle: 180 },
          borderColor: "#e2e8f0",
          borderWidth: 1,
          borderRadius: 24,
          shadow: { enabled: true, x: 0, y: 20, blur: 50, spread: -10, color: "rgba(0,0,0,0.08)" },
          padding: { top: 40, right: 32, bottom: 40, left: 32 },
          textColor: "#0f172a",
          buttonColor: "#0f172a",
          buttonTextColor: "#ffffff",
          alignment: "center",
        },
        sections: [
          {
            id: generateId(),
            type: "input-zone",
            title: "Form Fields",
            layout: {
              width: "full",
              padding: { top: 32, right: 32, bottom: 32, left: 32 },
              margin: { top: 0, right: 0, bottom: 16, left: 0 },
              backgroundColor: "#ffffff",
              backgroundGradient: { enabled: false, type: "linear", colors: ["#ffffff", "#f8fafc"], angle: 180 },
              glassmorphism: { enabled: false, blur: 10, opacity: 0.8 },
              borderColor: "#e2e8f0",
              borderWidth: 1,
              borderRadius: 20,
              shadow: { enabled: true, x: 0, y: 10, blur: 40, spread: -10, color: "rgba(0,0,0,0.05)" },
              alignment: "left",
              direction: "column",
              gap: 24,
            },
            elements: [],
            children: [],
          },
        ],
      }
      state.formData.pages.push(newPage)
    },

    updatePage: (state, action: PayloadAction<{ pageIndex: number; updates: Partial<FormPage> }>) => {
      const { pageIndex, updates } = action.payload
      if (pageIndex >= 0 && pageIndex < state.formData.pages.length) {
        state.formData.pages[pageIndex] = { ...state.formData.pages[pageIndex], ...updates }
      }
    },

    deletePage: (state, action: PayloadAction<number>) => {
      const pageIndex = action.payload
      if (state.formData.pages.length <= 1) return
      state.formData.pages.splice(pageIndex, 1)
    },

    reorderPages: (state, action: PayloadAction<{ dragIndex: number; hoverIndex: number }>) => {
      const { dragIndex, hoverIndex } = action.payload
      const pages = state.formData.pages
      const draggedPage = pages[dragIndex]
      pages.splice(dragIndex, 1)
      pages.splice(hoverIndex, 0, draggedPage)
    },

    movePageUp: (state, action: PayloadAction<number>) => {
      const pageIndex = action.payload
      if (pageIndex === 0) return
      const pages = state.formData.pages
      const temp = pages[pageIndex]
      pages[pageIndex] = pages[pageIndex - 1]
      pages[pageIndex - 1] = temp
    },

    movePageDown: (state, action: PayloadAction<number>) => {
      const pageIndex = action.payload
      if (pageIndex === state.formData.pages.length - 1) return
      const pages = state.formData.pages
      const temp = pages[pageIndex]
      pages[pageIndex] = pages[pageIndex + 1]
      pages[pageIndex + 1] = temp
    },

    // Section actions
    addSection: (state, action: PayloadAction<{ pageIndex: number; type: "container" | "input-zone" }>) => {
      const { pageIndex, type } = action.payload
      const currentPage = state.formData.pages[pageIndex]
      if (!currentPage) return

      const newSection: FormSection = {
        id: generateId(),
        type,
        title: type === "input-zone" ? "Input Zone" : "Container",
        layout: {
          width: "full",
          padding: { top: 32, right: 32, bottom: 32, left: 32 },
          margin: { top: 0, right: 0, bottom: 24, left: 0 },
          backgroundColor: type === "container" ? "#f8fafc" : "#ffffff",
          backgroundGradient: { enabled: false, type: "linear", colors: ["#ffffff", "#f1f5f9"], angle: 180 },
          glassmorphism: { enabled: false, blur: 10, opacity: 0.8 },
          borderColor: "#e2e8f0",
          borderWidth: 1,
          borderRadius: 24,
          shadow: { 
            enabled: type === "input-zone", 
            x: 0, y: 12, blur: 40, spread: -8, 
            color: "rgba(0,0,0,0.04)" 
          },
          alignment: "center",
          direction: "column",
          gap: type === "input-zone" ? 24 : 16,
        },
        elements: [],
        children: [],
      }
      currentPage.sections.push(newSection)
    },

    updateSection: (state, action: PayloadAction<{ pageIndex: number; sectionId: string; updates: Partial<FormSection> }>) => {
      const { pageIndex, sectionId, updates } = action.payload
      const currentPage = state.formData.pages[pageIndex]
      if (!currentPage) return
      const section = currentPage.sections.find(s => s.id === sectionId)
      if (section) {
        Object.assign(section, updates)
      }
    },

    deleteSection: (state, action: PayloadAction<{ pageIndex: number; sectionId: string }>) => {
      const { pageIndex, sectionId } = action.payload
      const currentPage = state.formData.pages[pageIndex]
      if (!currentPage) return
      currentPage.sections = currentPage.sections.filter(s => s.id !== sectionId)
    },

    moveSection: (state, action: PayloadAction<{ pageIndex: number; dragIndex: number; hoverIndex: number }>) => {
      const { pageIndex, dragIndex, hoverIndex } = action.payload
      const currentPage = state.formData.pages[pageIndex]
      if (!currentPage) return
      const draggedSection = currentPage.sections[dragIndex]
      currentPage.sections.splice(dragIndex, 1)
      currentPage.sections.splice(hoverIndex, 0, draggedSection)
    },

    updateFormSettings: (state, action: PayloadAction<Partial<FormData["settings"]>>) => {
      state.formData.settings = { ...state.formData.settings, ...action.payload }
    },

    setFormTitle: (state, action: PayloadAction<string>) => {
      state.formData.title = action.payload
    },

    setFormDescription: (state, action: PayloadAction<string>) => {
      state.formData.description = action.payload
    },
  },
})

// Helper functions (kept outside the slice for reuse if needed)
function getDefaultLabel(type: string, isWelcomePage = false): string {
  if (isWelcomePage) {
    const welcomeLabels: Record<string, string> = {
      heading: "Welcome to our form",
      paragraph: "This will only take a few minutes to complete.",
      image: "Welcome Image",
      "start-button": "Get Started",
    }
    return welcomeLabels[type] || "Welcome Element"
  }

  const labels: Record<string, string> = {
    text: "What's your answer?",
    email: "What's your email address?",
    number: "Enter a number",
    textarea: "Tell us more",
    select: "Choose an option",
    radio: "Select one option",
    checkbox: "Select all that apply",
    date: "Select a date",
    file: "Upload a file",
    heading: "Question title",
    paragraph: "Description",
  }
  return labels[type] || "Question"
}

function getDefaultPlaceholder(type: string): string {
  const placeholders: Record<string, string> = {
    text: "Type your answer here...",
    email: "name@example.com",
    number: "Enter a number...",
    textarea: "Type your answer here...",
    date: "mm/dd/yyyy",
    file: "Choose file...",
  }
  return placeholders[type] || ""
}

export const {
  setFormData,
  addElement,
  updateElement,
  deleteElement,
  reorderElements,
  addPage,
  updatePage,
  deletePage,
  reorderPages,
  movePageUp,
  movePageDown,
  updateFormSettings,
  setFormTitle,
  setFormDescription,
  addSection,
  updateSection,
  deleteSection,
  moveSection,
} = formSlice.actions

export default formSlice.reducer
