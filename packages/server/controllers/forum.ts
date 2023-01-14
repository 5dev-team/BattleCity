import bcrypt from 'bcrypt'
import { generateToken } from '../utils/jwt'
import { AuthError, DublicateError, NotFoundError, ValidationError } from '../errors'
import { User } from '../models'
import type { NextFunction, Request, Response } from 'express'

const MONGO_DUPLICATE_KEY_CODE = 11000
const saltRounds = 10

function login(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError('Емейл или пароль неверный')
      }
      return {
        isPasswordValid: bcrypt.compareSync(password, user.password),
        user
      }
    })
    .then(({ isPasswordValid, user }) => {
      if (!isPasswordValid) {
        throw new AuthError('Емейл или пароль неверный')
      }
      const jwToken = generateToken(user._id)
      return res.send({ token: jwToken })
    })
    .catch(next)
}

function createUser(req: Request, res: Response, next: NextFunction) {
  const {
    name,
    email,
    password
  } = req.body

  bcrypt.hash(password, saltRounds)
    .then((hash) => {
      User.create({
        email, password: hash, name
      })
        .then((user) => res.send({
          name: user.name, email: user.email, _id: user._id,
        }))
        .catch((err) => {
          if (err.code === MONGO_DUPLICATE_KEY_CODE) {
            next(new DublicateError('Такой емейл уже занят'))
            return;
          }
          next(err);
        });
    }).catch(next);
}

function getUserMe(req: Request, res: Response, next: NextFunction) {
  const { _id } = req.user

  User.findById(_id)
    .orFail(() => new NotFoundError('Юзер с указанным id не существует'))
    .then((user) => res.send(user))
    .catch(next)
}

function pathUserMe(req: Request, res: Response, next: NextFunction) {
  const { _id } = req.user
  User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
    .orFail(() => new NotFoundError('Пользователь с указанным id не существует'))
    .then((user) => {
      res.send({ newObject: user })
    })
    .catch((err) => {
      if (err.code === MONGO_DUPLICATE_KEY_CODE) {
        next(new DublicateError('Такой емейл уже занят'))
        return
      }
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некоректные данные'))
      } else {
        next(err)
      }
    })
}

export {
  createUser,
  pathUserMe,
  login,
  getUserMe
}

