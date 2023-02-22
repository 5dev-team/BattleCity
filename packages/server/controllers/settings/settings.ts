import type { NextFunction, Request, Response } from 'express'
import { Settings } from '../../init'
import { NotFoundError, ServerError } from '../../errors'
import type { ISettings } from '../../models/settings'
import type { Model } from 'sequelize'

export const getSettings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId

  try {
    let settings: Model<ISettings> | null = await Settings.findOne({
      where: { userId },
    })

    if (!settings) {
      settings = await Settings.create({ userId, isBackgroundMusic: false })
    }

    res.send({
      isBackgroundMusic: settings.get({ plain: true }).isBackgroundMusic,
    })
  } catch (e) {
    next(new ServerError('Произошла ошибка'))
  }
}

export const patchSettings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId
  const newSettings = req.body

  try {
    const settings: Model<ISettings> | null = await Settings.findOne({
      where: { userId },
    })

    if (!settings) {
      return next(new NotFoundError('Настройки не найдены'))
    }
    await settings.update(newSettings)

    res.send(settings)
  } catch (e) {
    next(new ServerError('Произошла ошибка'))
  }
}
