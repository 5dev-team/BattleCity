import Wall from '@/game/core/wall/wall'
import Bullet from '@/game/core/bullet/bullet'
import { WallArgs } from '@/game/core/wall/types'
import { BRICK_WALL_SPRITE_MAP, BRICK_WALL_SPRITES } from '@/game/helpers/constants'
import { Direction, IDestroyable, IHitable } from '@/game/core/types'

export default class BrickWall extends Wall implements IHitable, IDestroyable {
  constructor(args: Pick<WallArgs, 'pos'>) {
    super({ pos: args.pos, sprites: BRICK_WALL_SPRITES } as WallArgs)
    this.name = 'brick-wall'
  }

  get sprite() {
    return this.sprites[BRICK_WALL_SPRITE_MAP[this.state]]
  }
  
  public hit(bullet: Bullet) {
    this.damage += 1
    
    if (this.damage === 2) {
      this.destroy()
    }
    
    switch (bullet.direction) {
      case Direction.Up:
        this.state = this.state | 0b0001
      break
      case Direction.Right:
        this.state = this.state | 0b0010
        break
      case Direction.Down:
        this.state = this.state | 0b0100
      break
      case Direction.Left:
        this.state = this.state | 0b1000
        break
    }
  }

  public destroy(): void {
    this.emit('destroyed', this)
  }
}
