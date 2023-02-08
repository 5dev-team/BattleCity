import { WallArgs } from '@/game/core/wall/types'
import Wall from '@/game/core/wall/Wall'
import Bullet from '@/game/core/bullet/bullet'
import { BRICK_WALL_SPRITES } from '@/game/helpers/constants'
import { Vec2 } from '../types';

export default class BrickWall extends Wall {
  constructor(pos: Vec2) {
    super(pos, BRICK_WALL_SPRITES)
  }
  
  public hit(projectile: Bullet): void {
    console.log('БУМ', this, projectile)
  }
}
