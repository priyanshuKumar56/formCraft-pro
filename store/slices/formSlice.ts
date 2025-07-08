import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { FormData, FormElement, FormPage } from "@/types/form"
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
      },
      {
        id: generateId(),
        title: "Personal Info",
        type: "form",
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
      },
    ],
    settings: {
      theme: "modern",
      headerStyle: "gradient",
      showLogo: true,
      backgroundColor: "#ffffff",
      textColor: "#1f2937",
    },
  },
  currentPageIndex: 0,
  selectedElement: null,
  settingsSidebarOpen: true,
  activeTab: "create",
  shareableLink: null,
  isPublished: false,
}

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<FormData>) => {
      state.formData = action.payload
    },

    setCurrentPageIndex: (state, action: PayloadAction<number>) => {
      state.currentPageIndex = action.payload
      state.selectedElement = null
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

    addElement: (state, action: PayloadAction<{ elementType: string; position?: number }>) => {
      const { elementType, position } = action.payload
      const newElement: FormElement = {
        id: generateId(),
        type: elementType,
        label: getDefaultLabel(elementType, state.formData.pages[state.currentPageIndex].type === "welcome"),
        required: false,
        placeholder: getDefaultPlaceholder(elementType),
        imagePosition: elementType === "image" ? "center" : undefined,
        options:
          elementType === "select" || elementType === "radio" || elementType === "checkbox"
            ? ["Option 1", "Option 2", "Option 3"]
            : undefined,
      }

      const currentPage = state.formData.pages[state.currentPageIndex]
      if (position !== undefined) {
        currentPage.elements.splice(position, 0, newElement)
      } else {
        currentPage.elements.push(newElement)
      }

      state.selectedElement = newElement.id
    },

    updateElement: (state, action: PayloadAction<{ id: string; updates: Partial<FormElement> }>) => {
      const { id, updates } = action.payload
      const currentPage = state.formData.pages[state.currentPageIndex]
      const elementIndex = currentPage.elements.findIndex((el) => el.id === id)

      if (elementIndex !== -1) {
        currentPage.elements[elementIndex] = { ...currentPage.elements[elementIndex], ...updates }
      }
    },

    deleteElement: (state, action: PayloadAction<string>) => {
      const elementId = action.payload
      const currentPage = state.formData.pages[state.currentPageIndex]
      currentPage.elements = currentPage.elements.filter((el) => el.id !== elementId)

      if (state.selectedElement === elementId) {
        state.selectedElement = null
      }
    },

    moveElement: (state, action: PayloadAction<{ dragIndex: number; hoverIndex: number }>) => {
      const { dragIndex, hoverIndex } = action.payload
      const currentPage = state.formData.pages[state.currentPageIndex]
      const draggedElement = currentPage.elements[dragIndex]

      // Remove the dragged element
      currentPage.elements.splice(dragIndex, 1)
      // Insert it at the new position
      currentPage.elements.splice(hoverIndex, 0, draggedElement)
    },

    addPage: (state) => {
      const newPage: FormPage = {
        id: generateId(),
        title: `Page ${state.formData.pages.length + 1}`,
        type: "form",
        elements: [],
      }
      state.formData.pages.push(newPage)
      state.currentPageIndex = state.formData.pages.length - 1
      state.selectedElement = null
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
  moveElement,
  addPage,
  updatePage,
  deletePage,
  movePageUp,
  movePageDown,
  updateFormSettings,
  publishForm,
  unpublishForm,
} = formSlice.actions

export default formSlice.reducer
