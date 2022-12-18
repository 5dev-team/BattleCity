import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { RoutePaths } from '@/App'
import history from '@/utils/history'

axios.interceptors.response.use(
  response => {
    if (!response) return {}
    return response.data
  },
  error => {
    if (error.response.status === 401) {
      if (RoutePaths.SIGNIN.valueOf() !== window.location.pathname && RoutePaths.SIGNUP.valueOf() !== window.location.pathname) {
        history.push(RoutePaths.SIGNIN)
      }
    }
    return Promise.reject(error.response.data.reason || 'Server error')
  }
)

export const request = (config: AxiosRequestConfig) => axios({ ...config, withCredentials: true })
