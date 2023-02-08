import { AxiosStatic, AxiosRequestConfig } from 'axios'

let axios: AxiosStatic | null = null

export const request = async <T>(config: AxiosRequestConfig) => {
  // ssr hack
  if (axios === null) {
    axios = await (await import('axios')).default

    axios.interceptors.response.use(
      response => Promise.resolve(response),
      error => Promise.reject(error.response.data?.reason ?? 'Server error')
    )
  }

  return axios.request<never, T>({ ...config, withCredentials: true })
}
