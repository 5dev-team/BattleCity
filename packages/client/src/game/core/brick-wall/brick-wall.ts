import { WallArgs } from '@/game/core/wall/types'
import Wall from '@/game/core/wall/Wall'
import Bullet from '@/game/core/bullet/bullet'
import { BRICK_WALL_SPRITES, Direction } from '@/game/helpers/constants'
import Stage from '@/game/core/stage/stage'

export default class BrickWall extends Wall {
  constructor(x: number, y: number) {
    super({ x, y, sprites: BRICK_WALL_SPRITES } as WallArgs)
    this.name = 'brick-wall'
    this.objectType = 'brickWall'
  }
  
  update({ world }: Record<string, Stage>) {
    if (this.isDestroyed) {
      world.objects.delete(this)
    }
  }
  
  public hit(bullet: Bullet) {
    if (this.isDestroyed) return
    
    this.damage += 1
    
    if (this.damage === 2) {
      this.isDestroyed = true
    }
    
    switch (bullet.direction) {
      case Direction.UP:
        this.state = this.state | 0b0001
        break
      case Direction.RIGHT:
        this.state = this.state | 0b0010
        break
      case Direction.DOWN:
        this.state = this.state | 0b0100
        break
      case Direction.LEFT:
        this.state = this.state | 0b1000
        break
    }
  }
}
