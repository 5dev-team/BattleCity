import { errors } from 'celebrate'
import { Router } from 'express'
import { isAuthorized } from '../middlewares/auth'
import { createPost } from '../controllers/forumPosts'

const router = Router()


router.post('/v1/forum/post', isAuthorized, createPost)



router.use(isAuthorized, errors())

export {
  router as forumPostRouter
}
