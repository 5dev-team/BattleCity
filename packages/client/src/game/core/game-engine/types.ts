import View from '@/game/core/view/view'
import Input from '@/game/core/input/input'
import { Level } from '@/game/helpers/levels'

export interface IGameConstructor {
  input: Input
  view: View
  levels: Level[]
}
