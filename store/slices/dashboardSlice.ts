import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface DashboardForm {
  id: number
  title: string
  responses: number
  status: "published" | "draft" | "archived"
  date: string
  color: string
  accent: string
}

interface DashboardState {
  forms: DashboardForm[]
  viewMode: "grid" | "list"
  statusFilter: string
  templateCategory: string
}

const initialForms: DashboardForm[] = [
  {
    id: 1,
    title: "Product Launch Feedback",
    responses: 124,
    status: "published",
    date: "2 hours ago",
    color: "from-indigo-500 to-purple-500",
    accent: "bg-indigo-500"
  },
  {
    id: 2,
    title: "Annual Survey 2024",
    responses: 89,
    status: "draft",
    date: "5 hours ago",
    color: "from-emerald-500 to-teal-500",
    accent: "bg-emerald-500"
  },
  {
    id: 3,
    title: "Contact Form",
    responses: 32,
    status: "published",
    date: "1 day ago",
    color: "from-blue-500 to-cyan-500",
    accent: "bg-blue-500"
  },
  {
    id: 4,
    title: "Event Registration",
    responses: 215,
    status: "archived",
    date: "2 weeks ago",
    color: "from-orange-500 to-red-500",
    accent: "bg-orange-500"
  }
]

const initialState: DashboardState = {
  forms: initialForms,
  viewMode: "grid",
  statusFilter: "all",
  templateCategory: "all"
}

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setForms: (state, action: PayloadAction<DashboardForm[]>) => {
      state.forms = action.payload
    },
    setViewMode: (state, action: PayloadAction<"grid" | "list">) => {
      state.viewMode = action.payload
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.statusFilter = action.payload
    },
    setTemplateCategory: (state, action: PayloadAction<string>) => {
      state.templateCategory = action.payload
    }
  }
})

export const { 
  setForms, 
  setViewMode, 
  setStatusFilter,
  setTemplateCategory 
} = dashboardSlice.actions

export default dashboardSlice.reducer
