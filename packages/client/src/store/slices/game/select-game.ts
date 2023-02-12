import { createSelector } from '@reduxjs/toolkit'
import { IUser } from '@/store/slices/auth/auth.models'
import { baseSelectProfile } from '@/store/slices/profile/select-profile'
import { RootState } from '@/store'

export const bestScore= (state: RootState) => state.game.bestScore
export const player1= (state: RootState) => state.game.player1
export const player2= (state: RootState) => state.game.player2

export const selectProfile = createSelector(
  [bestScore, player1, player2],
  (bestScore, player1) => {
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
