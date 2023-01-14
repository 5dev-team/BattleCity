import type { NextFunction, Request, Response } from 'express'

// должна быть логика проверки авторизации!
function isAuthorized(req: Request, _res: Response, next: NextFunction) {
  req.auth = true
  next()
}

export {
  isAuthorized
}
