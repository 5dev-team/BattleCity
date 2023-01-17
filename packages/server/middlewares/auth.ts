import type { NextFunction, Request, Response } from 'express'

// должна быть логика проверки авторизации!
function isAuthorized(req: Request, _res: Response, next: NextFunction) {

  req.userId = 23972
  next()
}

export {
  isAuthorized
}
