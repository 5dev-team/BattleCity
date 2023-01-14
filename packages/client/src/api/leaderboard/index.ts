import { request } from '@/api/request'
import {
  ILeaderboardNewLeaderRequest,
  ILeaderboardRequest,
  IUserScoreRequest
} from '@/api/leaderboard/leaderboard.models'

export default {
  addScore(data: ILeaderboardNewLeaderRequest) {
    return request({
      url: __YANDEX_API__ + '/leaderboard',
      method: 'POST',
      data
    })
  },
  getAll(data: ILeaderboardRequest): Promise<Array<IUserScoreRequest>> {
    return request({
      url: __YANDEX_API__ + '/leaderboard/all',
      method: 'POST',
      data
    })
  }
}
