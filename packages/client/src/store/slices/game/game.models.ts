import { IUser } from '@/store/slices/auth/auth.models'

interface IScores {
  [x: number]: number
}
export interface IPlayer {
  user: IUser | null
  scores: IScores
}
