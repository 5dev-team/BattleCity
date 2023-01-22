import type { NextFunction, Request, Response } from 'express'
import { getCookie } from '../utils/helpers/getCookie'
import { getUsers, GetUsersResponse } from '../utils/helpers/getUsers'
import { Forbidden } from '../errors'
import type { AxiosResponse } from 'axios'

export async function isAuthorized(req: Request, res: Response, next: NextFunction) {
  const cookie = getCookie(req)
  if (cookie.defaultCookie) {
    await getUsers(cookie.defaultCookie).then((data: AxiosResponse<GetUsersResponse>) => {
      req.userId = data.data.id
      res.cookie('id', Number(req.userId))
      next()
    }).catch(() => {
      res.clearCookie('id')
      res.clearCookie('authCookie')
      res.clearCookie('uuid')
      next(new Forbidden('Доступ к ресурсу ограничен'))
    })
  } else {
    next()
  }
}
