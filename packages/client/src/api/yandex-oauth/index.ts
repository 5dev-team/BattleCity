import { request } from '@/api/request'
import { IOauthRequest, IServiceIdResponse, IYandexAuthQueryParams } from '@/api/yandex-oauth/oauth.models'
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
    }).then(response => {
      const serviceId = response.data.service_id
      window.open(getRedirectQuery(serviceId, redirectUri), '_blank')
    })
  },
}

const redirectUrl = 'https://oauth.yandex.ru/authorize'

const getRedirectQuery = (serviceId: string, redirectUri: string) => {
  const params: IYandexAuthQueryParams = {
    response_type: 'code',
    client_id: serviceId,
    redirect_uri: redirectUri,
  }
  
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
    
  return redirectUrl.concat('?', queryString)
}