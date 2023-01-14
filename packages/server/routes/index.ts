import { Router } from 'express'
import { userRouter } from './users'
const router = Router()

router.use(userRouter)

export {
  router as indexRouters
}

