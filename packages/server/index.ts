import express, { Express, NextFunction, Request, Response } from 'express'
import helmet from 'helmet'
import { errors } from 'celebrate'
import { errorLogger, requestLogger } from './middlewares/logger'
import { processingErrors } from './middlewares/errors'
import { NotFoundError } from './errors'
import { isAuthorized } from './middlewares/auth'
import { indexRouters } from './routes'
import { limiter } from './utils/rateLimit'
import { corsOptions, SERVER_PORT, yandexRouter } from './utils/constants'
import { dbConnect } from './init'
import cors from 'cors'
dbConnect().then(() => {
  console.log('все ок')
}).catch((err) => {
  console.log(err)
})

const app: Express = express()

app.use(cors(corsOptions))
app.use(limiter)
app.use(helmet())

app.use(requestLogger)

app.use('/api/v2', yandexRouter)

app.use(express.json())
app.use('/api/', indexRouters)

app.use(isAuthorized, (_req: Request, _res: Response, next: NextFunction) => next(new NotFoundError('Страница не найдена')))

app.use(errorLogger)
app.use(errors())
app.use(processingErrors)

app.listen(SERVER_PORT, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${SERVER_PORT}`)
})
