import { WallArgs } from '@/game/core/wall/types'
import Wall from '@/game/core/wall/Wall'
import Bullet from '@/game/core/bullet/bullet'
import { BRICK_WALL_SPRITES } from '@/game/helpers/constants'


export default class BrickWall extends Wall {
  constructor(x: number, y: number) {
    super({ x, y, sprites: BRICK_WALL_SPRITES } as WallArgs)
  }


  public hit(projectile: Bullet): void {
    console.log('БУМ', this, projectile)
  }
}
