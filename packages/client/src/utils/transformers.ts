import { IUserDTO, IUser } from "@/store/slices/auth/auth.models"
import { IUserScoreRequest } from '@/api/leaderboard/leaderboard.models'
import { LEADERBOARD_RATING_FIELD_NAME } from '@/constants/configs/leaderboard'
import { ILeaderboardScoreTransferred } from '@/store/slices/leaderboard/leaderboard.models'

export const transformUser = (user: IUserDTO): IUser => {
  const avatar = user.avatar? `${__YANDEX_API__}/resources/${user.avatar}` : ''
  return {
    id: user.id,
    firstName: user.first_name,
    secondName: user.second_name,
    displayName: user.display_name ?? user.login,
    login: user.login,
    email: user.email,
    phone: user.phone,
    avatar: avatar,
  } as IUser
}

export const transformScore = (data: IUserScoreRequest): ILeaderboardScoreTransferred => {
  
  const formatDate = (seconds: number) => {
    const date = new Date(seconds*1e3)
    return `${date.getDay()}.${date.getMonth()}.${String(date.getUTCFullYear()).slice(2)}`
  }
  
  return {
    userId: data.data.user_id,
    date: formatDate(data.data.score_date),
    score: data.data[LEADERBOARD_RATING_FIELD_NAME]
  }
}
