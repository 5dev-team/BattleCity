import type { NextFunction, Request, Response } from 'express'
import { ForumPosts } from '../../init'
import type { ParamsDictionary } from 'express-serve-static-core'
import { Forbidden, ServerError, ValidationError } from '../../errors'
import { getUnixTime } from '../../utils/helpers/getUnixTime'
import type { IForumPosts } from '../../models/forumPosts'
import type { Model } from 'sequelize-typescript'

export async function createPost(req: Request, res: Response, next: NextFunction) {
  const authorId = req.userId
  const { content, forumId, rootPost = null } = req.body
  if (rootPost != null) {
    await ForumPosts.findOne({ where: { 'id': rootPost } }).then((data: Model<IForumPosts> | null) => {
      if (!data) {
        next(new ValidationError('Невалидный id rootPost'))
      }
    })
  }
  ForumPosts.create({ authorId, content, forumId, rootPost }).then((data: Model<IForumPosts>) => {
    delete data.dataValues.updatedAt
    if (data.dataValues.createdAt) {
      const date = getUnixTime(data.dataValues.createdAt)
      data.dataValues.createdAt = date
    }
    res.send(data)
  }).catch(() => {
    next(new ValidationError('Невалидный id forumId'))
  })
}

export function getPosts(req: Request, res: Response, next: NextFunction) {
  const { forumId }: ParamsDictionary = req.params
  ForumPosts.findAll({
    attributes: { exclude: ['updatedAt', 'forumId'] },
    where: { forumId },
    order: [['id', 'ASC']]
  }).then((data: Model<IForumPosts>[] | []) => {
    const result = data.map((value: Model<IForumPosts>) => {
      if (value && value.dataValues.createdAt) {
        const date: number = getUnixTime(value.dataValues.createdAt)
        value.dataValues.createdAt = date
      }
      return value
    })
    res.send(result)
  }).catch(() => {
    next(new ValidationError('Невалидный id'))
  })
}

export function getPost(req: Request, res: Response, next: NextFunction) {
  const { id }: ParamsDictionary = req.params
  ForumPosts.findOne({
    attributes: { exclude: ['updatedAt', 'forumId'] },
    where: { id },
    order: [['id', 'ASC']]
  }).then((data: Model<IForumPosts> | null) => {
    if (data && data.dataValues.createdAt) {
      const date: number = getUnixTime(data.dataValues.createdAt)
      data.dataValues.createdAt = date
    } else {
      next(new ValidationError('Невалидный id'))
    }
    res.send(data)
  }).catch(() => {
    next(new ValidationError('Невалидный id'))
  })
}

export function deletePost(req: Request, res: Response, next: NextFunction) {
  const { id }: { id: number } = req.body
  ForumPosts.findOne({ where: { id } }).then((data: Model<IForumPosts> | null) => {
    if (data) {
      if (data.dataValues.authorId !== req.userId) {
        next(new Forbidden('Доступ запрещен'))
      } else {
        ForumPosts.destroy({ where: { id } }).then(() => {
          res.send({ message: 'Пост удален успешно' })
        })
      }
    } else {
      next(new ValidationError('Невалидный id'))
    }
  }).catch(() => {
    next(new ValidationError('Невалидный id'))
  })
}

export function pathForumPost(req: Request, res: Response, next: NextFunction) {
  const { id, content }: { id: number, content: string } = req.body
  ForumPosts.findOne({ where: { id } }).then((data: Model<IForumPosts> | null) => {
    if (data) {
      if (data.dataValues.authorId !== req.userId) {
        next(new Forbidden('Доступ запрещен'))
      } else {
        ForumPosts.update({ content }, { where: { id } }).then(() => {
          ForumPosts.findOne({
            where: { id },
            attributes: { exclude: ['updatedAt', 'forumId', 'createdAt'] }
          }).then((data: Model<IForumPosts> | null) => {
            if (data) {
              res.send(data)
            } else {
              res.send([])
            }
          })
        }).catch(() => {
          next(new ServerError('Произошла ошибка'))
        })
      }
    } else {
      next(new ValidationError('Такого id не существует'))
    }
  }).catch(() => {
    next(new ValidationError('Такого id не существует'))
  })
}
