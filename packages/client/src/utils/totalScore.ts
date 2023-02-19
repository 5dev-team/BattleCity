import { IScoreResult } from '@/game/core/player-tank/types'
import { ILeaderboardScoreTransferred } from '@/store/slices/leaderboard/leaderboard.models'
export const getTotalScore = (score: IScoreResult): number => {
  return Object.entries(score).reduce((acc, curr) => {
  return acc + parseFloat(curr[0])*parseFloat(curr[1])*100
  },0)

}

export const findBestScore = (scoresArray: ILeaderboardScoreTransferred[], userId: number | undefined) => {
  const userScores = scoresArray.filter(a => a.userId === userId)
  if (userScores) {
    return Math.max(...userScores.map(i => i.score))
  }
  return 0
}
