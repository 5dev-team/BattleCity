import axios from 'axios'

export type GetUsersResponse = {
  id: number
  first_name: string
}

export async function getUsers(cookie: string) {
  return axios.get<GetUsersResponse>(`http://localhost:3000/api/v2/auth/user`, {
    headers: {
      Cookie: cookie
    }
  })
}
