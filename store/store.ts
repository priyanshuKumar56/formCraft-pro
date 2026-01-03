import { configureStore } from "@reduxjs/toolkit"
import formReducer from "./slices/formSlice"
import uiReducer from "./slices/uiSlice"
import publishReducer from "./slices/publishSlice"
import resultsReducer from "./slices/resultsSlice"

export const store = configureStore({
  reducer: {
    form: formReducer,
    ui: uiReducer,
    publish: publishReducer,
    results: resultsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
