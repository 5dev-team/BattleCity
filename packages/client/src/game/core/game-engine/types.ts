import View from '@/game/core/view/view'
import Input from '@/game/core/input/input'
import { Level } from '@/game/helpers/levels'
import { IScoreResult } from '@/game/core/player-tank/types'

export interface IGameConstructor {
  input: Input
  view: View
  levels: Level[]
  stageIndex: number
}

export interface IGameOverData {
  gameOverData: { scores: IScoreResult }[]
}
