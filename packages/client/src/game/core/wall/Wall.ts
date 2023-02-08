import GameObject from '@/game/core/game-object/game-object'
import { IHitable, Rect, Vec2 } from '@/game/core/types'
import Bullet from '@/game/core/bullet/bullet'
import { WallArgs } from '@/game/core/wall/types'
import { TILE_SIZE } from '@/game/helpers/constants'
import { Sprites } from '@/game/helpers/types';

export default abstract class Wall extends GameObject implements IHitable{
  public damage: number

  protected constructor(pos: Vec2, sprites: Sprites) {
    super(new Rect(pos, TILE_SIZE, TILE_SIZE), sprites)
    this.damage = 0
  }

  get sprite() {
    return this.sprites[this.damage]
  }

  abstract hit(bullet: Bullet): void
}
