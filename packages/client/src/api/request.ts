import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { RoutePaths } from '@/App'

axios.interceptors.response.use(
  response => {
    if (!response) return {}
    return response.data
  },
  error => {
    if (error.response.status === 401) {
      if (![RoutePaths.SIGNIN.valueOf(), RoutePaths.SIGNUP.valueOf()].includes(window.location.pathname)) {
        window.location.pathname = RoutePaths.SIGNIN.valueOf()
      }
    }
    return Promise.reject(error.response.data.reason || 'Server error')
  }
)

export const request = (config: AxiosRequestConfig) => axios(config)
