import Wall from '@/game/core/wall/wall'
import { WallArgs } from '@/game/core/wall/types'
import { STEEL_WALL_SPRITES } from '@/game/helpers/constants'
import { IHitable } from '../types'

export default class SteelWall extends Wall implements IHitable {
  constructor(args: Pick<WallArgs, 'pos'>) {
    super({ pos: args.pos, sprites: STEEL_WALL_SPRITES } as WallArgs)
    this.name = 'steel-wall'
  }
  
  public hit() {
    return
  }
}
