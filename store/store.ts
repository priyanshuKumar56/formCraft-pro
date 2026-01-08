import { configureStore } from "@reduxjs/toolkit"
import formReducer from "./slices/formSlice"
import uiReducer from "./slices/uiSlice"
import publishReducer from "./slices/publishSlice"
import resultsReducer from "./slices/resultsSlice"
import dashboardReducer from "./slices/dashboardSlice"
import settingsReducer from "./slices/settingsSlice"
import builderReducer from "./slices/builderSlice"
import elementReducer from "./slices/elementSlice"
import designSystemReducer from "./slices/designSystemSlice"
import previewReducer from "./slices/previewSlice"

export const store = configureStore({
  reducer: {
    form: formReducer,
    ui: uiReducer,
    publish: publishReducer,
    results: resultsReducer,
    dashboard: dashboardReducer,
    settings: settingsReducer,
    builder: builderReducer,
    element: elementReducer,
    designSystem: designSystemReducer,
    preview: previewReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
