import { IUserScoreRequest } from '@/api/leaderboard/leaderboard.models'
import { LEADERBOARD_RATING_FIELD_NAME } from '@/constants/configs/leaderboard'

export interface ILeaderboardScoreTransferred {
  userId: number
  date: string
  score: number
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

