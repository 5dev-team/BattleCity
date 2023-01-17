import api from '@/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ILoginRequest, IRegisterRequest } from '@/api/auth/auth.models'
import { IUser, IUserDTO } from '@/store/slices/auth/auth.models'
import { transformUser } from '@/utils/transformers'

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
  isLoggedIn: null,
}

export const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  (data: ILoginRequest) => api.auth.login(data)
)

export const fetchRegister = createAsyncThunk(
  'auth/fetchRegister',
  (data: IRegisterRequest) => api.auth.register(data)
)

export const fetchYandexOauth = createAsyncThunk(
  'oauth/fetchYandexOauth',
  (redirectUri: string) => api.yandexOauth.redirect(redirectUri)
)

export const fetchUser = createAsyncThunk('auth/fetchUser', () =>
  api.auth.user().then(response => {
    return transformUser(response.data as IUserDTO)
  })
)

export const fetchLogout = createAsyncThunk('auth/fetchLogout', () =>
  api.auth.logout()
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: state => {
      state.authError = ''
    },
  },
  extraReducers: builder => {
    // login
    builder.addCase(fetchLogin.fulfilled, state => {
      state.isAuthLoading = false
      state.authError = ''
    })
    builder.addCase(fetchLogin.pending, state => {
      state.isAuthLoading = true
    })
    builder.addCase(fetchLogin.rejected, (state, { error }) => {
      state.isAuthLoading = false
      state.authError = error.message as string
    })
    // registration
    builder.addCase(fetchRegister.fulfilled, state => {
      state.isAuthLoading = false
      state.authError = ''
    })
    builder.addCase(fetchRegister.pending, state => {
      state.isAuthLoading = true
    })
    builder.addCase(fetchRegister.rejected, (state, { error }) => {
      state.isAuthLoading = false
      state.authError = error.message as string
    })
    // oauth
    builder.addCase(fetchYandexOauth.fulfilled, state => {
      state.isAuthLoading = false
      state.authError = ''
    })
    builder.addCase(fetchYandexOauth.pending, state => {
      state.isAuthLoading = true
    })
    builder.addCase(fetchYandexOauth.rejected, (state, { error }) => {
      state.isAuthLoading = false
      state.authError = error.message as string
    })
    // user
    builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
      state.user = payload
      state.isLoggedIn = true
    })
    builder.addCase(fetchUser.rejected, (state, { error }) => {
      state.user = null

      let result: 401 | null = null
      if (error.message === 'Cookie is not valid') {
        result = 401
      }

      state.isLoggedIn = result && false
    })
    // logout
    builder.addCase(fetchLogout.fulfilled, state => {
      state.user = null
      state.isLoggedIn = false
    })
  },
})
