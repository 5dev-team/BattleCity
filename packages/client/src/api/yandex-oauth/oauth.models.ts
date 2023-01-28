export interface IOauthRequest {
  code: string
  redirect_uri: string
}

export interface IServiceIdResponse {
  service_id: string
}

export interface IYandexAuthQueryParams {
  response_type: 'code',
  client_id: string,
  redirect_uri: string
}
