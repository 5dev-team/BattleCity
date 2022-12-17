import { IUserScoreRequest } from '@/api/leaderboard/leaderboard.models'
import { LEADERBOARD_RATING_FIELD_NAME } from '@/constants/configs/leaderboard'

export interface ILeaderboardScoreTransferred {
  userId: number
  date: string
  score: number
}

export const transformScore = (data: IUserScoreRequest): ILeaderboardScoreTransferred => {
  
  const formatDate = (date: number) => new Date(date).toISOString().split('T')[0].split('-').join('.')
  
  return {
    userId: data.data.user_id,
    date: formatDate(data.data.score_date),
    score: data.data[LEADERBOARD_RATING_FIELD_NAME]
  }
}

