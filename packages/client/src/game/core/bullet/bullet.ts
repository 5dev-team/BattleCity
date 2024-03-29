import {
  Direction,
  GameObjectType,
  IDestroyable,
  IHitable,
  IUpdatable,
  UpdateState,
  Vec2,
} from '@/game/core/types'
import Explosion from '@/game/core/explosion/explosion'
import GameObject from '@/game/core/game-object/game-object'
import {
  BULLET_HEIGHT,
  BULLET_SPEED,
  BULLET_SPRITES,
  BULLET_WIDTH,
} from '@/game/helpers/constants'
import { getVectorForDirection } from '@/game/helpers/helpers'
import Tank from '@/game/core/tank/tank'
import BulletExplosion from '@/game/core/bullet-explosion/bullet-explosion'
import { Sprite } from '@/game/helpers/types'
import PlayerTank from '@/game/core/player-tank/player-tank'
import MobileGameObject from '@/game/core/mobile-game-object/mobile-game-object'

export default class Bullet extends MobileGameObject
  implements IUpdatable, IHitable, IDestroyable {
  public gameObjectType: GameObjectType = GameObjectType.Bullet
  protected collideWith = [
    GameObjectType.Base,
    GameObjectType.Bullet,
    GameObjectType.Tank,
    GameObjectType.Wall,
  ]
  public readonly direction: Direction
  private tank: Tank | null
  private tankId: number
  private explosion: Explosion | null
  protected speed: number

  constructor(
    direction: Direction,
    tank: Tank,
    pos = Vec2.zero,
    speed = BULLET_SPEED
  ) {
    super({
      pos: pos,
      width: BULLET_WIDTH,
      height: BULLET_HEIGHT,
      sprites: BULLET_SPRITES,
    })
    this.speed = speed
    this.direction = direction
    this.tank = tank
    this.tankId = tank.id
    this.explosion = null
    this.name = 'bullet'
  }

  public update({ world }: Pick<UpdateState, 'world'>): void {
    const gameObjects = Array.from(world.gameObjects).filter(
      c => this.shouldCollideWith(c) && c !== this.tank
    )

    const directionVector = getVectorForDirection(this.direction)
    const movement = this.getMovement(this.getMoveOffsetLimit(gameObjects))

    this.move(directionVector.scale(movement))

    if (world.isOutOfBounds(this)) {
      this.move(world.getOutOfBoundsOffset(this))
      this.explode()
      this.hit()
      return
    }

    if (movement < this.speed) {
      const collisions = this.getCollisions(this.getColliders(gameObjects))
      collisions.forEach(c => ((c as unknown) as IHitable).hit(this))

      if (collisions.length > 0) this.hit()
      if (collisions.some(c => c.gameObjectType !== GameObjectType.Bullet)) {
        this.explode()
      }
    }
  }

  public shouldCollideWith(obj: GameObject) {
    switch (obj.gameObjectType) {
      case GameObjectType.Base:
      case GameObjectType.Wall:
        return true
      case GameObjectType.Bullet:
        return (
          (this.isFromEnemyTank && (obj as Bullet).isFromPlayerTank) ||
          (this.isFromPlayerTank && (obj as Bullet).isFromEnemyTank)
        )
      case GameObjectType.Tank:
        return obj instanceof PlayerTank
          ? this.tankId !== obj.id
          : this.tank instanceof PlayerTank
      default:
        return false
    }
  }

  get sprite(): Sprite {
    return this.sprites[this.direction]
  }

  get isFromPlayerTank() {
    return this.tank instanceof PlayerTank
  }

  get isFromEnemyTank() {
    return !this.isFromPlayerTank
  }

  public hit() {
    this.stop()
    this.destroy()
  }

  public destroy() {
    this.tank = null
    this.explosion = null
    this.emit('destroyed', this)
  }

  private getExplosionStartingPosition(): number[] {
    switch (this.direction) {
      case Direction.Up:
        return [this.left - 10, this.top - 12]
      case Direction.Right:
        return [this.right - 16, this.top - 12]
      case Direction.Down:
        return [this.left - 10, this.bottom - 16]
      case Direction.Left:
        return [this.left - 16, this.top - 12]
      default:
        return [this.left - 10, this.top - 12]
    }
  }

  private explode() {
    const [x, y] = this.getExplosionStartingPosition()
    this.explosion = new BulletExplosion({ pos: new Vec2(x, y) })
    this.emit('explode', this.explosion)
  }
}
