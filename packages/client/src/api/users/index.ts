import { request } from '@/api/request'
import { IUser } from '@/store/slices/auth/auth.models'
import {
  IChangeAvatarRequest,
  IChangeProfileRequest,
  IChangePasswordRequest,
} from '@/api/users/users.models'

export default {
  changeProfile(data: IChangeProfileRequest) {
    return request<IUser>({
      url: __YANDEX_API__ + '/user/profile',
      method: 'PUT',
      data,
    })
  },
  changeAvatar(data: IChangeAvatarRequest) {
    const formData = new FormData()
    formData.append('avatar', data.avatar[0])

    return request<IUser>({
      url: __YANDEX_API__ + '/user/profile/avatar',
      method: 'PUT',
      data: formData,
    })
  },
  changePassword(data: IChangePasswordRequest) {
    return request({
      url: __YANDEX_API__ + '/user/password',
      method: 'PUT',
      data,
    })
  },
  getUser(id: number) {
    return request<IUser>({
      url: __YANDEX_API__ + `/user/${id}`,
      method: 'GET',
    })
  },
  search(login: string) {
    return request<IUser[]>({
      url: __YANDEX_API__ + '/user/search',
      method: 'POST',
      data: { login },
    })
  },
}
