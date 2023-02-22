import { request } from '@/api/request'
import { IOauthRequest } from '@/api/yandex-oauth/oauth.models'


export default {
  signIn(data: IOauthRequest) {
    return request({
      url: __YANDEX_API__ + '/oauth/yandex',
      method: 'POST',
      data
    })
  }
}
