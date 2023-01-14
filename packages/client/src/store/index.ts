import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { authSlice } from '@/store/slices/auth'
import { leaderboardSlice } from '@/store/slices/leaderboard'
import { profileSlice } from './slices/profile'

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  leaderboard: leaderboardSlice.reducer,
  profile: profileSlice.reducer,
})

export const setupStore = () => configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
