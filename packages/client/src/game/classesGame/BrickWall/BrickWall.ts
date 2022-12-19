import { WallArgs } from '@/game/classesGame/Wall/types'
import Wall from '@/game/classesGame/Wall/Wall'
import Bullet from '@/game/classesGame/Bullet/Bullet'
import { BRICK_WALL_SPRITES } from '@/game/helpersGame/constants'


export default class BrickWall extends Wall {
  constructor(x: number, y: number) {
    super({ x, y, sprites: BRICK_WALL_SPRITES } as WallArgs)
  }


  public hit(projectile: Bullet): void {
    console.log('БУМ', this, projectile)
  }
}
