import GameObject from '@/game/core/game-object/game-object'
import { BASE_HEIGHT, BASE_POSITION, BASE_SPRITES, BASE_WIDTH } from '@/game/helpers/constants'
import { singleSprite } from '@/game/helpers/types'

export default class Base extends GameObject {
  private readonly destroyed: boolean
  
  constructor() {
    super({
      x: BASE_POSITION[0],
      y: BASE_POSITION[1],
      width: BASE_WIDTH,
      height: BASE_HEIGHT,
      sprites: BASE_SPRITES,
      
    })
    this.destroyed = false // isDestroyed? целая ли база?
    this.name = 'base'
    this.objectType = 'base'
  }
  
  get sprite(): singleSprite {
    return this.sprites[Number(this.destroyed)] // 0,1 разрушенный или целый в зависимости от damage
  }
  
  hit() {
    this.emit('destroyed', this)
  }
}
