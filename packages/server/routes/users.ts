import { celebrate, errors, Joi } from 'celebrate'
import { Router } from 'express'
import { isAuthorized } from '../middlewares/auth'
import { getUserMe, pathUserMe } from '../controllers/users'

const router = Router()

router.get('/users/me', isAuthorized, getUserMe)

router.patch('/users/me', isAuthorized, celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().email({ tlds: { allow: false } }).required()
    })
}), pathUserMe)

router.use(isAuthorized, errors())

export {
  router as userRouter
}


