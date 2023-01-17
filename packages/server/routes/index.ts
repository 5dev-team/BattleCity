import { Router } from 'express'
import { forumRouter } from './forum'
import { forumPostRouter } from './forumPost'

const router = Router()

router.use(forumRouter)
router.use(forumPostRouter)

export {
  router as indexRouters
}

