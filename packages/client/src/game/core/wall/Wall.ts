import GameObject from '@/game/core/game-object/game-object'
import { GameObjectType, IHitable } from '@/game/core/types'
import Bullet from '@/game/core/bullet/bullet'
import { WallArgs } from '@/game/core/wall/types'
import { TILE_SIZE } from '@/game/helpers/constants'

export default class Wall extends GameObject implements IHitable {
  public gameObjectType: GameObjectType = GameObjectType.Wall;
  public damage: number
  public state: number
  private type: string | undefined
  
  constructor({ pos, sprites, type }: WallArgs) {
    super({ pos, width: TILE_SIZE, height: TILE_SIZE, sprites })
    this.damage = 0
    this.type = type
    this.name = 'wall'
    this.state = 0b0000
  }

  public hit(bullet: Bullet): void {
    throw new Error('Method not implemented.');
  }
  
  get sprite() {
    return this.sprites[this.damage]
  }
}
