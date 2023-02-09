import GameObject from '@/game/core/game-object/game-object'
import { IHitable } from '@/game/core/types'
import Bullet from '@/game/core/bullet/bullet'
import { WallArgs } from '@/game/core/wall/types'
import { TILE_SIZE } from '@/game/helpers/constants'

export default abstract class Wall extends GameObject implements IHitable {
  public damage: number
  public state: number
  private type: string | undefined
  
  protected constructor({ pos, sprites, type }: WallArgs) {
    super({ pos, width: TILE_SIZE, height: TILE_SIZE, sprites })
    this.damage = 0
    this.type = type
    this.name = 'wall'
    this.objectType = 'wallObject'
    this.state = 0b0000
  }
  
  get sprite() {
    return this.sprites[this.damage]
  }
  
  abstract hit(bullet: Bullet): void
}
