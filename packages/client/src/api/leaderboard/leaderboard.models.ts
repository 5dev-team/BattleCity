import { LEADERBOARD_RATING_FIELD_NAME } from '@/constants'

export interface IUserScore {
  id: number
  userId: number
  avatar: string
  name: string
  score: number
  date: string
}

export interface IUserScoreRequest {
  data: {
    user_id: number
    score_date: string
    [LEADERBOARD_RATING_FIELD_NAME]: number
  }
}

export interface ILeaderboardRequest {
  ratingFieldName: string
  cursor: number
  limit: number
}

export interface ILeaderboardNewLeaderRequest extends IUserScoreRequest{
  ratingFieldName: string
  teamName: string
}
