import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'

axios.interceptors.response.use(
  response => {
    if (!response) return {}
    return response.data
  },
  error => {
    return Promise.reject(error.response.data.reason || 'Server error')
  }
)

export const request = <T>(config: AxiosRequestConfig) => axios.request<never, T>({ ...config, withCredentials: true })