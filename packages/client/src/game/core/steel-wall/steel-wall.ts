import Wall from '@/game/core/wall/Wall'
import Bullet from '@/game/core/bullet/bullet'
import { WallArgs } from '@/game/core/wall/types'
import { STEEL_WALL_SPRITES } from '@/game/helpers/constants'
import { Vec2 } from '../types';

export default class SteelWall extends Wall {
  constructor(pos: Vec2) {
    super(pos, STEEL_WALL_SPRITES)
  }

  public hit(bullet: Bullet): void {
    console.log('BOOM', this, bullet)
  }
}
