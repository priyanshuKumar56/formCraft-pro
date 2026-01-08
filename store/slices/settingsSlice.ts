import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface UserProfile {
  firstName: string
  lastName: string
  email: string
  bio: string
}

interface UserPreferences {
  defaultTheme: boolean
  spamProtection: boolean
  language: string
}

interface UserNotifications {
  newSubmission: boolean
  weeklySummary: boolean
  productUpdates: boolean
}

interface SettingsState {
  profile: UserProfile
  preferences: UserPreferences
  notifications: UserNotifications
}

const initialState: SettingsState = {
  profile: {
    firstName: "Priyanshu",
    lastName: "Kumar",
    email: "priyanshu@example.com",
    bio: ""
  },
  preferences: {
    defaultTheme: false,
    spamProtection: true,
    language: "English (US)"
  },
  notifications: {
    newSubmission: true,
    weeklySummary: false,
    productUpdates: true
  }
}

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      state.profile = { ...state.profile, ...action.payload }
    },
    updatePreferences: (state, action: PayloadAction<Partial<UserPreferences>>) => {
      state.preferences = { ...state.preferences, ...action.payload }
    },
    updateNotifications: (state, action: PayloadAction<Partial<UserNotifications>>) => {
      state.notifications = { ...state.notifications, ...action.payload }
    }
  }
})

export const { 
  updateProfile, 
  updatePreferences, 
  updateNotifications 
} = settingsSlice.actions

export default settingsSlice.reducer
