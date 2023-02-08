import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { authSlice } from '@/store/slices/auth'
import { leaderboardSlice } from '@/store/slices/leaderboard'
import { profileSlice } from './slices/profile'
import { gameSlice } from '@/store/slices/game'

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  leaderboard: leaderboardSlice.reducer,
  profile: profileSlice.reducer,
  game: gameSlice.reducer,
})

export const setupStore = (initialState = {}) => configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
