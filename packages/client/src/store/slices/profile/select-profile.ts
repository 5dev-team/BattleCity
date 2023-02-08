import { createSelector } from '@reduxjs/toolkit'
import { IUser } from '@/store/slices/auth/auth.models'
import { RootState } from '@/store'

export const baseSelectProfile= (state: RootState) => state.auth.user
export const selectProfile = createSelector(
  [baseSelectProfile],
  (user): IUser | null => {
    return user ? user : null
  }
)
