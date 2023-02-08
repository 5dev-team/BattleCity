import type { NextFunction, Request, Response } from 'express'
import { Forum, ForumPosts } from '../../init'
import { Forbidden, ServerError, ValidationError } from '../../errors'
import { getUnixTime } from '../../utils/helpers/getUnixTime'
import type { Model } from 'sequelize-typescript'
import type { IForum } from '../../models/forum'

export function createForum(req: Request, res: Response, next: NextFunction) {
  const authorId = req.userId
  const { title } = req.body
  Forum.create({
    authorId,
    title
  }).then((data: Model<IForum>) => {
    delete data.dataValues.updatedAt
    const date = data.dataValues.createdAt
    if (date) {
      data.dataValues.createdAt = getUnixTime(date)
    }
    res.send(data)
  }).catch(() => {
    next(new ServerError('Произошла ошибка'))
  })
}

export async function getForums(_req: Request, res: Response, next: NextFunction) {
  try {
    const forums: Model<IForum>[] = await Forum.findAll({
      order: [['id', 'ASC']],
      attributes: { exclude: ['updatedAt', 'createdAt'] }
    })
    const forumMessage = forums.map(async (val: Model<IForum>) => {
      if (val) {
        const forumId = val.dataValues.id
        const count: number = await ForumPosts.count({ where: { forumId } })
        val.dataValues.countMessage = count
        const lastItem = await ForumPosts.findOne({ where: { forumId }, order: [['createdAt', 'DESC']] })
        if (lastItem) {
          val.dataValues.lastMessageDate = getUnixTime(lastItem.dataValues.createdAt)
          val.dataValues.lastMessageId = lastItem.dataValues.id
        } else {
          val.dataValues.lastMessageDate = null
          val.dataValues.lastMessageId = null
        }
      }
      return val
    })
    const result = await Promise.all(forumMessage)
    res.send(result)
  } catch (e) {
    next(new ServerError('Произошла ошибка'))
  }
}

export function deleteForum(req: Request, res: Response, next: NextFunction) {
  const { id }: { id: number } = req.body
  Forum.findOne({ where: { id } }).then(async (data: Model<IForum> | null) => {
    if (data) {
      if (data.dataValues.authorId !== req.userId) {
        next(new Forbidden('Доступ запрещен'))
      } else {
        await Forum.destroy({ where: { id } }).then(() => {
          res.send({ message: 'Форум удален успешно' })
        })
      }
    } else {
      next(new ValidationError('Невалидный id'))
    }
  }).catch(() => {
    next(new ServerError('Невалидный id'))
  })
}


export function pathForum(req: Request, res: Response, next: NextFunction) {
  const { id, title }: { id: number, title: string } = req.body
  Forum.findOne({ where: { id } }).then((data: Model<IForum> | null) => {
    if (data) {
      if (data.dataValues.authorId !== req.userId) {
        next(new Forbidden('Доступ запрещен'))
      } else {
        Forum.update({ title }, { where: { id } }).then(() => {
          Forum.findOne({
            where: { id },
            attributes: { exclude: ['updatedAt'] }
          }).then((data: Model<IForum> | null) => {
            if (data && data.dataValues.createdAt) {
              const date: number = getUnixTime(data.dataValues.createdAt)
              data.dataValues.createdAt = date
              res.send(data)
            } else {
              next(new ServerError('Произошла ошибка'))
            }
          })
        }).catch(() => {
          next(new ServerError('Произошла неизвестная ошибка'))
        })
      }
    } else {
      next(new ValidationError('Невалидный id'))
    }
  }).catch(() => {
    next(new ValidationError('Невалидный id'))
  })
}
