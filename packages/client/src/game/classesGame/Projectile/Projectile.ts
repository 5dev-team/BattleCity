import GameObject from '../GameObject/GameObject'
import { getAxisForDirection, getValueForDirection } from '../../helpersGame/helpers'
import Explosion from '../Explosion/Explosion'
import { PROJECTILE_HEIGHT, PROJECTILE_SPEED, PROJECTILE_SPRITES, PROJECTILE_WIDTH } from '../../helpersGame/constants'
import Stage from '../Stage/Stage'
import Tank from '../Tank/Tank'
import { TSprites } from '../../helpersGame/types'
import { IGameObjectConstructor } from '../GameObject/types'


export default class Projectile extends GameObject {
  public type: string
  public width: number
  public height: number
  public sprites: TSprites
  public direction: number
  public speed: number
  public tank: Tank
  public explosion: null | Explosion

  constructor({
                tank,
                direction,
                ...args
              }: { tank: Tank, direction: number } | { tank: Tank, direction: number, x: number, y: number, speed: number }) {
    super(<IGameObjectConstructor>args)
    this.type = 'bullet'
    this.width = PROJECTILE_WIDTH
    this.height = PROJECTILE_HEIGHT
    this.sprites = PROJECTILE_SPRITES
    this.direction = direction
    this.speed = PROJECTILE_SPEED
    this.tank = tank
    this.explosion = null
  }

  get sprite(): number[] {
    return this.sprites[this.direction]
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  public update({ world }: { world: Stage }): void {

    const axis = getAxisForDirection(this.direction)
    const value = getValueForDirection(this.direction)

    this.move(axis, value)

    const isOutOfBounds = world.isOutOfBounds(this)
    const collision = world.getCollision(this)

    if (isOutOfBounds) {
      this.destroy(world)
    } else if (collision) {
      if (this.collide(collision.objects)) {
        this.destroy(world)
      }
    }
  }

  private destroy(stage: Stage) {

    this.speed = 0

    if (!this.explosion) {
      const [x, y]: number[] = this.getExplosionStartingPosition()

      this.explosion = new Explosion({
        x,
        y
      })

      stage.objects.add(this.explosion)
    } else if (this.explosion.exploded) {
      stage.objects.delete(this.explosion) // удаляем взрыв из мира
      stage.objects.delete(this) // удаляем projectile из мира
      this.tank.bullet = null
      this.explosion = null
    }
  }

  private move(axis: string, value: number): void {

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this[axis] += value * this.speed
  }

  private collide(objects: any) {
    for (const object of objects) {
      if (object === this.tank || object === this.explosion) continue
      object.hit(this)

      return true
    }

    return false
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
