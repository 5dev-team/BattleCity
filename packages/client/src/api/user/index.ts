import { request } from '@/api/request'
import { IUser } from '@/store/slices/auth/auth.models'


export default {
  getUserById(id: number): Promise<IUser> {
    return request({
      url: __YANDEX_API__ + '/user/' + id,
      method: 'GET',
    })
  }
}
