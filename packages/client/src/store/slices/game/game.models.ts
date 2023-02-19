import { IUser } from '@/store/slices/auth/auth.models'

export interface IScores {
  [key: number]: { count: number, points: number },
}
export interface IPlayer {
  user: IUser | null
  scores: IScores
  total: number
}
