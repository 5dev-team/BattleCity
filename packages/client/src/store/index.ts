import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { authApi } from '@/api/auth'

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer
})

export const setupStore = () => configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware)
})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
