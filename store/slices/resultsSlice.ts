import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface Response {
  id: string
  submittedAt: string
  location: string
  device: "Desktop" | "Mobile" | "Tablet"
  timeSpent: string
  responses: Record<string, string>
}

interface ResultsState {
  responses: Response[]
  stats: {
    totalResponses: number
    completionRate: number
    averageTime: string
    uniqueVisitors: number
  }
  isLoading: boolean
  error: string | null
}

const initialState: ResultsState = {
  responses: [],
  stats: {
    totalResponses: 0,
    completionRate: 0,
    averageTime: "0s",
    uniqueVisitors: 0,
  },
  isLoading: false,
  error: null,
}

const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    setResults: (state, action: PayloadAction<{ responses: Response[]; stats: ResultsState["stats"] }>) => {
      state.responses = action.payload.responses
      state.stats = action.payload.stats
      state.isLoading = false
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
      state.isLoading = false
    },
  },
})

export const { setResults, setLoading, setError } = resultsSlice.actions
export default resultsSlice.reducer
