import api from '@/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchUser } from '@/store/slices/auth'
import { IFetchProfileData } from '@/store/slices/profile/profile.models'

export const fetchProfileUpdate = createAsyncThunk(
  'users/fetchProfile',
  (data: IFetchProfileData, { dispatch }) => {
    const promises: Promise<unknown>[] = []

    if (data.profileData) {
      promises.push(api.users.changeProfile(data.profileData))
    }
    if (data.passwordData) {
      promises.push(api.users.changePassword(data.passwordData))
    }
    if (data.avatarData) {
      promises.push(api.users.changeAvatar(data.avatarData))
    }

    return Promise.allSettled(promises).then(results => {
      dispatch(fetchUser())

      const rejectReasons = results
        .filter(({ status }) => status === 'rejected')
        .map(result => (result as PromiseRejectedResult).reason)
        .join(', ')

      if (rejectReasons) {
        dispatch(profileSlice.actions.serError(rejectReasons))
      }
      else {
        dispatch(profileSlice.actions.clearError())
      }

      return results
    })
  }
)

interface IInitialState {
  isLoading: boolean
  fetchError: string
}

const initialState: IInitialState = {
  isLoading: false,
  fetchError: '',
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    serError: (state, action) => {
      state.fetchError = action.payload
    },
    clearError: state => {
      state.fetchError = ''
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchProfileUpdate.pending, state => {
      state.isLoading = true
    })
    builder.addCase(fetchProfileUpdate.fulfilled, state => {
      state.isLoading = false
    })
    builder.addCase(fetchProfileUpdate.rejected, (state, { error }) => {
      state.isLoading = false

      if (error.message) {
        state.fetchError = error.message
      }
    })
  },
})
