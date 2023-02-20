import { AnyAction, createSlice, ThunkAction } from '@reduxjs/toolkit'
import { IPlayer } from '@/store/slices/game/game.models'
import { IGameOverData } from '@/game/core/game-engine/types'
import { addScoreToLeaderboard } from '@/store/slices/leaderboard'
import { getTotalScore } from '@/utils/totalScore'
import { RootState } from '@/store'
import { LEADERBOARD_RATING_FIELD_NAME, LEADERBOARD_RATING_TEAM_NAME } from '@/constants/configs/leaderboard'

interface IInitialState {
  playersCount: number
  bestScore: number
  player1: IPlayer
  player2: IPlayer
}

const initialState: IInitialState = {
  playersCount: 1,
  bestScore: 0,
  player1: {
    user: null,
    total: 0,
    scores: {},
  },
  player2: {
    user: null,
    total: 0,
    scores: {},
  },
}

export const saveGameScores = (data: IGameOverData): ThunkAction<void, RootState, unknown, AnyAction> => (dispatch, getState) => {
  const { scores } = data.gameOverData[0]
  const newTotalScore = getTotalScore(scores)
  const {auth, game} = getState()
  if ((newTotalScore - game.bestScore) > 0) {
    
    if (auth && auth.user) {
      dispatch(
        addScoreToLeaderboard({
          data: {
            user_id: auth.user.id,
            score_date: Date.now(),
            BattleCityDevelopers: newTotalScore,
          },
          ratingFieldName: LEADERBOARD_RATING_FIELD_NAME,
          teamName: LEADERBOARD_RATING_TEAM_NAME,
        })
      )
    }


  }
  dispatch(gameSlice.actions.setScores(data))

}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setScores: (state, action) => {
      if (state.playersCount === 1) {
        state.player1.scores = action.payload.gameOverData[0].scores
      }
    },
    setBestScore: (state, action) => {
      state.bestScore = action.payload
    },
  },
})
