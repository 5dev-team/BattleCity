import { IHitable } from '@/game/classesGame/GameObject/types'
import Bullet from '@/game/classesGame/Bullet/Bullet'
import GameObject from '@/game/classesGame/GameObject/GameObject'
import { TILE_SIZE } from '@/game/helpersGame/constants'
import { WallArgs } from '@/game/classesGame/Wall/types'

export default abstract class Wall extends GameObject implements IHitable{
  public damage: number
  private type: string | undefined

  protected constructor({ sprites, ...args }: WallArgs) {
    super({...args, width: TILE_SIZE, height: TILE_SIZE, sprites})
    this.damage = 0
    this.type = args.type
  }

  get sprite() {
    return this.sprites[this.damage]
  }

  abstract hit(bullet: Bullet): void
}
