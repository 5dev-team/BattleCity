import View from '@/game/core/view/view'
import Input from '@/game/core/input/input'
import { Level } from '@/game/helpers/levels'
import { IScores } from '@/store/slices/game/game.models'

export interface IGameConstructor {
  input: Input
  view: View
  levels: Level[]
  stageIndex: number
}

export interface IGameOverData {
  gameOverData: { scores: IScores }[]
}
