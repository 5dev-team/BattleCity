import GameObject from '@/game/core/game-object/game-object'
import { GameObjectArgs, Rect, Vec2 } from '@/game/core/types'
import {
  BASE_HEIGHT,
  BASE_POSITION,
  BASE_SPRITES,
  BASE_WIDTH,
} from '@/game/helpers/constants'

export default class Base extends GameObject {
  private readonly destroyed: boolean

  constructor(args: Partial<GameObjectArgs>) {
    super(
      new Rect(
        new Vec2(BASE_POSITION[0], BASE_POSITION[1]),
        BASE_WIDTH,
        BASE_HEIGHT
      ),
      BASE_SPRITES
    )
    this.destroyed = false // isDestroyed? целая ли база?
  }

  get sprite(): number[] {
    return this.sprites[Number(this.destroyed)] // 0,1 разрушенный или целый в зависимости от damage
  }
}
