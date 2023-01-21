import GameObject from '@/game/core/game-object/game-object'
import { GameObjectArgs } from '@/game/core/types'
import { BASE_HEIGHT, BASE_POSITION, BASE_SPRITES, BASE_WIDTH } from '@/game/helpers/constants'

export default class Base extends GameObject {
  private readonly destroyed: boolean
  
  constructor(args: Partial<GameObjectArgs>) {
    super({
      ...args,
      x: BASE_POSITION[0],
      y: BASE_POSITION[1],
      width: BASE_WIDTH,
      height: BASE_HEIGHT,
      sprites: BASE_SPRITES
    })
    this.destroyed = false // isDestroyed? целая ли база?
    this.name = 'base'
  }
  
  get sprite(): number[] {
    return this.sprites[Number(this.destroyed)] // 0,1 разрушенный или целый в зависимости от damage
  }
  
  hit() {
    this.emit('destroyed', this)
  }
}
