import type { NextFunction, Request, Response } from 'express'
import { Forum, ForumPosts } from '../init'
import { Forbidden, ValidationError } from '../errors'

export function createForum(req: Request, res: Response, _next: NextFunction) {
  const owner_id = req.userId
  const { title, author } = req.body
  Forum.create({ owner_id, title, author }).then((data) => {
    res.send(data)
  })
}

export function getForums(_req: Request, res: Response, _next: NextFunction) {

  Forum.findAll({ include: [{ model: ForumPosts, required: false }] }).then((data) => {
    res.send(data)
  })
}

export function deleteForum(req: Request, res: Response, next: NextFunction) {
  const { id }: { id: number } = req.body
  Forum.findOne({ where: { id } }).then((data: any) => {
    if (data.owner_id !== req.userId) {
      next(new Forbidden('Доступ запрещен'))
    } else {
      Forum.destroy({ where: { id } }).then(() => {
        res.send({ message: 'Форум удален успешно' })
      })
    }
  }).catch(() => {
    next(new ValidationError('Невалидный id'))
  })
}
