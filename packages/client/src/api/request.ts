import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { fetchLogout, fetchUser } from '@/store/slices/auth'
import { AppDispatch } from '@/store'
import oauth from '@/api/yandex-oauth'

export const interceptor = (dispatch: AppDispatch) => {
  axios.interceptors.response.use(
    response => {
      return response
    },
    error => {
      if (error.response.status === 401) {
        const yandexCodeParam = /code=([^&]+)/.exec(window.location.search)

        if (yandexCodeParam) {
          const code = yandexCodeParam[1]
          oauth
            .signIn({ code, redirect_uri: 'http://localhost:3000' })
            .then(() => dispatch(fetchUser()))
        } else {
          dispatch(fetchLogout)
        }
      }
      return Promise.reject(error.response.data.reason || 'Server error')
    }
  )
}

export const request = <T>(config: AxiosRequestConfig) =>
  axios.request<never, T>({ ...config, withCredentials: true })
