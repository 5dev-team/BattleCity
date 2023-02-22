import winston from 'winston'
import expressWinston from 'express-winston'
import type e from 'express'
import type QueryString from 'qs'
import type { ParamsDictionary } from 'express-serve-static-core'

// логер запросов
export const requestLogger: e.Handler = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'request.log' })
  ],
  format: winston.format.json()
})

// логгер ошибок
export const errorLogger: e.ErrorRequestHandler<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>> = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log' })
  ],
  format: winston.format.json()
})

