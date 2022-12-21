import View from '@/game/classesGame/View/View'
import Input from '@/game/classesGame/Input/Input'
import { Level } from '@/game/helpersGame/levels'

export interface IGameConstructor {
  input: Input,
  view: View,
  levels: Level[]
}

