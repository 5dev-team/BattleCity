import { celebrate, Joi } from 'celebrate'

export const bodyForumPostPosts = celebrate({
  body: Joi.object().keys({
    content: Joi.string().required(),
    forumId: Joi.number().required(),
    rootPost: Joi.number()
  })
})

export const bodyForumPostDelete = celebrate({
  body: Joi.object().keys({
    id: Joi.number().required()
  })
})

export const bodyForumPostPath = celebrate({
  body: Joi.object().keys({
    content: Joi.string().required(),
    id: Joi.number().required()
  })
})
