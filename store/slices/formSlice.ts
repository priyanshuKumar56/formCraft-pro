import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { FormData, FormElement, FormPage, FormSection } from "@/types/form"
import { generateId } from "@/lib/utils"

interface FormState {
  formData: FormData
  currentPageIndex: number
  selectedElement: string | null
  settingsSidebarOpen: boolean
  activeTab: "create" | "workflow" | "connect" | "results"
  shareableLink: string | null
  isPublished: boolean
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
  currentPageIndex: 0,
  selectedElement: null,
  settingsSidebarOpen: true,
  activeTab: "create",
  shareableLink: null,
  isPublished: false,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    // Form data actions
    setFormData: (state, action: PayloadAction<FormData>) => {
      state.formData = action.payload
    },

    setCurrentPageIndex: (state, action: PayloadAction<number>) => {
      state.currentPageIndex = action.payload
    },

    setSelectedElement: (state, action: PayloadAction<string | null>) => {
      state.selectedElement = action.payload
    },

    setSettingsSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.settingsSidebarOpen = action.payload
    },

    setActiveTab: (state, action: PayloadAction<"create" | "workflow" | "connect" | "results">) => {
      state.activeTab = action.payload
    },

    // Element actions
    addElement: (state, action: PayloadAction<{ type: string; position?: number; sectionId?: string }>) => {
      const { type, position, sectionId } = action.payload
      const newElement: FormElement = {
        id: generateId(),
        type,
        label: getDefaultLabel(type, state.formData.pages[state.currentPageIndex]?.type === "welcome"),
        placeholder: getDefaultPlaceholder(type),
        required: false,
      }
      
      const currentPage = state.formData.pages[state.currentPageIndex]
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

      state.selectedElement = newElement.id
    },

    updateElement: (state, action: PayloadAction<{ id: string; updates: Partial<FormElement> }>) => {
      const { id, updates } = action.payload
      const currentPage = state.formData.pages[state.currentPageIndex]
      
      // Find element in any section
      for (const section of currentPage.sections) {
        const elementIndex = section.elements.findIndex((el) => el.id === id)
        if (elementIndex !== -1) {
          section.elements[elementIndex] = { ...section.elements[elementIndex], ...updates }
          break
        }
      }
    },

    deleteElement: (state, action: PayloadAction<string>) => {
      const elementId = action.payload
      const currentPage = state.formData.pages[state.currentPageIndex]
      
      // Remove element from any section
      for (const section of currentPage.sections) {
        section.elements = section.elements.filter((el) => el.id !== elementId)
      }

      if (state.selectedElement === elementId) {
        state.selectedElement = null
      }
    },

    removeElement: (state, action: PayloadAction<string>) => {
      const elementId = action.payload
      const currentPage = state.formData.pages[state.currentPageIndex]
      
      // Remove element from any section
      for (const section of currentPage.sections) {
        section.elements = section.elements.filter((el) => el.id !== elementId)
      }

      if (state.selectedElement === elementId) {
        state.selectedElement = null
      }
    },

    reorderElements: (state, action: PayloadAction<{ dragIndex: number; hoverIndex: number; sectionId?: string }>) => {
      const { dragIndex, hoverIndex, sectionId } = action.payload
      const currentPage = state.formData.pages[state.currentPageIndex]
      const targetSection = sectionId 
        ? currentPage.sections.find(s => s.id === sectionId)
        : currentPage.sections.find(s => s.type === "input-zone") || currentPage.sections[0]
      
      if (targetSection) {
        const draggedElement = targetSection.elements[dragIndex]
        targetSection.elements.splice(dragIndex, 1)
        targetSection.elements.splice(hoverIndex, 0, draggedElement)
      }
    },

    moveElement: (state, action: PayloadAction<{ dragIndex: number; hoverIndex: number; sectionId?: string }>) => {
      const { dragIndex, hoverIndex, sectionId } = action.payload
      const currentPage = state.formData.pages[state.currentPageIndex]
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
      state.currentPageIndex = state.formData.pages.length - 1
      state.selectedElement = null
    },

    // Section actions
    addSection: (state, action: PayloadAction<{ type: "container" | "input-zone" }>) => {
      const { type } = action.payload
      const currentPage = state.formData.pages[state.currentPageIndex]
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

    updateSection: (state, action: PayloadAction<{ sectionId: string; updates: Partial<FormSection> }>) => {
      const { sectionId, updates } = action.payload
      const currentPage = state.formData.pages[state.currentPageIndex]
      const section = currentPage.sections.find(s => s.id === sectionId)
      if (section) {
        Object.assign(section, updates)
      }
    },

    deleteSection: (state, action: PayloadAction<string>) => {
      const sectionId = action.payload
      const currentPage = state.formData.pages[state.currentPageIndex]
      currentPage.sections = currentPage.sections.filter(s => s.id !== sectionId)
      state.selectedElement = null
    },

    moveSection: (state, action: PayloadAction<{ dragIndex: number; hoverIndex: number }>) => {
      const { dragIndex, hoverIndex } = action.payload
      const currentPage = state.formData.pages[state.currentPageIndex]
      const draggedSection = currentPage.sections[dragIndex]
      currentPage.sections.splice(dragIndex, 1)
      currentPage.sections.splice(hoverIndex, 0, draggedSection)
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

      if (state.currentPageIndex >= pageIndex && state.currentPageIndex > 0) {
        state.currentPageIndex = state.currentPageIndex - 1
      }
      state.selectedElement = null
    },

    removePage: (state, action: PayloadAction<number>) => {
      const pageIndex = action.payload
      if (state.formData.pages.length <= 1) return

      state.formData.pages.splice(pageIndex, 1)

      if (state.currentPageIndex >= pageIndex && state.currentPageIndex > 0) {
        state.currentPageIndex = state.currentPageIndex - 1
      }
      state.selectedElement = null
    },

    reorderPages: (state, action: PayloadAction<{ dragIndex: number; hoverIndex: number }>) => {
      const { dragIndex, hoverIndex } = action.payload
      const pages = state.formData.pages
      const draggedPage = pages[dragIndex]

      // Remove the dragged page
      pages.splice(dragIndex, 1)
      // Insert it at the new position
      pages.splice(hoverIndex, 0, draggedPage)

      // Update current page index if necessary
      if (state.currentPageIndex === dragIndex) {
        state.currentPageIndex = hoverIndex
      } else if (dragIndex < state.currentPageIndex && hoverIndex >= state.currentPageIndex) {
        state.currentPageIndex = state.currentPageIndex - 1
      } else if (dragIndex > state.currentPageIndex && hoverIndex <= state.currentPageIndex) {
        state.currentPageIndex = state.currentPageIndex + 1
      }
    },

    setActivePage: (state, action: PayloadAction<number>) => {
      const pageIndex = action.payload
      if (pageIndex >= 0 && pageIndex < state.formData.pages.length) {
        state.currentPageIndex = pageIndex
        state.selectedElement = null
      }
    },

    movePageUp: (state, action: PayloadAction<number>) => {
      const pageIndex = action.payload
      if (pageIndex === 0) return

      const pages = state.formData.pages
      const temp = pages[pageIndex]
      pages[pageIndex] = pages[pageIndex - 1]
      pages[pageIndex - 1] = temp

      if (state.currentPageIndex === pageIndex) {
        state.currentPageIndex = pageIndex - 1
      } else if (state.currentPageIndex === pageIndex - 1) {
        state.currentPageIndex = pageIndex
      }
    },

    movePageDown: (state, action: PayloadAction<number>) => {
      const pageIndex = action.payload
      if (pageIndex === state.formData.pages.length - 1) return

      const pages = state.formData.pages
      const temp = pages[pageIndex]
      pages[pageIndex] = pages[pageIndex + 1]
      pages[pageIndex + 1] = temp

      if (state.currentPageIndex === pageIndex) {
        state.currentPageIndex = pageIndex + 1
      } else if (state.currentPageIndex === pageIndex + 1) {
        state.currentPageIndex = pageIndex
      }
    },

    updateFormSettings: (state, action: PayloadAction<Partial<FormData["settings"]>>) => {
      state.formData.settings = { ...state.formData.settings, ...action.payload }
    },

    updateTheme: (state, action: PayloadAction<{ theme: string }>) => {
      state.formData.settings.theme = action.payload.theme
    },

    setFormTitle: (state, action: PayloadAction<string>) => {
      state.formData.title = action.payload
    },

    setFormDescription: (state, action: PayloadAction<string>) => {
      state.formData.description = action.payload
    },

    publishForm: (state) => {
      state.isPublished = true
      state.shareableLink = `${window.location.origin}/form/${state.formData.id}`
    },

    unpublishForm: (state) => {
      state.isPublished = false
      state.shareableLink = null
    },
  },
})

// Helper functions
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
  setCurrentPageIndex,
  setSelectedElement,
  setSettingsSidebarOpen,
  setActiveTab,
  addElement,
  updateElement,
  deleteElement,
  removeElement,
  moveElement,
  reorderElements,
  addPage,
  updatePage,
  deletePage,
  removePage,
  movePageUp,
  movePageDown,
  reorderPages,
  setActivePage,
  updateFormSettings,
  updateTheme,
  setFormTitle,
  setFormDescription,
  addSection,
  updateSection,
  deleteSection,
  moveSection,
  publishForm,
  unpublishForm,
} = formSlice.actions

export default formSlice.reducer
