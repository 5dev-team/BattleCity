import { ILeaderboardRequest } from '@/api/leaderboard/leaderboard.models'

export const LEADERBOARD_RATING_FIELD_NAME = 'BattleCityDevelopers'
export const LEADERBOARD_RATING_TEAM_NAME = 'tankTest'
export const LEADERBOARD_TEAM_NAME = 'tankDefaultTeam'
export const TABLE_TOTAL_ITEMS = 50

export const leaderboardDataRequest: ILeaderboardRequest = {
  ratingFieldName: LEADERBOARD_RATING_FIELD_NAME,
  cursor: 0,
  limit: TABLE_TOTAL_ITEMS
}
