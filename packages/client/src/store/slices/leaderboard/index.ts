// TODO: узнать, где хранить обшие типы
import { IUser } from '@/store/slices/auth/auth.models'
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import api from '@/api'
import { ILeaderboardRequest, IUserScore } from '@/api/leaderboard/leaderboard.models'
import { ILeaderboardScoreTransferred, transformScore } from '@/utils/transfromers'
import { ITEMS_PER_PAGE } from '@/pages/leaderboard/leaderboard'

interface IInitialState {
  scores: Array<ILeaderboardScoreTransferred>
  users: Array<Partial<IUser>>
  isLeaderboardLoading: boolean
  leaderboardError: string
  tableData: Array<IUserScore>
  isFullLoaded: boolean
  totalCount: number
}

export const fetchLeaderboardAll = createAsyncThunk(
  'leaderboard/fetchAll',
  async (data: ILeaderboardRequest, { dispatch }) => {
    
    const responseScore = await api.leaderboard.getAll(data)
    
    if (responseScore.length === 0) {
      dispatch(leaderboardSlice.actions.setFullLoaded())
      return []
    }
    
    const responseUsers: Array<IUser> = []
    const promises: Array<Promise<IUser>> = []
    
    const responseScoreTransformed = responseScore.map(item => {
      return transformScore(item)
    })
    
    responseScoreTransformed.forEach(score => {
      promises.push(api.user.getUserById(score.id))
    })
    
    Promise.allSettled(promises).then((results) => {
      results.filter(({ status }) => status === 'fulfilled').forEach((result) => {
        responseUsers.push((result as PromiseFulfilledResult<IUser>).value)
      })
      dispatch(leaderboardSlice.actions.fillTableData(responseUsers))
    })
    
    return responseScoreTransformed
  }
)

export const fetchUserData = createAsyncThunk(
  'user/getById',
  async (id: number) => api.user.getUserById(id)
)

const initialState: IInitialState = {
  scores: [],
  users: [],
  isLeaderboardLoading: false,
  leaderboardError: '',
  tableData: [],
  isFullLoaded: false,
  totalCount: 0
}

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    setFullLoaded: (state) => {
      state.isFullLoaded = true
      state.totalCount = state.tableData.length
    },
    fillTableData: (state, action) => {
      
      const users: Array<IUser> = action.payload
      
      // state.tableData = state.scores
      const newScores = state.scores
      .map((score, index) => {
        
        const user = users.find((user) => user.id === score.id)
        const userName = user?.display_name || user?.login
        const userAvatar = user?.avatar || ''
        
        return {
          id: index + 1,
          userId: score.id,
          avatar: userAvatar,
          name: userName as string,
          score: score.score,
          date: score.date
        }
      })
      .filter(item => typeof item !== 'undefined')
      
      if (state.tableData.length === 0) {
        state.tableData = newScores
      } else {
        const ids = new Set(newScores.map(e => e.userId))
        const newState = state.tableData.filter(a => !ids.has(a.userId)).concat(newScores)
        
        state.tableData = newState.map((item, index) => ({ ...item, id: index + 1 }))
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchLeaderboardAll.pending, (state) => {
      state.isLeaderboardLoading = true
    })
    builder.addCase(fetchLeaderboardAll.fulfilled, (state, { payload }) => {
      state.isLeaderboardLoading = false
      
      if (!state.isFullLoaded) {
        state.scores = payload
      }
    })
    builder.addCase(fetchLeaderboardAll.rejected, (state) => {
      state.isLeaderboardLoading = true
    })
    builder.addCase(fetchUserData.pending, (state) => {
      state.isLeaderboardLoading = true
    })
    builder.addCase(fetchUserData.fulfilled, (state, { payload }) => {
      state.isLeaderboardLoading = false
      state.users.push(payload)
    })
    builder.addCase(fetchUserData.rejected, (state) => {
      state.isLeaderboardLoading = true
      
    })
  }
})

export const selectLeaderboardDataPerPage = createSelector(
  [state => state,(state, page) => page],
  (data, page) => {
    // console.log(page)
    if (page === 0) {
      return data.slice(0,ITEMS_PER_PAGE)
    }
    return data.slice(ITEMS_PER_PAGE  * (page), ITEMS_PER_PAGE * page + ITEMS_PER_PAGE)
  }
)
