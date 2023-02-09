import GameObject from '@/game/core/game-object/game-object'
import { Direction, GameObjectArgs, IUpdatable, UpdateState, Vec2 } from '@/game/core/types'
import Bullet from '@/game/core/bullet/bullet'
import {
  TANK_EXPLOSION_HEIGHT,
  TANK_EXPLOSION_WIDTH,
  TANK_HEIGHT,
  TANK_SPEED,
  TANK_TURN_THRESHOLD,
  TANK_WIDTH,
  TILE_SIZE,
} from '@/game/helpers/constants'
import TankExplosion from '@/game/core/tank-explosion/tank-explosion'

export default abstract class Tank extends GameObject implements IUpdatable {
  protected speed: number
  private readonly bulletSpeed: number
  protected bullet: Bullet | null
  protected direction: number
  protected explosion: TankExplosion | null
  public name: string

  constructor(args: Partial<GameObjectArgs>) {
    super({ ...args, width: TANK_WIDTH, height: TANK_HEIGHT } as GameObjectArgs)
    this.speed = TANK_SPEED
    this.bulletSpeed = 4
    this.bullet = null
    this.direction = 0
    this.explosion = null
    this.name = 'tank'
  }

  public abstract update(state: Partial<UpdateState>): void

  public get sprite() {
    return this.sprites[this.direction * 2 + this.animationFrame]
  }

  public get isExploding() {
    return Boolean(this.explosion?.isExploding)
  }

  public turn(direction: number) {
    const prevDirection = this.direction

    this.direction = direction

    if (direction === Direction.Up || direction === Direction.Down) {
      if (prevDirection === Direction.Right) {
        const value = TILE_SIZE - (this.pos.x % TILE_SIZE)

        if (value <= TANK_TURN_THRESHOLD) {
          this.pos.x += value
        }
      } else if (prevDirection === Direction.Left) {
        const value = this.pos.x % TILE_SIZE

        if (value <= TANK_TURN_THRESHOLD) {
          this.pos.x -= value
        }
      }
    } else {
      if (prevDirection === Direction.Up) {
        const value = this.pos.y % TILE_SIZE

        if (value <= TANK_TURN_THRESHOLD) {
          this.pos.y -= value
        }
      } else if (prevDirection === Direction.Down) {
        const value = TILE_SIZE - (this.pos.y % TILE_SIZE)

        if (value <= TANK_TURN_THRESHOLD) {
          this.pos.y += value
        }
      }
    }
  }

  public move(axis: string, value: number): void {
    if (axis === 'y') {
      this.pos.y += value * this.speed
    }
    if (axis === 'x') {
      this.pos.x += value * this.speed
    }
  }

  public fire() {
    if (!this.bullet) {
      const [x, y] = this.getBulletStartingPosition()
      this.bullet = new Bullet(
        this.direction,
        this,
        new Vec2(x, y),
        this.bulletSpeed
      )

      this.bullet.on('destroyed', () => {
        this.bullet = null
      })
      this.emit('fire', this.bullet)
    }
  }

  public animate(frameDelta: number) {
    this.frames += frameDelta

    if (this.frames > 20) {
      this.animationFrame ^= 1
      this.frames = 0
    }
  }

  hit() {
    this.explode()
    this.destroy()
  }

  explode() {
    if (this.isExploding) return

    const [x, y] = this.getExplosionStartingPosition()

    this.explosion = new TankExplosion({ pos: new Vec2(x, y) })

    this.emit('explode', this.explosion)
  }

  destroy() {
    this.isDestroyed = true
    this.bullet = null
    this.explosion = null

    this.emit('destroyed', this)
  }

  getBulletStartingPosition() {
    switch (this.direction) {
      case Direction.Up:
        return [this.left + 12, this.top - 4]
      case Direction.Right:
        return [this.right - 8, this.top + 12]
      case Direction.Down:
        return [this.left + 12, this.bottom - 8]
      case Direction.Left:
        return [this.left, this.top + 12]
      default:
        return [this.left, this.top]
    }
  }

  getExplosionStartingPosition() {
    return [
      this.left - TANK_EXPLOSION_WIDTH * 0.25,
      this.top - TANK_EXPLOSION_HEIGHT * 0.25,
    ]
  }
}
