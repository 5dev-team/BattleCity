import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@/store'
import { IGameOverProps } from '@/components/UI/game-over/game-over'

export const bestScore= (state: RootState) => state.game.bestScore
export const player1= (state: RootState) => state.game.player1
export const player2= (state: RootState) => state.game.player2

export const selectProfile = createSelector(
  [bestScore, player1, player2],
  (bestScore, player1): IGameOverProps => {
    return {
      nextGame: true,
      stage: 1,
      playersCount: 1,
      bestScore,
      player1: {...player1, total: Object.values(player1.scores).reduce((acc, curr) => {
        return curr.count * curr.points
        },0)}
    }
  }
)
