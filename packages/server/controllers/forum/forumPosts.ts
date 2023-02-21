import type { NextFunction, Request, Response } from 'express'
import { ForumPosts } from '../../init'
import type { ParamsDictionary } from 'express-serve-static-core'
import { Forbidden, ServerError, ValidationError } from '../../errors'
import { getUnixTime } from '../../utils/helpers/getUnixTime'
import type { IForumPosts, IForumPostsModel } from '../../models/forumPosts'
import type { Model } from 'sequelize-typescript'
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

export async function createPost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorId = req.userId
  const { content, forumId, rootPost = null } = req.body
  if (rootPost != null) {
    await ForumPosts.findOne({ where: { id: rootPost } }).then(
      (data: Model<IForumPosts> | null) => {
        if (!data) {
          next(new ValidationError('Невалидный id rootPost'))
        }
      }
    )
  }
  try {
    const { updatedAt, ...created }: IForumPostsModel = (
      await ForumPosts.create({
        authorId,
        content,
        forumId,
        rootPost,
      })
    ).get({ plain: true })

    const author: IUser = await axios
      .get(`${YANDEX_API}/user/${authorId}`, {
        headers: {
          Cookie: req.headers.cookie,
        },
      })
      .then(res => res.data)
    const out: IForumPosts = {
      ...created,
      authorName: author.login,
    }

    res.send(out)
  } catch (e) {
    next(new ServerError('Произошла ошибка'))
  }
}

export async function getPosts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { forumId }: ParamsDictionary = req.params
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore lib doesn't recognise 'raw' property
    const posts: Omit<IForumPostsModel, 'updatedAt' | 'forumId'>[] =
      await ForumPosts.findAll({
        attributes: { exclude: ['updatedAt', 'forumId'] },
        where: { forumId },
        order: [['id', 'ASC']],
        raw: true,
      })

    const authorsHashmap: Record<number, string> = {}
    for (const post of posts) {
      if (post.authorId in authorsHashmap) {
        continue
      }
      const author: IUser = await axios
        .get(`${YANDEX_API}/user/${post.authorId}`, {
          headers: {
            Cookie: req.headers.cookie,
          },
        })
        .then(res => res.data)
      authorsHashmap[post.authorId] = author.login
    }

    const preparedForumPosts: IForumPosts[] = posts.map(post => ({
      ...post,
      authorName: authorsHashmap[post.authorId],
    }))

    res.send(preparedForumPosts)
  } catch (e) {
    next(new ServerError('Произошла ошибка'))
  }
}

export function getPost(req: Request, res: Response, next: NextFunction) {
  const { id }: ParamsDictionary = req.params
  ForumPosts.findOne({
    attributes: { exclude: ['updatedAt', 'forumId'] },
    where: { id },
    order: [['id', 'ASC']],
  })
    .then((data: Model<IForumPosts> | null) => {
      if (data && data.dataValues.createdAt) {
        const date: number = getUnixTime(data.dataValues.createdAt)
        data.dataValues.createdAt = date
      } else {
        next(new ValidationError('Невалидный id'))
      }
      res.send(data)
    })
    .catch(() => {
      next(new ValidationError('Невалидный id'))
    })
}

export function deletePost(req: Request, res: Response, next: NextFunction) {
  const { id }: { id: number } = req.body
  ForumPosts.findOne({ where: { id } })
    .then((data: Model<IForumPosts> | null) => {
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
    })
    .catch(() => {
      next(new ValidationError('Невалидный id'))
    })
}

export function pathForumPost(req: Request, res: Response, next: NextFunction) {
  const { id, content }: { id: number; content: string } = req.body
  ForumPosts.findOne({ where: { id } })
    .then((data: Model<IForumPosts> | null) => {
      if (data) {
        if (data.dataValues.authorId !== req.userId) {
          next(new Forbidden('Доступ запрещен'))
        } else {
          ForumPosts.update({ content }, { where: { id } })
            .then(() => {
              ForumPosts.findOne({
                where: { id },
                attributes: { exclude: ['updatedAt', 'forumId', 'createdAt'] },
              }).then((data: Model<IForumPosts> | null) => {
                if (data) {
                  res.send(data)
                } else {
                  res.send([])
                }
              })
            })
            .catch(() => {
              next(new ServerError('Произошла ошибка'))
            })
        }
      } else {
        next(new ValidationError('Такого id не существует'))
      }
    })
    .catch(() => {
      next(new ValidationError('Такого id не существует'))
    })
}
