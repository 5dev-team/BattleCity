import GameObject from '@/game/core/game-object/game-object'
import {
  BASE_HEIGHT,
  BASE_POSITION,
  BASE_SPRITES,
  BASE_WIDTH,
} from '@/game/helpers/constants'
import { Sprite } from '@/game/helpers/types'
import { GameObjectType, IDestroyable, IHitable, Vec2 } from '@/game/core/types'

export default class Base extends GameObject implements IHitable, IDestroyable {
  public gameObjectType: GameObjectType = GameObjectType.Base
  private destroyed: boolean

  constructor() {
    super({
      pos: new Vec2(BASE_POSITION[0], BASE_POSITION[1]),
      width: BASE_WIDTH,
      height: BASE_HEIGHT,
      sprites: BASE_SPRITES,
    })
    this.destroyed = false // isDestroyed? целая ли база?
    this.name = 'base'
  }

  get sprite(): Sprite {
    return this.sprites[Number(this.destroyed)] // 0,1 разрушенный или целый в зависимости от damage
  }

  public hit() {
    this.destroy()
  }

  public destroy(): void {
    this.destroyed = true
    this.emit('destroyed', this)
  }
  
}
