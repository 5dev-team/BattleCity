import axios from 'axios'
import { YANDEX_API } from '../constants'

export type GetUsersResponse = {
  id: number
  first_name: string
}

export async function getUsers(cookie: string) {
  return axios.get<GetUsersResponse>(`${YANDEX_API}/auth/user`, {
    headers: {
      Cookie: cookie
    }
  })
}
