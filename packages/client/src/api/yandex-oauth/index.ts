import { request } from '@/api/request'
import { IOauthRequest, IServiceIdResponse } from '@/api/yandex-oauth/oauth.models'
import { AxiosResponse } from 'axios'

export default {
  signIn(data: IOauthRequest) {
    return request({
      url: __YANDEX_API__ + '/oauth/yandex',
      method: 'POST',
      data
    })
  },
  redirect(redirectUri: string) {
    return request<AxiosResponse<IServiceIdResponse>>({
      url: __YANDEX_API__ + '/oauth/yandex/service-id',
      method: 'GET',
      data: {
        redirect_uri: redirectUri
      }
    })
  },
}
