import type { AxiosRequestConfig } from 'axios'
import { RoutePaths } from '@/router'
import useBrowserHistory from '@/utils/history'

export const request = async <T>(config: AxiosRequestConfig) => {
  // ssr hack
  const { default: axios } = await import('axios')
  const history = useBrowserHistory()

  axios.interceptors.response.use(
    response => {
      if (!response) return {}
      return response.data
    },
    error => {
      if (error.response.status === 401) {
        if (
          RoutePaths.SIGNIN.valueOf() !== window.location.pathname &&
          RoutePaths.SIGNUP.valueOf() !== window.location.pathname
        ) {
          history.push(RoutePaths.SIGNIN)
        }
      }
      return Promise.reject(error.response.data.reason || 'Server error')
    }
  )

  return axios.request<never, T>({ ...config, withCredentials: true })
}
