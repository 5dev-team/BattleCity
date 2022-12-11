import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { authSlice } from '@/store/slices/auth'
import { leaderboardSlice } from '@/store/slices/leaderboard'

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  leaderboard: leaderboardSlice.reducer
})

export const setupStore = () => configureStore({
  reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
