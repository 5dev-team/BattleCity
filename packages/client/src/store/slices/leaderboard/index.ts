import { IUser, IUserDTO } from '@/store/slices/auth/auth.models'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '@/api'
import { ILeaderboardNewLeaderRequest, ILeaderboardRequest, IUserScore } from '@/api/leaderboard/leaderboard.models'
import { ILeaderboardScoreTransferred } from '@/store/slices/leaderboard/leaderboard.models'
import { transformScore, transformUser } from '@/utils/transformers'
import { leaderboardDataRequest } from '@/constants/configs/leaderboard'
import { RootState } from '@/store'
import { findBestScore } from '@/utils/totalScore'
import { gameSlice } from '@/store/slices/game'
import { AxiosResponse } from 'axios'

interface IInitialState {
  scores: Array<ILeaderboardScoreTransferred>
  users: Array<Partial<IUser>>
  isLeaderboardLoading: boolean
  leaderboardError: string | null
  tableData: Array<IUserScore>
}

export const addScoreToLeaderboard = createAsyncThunk('leaderboard/addScore', async (data: ILeaderboardNewLeaderRequest) => {
  api.leaderboard.addScore(data).catch(error => console.log(error) )
})

export const fetchUserHighScore = createAsyncThunk('leaderboard/fetchHighScore', async (data: ILeaderboardRequest = leaderboardDataRequest, {dispatch, getState}) => {
  const responseScore = await api.leaderboard.getAll(data)
  const responseScoreTransformed = responseScore.data.map(item => {
    return transformScore(item)
  })
  
  const bestScore = findBestScore(responseScoreTransformed, (getState() as RootState).auth.user?.id)
  dispatch(gameSlice.actions.setBestScore(bestScore))
})

export const fetchLeaderboardAll = createAsyncThunk(
  'leaderboard/fetchAll',
  async (data: ILeaderboardRequest = leaderboardDataRequest, { dispatch }) => {
    
    dispatch(leaderboardSlice.actions.setLoading(true))
    
    const responseScore = await api.leaderboard.getAll(data)
    const responseUsers: Array<IUser> = []
    const promises: Array<Promise<AxiosResponse<IUserDTO>>> = []
    
    const responseScoreTransformed = responseScore.data.map(item => {
      return transformScore(item)
    })
    
    responseScoreTransformed.forEach(score => {
      promises.push(api.users.getUser(score.userId))
    })
    
    Promise.all(promises)
    .then((results) => {
      results.forEach((result) => {
        responseUsers.push(transformUser(result.data))
      })
      dispatch(leaderboardSlice.actions.clearError())
      dispatch(leaderboardSlice.actions.fillTableData(responseUsers))
    })
    .catch(error => {
      dispatch(leaderboardSlice.actions.serError(error))
    })
    .finally(() => {
      dispatch(leaderboardSlice.actions.setLoading(false))
    })
    
    return responseScoreTransformed
  }
)

const initialState: IInitialState = {
  scores: [],
  users: [],
  isLeaderboardLoading: false,
  leaderboardError: null,
  tableData: []
}

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLeaderboardLoading = action.payload
    },
    serError: (state, action) => {
      state.leaderboardError = action.payload
    },
    clearError: state => {
      state.leaderboardError = ''
    },
    fillTableData: (state, action) => {
      
      const users: Array<IUser> = action.payload
      
      state.tableData = state.scores
      .map((score, index) => {
        
        const user = users.find((user) => user.id === score.userId)
        const userName = user?.displayName || user?.login
        const userAvatar = user?.avatar || ''
        
        return {
          id: index + 1,
          userId: score.userId,
          avatar: userAvatar,
          name: userName as string,
          score: score.score,
          date: score.date
        }
      })
      .filter(item => typeof item !== 'undefined')
      
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchLeaderboardAll.fulfilled, (state, { payload }) => {
      state.scores = payload
    })
    builder.addCase(fetchLeaderboardAll.rejected, (state, { error }) => {
      state.leaderboardError = error.message || 'unknown error'
    })
  }
})
