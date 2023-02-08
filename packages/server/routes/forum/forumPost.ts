import { errors } from 'celebrate'
import { Router } from 'express'
import { isAuthorized } from '../../middlewares/auth'
import { createPost, deletePost, getPosts, pathForumPost, getPost } from '../../controllers'
import { bodyForumPostDelete, bodyForumPostPath, bodyForumPostPosts } from '../../joi'

const path = '/v1/forum/post'

const router = Router()

router.post(path, bodyForumPostPosts, createPost)
router.get(`/v1/forum/:forumId`, getPosts)
router.delete(path, bodyForumPostDelete, deletePost)
router.patch(path, bodyForumPostPath, pathForumPost)
router.get(`${path}/:postId`, getPost)

router.use(isAuthorized, errors())

export {
  router as forumPostRouter
}
