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
        parser[1].length === 53 && (defaultState.authCookie.state = true, defaultState.authCookie.value = parser[1])
      }
      if (parser[0] === nameCookie.UUID4) {
        parser[1].length === 36 && (defaultState.uuid.state = true, defaultState.uuid.value = parser[1])
      }
    })
    return defaultState
  }
  return defaultState
}
