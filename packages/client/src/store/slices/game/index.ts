import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IPlayer } from '@/store/slices/game/game.models'
import { IGameOverData } from '@/game/core/game-engine/types'
import { addScoreToLeaderboard, leaderboardSlice } from '@/store/slices/leaderboard'


interface IInitialState {
  playersCount: number
  player1:IPlayer
  player2: IPlayer
}

const initialState: IInitialState = {
  playersCount: 1,
  player1: {
    user: null,
    scores: {}
  } ,
  player2: {
    user: null,
    scores: {}
  },
  
}

export const saveGameScores = createAsyncThunk(
  'game/saveGameScores',
  (data: IGameOverData, {dispatch}) => {
    dispatch(gameSlice.actions.setScores(data))
    dispatch(addScoreToLeaderboard({
      data: {
      user_id: 68575,
        score_date: 1674754553,
        BattleCityDevelopers: 11
    },
      ratingFieldName: 'BattleCityDevelopers',
      teamName: 'tankTest'
    }))
    
  }
)

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setScores: (state, action) => {
      if (state.playersCount === 1) {
        state.player1.scores = action.payload.gameOverData[0].scores
      }
    }
  },
})
