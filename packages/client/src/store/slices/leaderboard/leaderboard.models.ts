export interface ILeaderboardScoreTransferred {
  userId: number
  date: string
  score: number
}

export interface IsortLeaderboardConfig {
  column: string
  direction: 'asc' | 'desc'
}
