import dotenv from 'dotenv'
import cors from 'cors'
import express, { Express, NextFunction, Request, Response } from 'express'
import helmet from 'helmet'
import { errors } from 'celebrate'
import { errorLogger, requestLogger } from './middlewares/logger'
import { processingErrors } from './middlewares/errors'
import { NotFoundError } from './errors'
import { isAuthorized } from './middlewares/auth'
import { indexRouters } from './routes'
import { limiter } from './utils/rateLimit'
import { createClientAndConnect } from './init/db'
import { PORT } from './utils/constants'

dotenv.config()


createClientAndConnect()

const app: Express = express()

app.use(limiter)
app.use(helmet())
app.use(express.json())
app.use(cors())

app.use(requestLogger)

app.use(indexRouters)
app.use(isAuthorized, (_req: Request, _res: Response, next: NextFunction) => next(new NotFoundError('Страница не найдена')))

app.use(errorLogger)
app.use(errors())
app.use(processingErrors)

app.listen(PORT, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${PORT}`)
})
