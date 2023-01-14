import type { NextFunction, Request, Response } from 'express'

function processingErrors(err: { statusCode: number, message: string }, _req: Request, res: Response, next: NextFunction) {
  const { statusCode = 500, message } = err

  res
    .status(statusCode)
    .send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message })
  next()
}

export {
  processingErrors
}

