import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '@/api'
import { ILoginRequest, IRegisterRequest } from '@/api/auth/auth.models'
import { IUser } from '@/store/slices/auth/auth.models'

interface IInitialState {
  authError: string
  isAuthLoading: boolean
  user: IUser | null
}

const initialState: IInitialState = {
  authError: '',
  isAuthLoading: false,
  user: null
}

export const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  (data: ILoginRequest) => api.auth.login(data)
)

export const fetchRegister = createAsyncThunk(
  'auth/fetchRegister',
  (data: IRegisterRequest) => api.auth.register(data)
)

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  () => api.auth.user()
)

export const fetchLogout = createAsyncThunk(
  'auth/fetchLogout',
  () => api.auth.logout()
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.authError = ''
    }
  },
  extraReducers: (builder) => {
    // login
    builder.addCase(fetchLogin.fulfilled, (state) => {
      state.isAuthLoading = false
      state.authError = ''
    })
    builder.addCase(fetchLogin.pending, (state) => {
      state.isAuthLoading = true
    })
    builder.addCase(fetchLogin.rejected, (state, { error }) => {
      state.isAuthLoading = false
      state.authError = error.message as string
    })
    // registration
    builder.addCase(fetchRegister.fulfilled, (state) => {
      state.isAuthLoading = false
      state.authError = ''
    })
    builder.addCase(fetchRegister.pending, (state) => {
      state.isAuthLoading = true
    })
    builder.addCase(fetchRegister.rejected, (state, { error }) => {
      state.isAuthLoading = false
      state.authError = error.message as string
    })
    // user
    builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
      state.user = payload
    })
    builder.addCase(fetchUser.rejected, (state) => {
      state.user = null
    })
    // logout
    builder.addCase(fetchLogout.fulfilled, (state) => {
      state.user = null
    })
  }
})
