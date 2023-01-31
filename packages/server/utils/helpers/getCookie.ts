import type { Request } from 'express'

enum nameCookie {
  AUTH_COOKIE = 'authCookie',
  UUID4 = 'uuid'
}

type StateResponse = {
  state: boolean,
  value: null | string
}

interface IResponseCookie {
  authCookie: StateResponse,
  uuid: StateResponse,
  defaultCookie: null | string | undefined
  generalState: boolean
}

export function getCookie(req: Request): IResponseCookie {
  const cookie: string | undefined = req.headers.cookie

  const defaultState: IResponseCookie = {
    'authCookie': { state: false, value: null },
    'uuid': { state: false, value: null },
    'defaultCookie': undefined,
    'generalState': false
  }
  if (cookie) {
    defaultState.defaultCookie = cookie
    cookie.split('; ').map((value) => {
      const parser: string[] = value.split('=')
      if (parser[0] === nameCookie.AUTH_COOKIE) {
        defaultState.authCookie.value = parser[1]
        defaultState.authCookie.state = true
      }
      if (parser[0] === nameCookie.UUID4) {
        defaultState.uuid.value = parser[1]
        defaultState.uuid.state = true
      }
      if (defaultState.uuid.state && defaultState.authCookie.state) {
        defaultState.generalState = true
      }
    })
    return defaultState
  }
  return defaultState
}
