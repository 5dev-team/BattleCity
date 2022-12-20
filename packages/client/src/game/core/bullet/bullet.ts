
import { GameObjectArgs, IHitable } from '@/game/core/types'
import Explosion from '@/game/core/explosion/explosion'
import GameObject from '@/game/core/game-object/game-object'
import Stage from '@/game/core/stage/stage'
import { TObjects } from '@/game/core/stage/types'
import { PROJECTILE_HEIGHT, PROJECTILE_SPEED, PROJECTILE_SPRITES, PROJECTILE_WIDTH } from '@/game/helpers/constants'
import { getAxisForDirection, getValueForDirection } from '@/game/helpers/helpers'

export default class Bullet extends GameObject {

  private type: string
  private readonly direction: number
  private speed: number
  private explosion: null | Explosion
  private readonly onCollide?: () => void

  constructor(direction: number, x = 0, y = 0, speed = PROJECTILE_SPEED, onCollide?: () => void) {
    super({ x, y, width: PROJECTILE_WIDTH, height: PROJECTILE_HEIGHT, sprites: PROJECTILE_SPRITES } as GameObjectArgs)
    this.type = 'bullet'
    this.direction = direction
    this.explosion = null
    this.speed = speed
    this.onCollide = onCollide
  }


  get sprite(): number[] {
    return this.sprites[this.direction]
  }


  public update({ world }: { world: Stage }): void {

    const axis = getAxisForDirection(this.direction)
    const value = getValueForDirection(this.direction)

    this.move(axis, value)

    const isOutOfBounds = world.isOutOfBounds(this)
    const collision = world.getCollision(this)

    if (isOutOfBounds) {
      this.destroy(world)
    } else if (collision) {
      if (collision && this.collide([...collision.objects])) {
        this.destroy(world)
      }
    }
  }

  private destroy(stage: Stage) {

    this.speed = 0

    if (!this.explosion) {
      const [x, y]: number[] = this.getExplosionStartingPosition()

      this.explosion = new Explosion(
        x,
        y
      )

      stage.objects.add(this.explosion)
    } else if (this.explosion.exploded) {
      stage.objects.delete(this.explosion) // удаляем взрыв из мира
      stage.objects.delete(this) // удаляем projectile из мира
      if (this.onCollide) this.onCollide()
      this.explosion = null
    }
  }

  private move(axis: string, value: number): void {
    if (axis === 'y') {
      this.y += value * this.speed
    }
    if (axis === 'x') {
      this.x += value * this.speed
    }
  }

  private collide(objects: TObjects[]): boolean {

    const hitableObjs = objects.filter(obj => obj !== undefined && 'hit' in obj).map(obj => obj as IHitable)
    const hit = hitableObjs.length
    hitableObjs.forEach(hitable => hitable.hit(this))

    return !!hit
  }

  private getExplosionStartingPosition(): number[] {
    switch (this.direction) {
      case GameObject.Direction.UP:
        return [this.left - 10, this.top - 12]
      case GameObject.Direction.RIGHT:
        return [this.right - 16, this.top - 12]
      case GameObject.Direction.DOWN:
        return [this.left - 10, this.bottom - 16]
      case GameObject.Direction.LEFT:
        return [this.left - 16, this.top - 12]
      default:
        return [this.left - 10, this.top - 12]
    }
  }


}