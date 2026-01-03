import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface PublishState {
  isPublished: boolean
  shareableLink: string | null
  lastPublishedAt: string | null
}

const initialState: PublishState = {
  isPublished: false,
  shareableLink: null,
  lastPublishedAt: null,
}

const publishSlice = createSlice({
  name: "publish",
  initialState,
  reducers: {
    setPublished: (state, action: PayloadAction<{ isPublished: boolean; shareableLink?: string | null }>) => {
      state.isPublished = action.payload.isPublished
      state.shareableLink = action.payload.shareableLink || null
      if (action.payload.isPublished) {
        state.lastPublishedAt = new Date().toISOString()
      }
    },
    unpublish: (state) => {
      state.isPublished = false
      state.shareableLink = null
    },
  },
})

export const { setPublished, unpublish } = publishSlice.actions
export default publishSlice.reducer
