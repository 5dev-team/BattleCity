import type { NextFunction, Request, Response } from 'express'
import { Forum, ForumPosts } from '../../init'
import { Forbidden, ServerError, ValidationError } from '../../errors'
import { getUnixTime } from '../../utils/helpers/getUnixTime'
import type { Model } from 'sequelize-typescript'
import type { IForum, IForumModel } from '../../models/forum'
import axios from 'axios'
import { YANDEX_API } from '../../utils/constants'

interface IUser {
  id: number
  first_name: string
  second_name: string
  display_name: string | null
  login: string
  email: string
  phone: string
  avatar: string | null
}

export async function createForum(req: Request, res: Response, next: NextFunction) {
  const authorId = req.userId
  const { title } = req.body
  try {
    const { updatedAt, ...created }: IForumModel = (
      await Forum.create({
        authorId,
        title,
      })
    ).get({ plain: true })

    const author: IUser = await axios.get(`${YANDEX_API}/user/${req.userId}`, {
      headers: {
        Cookie: req.headers.cookie
      }
    }).then(res => res.data)
    const out: IForum = {
      ...created,
      authorName: author.login,
      countMessage: 0,
      lastMessageId: null,
      lastMessageDate: null
    }

    res.send(out)
  } catch (e) {
      next(new ServerError('Произошла ошибка'))
  }
}

export async function getForums(req: Request, res: Response, next: NextFunction) {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore lib doesn't recognise 'raw' property
    const forums: Omit<IForum, 'updatedAt'>[] = await Forum.findAll({
      order: [['id', 'ASC']],
      raw: true,
      attributes: {
        exclude: ['updatedAt']
      }
    })

    const authorsHashmap: Record<number, string> = {}
    for (const forum of forums) {
      if (forum.authorId in authorsHashmap) {
        continue
      }
      const author: IUser = await axios.get(`${YANDEX_API}/user/${req.userId}`, {
        headers: {
          Cookie: req.headers.cookie
        }
      }).then(res => res.data)
      authorsHashmap[forum.authorId] = author.login
    }

    const preparedForums: IForum[] = await Promise.all(forums.map(async (forum) => {
      const countMessage = await ForumPosts.count({ where: { forumId: forum.id }})
      const lastItem = await ForumPosts.findOne({ where: { forumId: forum.id }, order: [['createdAt', 'DESC']] })
      const out: IForum = {
        ...forum,
        countMessage,
        authorName: authorsHashmap[forum.authorId],
        lastMessageId: lastItem?.id || null,
        lastMessageDate: lastItem?.createdAt || null
      }
      return out
  }))
    res.send(preparedForums)
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
