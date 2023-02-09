import { Direction, IUpdatable, UpdateState, Vec2 } from '@/game/core/types'
import Explosion from '@/game/core/explosion/explosion'
import GameObject from '@/game/core/game-object/game-object'
import { UnknownGameObject } from '@/game/core/stage/types'
import {
  BULLET_HEIGHT,
  BULLET_SPEED,
  BULLET_SPRITES,
  BULLET_WIDTH,
} from '@/game/helpers/constants'
import {
  getAxisForDirection,
  getValueForDirection,
} from '@/game/helpers/helpers'
import Tank from '@/game/core/tank/tank'
import BulletExplosion from '@/game/core/bullet-explosion/bullet-explosion'
import { Sprite } from '@/game/helpers/types'
import Base from '@/game/core/base/base'
import Wall from '@/game/core/wall/Wall'
import PlayerTank from '@/game/core/player-tank/player-tank';

export default class Bullet extends GameObject implements IUpdatable {
  public readonly direction: Direction
  private tank: Tank | null
  private tankId: number
  private explosion: Explosion | null

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
    this.objectType = 'bullet'
  }

  public update(state: Pick<UpdateState, 'world'>): void {
    const axis = getAxisForDirection(this.direction)
    const value = getValueForDirection(this.direction)

    this.move(axis, value)

    const isOutOfBounds = state.world.isOutOfBounds(this)
    const collision = state.world.getCollision(this)
    if (isOutOfBounds) {
      this.destroy()
    } else if (collision) {
      if (collision && this.collide([...collision.objects])) {
        this.stop()
        this.explode()
      }
    }
  }

  get sprite(): Sprite {
    return this.sprites[this.direction]
  }

  get isFromPlayerTank() {
    return this.tank?.objectType === 'playerTank'
  }

  get isFromEnemyTank() {
    return this.tank?.objectType === 'enemyTank'
  }

  shouldCollideWith(obj: GameObject) {
    if (obj && obj.objectType) {
      switch (true) {
        case obj instanceof Base:
        case obj instanceof Wall:
          return true
        case obj instanceof Bullet:
          return (
            (this.isFromEnemyTank && (obj as Bullet).isFromPlayerTank) ||
            (this.isFromPlayerTank && (obj as Bullet).isFromEnemyTank)
          )
        case obj instanceof PlayerTank:
          return this.tankId !== obj.id
        case obj instanceof Tank:
          return this.tank! instanceof PlayerTank
        default:
          return false
      }
    }
  }

  private shouldExplode(gameObject: GameObject) {
    return gameObject.objectType !== 'bullet'
  }

  private collide(objects: UnknownGameObject[]): boolean {
    let shouldExplode = false

    for (const object of objects) {
      if (!this.shouldCollideWith(object)) continue

      object?.hit(this)
      shouldExplode = this.shouldExplode(object)
    }

    return shouldExplode
  }

  hit() {
    this.stop()
    this.destroy()
  }

  private destroy() {
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

  explode() {
    const [x, y] = this.getExplosionStartingPosition()
    this.explosion = new BulletExplosion({ pos: new Vec2(x, y) })
    this.explosion.on('destroyed', () => this.destroy())
    this.emit('explode', this.explosion)
  }
}
