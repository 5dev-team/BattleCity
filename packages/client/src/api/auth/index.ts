import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { ILoginRequestData } from '@/api/auth/auth.models'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ''
  }),
  endpoints: (build) => ({
    login: build.mutation<Record<string, never>, ILoginRequestData>({
      query: (requestData) => ({
        url: '/signin',
        method: 'POST',
        body: requestData
      })
    })
  })
})

