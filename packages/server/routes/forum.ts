import { errors } from 'celebrate'
import { Router } from 'express'
import { isAuthorized } from '../middlewares/auth'
import { createForum, deleteForum, getForums } from '../controllers/forum'

const router = Router()

router.get('/v1/forum', isAuthorized, getForums)
router.post('/v1/forum', isAuthorized, createForum)
router.delete('/v1/forum', isAuthorized, deleteForum)


router.use(isAuthorized, errors())

export {
  router as forumRouter
}



// router.patch('/users/me', isAuthorized, celebrate({
//   body: Joi.object()
//     .keys({
//       name: Joi.string().min(2).max(30).required(),
//       email: Joi.string().email({ tlds: { allow: false } }).required()
//     })
// }), pathUserMe)
