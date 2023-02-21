import { Router } from 'express'
import { forumRouter } from './forum/forum'
import { forumPostRouter } from './forum/forumPost'
import { settingsRouter } from './settings/settings'

const router = Router()

router.use(forumRouter)
router.use(forumPostRouter)
router.use(settingsRouter)

export { router as indexRouters }
