import Wall from '@/game/core/wall/Wall'
import Bullet from '@/game/core/bullet/bullet'
import { WallArgs } from '@/game/core/wall/types'
import { STEEL_WALL_SPRITES } from '@/game/helpers/constants'

export default class SteelWall extends Wall {
  constructor(x: number, y: number) {
    super({ x, y, sprites: STEEL_WALL_SPRITES } as WallArgs)
    this.name = 'steel-wall'
  }

  public hit(): void {
    // console.log('BOOM', this, bullet)
  }
}
