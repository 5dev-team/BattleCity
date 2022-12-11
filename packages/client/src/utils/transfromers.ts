import { IUserScoreRequest } from '@/api/leaderboard/leaderboard.models'
import { LEADERBOARD_RATING_FIELD_NAME } from '@/constants'

export interface ILeaderboardScoreTransferred {
  id: number
  date: string
  score: number
}

export const transformScore = (data: IUserScoreRequest): ILeaderboardScoreTransferred => {
  
  const formatDate = (date: string) => {
    const year = Number(date.slice(-4)) % 100
    return `${date.slice(0, -4)}${year}`.split('-').join('.')
  }
  
  return {
    id: data.data.user_id,
    date: formatDate(data.data.score_date),
    score: data.data[LEADERBOARD_RATING_FIELD_NAME]
  }
}

