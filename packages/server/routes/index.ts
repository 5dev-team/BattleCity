import { Router } from 'express'
import { forumRouter } from './forum/forum'
import { forumPostRouter } from './forum/forumPost'

const router = Router()

router.use(forumRouter)
router.use(forumPostRouter)


export {
  router as indexRouters
}

