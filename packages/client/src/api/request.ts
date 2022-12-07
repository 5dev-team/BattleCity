import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

axios.interceptors.response.use(
  response => {
    if (!response) return {}
    return response.data
  },
  error => {
    if (error.response.status === 401) {
      console.log(error.response.data.reason)
    }
    return Promise.reject(error.response.data.reason || 'Server error')
  }
)

export const request = (config: AxiosRequestConfig) => axios(config)
