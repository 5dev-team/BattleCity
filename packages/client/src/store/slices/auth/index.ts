import api from '@/api'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ILoginRequest, IRegisterRequest } from '@/api/auth/auth.models'
import { IUserDTO, IUser } from '@/store/slices/auth/auth.models'
import { transformUser } from '@/utils/transformers'

interface IInitialState {
  authError: string
  isAuthLoading: boolean
  user: IUser | null
  isLoggedIn: boolean
}

const initialState: IInitialState = {
  authError: '',
  isAuthLoading: false,
  user: null,
  isLoggedIn: false
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
  () => api.auth.user().then(user => transformUser(user as IUserDTO))
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
      console.log('fulfilled')
      state.user = payload
      state.isLoggedIn = true
    })
    builder.addCase(fetchUser.rejected, (state, { error }) => {
      console.log('rejected')
      console.log(error)
      state.user = null
      const result: number | string = error.message === 'Cookie is not valid' ? 401 : error.code || 401
      const status = Number(result)
      state.isLoggedIn = status !== 401
    })
    // logout
    builder.addCase(fetchLogout.fulfilled, (state) => {
      state.user = null
      state.isLoggedIn = false
    })
  }
})
