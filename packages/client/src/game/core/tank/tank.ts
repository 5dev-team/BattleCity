import GameObject from '@/game/core/game-object/game-object'
import {
  Direction,
  GameObjectArgs,
  GameObjectType,
  IDestroyable,
  IHitable,
  Vec2,
} from '@/game/core/types'
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
import MobileGameObject from '@/game/core/mobile-game-object/mobile-game-object'

export default class Tank extends MobileGameObject implements IHitable, IDestroyable {
  protected collideWith = [
    GameObjectType.Wall,
    GameObjectType.Tank,
    GameObjectType.Base,
  ]
  public gameObjectType: GameObjectType = GameObjectType.Tank
  protected direction: Direction
  protected speed: number
  protected bullet: Bullet | null
  protected explosion: TankExplosion | null
  private readonly _bulletSpeed: number
  private readonly _fireDelay = 1000

  constructor(args: Partial<GameObjectArgs>) {
    super({ ...args, width: TANK_WIDTH, height: TANK_HEIGHT } as GameObjectArgs)
    this.direction = Direction.Up
    this.speed = TANK_SPEED
    this._bulletSpeed = 4
    this.bullet = null
    this.explosion = null
    this.name = 'tank'
  }

  public get sprite() {
    return this.sprites[this.direction * 2 + this.animationFrame]
  }

  public get isExploding() {
    return Boolean(this.explosion?.isExploding)
  }

  public turn(direction: Direction, offsetLimit: number) {
    const prevDirection = this.direction
    
    this.direction = direction
    const offset = Vec2.zero
    
    if (direction === Direction.Up || direction === Direction.Down) {
      if (prevDirection === Direction.Right) {
        const value = TILE_SIZE - (this.pos.x % TILE_SIZE)
        offset.x += value <= TANK_TURN_THRESHOLD ? value : 0
      } else if (prevDirection === Direction.Left) {
        const value = this.pos.x % TILE_SIZE
        offset.x -= value <= TANK_TURN_THRESHOLD ? value : 0
      }
    } else {
      if (prevDirection === Direction.Up) {
        const value = this.pos.y % TILE_SIZE
        offset.y -= value <= TANK_TURN_THRESHOLD ? value : 0
      } else if (prevDirection === Direction.Down) {
        const value = TILE_SIZE - (this.pos.y % TILE_SIZE)
        offset.y += value <= TANK_TURN_THRESHOLD ? value : 0
      }
    }

    const offsetLength = offset.length()

    if (offsetLimit >= offsetLength) this.pos = this.pos.add(offset)
  }

  protected getTurnOffsetLimit(colliders: GameObject[]): number {
    return colliders
      .filter(
        obj =>
          obj.id !== this.id &&
          this.collideWith.some(objType => obj.gameObjectType === objType) &&
          this.isTowardsTo(obj)
      )
      .reduce((distance: number, collider) => {
        const distanceToCollider = this.distanceBetweenBounds(
          collider,
          this.direction
        )

        return distanceToCollider < distance ? distanceToCollider : distance
      }, TANK_TURN_THRESHOLD)
  }

  public move(axis: string, value: number): void {
    if (axis === 'y') {
      this.pos.y += value * this.speed
    }
    if (axis === 'x') {
      this.pos.x += value * this.speed
    }
  }

  private _isFireReady = true

  public fire() {
    if (this._isFireReady) {
      console.log('fire')

      const [x, y] = this.getBulletStartingPosition()
      this.bullet = new Bullet(
        this.direction,
        this,
        new Vec2(x, y),
        this._bulletSpeed
      )

      this.bullet.on('destroyed', () => {
        this.bullet = null
      })
      this.emit('fire', this.bullet)

      this._isFireReady = false
      setTimeout(() => {
        this._isFireReady = true
      }, this._fireDelay)
    }
  }

  public animate(frameDelta: number) {
    this.frames += frameDelta

    if (this.frames > 20) {
      this.animationFrame ^= 1
      this.frames = 0
    }
  }

  public hit() {
    this.explode()
    this.destroy()
  }

  public explode() {
    if (this.isExploding) return

    const [x, y] = this.getExplosionStartingPosition()

    this.explosion = new TankExplosion({ pos: new Vec2(x, y) })

    this.emit('explode', this.explosion)
  }

  public destroy() {
    this.bullet = null
    this.explosion = null

    this.emit('destroyed', this)
  }

  private getBulletStartingPosition() {
    switch (this.direction) {
      case Direction.Up:
        return [this.left + 12, this.top]
      case Direction.Right:
        return [this.right - 8, this.top + 12]
      case Direction.Down:
        return [this.left + 12, this.bottom - 8]
      case Direction.Left:
        return [this.left, this.top + 12]
    }
  }

  private getExplosionStartingPosition() {
    return [
      this.left - TANK_EXPLOSION_WIDTH * 0.25,
      this.top - TANK_EXPLOSION_HEIGHT * 0.25,
    ]
  }
}
