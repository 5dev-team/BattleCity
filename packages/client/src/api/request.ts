import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { RoutePaths } from '@/App'
import history from '@/utils/history'
import { fetchLogout } from '@/store/slices/auth'
import { AppDispatch } from '@/store'

export const interceptor = (dispatch: AppDispatch) => {
  axios.interceptors.response.use(
    response => {
      if (!response) return {}
      return response.data
    },
    error => {
      // if (error.response.status === 401) {
      //   dispatch(fetchLogout)
      // }
      return Promise.reject(error.response.data.reason || 'Server error')
    }
  )
}

export const request = <T>(config: AxiosRequestConfig) => axios.request<never, T>({ ...config, withCredentials: true })
