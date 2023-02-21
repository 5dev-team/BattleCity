import api from '@/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ILoginRequest, IRegisterRequest } from '@/api/auth/auth.models'
import { IYandexAuthQueryParams } from '@/api/yandex-oauth/oauth.models'
import { IUser } from '@/store/slices/auth/auth.models'
import { transformUser } from '@/utils/transformers'
import queryStringify from '@/utils/queryStringify'
import { ISettings } from '@/api/settings/settings.model'
import useBackgroundMusic from '@/utils/backgroundMusic'

interface IInitialState {
  authError: string
  isAuthLoading: boolean
  user: IUser | null
  isLoggedIn: boolean | null
  userSettings: ISettings
}

const initialState: IInitialState = {
  authError: '',
  isAuthLoading: false,
  user: null,
  isLoggedIn: null,
  userSettings: {
    isBackgroundMusic: false
  }
}

export const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  (data: ILoginRequest) => api.auth.login(data)
)

export const fetchRegister = createAsyncThunk(
  'auth/fetchRegister',
  (data: IRegisterRequest) => api.auth.register(data)
)

export const fetchYandexOauth = createAsyncThunk('oauth/fetchYandexOauth', () =>
  api.yandexOauth
    .redirect(__YANDEX_REDIRECT_URI__)
    .then(response => {
      const data: IYandexAuthQueryParams = {
        response_type: 'code',
        client_id: response.data.service_id,
        redirect_uri: __YANDEX_REDIRECT_URI__
      }
      window.open(__YANDEX_OAUTH_URL__ + queryStringify(data), '_self')
    })
    .catch(reason => console.log('ERROR: Yandex oauth failed', reason))
)

export const fetchYandexSignIn = createAsyncThunk(
  'oauth/fetchYandexSignIn',
  (code: string) =>
    api.yandexOauth.signIn({ code, redirect_uri: window.location.origin })
)

export const fetchUser = createAsyncThunk('auth/fetchUser', () =>
  Promise.all([api.auth.user(), api.settings.getSettings()]).then(values => ({
    user: transformUser(values[0].data),
    settings: values[1].data
  }))
)

export const fetchLogout = createAsyncThunk('auth/fetchLogout', () =>
  api.auth.logout()
)

export const updateUserSettings = createAsyncThunk(
  'auth/updateUserSettings',
  (settings: Partial<ISettings>) => api.settings.updateSettings(settings)
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: state => {
      state.authError = ''
    }
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

    builder.addCase(fetchYandexSignIn.fulfilled, state => {
      state.isAuthLoading = false
      state.authError = ''
    })
    builder.addCase(fetchYandexSignIn.pending, state => {
      state.isAuthLoading = true
    })
    builder.addCase(fetchYandexSignIn.rejected, (state, { error }) => {
      state.isAuthLoading = false
      state.authError = error.message as string
    })

    // user
    builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
      state.user = payload.user
      state.userSettings = payload.settings
      state.isLoggedIn = true
      const music = useBackgroundMusic()
      if (payload.settings.isBackgroundMusic) {
        const listener = () => {
          music.play().then(() => {
            document.body.removeEventListener('click', listener)
          })
        }
        document.body.addEventListener('click', listener)
      }
    })
    builder.addCase(fetchUser.rejected, (state, { error }) => {
      state.user = null
      state.userSettings = { isBackgroundMusic: false }

      let result: 401 | null = null
      if (error.message === 'Cookie is not valid') {
        result = 401
      }

      state.isLoggedIn = result && false
    })
    // logout
    builder.addCase(fetchLogout.fulfilled, state => {
      state.user = null
      state.userSettings = { isBackgroundMusic: false }
      state.isLoggedIn = false
    })
    builder.addCase(updateUserSettings.fulfilled, (state, { payload }) => {
      state.userSettings = payload.data
      const music = useBackgroundMusic()
      if (payload.data.isBackgroundMusic) {
        music.play()
      } else {
        music.pause()
      }
    })
  }
})
