import { Sprites } from '@/game/helpers/types'
import { Rect } from '@/game/core/types'

export default abstract class GameObject {

  public rect: Rect
  public readonly sprites: Sprites
  protected frames = 0
  protected animationFrame = 0
  
  constructor(rect: Rect, sprites: Sprites) {
    this.rect = rect
    this.sprites = sprites
  }
}
