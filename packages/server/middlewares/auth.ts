import type { NextFunction, Request, Response } from 'express'
import { getCookie } from '../utils/helpers/getCookie'
import { getUsers, GetUsersResponse } from '../utils/helpers/getUsers'
import { Forbidden } from '../errors'
import type { AxiosResponse } from 'axios'

export async function isAuthorized(req: Request, _res: Response, next: NextFunction) {
  const cookie = getCookie(req)

  if (cookie.defaultCookie) {
    await getUsers(cookie.defaultCookie).then((response: AxiosResponse<GetUsersResponse>) => {
      req.userId = response.data.id
      next()
    }).catch(() => {
      next(new Forbidden('Доступ к ресурсу ограничен'))
    })
  } else {
    next(new Forbidden('Доступ к ресурсу ограничен'))
  }
}
