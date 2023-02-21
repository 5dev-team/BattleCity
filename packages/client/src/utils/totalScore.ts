import { ILeaderboardScoreTransferred } from '@/store/slices/leaderboard/leaderboard.models'
import { IScores } from '@/store/slices/game/game.models'
export const getTotalScore = (score: IScores): number => {
  return Object.entries(score).reduce((acc, [key, value]) => {
  return acc + value.points
  },0)

}

export const findBestScore = (scoresArray: ILeaderboardScoreTransferred[], userId: number | undefined) => {
  const userScores = scoresArray.filter(a => a.userId === userId)
  if (userScores) {
    return Math.max(...userScores.map(i => i.score))
  }
  return 0
}
