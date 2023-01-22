import { celebrate, Joi } from 'celebrate'

export const bodyForumPost = celebrate({
  body: Joi.object().keys({
    title: Joi.string().required(),
  })
})

export const bodyForumDelete = celebrate({
  body: Joi.object().keys({
    id: Joi.number().required()
  })
})

export const bodyForumPath = celebrate({
  body: Joi.object().keys({
    title: Joi.string().required(),
    id: Joi.number().required()
  })
})
