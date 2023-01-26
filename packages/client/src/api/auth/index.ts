import { request } from '@/api/request'
import { ILoginRequest, IRegisterRequest } from '@/api/auth/auth.models'
import { IUserDTO } from '@/store/slices/auth/auth.models'
import { AxiosResponse } from 'axios'

export default {
  login(data: ILoginRequest) {
    return request({
      url: __YANDEX_API__ + '/auth/signin',
      method: 'POST',
      data
    })
  },
  register(data: IRegisterRequest) {
    return request({
      url: __YANDEX_API__ + '/auth/signup',
      method: 'POST',
      data
    })
  },
  user() {
    return request<AxiosResponse<IUserDTO>>({
      url: __YANDEX_API__ + '/auth/user',
      method: 'GET'
    })
  },
  logout() {
    return request({
      url: __YANDEX_API__ + '/auth/logout',
      method: 'POST'
    })
  }
}
