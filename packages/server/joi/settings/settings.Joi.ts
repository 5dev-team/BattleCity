import { celebrate, Joi } from 'celebrate'

export const settingsPatch = celebrate({
  body: Joi.object().keys({
    isBackgroundMusic: Joi.boolean(),
  })
})
