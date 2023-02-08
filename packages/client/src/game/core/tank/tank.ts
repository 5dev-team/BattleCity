import GameObject from '@/game/core/game-object/game-object'
import { IMovable, IUpdatable, Rect, Vec2 } from '@/game/core/types'
import Bullet from '@/game/core/bullet/bullet'
import {
  Direction,
  TANK_HEIGHT,
  TANK_SPEED,
  TANK_TURN_THRESHOLD,
  TANK_WIDTH,
  TILE_SIZE,
} from '@/game/helpers/constants'
import { Sprites } from '@/game/helpers/types';

export default class Tank extends GameObject implements IMovable  {
  protected speed: number
  protected bullet: null | Bullet
  protected direction: Direction
  private readonly bulletSpeed: number

  constructor(pos: Vec2, sprites: Sprites) {
    super(new Rect(pos, TANK_WIDTH, TANK_HEIGHT), sprites)
    this.speed = TANK_SPEED
    this.bulletSpeed = 2
    this.bullet = null
    this.direction = Direction.UP
  }

  public get sprite() {
    return this.sprites[this.direction * 2 + this.animationFrame]
  }

  public turn(direction: number) {
    const prevDirection = this.direction

    this.direction = direction

    if (
      direction === Direction.UP ||
      direction === Direction.DOWN
    ) {
      if (prevDirection === Direction.RIGHT) {
        const value = TILE_SIZE - (this.rect.pos.x % TILE_SIZE)

        if (value <= TANK_TURN_THRESHOLD) {
          this.rect.pos.x += value
        }
      } else if (prevDirection === Direction.LEFT) {
        const value = this.rect.pos.x % TILE_SIZE

        if (value <= TANK_TURN_THRESHOLD) {
          this.rect.pos.x -= value
        }
      }
    } else {
      if (prevDirection === Direction.UP) {
        const value = this.rect.pos.y % TILE_SIZE

        if (value <= TANK_TURN_THRESHOLD) {
          this.rect.pos.y -= value
        }
      } else if (prevDirection === Direction.DOWN) {
        const value = TILE_SIZE - (this.rect.pos.y % TILE_SIZE)

        if (value <= TANK_TURN_THRESHOLD) {
          this.rect.pos.y += value
        }
      }
    }
  }

  public move(axis: string, value: number): void {
    if (axis === 'y') {
      this.rect.pos.y += value * this.speed
    }
    if (axis === 'x') {
      this.rect.pos.x += value * this.speed
    }
  }

  public fire() {
    if (!this.bullet) {
      const [x, y] = this.getBulletStartingPosition()

      this.bullet = new Bullet(new Vec2(x, y), this.direction, this.bulletSpeed, () => {
        this.bullet = null
      })
    }
  }

  public animate(frameDelta: number) {
    this.frames += frameDelta

    if (this.frames > 20) {
      this.animationFrame ^= 1
      this.frames = 0
    }
  }

  public getBulletStartingPosition(): number[] {
    switch (this.direction) {
      case Direction.UP:
        return [this.rect.left + 10, this.rect.top]
      case Direction.RIGHT:
        return [this.rect.right - 8, this.rect.top + 12]
      case Direction.DOWN:
        return [this.rect.left + 10, this.rect.bottom - 8]
      case Direction.LEFT:
        return [this.rect.left, this.rect.top + 12]
      default:
        return [this.rect.left + 10, this.rect.top]
    }
  }
}
