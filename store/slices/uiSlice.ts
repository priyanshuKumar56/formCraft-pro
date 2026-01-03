import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface UIState {
  currentPageIndex: number
  selectedElementId: string | null
  isSettingsSidebarOpen: boolean
  activeTab: "create" | "workflow" | "connect" | "results"
  isLeftPanelOpen: boolean
  leftPanelTab: "elements" | "pages"
}

const initialState: UIState = {
  currentPageIndex: 0,
  selectedElementId: null,
  isSettingsSidebarOpen: true,
  activeTab: "create",
  isLeftPanelOpen: true,
  leftPanelTab: "elements",
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setCurrentPageIndex: (state, action: PayloadAction<number>) => {
      state.currentPageIndex = action.payload
    },
    setSelectedElementId: (state, action: PayloadAction<string | null>) => {
      state.selectedElementId = action.payload
    },
    setSettingsSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSettingsSidebarOpen = action.payload
    },
    setActiveTab: (state, action: PayloadAction<UIState["activeTab"]>) => {
      state.activeTab = action.payload
    },
    setLeftPanelOpen: (state, action: PayloadAction<boolean>) => {
      state.isLeftPanelOpen = action.payload
    },
    setLeftPanelTab: (state, action: PayloadAction<UIState["leftPanelTab"]>) => {
      state.leftPanelTab = action.payload
    },
  },
})

export const {
  setCurrentPageIndex,
  setSelectedElementId,
  setSettingsSidebarOpen,
  setActiveTab,
  setLeftPanelOpen,
  setLeftPanelTab,
} = uiSlice.actions

export default uiSlice.reducer
