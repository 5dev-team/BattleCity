import { errors } from 'celebrate'
import { Router } from 'express'
import { isAuthorized } from '../../middlewares/auth'
import { createForum, deleteForum, getForums, pathForum } from '../../controllers'
import { bodyForumDelete, bodyForumPath, bodyForumPost } from '../../joi'

const path = '/v1/forum'

const router = Router()

router.get(path, getForums)
router.post(path, bodyForumPost, createForum)
router.delete(path, bodyForumDelete, deleteForum)
router.patch(path, bodyForumPath, pathForum)

router.use(isAuthorized, errors())

export {
  router as forumRouter
}
