import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '@/api'
import { ILoginRequest, IRegisterRequest } from '@/api/auth/auth.models'
import { IUser } from '@/store/slices/auth/auth.models'

interface IInitialState {
  authError: string
  isAuthLoading: boolean
  user: IUser | null
  isLoggedIn: boolean | null
}

const initialState: IInitialState = {
  authError: '',
  isAuthLoading: false,
  user: null,
  isLoggedIn: null
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
      state.isLoggedIn = true
    })
    builder.addCase(fetchLogin.pending, (state) => {
      state.isAuthLoading = true
    })
    builder.addCase(fetchLogin.rejected, (state, { error }) => {
      state.isAuthLoading = false
      state.authError = error.message as string
      state.isLoggedIn = false
    })
    // registration
    builder.addCase(fetchRegister.fulfilled, (state) => {
      state.isAuthLoading = false
      state.authError = ''
      state.isLoggedIn = true
    })
    builder.addCase(fetchRegister.pending, (state) => {
      state.isAuthLoading = true
    })
    builder.addCase(fetchRegister.rejected, (state, { error }) => {
      state.isAuthLoading = false
      state.authError = error.message as string
      state.isLoggedIn = false
    })
    // user
    builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
      state.user = payload.data
      state.isLoggedIn = true
    })
    builder.addCase(fetchUser.rejected, (state) => {
      state.user = null
      state.isLoggedIn = false
    })
    // logout
    builder.addCase(fetchLogout.fulfilled, (state) => {
      state.user = null
      state.isLoggedIn = false
    })
  }
})
