import jwt from 'jsonwebtoken'
import { JWT_SECRET_KEY, NODE_ENV } from './constants'
import { Types } from 'mongoose'

function generateToken(payload: Types.ObjectId): string {
  return jwt.sign({ _id: payload }, NODE_ENV === 'production' ? JWT_SECRET_KEY : '12345678', { expiresIn: '7d' })
}

export {
  generateToken
}

