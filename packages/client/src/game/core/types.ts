import Input from '@/game/core/input/input'
import Stage from '@/game/core/stage/stage'
import Bullet from '@/game/core/bullet/bullet'
import { Sprite } from '@/game/helpers/types'

export type GameObjectArgs = {
  x: number
  y: number
  width: number
  height: number
  sprites: Sprite[]
  type?: number
  animationSpeed?: number
}

export type UpdateState = { input: Input; frameDelta: number; world: Stage }

 export interface IUpdatable {
   update(state: Partial<UpdateState>): void
 }

export interface IHitable {
  hit(bullet: Bullet): void
}
