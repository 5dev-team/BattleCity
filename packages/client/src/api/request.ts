import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { fetchUser } from '@/store/slices/auth'
import { AppDispatch } from '@/store'
import yandexOauth from '@/api/yandex-oauth'

export const interceptor = (dispatch: AppDispatch) => {
  axios.interceptors.response.use(
    response => {
      return Promise.resolve(response)
    },
    error => {
      if (error?.response?.status === 401) {
        const yandexCodeParam = /code=([^&]+)/.exec(window.location.search)

        if (yandexCodeParam) {
          const code = yandexCodeParam[1]
          yandexOauth
            .signIn({ code, redirect_uri: window.location.origin })
            .then(() => dispatch(fetchUser()))
        }
      }

      return Promise.reject(error?.response.data.reason || 'Server Error')
    }
  )
}

export const request = <T>(config: AxiosRequestConfig) =>
  axios.request<never, T>({ ...config, withCredentials: true })
